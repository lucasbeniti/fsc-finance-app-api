CREATE TABLE IF NOT EXISTS users(
	id UUID PRIMARY KEY, 
	firstName VARCHAR(50) NOT NULL,
	lastName VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL
);

-- create types
DO $$
BEGIN 
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transaction_type') THEN
    CREATE TYPE transaction_type AS ENUM('EARNING', 'EXPENSE', 'INVESTMENT');
  END IF;
END$$;


CREATE TABLE IF NOT EXISTS transactions(
	id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name varchar(100) NOT NULL,
  date DATE NOT NULL,
  amount NUMERIC(10, 2),
  type transaction_type NOT NULL
);