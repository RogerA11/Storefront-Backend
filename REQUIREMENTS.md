# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
GET ['/products']
- Show
GET ['/products/:id']
- Create [token required]
POST ['products/:Product]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
GET ['/users']
- Show [token required]
GET ['/users/:id']
- Create [token required]
POST ['/users/:User']

#### Orders
- Current Order by user (args: user id)[token required]
GET ['/orders/:id']
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
GET ['/orders/:id/products']

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

Table: products (id: serial primary key, name: varchar not null, price: integer not null, category: varchar)

#### User
- id
- firstName
- lastName
- password

Table: users (id: serial primary key, firstName: varchar not null, lastName: varchar not null, password: varchar not null)

#### Orders
- id
- user_id
- order_status 

Table: orders (id: serial primary key, user_id: varchar not null, order_status: varchar not null)

#### OrderProducts
- id
- order_id
- product_id
- quantity 

Table: order_products (id: serial primary key, order_id: bigint reference orders(id), product_id: bigint references products(id), quantity: integer)
