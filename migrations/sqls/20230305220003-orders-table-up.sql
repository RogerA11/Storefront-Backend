/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    product_qty INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id),
    order_status VARCHAR NOT NULL    
);