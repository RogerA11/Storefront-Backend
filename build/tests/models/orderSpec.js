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
describe('Order Model', () => {
    describe('Create method', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM orders');
            yield conn.query('DELETE FROM products');
            yield conn.query('DELETE FROM users');
            yield conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
            yield conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            yield conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            conn.release();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM orders');
            yield conn.query('DELETE FROM products');
            yield conn.query('DELETE FROM users');
            conn.release();
        }));
        it('should have a create method', () => {
            expect(orderStore.create).toBeDefined();
        });
        it('should create a order using the create method', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                name: 'Sapiens',
                price: 400,
                category: 'book'
            };
            const user = {
                firstname: 'James',
                lastname: 'Bond',
                password: 'Double0h7'
            };
            const order = {
                user_id: 1,
                order_status: 'active'
            };
            const productResult = yield productStore.create(product);
            const userResult = yield userStore.create(user);
            const orderResult = yield orderStore.create(order);
            // console.log(result);
            expect(orderResult).toEqual({
                id: 1,
                user_id: 1,
                order_status: 'active'
            });
        }));
        describe('Show method', () => {
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                const conn = yield database_1.default.connect();
                yield conn.query('DELETE FROM orders');
                yield conn.query('DELETE FROM products');
                yield conn.query('DELETE FROM users');
                yield conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
                yield conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
                yield conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
                conn.release();
            }));
            afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
                const conn = yield database_1.default.connect();
                yield conn.query('DELETE FROM orders');
                yield conn.query('DELETE FROM products');
                yield conn.query('DELETE FROM users');
                conn.release();
            }));
            it('should have a show method', () => {
                expect(orderStore.show).toBeDefined();
            });
            it('should return the correct order with a specific user_id', () => __awaiter(void 0, void 0, void 0, function* () {
                const product = {
                    name: 'Sapiens',
                    price: 400,
                    category: 'book'
                };
                const user = {
                    firstname: 'James',
                    lastname: 'Bond',
                    password: 'Double0h7'
                };
                const order = {
                    user_id: 1,
                    order_status: 'active'
                };
                const productResult = yield productStore.create(product);
                const userResult = yield userStore.create(user);
                const orderCreateResult = yield orderStore.create(order);
                const orderShowResult = yield orderStore.show(order.user_id);
                // console.log(result);
                expect(orderShowResult).toEqual({
                    id: 1,
                    user_id: 1,
                    order_status: 'active'
                });
            }));
        });
    });
});
