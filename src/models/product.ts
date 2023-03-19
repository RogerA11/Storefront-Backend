// @ts-ignore
import { Pool, PoolClient, QueryResult } from 'pg';
import client from '../database'

// assign typescript type
export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
  }
  
  // crud functionality  
export class ProductStore { // this class is the representation of the db - postgres ambassador
    // model method requests 
    async index(): Promise<Product[]> {
        try {
            // @ts-ignore
            // open a connection with the db to communicate with it
            const conn: PoolClient = await client.connect()

            // express a sql query from your node app to run on a postgres db 
            const sql: string = 'SELECT * FROM products'
            
            // store the result of the query on the db connection
            const result: QueryResult = await conn.query(sql)
  
            // close the connection
            conn.release()
  
            // return the query result
            return result.rows 
        } catch (err) {
        throw new Error(`Could not get products. Error: ${err}`)
      }
    }

    async show(id: number): Promise<Product> {
        try {
            const sql: string = 'SELECT * FROM products WHERE id=($1)'
            // @ts-ignore
            const conn: PoolClient = await client.connect()
    
            const result: QueryResult = await conn.query(sql, [id])
    
            conn.release()
    
            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not get product ${id}. Error: ${err}`)
        }
    }
    
    async create(product: Product): Promise<Product> {
        try {
            const sql: string = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            // @ts-ignore
            const conn: PoolClient = await client.connect()
    
            const result_var: QueryResult = await conn.query(sql, [product.name, product.price, product.category])
    
            const result = result_var.rows[0]
    
            conn.release()
    
            return result 
        } catch (err) {
            throw new Error(`Could not add product ${product.name}. Error: ${err}`)
        }
    }
};