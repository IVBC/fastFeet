import { Router } from 'express';

const routes = new Router();
routes.get('/', (req, res) => res.json({ message: 'I am Isaque Vilson! ' }));

export default routes;
