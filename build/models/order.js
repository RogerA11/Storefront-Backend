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
exports.OrderStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
// crud functionality  
class OrderStore {
    // model method requests 
    show(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get current order by ${user_id}. Error: ${err}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [order.user_id, order.order_status]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`unable to create order (${order.user_id}): ${err}`);
            }
        });
    }
    addProduct(order_id, product_id, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // verify that the order_id value exists in the orders table
                const conn = yield database_1.default.connect();
                const orderExists = yield conn.query('SELECT * FROM orders WHERE id = $1', [order_id]);
                if (orderExists.rowCount === 0) {
                    throw new Error(`Could not add product ${product_id} to order ${order_id}: order does not exist`);
                }
                const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [order_id, product_id, quantity]);
                const orderProduct = result.rows[0];
                conn.release();
                return orderProduct;
            }
            catch (err) {
                throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
            }
        });
    }
}
exports.OrderStore = OrderStore;
;
