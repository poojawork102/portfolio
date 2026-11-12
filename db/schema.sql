-- Run this once in the Neon SQL editor to create the table the contact form writes to.
create table if not exists contact_messages (
  id          bigserial primary key,
  name        text        not null,
  email       text        not null,
  message     text        not null,
  ip_hash     text        not null,       -- hashed, never the raw IP
  created_at  timestamptz not null default now()
);

create index if not exists contact_messages_ip_time on contact_messages (ip_hash, created_at desc);
