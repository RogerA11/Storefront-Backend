"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
const store = new user_1.UserStore();
describe('User Model', () => {
    describe('Index method', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM users');
            yield conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            conn.release();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM users');
            conn.release();
        }));
        it('index method should return a list of user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([]);
        }));
    });
    describe('Show method', () => {
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM users');
            yield conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
            conn.release();
        }));
        afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            yield conn.query('DELETE FROM users');
            conn.release();
        }));
        it('should return the correct user with a specific id', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = {
                firstname: 'Jack',
                lastname: 'Black',
                password: 'randomPassword'
            };
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const createUser = yield store.create(user);
            const result = yield store.show(1);
            expect(result).toEqual({
                id: 1,
                firstname: 'Jack',
                lastname: 'Black',
                password: jasmine.any(String)
            });
            expect(bcrypt_1.default.compareSync(user.password + pepper, result.password)).toBe(true);
        }));
        describe('Create method', () => {
            it('should have a create method', () => {
                expect(store.create).toBeDefined();
            });
            beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
                const conn = yield database_1.default.connect();
                yield conn.query('DELETE FROM users');
                yield conn.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
                conn.release();
            }));
            afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
                const conn = yield database_1.default.connect();
                yield conn.query('DELETE FROM users');
                conn.release();
            }));
            it('should create a user using the create method', () => __awaiter(void 0, void 0, void 0, function* () {
                const user = {
                    firstname: 'James',
                    lastname: 'Bond',
                    password: 'Double0h7'
                };
                const result = yield store.create(user);
                const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
                // Verify that the user object returned by create() contains the expected values
                expect(result).toEqual({
                    id: 1,
                    firstname: 'James',
                    lastname: 'Bond',
                    password: jasmine.any(String) // The actual hash value will vary each time
                });
                // Verify that the stored password hash matches the expected hash
                expect(bcrypt_1.default.compareSync(user.password + pepper, result.password)).toBe(true);
            }));
        });
    });
});
