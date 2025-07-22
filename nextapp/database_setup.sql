-- Script para crear las tablas del Patronato Cumbres
-- Ejecutar en Supabase SQL Editor

-- Tabla de categorías
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#5D84C4',
  icon VARCHAR(50), -- Para iconos de Lucide React
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla principal de programas
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

-- Tabla de posts del blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Datos iniciales de categorías
INSERT INTO categories (name, slug, color, icon) VALUES
('Educación', 'educacion', '#3B82F6', 'GraduationCap'),
('Salud', 'salud', '#10B981', 'Heart'),
('Comunitario', 'comunitario', '#F59E0B', 'Users'),
('Voluntariado', 'voluntariado', '#8B5CF6', 'HandHeart')
ON CONFLICT (slug) DO NOTHING;

-- Programa de ejemplo
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
  'Clases gratuitas de inglés básico e intermedio para empleados y sus familias.',
  'Programa educativo que ofrece clases de inglés en diferentes niveles para empleados y sus familias. Las clases son impartidas por voluntarios del condominio y se realizan los martes y jueves de 6:00 PM a 7:30 PM.',
  (SELECT id FROM categories WHERE slug = 'educacion'),
  'Empleados y residentes de San Mateo',
  'https://forms.google.com/clases-ingles',
  'Identificación oficial, comprobante de trabajo en el condominio o residencia en San Mateo',
  true,
  'active'
)
ON CONFLICT DO NOTHING;

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

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
CREATE TRIGGER update_programs_updated_at 
BEFORE UPDATE ON programs 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
