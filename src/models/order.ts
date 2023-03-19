// @ts-ignore
import Client from '../database'
import { Pool, PoolClient, QueryResult } from 'pg';
import { Product } from './product';
import { User } from './user';

export type Order = {
    id?: number;
    user_id: number;
    order_status: string;
  }
  
export type OrderProduct = {
    id?: number;
    order_id: number;
    product_id: number;
    quantity: number;
  }
  
  // crud functionality  
  export class OrderStore { // this class is the representation of the db - postgres ambassador
    // model method requests 
    async show(user_id: number): Promise<Order> {
        try {
            const sql: string = 'SELECT * FROM orders WHERE user_id=($1)'
            // @ts-ignore
            const conn: PoolClient = await Client.connect()
    
            const result: QueryResult = await conn.query(sql, [user_id])
    
            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get current order by ${user_id}. Error: ${err}`)
        }
    }

    async create(order: Order): Promise<Order> {
        try {
          // @ts-ignore
          const conn: PoolClient = await Client.connect()
          const sql: string = 'INSERT INTO orders (user_id, order_status) VALUES($1, $2) RETURNING *'
    
          const result: QueryResult = await conn.query(sql, [order.user_id, order.order_status])
          
          conn.release()
    
          return result.rows[0]
        } catch(err) {
          throw new Error(`unable to create order (${order.user_id}): ${err}`)
        } 
      }
    
    async addProduct(order_id: number, product_id: number, quantity: number): Promise<OrderProduct> {
        try {
            // verify that the order_id value exists in the orders table
            const conn = await Client.connect()
            const orderExists = await conn.query('SELECT * FROM orders WHERE id = $1', [order_id]);
            if (orderExists.rowCount === 0) {
                throw new Error(`Could not add product ${product_id} to order ${order_id}: order does not exist`);
            }
    
            const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
    
            const result = await conn.query(sql, [order_id, product_id, quantity]);
    
            const orderProduct = result.rows[0];
    
            conn.release();
    
            return orderProduct;
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
        }
    }
};







