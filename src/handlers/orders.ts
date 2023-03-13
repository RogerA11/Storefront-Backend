import express, {Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import jwt from 'jsonwebtoken';

const orderStore = new OrderStore()

const show = async (_req: Request, res: Response) => {
    const userId: number = parseInt(_req.params.id)
    const orderByUserId: Order = await orderStore.show(userId)
    res.json(orderByUserId)
};

const create = async (_req: Request, res: Response) => {
        const order: Order = {
            product_id: parseInt(_req.body.product_id),
            product_qty: _req.body.product_qty,
            user_id: parseInt(_req.body.user_id),
            order_status: _req.body.order_status
        } 
    
    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET!)
    }  catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
        };
    
    try {
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