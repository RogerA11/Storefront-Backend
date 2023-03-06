// @ts-ignore
import Client from '../database'

// assign typescript type
export type Product = {
    id?: string;
    name: string;
    price: number;
    category?: string;
  }
  
  // crud functionality  
export class ProductStore { // this class is the representation of the db - postgres ambassador
    // model method requests 
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            // open a connection with the db to communicate with it
            const conn = await Client.connect()

            // express a sql query from your node app to run on a postgres db 
            const sql = 'SELECT * FROM products'
            
            // store the result of the query on the db connection
            const result = await conn.query(sql)
  
            // close the connection
            conn.release()
  
            // return the query result
            return result.rows 
        } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`)
      }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await Client.connect()
    
            const result = await conn.query(sql, [id])
    
            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }
    
    async create(product: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES($1, 1) RETURNING *'
            // @ts-ignore
            const conn = await Client.connect()
    
            const result_var = await conn.query(sql, [product.name, product.price])
    
            const result = result_var.rows[0]
    
            conn.release()
    
            return result 
        } catch (err) {
            throw new Error(`Could not add product ${product.name}. Error: ${err}`)
        }
    }
};