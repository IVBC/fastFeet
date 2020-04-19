import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  setHours,
  isWithinInterval,
  startOfHour,
  endOfToday,
  startOfToday,
} from 'date-fns';

import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliverymanFeaturesController {
  async index(req, res) {
    const { id: deliveryman_id } = req.params;
    const { filter = 'OPEN', page = 1, quantity = 10 } = req.query;

    if (!(filter === 'OPEN' || filter === 'DELIVERED')) {
      return res.status(401).json({
        error: "The filter is invalid. Enter with 'OPEN' or 'DELIVERED'",
      });
    }
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man not found' });
    }

    const where = {
      deliveryman_id,
      end_date:
        filter === 'OPEN'
          ? null
          : {
              [Op.not]: null,
            },
    };

    const { rows: deliveries, count } = await Delivery.findAndCountAll({
      where,
      attributes: [
        'id',
        'status',
        'product',
        'created_at',
        'signature_id',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      order: [['id', 'ASC']],
      limit: quantity,
      offset: (page - 1) * quantity,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          paranoid: false,
          attributes: ['name', 'street', 'number', 'city', 'state', 'zipcode'],
        },
      ],
    });
    return res.json({
      deliveries,
      count,
      totalPages: Math.ceil(count / quantity),
    });
  }

  async update(req, res) {
    const { id: delivery_id, action } = req.params;

    const schema = Yup.object().shape({
      action: Yup.string().oneOf(
        ['deliver', 'withdraw'],
        'action available is only: deliver and withdraw.'
      ),
      signature_id: Yup.number().when('action', (_action, field) => {
        return _action === 'deliver' ? field.required() : field;
      }),
    });

    if (!(await schema.isValid({ ...req.body, action }))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { signature_id } = req.body;

    const delivery = await Delivery.findByPk(delivery_id, {
      paranoid: false,
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'deliveryman_id',
        'status',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          paranoid: false,
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
          paranoid: false,
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery does not exist.' });
    }

    const { deliveryman_id } = delivery;

    const deliveryman = await Deliveryman.findByPk(deliveryman_id);

    if (!deliveryman) {
      return res
        .status(400)
        .json({ error: 'Delivery man is not available, he was fired.' });
    }
    if (action === 'withdraw') {
      if (
        !isWithinInterval(new Date(), {
          start: startOfHour(setHours(startOfToday(), 8)),
          end: startOfHour(setHours(startOfToday(), 18)),
        })
      ) {
        return res.status(400).json({
          error:
            'You can only pick up deliveries today between 8:00h and 18:00h',
        });
      }

      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id,
          end_date: null,
          start_date: {
            [Op.gte]: startOfToday(),
            [Op.lt]: endOfToday(),
          },
        },
      });

      if (deliveries.length > 5) {
        return res.status(400).json({
          error: 'You have already reached the limit of 5 withdrawals per day',
        });
      }
      await delivery.update({ start_date: new Date() });
    } else if (action === 'deliver') {
      const file = await File.findByPk(signature_id);

      if (!delivery.start_date) {
        return res
          .status(400)
          .json({ error: 'Delivery has not yet been withdrawn' });
      }

      if (delivery.end_date) {
        return res.status(400).json({ error: 'Product already delivered' });
      }

      if (!file) {
        return res.status(400).json({ error: 'Signature file not exists' });
      }
      await delivery.update({ end_date: new Date(), signature_id });
    } else {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    return res.json(delivery);
  }
}

export default new DeliverymanFeaturesController();
