import File from '../models/File';
import Deliveryman from '../models/Deliveryman';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const { id } = req.params;

    /**
     * If it's a signature image
     */

    if (id) {
      const delivery = await Deliveryman.findByPk(id);

      if (!delivery) {
        return res.status(400).json({ error: 'User not Deliveryman.' });
      }
    }

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}

export default new FileController();
