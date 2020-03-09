import jwt from 'jsonwebtoken';

import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required('Must enter email'),
      password: Yup.string()
        .min(6)
        .required('Must enter password'),
    });

    const x = await schema.validate(req.body).catch(e => {
      return res.status(400).json({ error: e.name, errors: e.errors });
    });

    console.log(x);

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validate fails.' });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    if (!user.admin) {
      return res.status(401).json({ error: 'User must be an administrator.' });
    }

    const { id, name } = user;

    console.log(authConfig)
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
