CREATE TABLE users (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	username text NOT NULL UNIQUE,
	password text,
	user_type text NOT NULL
);

CREATE TABLE products (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	name text,
	price money,
	seller_id uuid,
	CONSTRAINT fk_seller
      FOREIGN KEY(seller_id) 
	  REFERENCES users(id)
);

CREATE TABLE orders (
	id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
	product_ids uuid [],
	created_at timestamp default current_timestamp,
	seller_id uuid,
	amount money,
	CONSTRAINT fk_orders_seller
      FOREIGN KEY(seller_id) 
	  REFERENCES users(id),
	buyer_id uuid,
	CONSTRAINT fk_orders_buyer
      FOREIGN KEY(buyer_id) 
	  REFERENCES users(id)
);