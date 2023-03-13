import express, {Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (_req: Request, res: Response) => {
    const productId: number = parseInt(_req.params.id)
    const productById: Product = await store.show(productId)
    res.json(productById)
};

const create = async (_req: Request, res: Response) => { 
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category
        }; 

    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET!)
    }  catch (err) {
        res.status(401)
        res.json(`Invalid token ${err}`)
        return
        };

    try {
        const productResult = await store.create(product)
        res.json(productResult)
    } catch (err) {
        res.status(400)
        res.json(err)
    };
};

const products_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default products_routes;