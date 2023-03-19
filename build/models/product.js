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
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../database"));
// crud functionality  
class ProductStore {
    // model method requests 
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                // open a connection with the db to communicate with it
                const conn = yield database_1.default.connect();
                // express a sql query from your node app to run on a postgres db 
                const sql = 'SELECT * FROM products';
                // store the result of the query on the db connection
                const result = yield conn.query(sql);
                // close the connection
                conn.release();
                // return the query result
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get products. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not get product ${id}. Error: ${err}`);
            }
        });
    }
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result_var = yield conn.query(sql, [product.name, product.price, product.category]);
                const result = result_var.rows[0];
                conn.release();
                return result;
            }
            catch (err) {
                throw new Error(`Could not add product ${product.name}. Error: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
;
