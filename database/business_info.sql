-- Create business_info table for storing business contact information
CREATE TABLE IF NOT EXISTS business_info (
  id TEXT PRIMARY KEY DEFAULT 'default',
  business_name TEXT NOT NULL DEFAULT 'Bark & Brew',
  phone TEXT NOT NULL DEFAULT '+91 79 1234 5678',
  email TEXT NOT NULL DEFAULT 'hello@barkandbrew.com',
  address TEXT NOT NULL DEFAULT 'Sector 17, Gandhinagar',
  city TEXT NOT NULL DEFAULT 'Gandhinagar',
  state TEXT NOT NULL DEFAULT 'Gujarat',
  postal_code TEXT NOT NULL DEFAULT '382017',
  country TEXT NOT NULL DEFAULT 'India',
  business_hours TEXT NOT NULL DEFAULT 'Mon-Sun: 7AM - 8PM',
  description TEXT NOT NULL DEFAULT 'Where pets meet perfect coffee. Experience the best pet café and professional care services in the heart of Gandhinagar.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default business information
INSERT INTO business_info (
  id,
  business_name,
  phone,
  email,
  address,
  city,
  state,
  postal_code,
  country,
  business_hours,
  description
) VALUES (
  'default',
  'Bark & Brew',
  '+91 79 1234 5678',
  'hello@barkandbrew.com',
  'Sector 17, Gandhinagar',
  'Gandhinagar',
  'Gujarat',
  '382017',
  'India',
  'Mon-Sun: 7AM - 8PM',
  'Where pets meet perfect coffee. Experience the best pet café and professional care services in the heart of Gandhinagar.'
) ON CONFLICT (id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  phone = EXCLUDED.phone,
  email = EXCLUDED.email,
  address = EXCLUDED.address,
  city = EXCLUDED.city,
  state = EXCLUDED.state,
  postal_code = EXCLUDED.postal_code,
  country = EXCLUDED.country,
  business_hours = EXCLUDED.business_hours,
  description = EXCLUDED.description,
  updated_at = NOW();

-- Enable Row Level Security
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read business info
CREATE POLICY "Allow all users to read business info" ON business_info
  FOR SELECT USING (true);

-- Create policy to allow only admins to update business info
-- Note: This policy allows any authenticated user to update for now
-- You can refine this later based on your specific admin requirements
CREATE POLICY "Allow authenticated users to update business info" ON business_info
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow only admins to insert business info
CREATE POLICY "Allow authenticated users to insert business info" ON business_info
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
