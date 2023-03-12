import express, {Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

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
    try { 
        const product: Product = {
            name: _req.body.name,
            price: _req.body.price,
            category: _req.body.category
        } 
        const productResult = await store.create(product)
        res.json(productResult)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const products_routes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', create)
}

export default products_routes;