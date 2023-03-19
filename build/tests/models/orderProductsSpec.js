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
const order_1 = require("../../models/order");
const product_1 = require("../../models/product");
const user_1 = require("../../models/user");
const database_1 = __importDefault(require("../../database"));
const orderStore = new order_1.OrderStore();
const productStore = new product_1.ProductStore();
const userStore = new user_1.UserStore();
describe('OrderProducts Model', () => {
    describe('addProduct method', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1');
            yield conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
            conn.release();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM order_products');
            yield conn.query('DELETE FROM orders');
            conn.release();
        }));
        it('should have an addProduct method', () => {
            expect(orderStore.addProduct).toBeDefined();
        });
        it('should add a product to the order_products table', () => __awaiter(void 0, void 0, void 0, function* () {
            const addProductResult = yield orderStore.addProduct(1, 1, 4);
            // console.log(result);
            expect(addProductResult).toEqual({
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 4
            });
        }));
    });
});
