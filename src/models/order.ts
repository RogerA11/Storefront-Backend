// @ts-ignore
import Client from '../database'
import { Pool, PoolClient, QueryResult } from 'pg';
import { Product } from './product';
import { User } from './user';

export type Order = {
    id?: number;
    product_id: Product['id'];
    product_qty: number;
    user_id: User['id'];
    order_status: string;
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
          const sql: string = 'INSERT INTO orders (product_id, product_qty, user_id, order_status) VALUES($1, $2, $3, $4) RETURNING *'
    
          const result: QueryResult = await conn.query(sql, [order.product_id, order.product_qty,
                                                             order.user_id, order.order_status])
          
          conn.release()
    
          return result.rows[0]
        } catch(err) {
          throw new Error(`unable to create order (${order.id}): ${err}`)
        } 
      }
};