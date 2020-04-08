import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import SessionsController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';
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
routes.get('/deliverers/:id', DeliverymanController.show);
routes.get('/deliverer/:id/deliveries', DeliverymanFeaturesController.index);
routes.put('/delivery/:id/:action', DeliverymanFeaturesController.update);

/**
 * Delivery Problems
 */
routes.post('/delivery/:id/problems', DeliveryProblemsController.store);
routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.get('/delivery/:id/problems', DeliveryProblemsController.show);
routes.delete(
  '/delivery/:id/cancel-delivery',
  DeliveryProblemsController.delete
);

routes.post('/sessions', SessionsController.store);

routes.use(authMiddleware);

/**
 * Recipients
 */
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

/**
 * DeliveryPeople
 */
routes.get('/deliverers', DeliverymanController.index);
routes.post('/deliverers', DeliverymanController.store);
routes.put('/deliverers/:id', DeliverymanController.update);
routes.delete('/deliverers/:id', DeliverymanController.delete);

/**
 * File
 */
routes.post('/files', upload.single('file'), FileController.store);

/**
 * Delivery
 */

routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
