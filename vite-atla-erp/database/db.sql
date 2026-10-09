-- Creación de la tabla de proveedores
create table proveedores (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null,
  categoria text,
  ciudad text,
  tipo_facturacion text check (tipo_facturacion in ('Electrónica', 'Rut')),
  tiene_credito boolean default false,
  imagen_url text,
  documento_rut_url text
);

-- Configurar políticas de seguridad temporales para poder leer e insertar desde el frontend
alter table proveedores enable row level security;
create policy "Permitir lectura a todos" on proveedores for select using (true);
create policy "Permitir insertar a todos" on proveedores for insert with check (true);