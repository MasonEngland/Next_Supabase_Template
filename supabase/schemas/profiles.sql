CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    avatar_path TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE (email),
    UNIQUE (user_id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY allow_users_to_select_own_profiles ON public.profiles
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY allow_users_to_update_own_profiles ON public.profiles
    FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);


CREATE POLICY insert_profile
    ON public.profiles
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);



CREATE OR REPLACE FUNCTION create_profile()
RETURNS TRIGGER 
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, first_name, last_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile();



CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();




