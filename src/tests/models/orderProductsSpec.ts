import { Order, OrderProduct, OrderStore } from "../../models/order";
import { Product, ProductStore } from "../../models/product";
import { User, UserStore } from "../../models/user";
import { Pool, PoolClient, QueryResult } from 'pg';
import client from "../../database";

const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()
  
    
    
describe('OrderProducts Model', () => {
    
    describe('addProduct method', () => {
    
        beforeEach(async () => {
            const conn: PoolClient = await client.connect();
            await conn.query('ALTER SEQUENCE order_products_id_seq RESTART WITH 1');
            await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1'); 
            conn.release();
            });
        
        afterEach(async () => {
            const conn = await client.connect();
            await conn.query('DELETE FROM order_products');
            await conn.query('DELETE FROM orders'); 
            conn.release();
            });
        
        it('should have an addProduct method', () => {
            expect(orderStore.addProduct).toBeDefined();
        });
    
        it('should add a product to the order_products table', async () => {
            const addProductResult: OrderProduct = await orderStore.addProduct(1, 1, 4)
    
            // console.log(result);
            expect(addProductResult).toEqual({
                id: 1,
                order_id: 1,
                product_id: 1,
                quantity: 4
            });
        });
    });
});