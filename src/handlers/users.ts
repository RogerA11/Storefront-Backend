import express, {Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (_req: Request, res: Response) => {
    const userId: number = parseInt(_req.params.id)
    const userById: User = await store.show(userId)
    res.json(userById)
};

const create = async (_req: Request, res: Response) => {
    try { 
        const user: User = {
            firstname: _req.body.firstname,
            lastname: _req.body.lastname,
            password: _req.body.password
        } 
        const userResult = await store.create(user)
        res.json(userResult)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
};

const user_routes = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default user_routes;