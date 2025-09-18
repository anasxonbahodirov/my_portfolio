-- Create reactions table for storing user reactions to posts and projects
CREATE TABLE IF NOT EXISTS reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('post', 'project')),
  target_id TEXT NOT NULL,
  emoji TEXT NOT NULL CHECK (emoji IN ('👍', '🔥', '💡', '😂', '❤️')),
  count INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure unique combination of target and emoji
  UNIQUE(target_type, target_id, emoji)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reactions_target ON reactions(target_type, target_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_reactions_updated_at 
  BEFORE UPDATE ON reactions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO reactions (target_type, target_id, emoji, count) VALUES
  ('post', 't1', '👍', 5),
  ('post', 't1', '🔥', 3),
  ('post', 't2', '💡', 7),
  ('project', 'p1', '❤️', 12),
  ('project', 'p1', '👍', 8),
  ('project', 'p2', '🔥', 6)
ON CONFLICT (target_type, target_id, emoji) DO NOTHING;
