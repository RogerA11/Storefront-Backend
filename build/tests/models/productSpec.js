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
const product_1 = require("../../models/product");
const database_1 = __importDefault(require("../../database"));
const store = new product_1.ProductStore();
describe('Product Model', () => {
    describe('Index method', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([]);
        }));
    });
    describe('Show method', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM products');
            yield conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            conn.release();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM products');
            conn.release();
        }));
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should return the correct product with a specific id', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                name: 'The Alchemist',
                price: 350,
                category: 'book'
            };
            const createBook = yield store.create(product);
            const result = yield store.show(1);
            expect(result).toEqual({
                id: 1,
                name: 'The Alchemist',
                price: 350,
                category: 'book'
            });
        }));
    });
    describe('Create method', () => {
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM products');
            yield conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
            conn.release();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM products');
            conn.release();
        }));
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
        it('should create a product using create method', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = {
                name: 'Sapiens',
                price: 400,
                category: 'book'
            };
            const result = yield store.create(product);
            expect(result).toEqual({
                id: 1,
                name: 'Sapiens',
                price: 400,
                category: 'book'
            });
        }));
    });
});
