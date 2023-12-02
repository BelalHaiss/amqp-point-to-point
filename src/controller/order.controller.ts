import { NextFunction, Router } from 'express';
import { warpAsync } from '../shared/util/wrapper';
import { OrderService } from '../services/Order.service';

const express = require('express');
const router: Router = express.Router();

const orderService = new OrderService();

// post simple order
router.post(
  '/',
  warpAsync(async (req, res, next) => {
    await orderService.NewOrder(req.body);
    return res.status(201).end();
  })
);
// post bulk orders
router.post(
  '/bulk/:count',
  warpAsync(async (req, res, next) => {
    const bulkCount: number = +req.params['count'];
    const order = req.body;
    const emptyArr = Array(bulkCount).fill('');
    const orderPromisesArray = emptyArr.map(() =>
      orderService.newOrderFromBulk(order)
    );

    await Promise.all(orderPromisesArray);
    res.status(201).end();
  })
);

export const OrderRouter = {
  router,
  path: '/api/order'
};
