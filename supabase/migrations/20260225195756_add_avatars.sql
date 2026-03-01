alter table "public"."profiles" add column "avatar_path" text;

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', false)
on conflict (id) do nothing;


create policy "insert_own_avatar"
  on "storage"."objects"
  as permissive
  for insert
  to public
  with check (((bucket_id = 'avatars'::text) AND (auth.uid() = owner)));



create policy "select_own_avatar"
  on "storage"."objects"
  as permissive
  for select
  to public
  using (((bucket_id = 'avatars'::text) AND (auth.uid() = owner)));



