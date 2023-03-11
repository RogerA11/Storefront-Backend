import { Product, ProductStore } from "../../models/product";
import { Pool, PoolClient, QueryResult } from 'pg';
import Client from "../../database";

const store = new ProductStore()

describe('Product Model', () => {
    describe('Index method', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });

        it('should return a list of products', async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    });
      
    describe('Show method', () => {
      it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });

      beforeEach(async () => {
        const conn: PoolClient = await Client.connect();
        await conn.query('DELETE FROM products');
        await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        conn.release();
      });

      afterEach(async () => {
        const conn = await Client.connect();
        await conn.query('DELETE FROM products');
        conn.release();
      });
    
      it('should return the correct product with a specific id', async () => {
        const product: Product = {
          name: 'The Alchemist',
          price: 350,
          category: 'book'
        };

        const createBook: Product = await store.create(product);
        const result: Product = await store.show(1);
        expect(result).toEqual({
          id: 1,
          name: 'The Alchemist',
          price: 350,
          category: 'book'});
        });
      });
  
    describe('Create method', () => {
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });

      beforeEach(async () => {
        const conn: PoolClient = await Client.connect();
        await conn.query('DELETE FROM products');
        await conn.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        conn.release();
      });

      afterEach(async () => {
        const conn = await Client.connect();
        await conn.query('DELETE FROM products');
        conn.release();
      });
    
      it('should create a product using create method', async () => {
        const product: Product = {
          name: 'Sapiens',
          price: 400,
          category: 'book'
        };
        const result: Product = await store.create(product);
        expect(result).toEqual({
          id: 1,
          name: 'Sapiens',
          price: 400,
          category: 'book'});
        });
    });
});
