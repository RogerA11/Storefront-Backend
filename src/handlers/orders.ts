import express, {Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const orderStore = new OrderStore()

const show = async (_req: Request, res: Response) => {
    const userId: number = parseInt(_req.params.id)
    const orderByUserId: Order = await orderStore.show(userId)
    res.json(orderByUserId)
};

const create = async (_req: Request, res: Response) => {
    try { 
        const order: Order = {
            product_id: parseInt(_req.body.product_id),
            product_qty: _req.body.product_qty,
            user_id: parseInt(_req.body.user_id),
            order_status: _req.body.order_status
        } 
    
        const orderResult: Order = await orderStore.create(order)
        res.json(orderResult)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const order_routes = (app: express.Application) => {
    app.get('/orders/:id', show)
    app.post('/orders', create)
}

export default order_routes;