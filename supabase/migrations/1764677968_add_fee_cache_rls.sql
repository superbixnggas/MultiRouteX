-- Migration: add_fee_cache_rls
-- Created at: 1764677968

-- Enable RLS
ALTER TABLE fee_cache ENABLE ROW LEVEL SECURITY;

-- Allow both anon and service_role to read
CREATE POLICY "Allow read for all" ON fee_cache
  FOR SELECT USING (true);

-- Allow both anon and service_role to insert
CREATE POLICY "Allow insert for edge function" ON fee_cache
  FOR INSERT WITH CHECK (auth.role() IN ('anon', 'service_role'));

-- Allow delete for cache cleanup
CREATE POLICY "Allow delete for cleanup" ON fee_cache
  FOR DELETE USING (auth.role() IN ('anon', 'service_role'));

-- Create index for faster lookups
CREATE INDEX idx_fee_cache_lookup ON fee_cache(chain, from_token, to_token, expires_at);;