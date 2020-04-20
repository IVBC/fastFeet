import { Op } from 'sequelize';
import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, q = '', quantity = 10 } = req.query;

    const { rows: deliverers, count } = await Deliveryman.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `${q}%`,
        },
      },
      order: [['id', 'DESC']],
      limit: quantity,
      offset: (page - 1) * quantity,
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json({
      deliverers,
      count,
      totalPages: Math.ceil(count / quantity),
    });
  }

  async show(req, res) {
    const { id } = req.params;

    console.log(id);

    const deliveryman = await Deliveryman.findOne({
      where: {
        id,
      },
      paranoid: false,
      attributes: ['id', 'name', 'email', 'createdAt', 'deletedAt'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery not exists.' });
    }
    if (deliveryman.deletedAt) {
      return res.status(401).json({ error: 'Deliveryman fired' });
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails.' });
    }

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (deliverymanExists) {
      return res
        .status(401)
        .json({ error: 'Deliveryman already exists with this email.' });
    }

    const avatar = await File.findByPk(req.body.avatar_id);

    if (!avatar) {
      return res.status(401).json({ error: 'File not exists.' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails.' });
    }

    const { id } = req.params;
    const { avatar_id } = req.body;

    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not exists.' });
    }

    const avatar = await File.findByPk(avatar_id);

    if (!avatar) {
      return res.status(400).json({ error: 'File not exists.' });
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(401).json({ error: 'Deliveryman not exists.' });
    }

    await deliveryman.destroy({ where: { id } });

    return res.status(200).json();
  }
}

export default new DeliverymanController();
