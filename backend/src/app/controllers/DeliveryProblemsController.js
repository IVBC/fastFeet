import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import CancellationDelivery from '../jobs/CancellationDelivery';
import Queue from '../../lib/Queue';

class DeliveryProblemsController {
  async index(req, res) {
    const { page = 1, quantity = 10 } = req.query;
    const { rows: problems, count } = await DeliveryProblem.findAndCountAll({
      order: [['id', 'DESC']],
      limit: quantity,
      offset: (page - 1) * quantity,
    });
    // fazer paginacao ?

    // if (!deliveryProblems) {
    //   return res.status(400).json({ error: 'Delivery problems not found.' });
    // }

    return res.json({
      problems,
      count,
      totalPages: Math.ceil(count / quantity),
    });
  }

  async show(req, res) {
    const { id: delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not exists.' });
    }

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id },
    });

    return res.json(problems);
  }

  async store(req, res) {
    const { id: delivery_id } = req.params;

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails.' });
    }
    const { description } = req.body;
    const deliveryExist = await Delivery.findByPk(delivery_id, {
      paranoid: false,
    });

    if (!deliveryExist) {
      return res.status(400).json({ error: 'Delivery not found.' });
    }
    if (deliveryExist.canceled_at) {
      return res
        .status(400)
        .json({ error: 'Delivery has already been canceled' });
    }

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id,
      description,
    });

    return res.json(deliveryProblem);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id, {
      include: [
        {
          model: Delivery,
          as: 'delivery',
          paranoid: false,
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Delivery Problem not found.' });
    }

    const delivery = await Delivery.findByPk(deliveryProblem.delivery.id);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'Delivery has already been canceled' });
    }

    await delivery.destroy();

    if (deliveryProblem.delivery.deliveryman) {
      const { name, email } = deliveryProblem.delivery.deliveryman;

      await Queue.add(CancellationDelivery.key, {
        name,
        email,
        deliveryProblem,
      });
    }
    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemsController();
