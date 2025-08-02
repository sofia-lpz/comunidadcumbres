-- Script para configurar la base de datos de Comunidad Cumbres
-- Ejecutar en el SQL Editor de Supabase

-- Tabla de usuarios admin 
CREATE TABLE IF NOT EXISTS admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de categorías 
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#5D84C4',
  icon VARCHAR(50), -- Para iconos de Lucide React
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla principal de programas (SIMPLIFICADA)
CREATE TABLE IF NOT EXISTS programs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  short_description VARCHAR(500) NOT NULL, -- Para las cards
  full_description TEXT, -- Para la página completa (opcional)
  image_url VARCHAR(500), -- Solo una imagen principal
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'upcoming', 'completed')),
  category_id UUID REFERENCES categories(id),
  target_audience VARCHAR(255), -- "Empleados", "Personal doméstico", "San Mateo"
  external_form_url VARCHAR(500), -- Link al formulario de Google
  requirements TEXT, -- Requisitos (opcional)
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabla de posts del blog (sin cambios)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Datos iniciales para categorías
INSERT INTO categories (name, slug, color, icon) VALUES
('Educación', 'educacion', '#3B82F6', 'GraduationCap'),
('Salud', 'salud', '#10B981', 'Heart'),
('Comunitario', 'comunitario', '#F59E0B', 'Users'),
('Voluntariado', 'voluntariado', '#8B5CF6', 'HandHeart')
ON CONFLICT (slug) DO NOTHING;

-- Datos de ejemplo más simples
INSERT INTO programs (
  title, 
  short_description, 
  full_description,
  category_id,
  target_audience,
  external_form_url,
  requirements,
  featured,
  status
) VALUES 
(
  'Clases de Inglés',
  'Clases gratuitas de inglés básico e intermedio.',
  'Programa educativo que ofrece clases de inglés en diferentes niveles para empleados y sus familias. Las clases son impartidas por voluntarios del condominio.',
  (SELECT id FROM categories WHERE slug = 'educacion'),
  'Empleados y residentes de San Mateo',
  'https://forms.google.com/clases-ingles',
  NULL,
  false,
  'active'
) ON CONFLICT DO NOTHING;

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_programs_category ON programs(category_id);
CREATE INDEX IF NOT EXISTS idx_programs_status ON programs(status);
CREATE INDEX IF NOT EXISTS idx_programs_featured ON programs(featured);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
CREATE TRIGGER update_programs_updated_at 
BEFORE UPDATE ON programs 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Insertar datos de ejemplo para el blog
INSERT INTO blog_posts (title, content, published) VALUES
('Bienvenidos al Portal', 'Este es el nuevo portal de la Comunidad Cumbres donde podrás encontrar todos nuestros programas y actividades.', true),
('Programa de Educación', 'Conoce más sobre nuestros programas educativos disponibles para la comunidad.', false)
ON CONFLICT DO NOTHING;
