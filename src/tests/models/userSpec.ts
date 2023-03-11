import { User, UserStore } from "../../models/user";
import { Pool, PoolClient, QueryResult } from 'pg';
import Client from "../../database";
import bcrypt from 'bcrypt'

const saltRounds = process.env.SALT_ROUNDS
const pepper = process.env.BCRYPT_PASSWORD
const store = new UserStore()

describe('User Model', () => {
    describe('Index method', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });

        it('index method should return a list of products', async () => {
            const result = await store.index();
            expect(result).toEqual([]);
        });
    })

    describe('Show method', () => {
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        beforeEach(async () => {
            const conn: PoolClient = await Client.connect();
            await conn.query('DELETE FROM users');
            await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            conn.release();
        });
    
        afterEach(async () => {
            const conn = await Client.connect();
            await conn.query('DELETE FROM users');
            conn.release();
        });
        
        it('should return the correct user with a specific id', async () => {
            const user: User = {
              firstname: 'Jack',
              lastname: 'Black',
              password: 'randomPassword'
            };

            const hash: string = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds!)
              );
        
            const createUser: User = await store.create(user);
            const result: User = await store.show(1);
            expect(result).toEqual({
                id: 1,
                firstname: 'Jack',
                lastname: 'Black', 
                password: jasmine.any(String)});
            expect(bcrypt.compareSync(user.password + pepper, result.password)).toBe(true);
            });

    describe('Create method', () => {
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });

        beforeEach(async () => {
            const conn: PoolClient = await Client.connect();
            await conn.query('DELETE FROM users');
            await conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            conn.release();
        });
    
        afterEach(async () => {
            const conn = await Client.connect();
            await conn.query('DELETE FROM users');
            conn.release();
        });

        it('should create a user using the create method', async () => {
            const user: User = {
              firstname: 'James',
              lastname: 'Bond',
              password: 'Double0h7'
            };
          
            const result: User = await store.create(user);
            const hash: string = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds!)
              );
          
            // Verify that the user object returned by create() contains the expected values
            expect(result).toEqual({
              id: 1,
              firstname: 'James',
              lastname: 'Bond',
              password: jasmine.any(String) // The actual hash value will vary each time
            });
             // Verify that the stored password hash matches the expected hash
            expect(bcrypt.compareSync(user.password + pepper, result.password)).toBe(true);
          });
    })});
});
