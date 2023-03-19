"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderStore = new order_1.OrderStore();
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(_req.params.id);
    const orderByUserId = yield orderStore.show(userId);
    res.json(orderByUserId);
});
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        user_id: parseInt(_req.body.user_id),
        order_status: _req.body.order_status
    };
    try {
        jsonwebtoken_1.default.verify(_req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    ;
    try {
        const orderResult = yield orderStore.create(order);
        res.json(orderResult);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const addProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = parseInt(_req.params.id);
    const product_id = _req.body.product_id;
    const quantity = parseInt(_req.body.quantity);
    try {
        jsonwebtoken_1.default.verify(_req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    ;
    try {
        const addedProduct = yield orderStore.addProduct(order_id, product_id, quantity);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const order_routes = (app) => {
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProduct);
};
exports.default = order_routes;
