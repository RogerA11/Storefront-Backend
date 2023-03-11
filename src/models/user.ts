import Client from '../database'
import bcrypt from 'bcrypt'
import { Pool, PoolClient, QueryResult } from 'pg';

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
}

export class UserStore {
  async index(): Promise<User[]> {
    try {
      //@ts-ignore
      const conn: PoolClient = await Client.connect()
      const sql: string = 'SELECT * FROM users'

      const result: QueryResult = await conn.query(sql)

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`unable get users: ${err}`)
    } 
  }

  async show(id: number): Promise<User> {
    try {
      const sql: string = 'SELECT * FROM users WHERE id=($1)'
      //@ts-ignoreX$
      const conn: PoolClient = await Client.connect()

      const result: QueryResult = await conn.query(sql, [id])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`unable show user ${id}: ${err}`)
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn: PoolClient = await Client.connect()
      const sql: string = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'

      const hash: string = bcrypt.hashSync(
        u.password + pepper, 
        parseInt(saltRounds!)
      );

      const result: QueryResult = await conn.query(sql, [u.firstName, u.lastName, hash])
      const user = result.rows[0]

      conn.release()

      return user
    } catch(err) {
      throw new Error(`unable create user (${u.firstName}): ${err}`)
    } 
  }

  async delete(id: string): Promise<User> {
    try {
      const conn: PoolClient = await Client.connect()
      const sql: string = 'DELETE FROM users WHERE id=($1)'
      
      const result: QueryResult = await conn.query(sql, [id])

      const product = result.rows[0]

      conn.release()

      return product
    } catch(err) {
      throw new Error(`unable delete user (${id}): ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn: PoolClient = await Client.connect()
    const sql: string = 'SELECT password_digest FROM users WHERE username=($1)'

    const result: QueryResult = await conn.query(sql, [username])

    console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)
      
      if (bcrypt.compareSync(password+pepper, user.password_digest)) {
        return user
      }
    }

    return null
  }
}
