// @ts-ignore
import Client from '../database'
import { Pool, PoolClient, QueryResult } from 'pg';
import { Product } from './product';
import { User } from './user';

export type Order = {
    id?: number;
    user_id: User['id'];
    order_status: string;
  }
  
export type OrderProduct = {
    id?: number;
    order_id: Order['id'];
    product_id: Product['id'];
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
          throw new Error(`unable to create order (${order.id}): ${err}`)
        } 
      }
    
    async addProduct(order_id: string,  product_id: string, quantity: number): Promise<OrderProduct> {
        try {
          const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn.query(sql, [order_id, product_id, quantity ])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`)
        }
      }
};