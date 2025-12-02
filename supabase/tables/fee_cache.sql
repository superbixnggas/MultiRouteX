CREATE TABLE fee_cache (
    id SERIAL PRIMARY KEY,
    chain VARCHAR(50) NOT NULL,
    from_token VARCHAR(50) NOT NULL,
    to_token VARCHAR(50) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    fee_usd DECIMAL(18,
    8),
    gas_fee DECIMAL(18,
    8),
    route_fee DECIMAL(18,
    8),
    route TEXT,
    platform_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '5 minutes')
);