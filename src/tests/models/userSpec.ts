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
              firstName: 'Jack',
              lastName: 'Black',
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
                firstName: 'Jack',
                lastName: 'Black', 
                password: hash});
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
              firstName: 'James',
              lastName: 'Bond',
              password: 'Double0h7'
            };

            const hash: string = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds!)
              );

            const result: User = await store.create(user);
            expect(result).toEqual({
              id: 1,
              firstName: 'James',
              lastName: 'Bond',
              password: hash
            });
        });
    })});
});
