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
};