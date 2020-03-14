import { Op } from 'sequelize';
import * as Yup from 'yup';
import {
  parseISO,
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
    const { filter = 'OPEN', page = 1 } = req.query;

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
      // canceled_at: null,
      end_date:
        filter === 'OPEN'
          ? null
          : {
              [Op.not]: null,
            },
    };

    const deliveries = await Delivery.findAll({
      where,
      attributes: ['id', 'product'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'city'],
        },
      ],
    });
    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.string().when('end_date', (end_date, field) =>
        end_date ? field : field.required()
      ),
      signature_id: Yup.number().when('end_date', (end_date, field) =>
        end_date ? field.required() : field
      ),
    });

    const { start_date, end_date, signature_id } = req.body;

    if (
      !(await schema.isValid(req.body)) ||
      (!start_date && !end_date) ||
      (start_date && end_date)
    ) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const { id: delivery_id } = req.params;

    const delivery = await Delivery.findByPk(delivery_id, {
      include: [
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
    if (start_date) {
      if (
        !isWithinInterval(parseISO(start_date), {
          start: startOfHour(setHours(startOfToday(), 8)),
          end: startOfHour(setHours(startOfToday(), 18)),
        })
      ) {
        return res.status(401).json({
          error:
            'You can only pick up deliveries today between 8:00h and 18:00h',
        });
      }

      const deliveries = await Delivery.findAll({
        where: {
          deliveryman_id,
          // canceled_at: null,
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
      await delivery.update({ start_date });
    } else if (end_date) {
      const file = await File.findByPk(signature_id);

      if (!file) {
        return res.status(400).json({ error: 'Signature file not exists' });
      }
      await delivery.update({ end_date, signature_id });
    } else {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    return res.json(delivery);
  }
}

export default new DeliverymanFeaturesController();
