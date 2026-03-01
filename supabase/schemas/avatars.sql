-- create a new bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', false);


CREATE POLICY insert_own_avatar
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'avatars'
  AND auth.uid() = owner
);

CREATE POLICY select_own_avatar
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'avatars'
  AND auth.uid() = owner
);

