import { Op } from 'sequelize';
import * as Yup from 'yup';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import File from '../models/File';

// import NewDelivery from '../jobs/NewOrder';
// import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { page = 1, q = '' } = req.query;

    const deliveries = await Delivery.findAll({
      where: {
        product: {
          [Op.iLike]: `${q}%`,
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    // if (!deliveries.length) {
    //   return res.status(401).json({ error: 'Deliveries not found' });
    // }

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
      attributes: ['name', 'city', 'zipcode'],
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    const { id, product } = await Delivery.create(req.body);

    // await Queue.add(NewOrder.key, {
    //   deliverytExists,
    //   product,
    //   recipientExists,
    // });

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      product,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    const deliverymanExists = await Deliveryman.findOne({
      where: { id: deliveryman_id },
    });

    if (!deliverymanExists) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    const recipientExists = await Recipient.findOne({
      where: { id: recipient_id },
    });

    if (!recipientExists) {
      return res.status(400).json({ error: 'Recipient not exists.' });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await Delivery.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new DeliveryController();
