import { Order, OrderProduct, OrderStore } from "../../models/order";
import { Product, ProductStore } from "../../models/product";
import { User, UserStore } from "../../models/user";
import { Pool, PoolClient, QueryResult } from 'pg';
import client from "../../database";

const orderStore = new OrderStore()
const productStore = new ProductStore()
const userStore = new UserStore()


describe('Order Model', () => {
  
  describe('Create method', () => {

    beforeEach(async () => {
      const conn: PoolClient = await client.connect();
      await conn.query('DELETE FROM orders');
      await conn.query('DELETE FROM products');
      await conn.query('DELETE FROM users');
      await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
      await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
      await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
      conn.release();
      });
  
    afterEach(async () => {
      const conn = await client.connect();
      await conn.query('DELETE FROM orders');
      await conn.query('DELETE FROM products');
      await conn.query('DELETE FROM users');
      conn.release();
      });
    
    it('should have a create method', () => {
        expect(orderStore.create).toBeDefined();
    });

    it('should create a order using the create method', async () => {
        const product: Product = {
            name: 'Sapiens',
            price: 400,
            category: 'book'
          };

        const user: User = {
            firstname: 'James',
            lastname: 'Bond',
            password: 'Double0h7'
          };

        const order: Order = {
          user_id: 1,
          order_status: 'active'
        };
        
        const productResult: Product = await productStore.create(product);
        const userResult: User = await userStore.create(user);
        const orderResult: Order = await orderStore.create(order);

        // console.log(result);
        expect(orderResult).toEqual({
          id: 1,
          user_id: 1,
          order_status: 'active'
        });
    });
          
  describe('Show method', () => {

    beforeEach(async () => {
      const conn: PoolClient = await client.connect();
      await conn.query('DELETE FROM orders');
      await conn.query('DELETE FROM products');
      await conn.query('DELETE FROM users');
      await conn.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1');
      await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
      await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
      conn.release();
      });
  
    afterEach(async () => {
      const conn = await client.connect();
      await conn.query('DELETE FROM orders');
      await conn.query('DELETE FROM products');
      await conn.query('DELETE FROM users');
      conn.release();
      });
  
    it('should have a show method', () => {
        expect(orderStore.show).toBeDefined();
    })
     
    it('should return the correct order with a specific user_id', async () => {
        const product: Product = {
            name: 'Sapiens',
            price: 400,
            category: 'book'
          };

        const user: User = {
            firstname: 'James',
            lastname: 'Bond',
            password: 'Double0h7'
          };

        const order: Order = {
          user_id: 1,
          order_status: 'active'
        };

        const productResult: Product = await productStore.create(product);
        const userResult: User = await userStore.create(user);
        const orderCreateResult: Order = await orderStore.create(order);
        const orderShowResult: Order = await orderStore.show(order.user_id as number);
        
        // console.log(result);
        expect(orderShowResult).toEqual({
          id: 1,
          user_id: 1,
          order_status: 'active'});
        });
    });
  });
});
