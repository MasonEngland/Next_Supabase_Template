create sequence "public"."profiles_id_seq";


  create table "public"."profiles" (
    "id" integer not null default nextval('public.profiles_id_seq'::regclass),
    "user_id" uuid not null,
    "email" character varying(255) not null,
    "first_name" character varying(255) not null,
    "last_name" character varying(255) not null,
    "updated_at" timestamp without time zone not null default CURRENT_TIMESTAMP
      );


alter table "public"."profiles" enable row level security;

alter sequence "public"."profiles_id_seq" owned by "public"."profiles"."id";

CREATE UNIQUE INDEX profiles_email_key ON public.profiles USING btree (email);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_email_key" UNIQUE using index "profiles_email_key";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_key" UNIQUE using index "profiles_user_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
    INSERT INTO public.profiles (user_id, email, first_name, last_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name');
    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";


  create policy "allow_users_to_select_own_profiles"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "allow_users_to_update_own_profiles"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "insert_profile"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));


CREATE TRIGGER on_profile_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER on_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_profile();


