-- Create contact_messages table for storing contact form submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  inquiry_type TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact messages
CREATE POLICY "Allow anyone to insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Create policy to allow only admins to read contact messages
CREATE POLICY "Allow admins to read contact messages" ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.clerk_user_id::text = auth.uid()::text
      AND user_profiles.role = 'admin'
    )
  );

-- Create policy to allow only admins to update contact messages
CREATE POLICY "Allow admins to update contact messages" ON contact_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.clerk_user_id::text = auth.uid()::text
      AND user_profiles.role = 'admin'
    )
  );

-- Create policy to allow only admins to delete contact messages
CREATE POLICY "Allow admins to delete contact messages" ON contact_messages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.clerk_user_id::text = auth.uid()::text
      AND user_profiles.role = 'admin'
    )
  );