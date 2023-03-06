// @ts-ignore
import Client from '../database'

export type Order = {
    id?: string;
    product_id: string;
    quantity: number;
    user_id: string;
    order_status: number;
  }
  
  // crud functionality  
  export class OrderStore { // this class is the representation of the db - postgres ambassador
    // model method requests 
    async index(): Promise<Order[]> {
        try {
            // @ts-ignore
            // open a connection with the db to communicate with it
            const conn = await Client.connect()
    
            // express a sql query from your node app to run on a postgres db 
            const sql = 'SELECT * FROM orders'
    
            // store the result of the query on the db connection
            const result = await conn.query(sql)
    
            // close the connection
            conn.release()
    
            // return the query result
            return result.rows 
        } catch (err) {
            throw new Error(`Could not get users. Error: ${err}`)
        }
    }

    async show(user_id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
    
            const result = await conn.query(sql, [user_id])
    
            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get current order by ${user_id}. Error: ${err}`)
        }
    }

    async create(b: Order): Promise<Order> {
        try {
      const sql = 'INSERT INTO orders ( order_status) VALUES($1, $2, $3, $4) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
  
      const result = await conn
          .query(sql, [b.id, b.product_id, b.quantity, b.user_id, b.order_status])
  
      const order = result.rows[0]
  
      conn.release()
  
      return order
        } catch (err) {
            throw new Error(`Could not add new book ${b.product_id}. Error: ${err}`)
        }
    }

    async addProduct(id: string, quantity: number, product_id: string): Promise<Order> {
        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await Client.connect()
    
          const result = await conn.query(sql, [id, quantity, product_id])
    
          const order = result.rows[0]
    
          conn.release()
    
          return order
        } catch (err) {
            throw new Error(`Could not add product ${product_id} to order ${id}: ${err}`)
        }
      }
};