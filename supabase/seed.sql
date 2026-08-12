-- see "config.toml": `[db.seed]`

-- https://supabase.com/docs/guides/local-development/cli-workflows?queryGroups=schema-approach&schema-approach=declarative#step-4-add-seed-data
-- Create a test user (Supabase Auth)
-- Note: this is a placeholder row so seeded data has a user_id to reference.
-- It has no password, so it can't be used to sign in. To create a
-- login-capable user, use the Auth admin API or the local Studio.
insert into auth.users (id, email, raw_user_meta_data)
values ('d0e3c8f0-1234-5678-9abc-def012345678', 'test@example.com', '{}');

-- Seed application data
insert into public.todos (title, user_id, is_public)
values
    ('Buy groceries', 'd0e3c8f0-1234-5678-9abc-def012345678', false),
    ('Write documentation', 'd0e3c8f0-1234-5678-9abc-def012345678', true);