import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionsController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliverymanFeaturesController from './app/controllers/DeliverymanFeaturesController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post(
  '/files/:id/signature',
  upload.single('file'),
  FileController.store
);

/**
 * Deliveryman features
 */

routes.get('/delivery/:id/deliveries', DeliverymanFeaturesController.index);
routes.put('/delivery/:id', DeliverymanFeaturesController.update);

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

/**
 * Recipients
 */
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

/**
 * DeliveryPeople
 */
routes.get('/deliveryPeople', DeliverymanController.index);
routes.post('/deliveryPeople', DeliverymanController.store);
routes.put('/deliveryPeople/:id', DeliverymanController.update);
routes.delete('/deliveryPeople/:id', DeliverymanController.delete);

/**
 * File
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * Delivery
 */

routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
