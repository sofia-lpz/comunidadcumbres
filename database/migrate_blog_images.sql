-- Script para actualizar la tabla blog_posts para soportar múltiples imágenes
-- Ejecutar este script en Supabase SQL Editor

-- Primero, crear la nueva columna image_urls como array de texto
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS image_urls text[] DEFAULT '{}';

-- Migrar datos existentes de image_url a image_urls (si existe la columna image_url)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'blog_posts' AND column_name = 'image_url') THEN
        
        -- Migrar URLs existentes al nuevo formato array
        UPDATE blog_posts 
        SET image_urls = CASE 
            WHEN image_url IS NOT NULL AND image_url != '' 
            THEN ARRAY[image_url]
            ELSE '{}'::text[]
        END
        WHERE image_urls = '{}' OR image_urls IS NULL;
        
        -- Opcional: Eliminar la columna antigua después de verificar que la migración fue exitosa
        -- ALTER TABLE blog_posts DROP COLUMN IF EXISTS image_url;
        
    END IF;
END
$$;

-- Crear índice para mejorar consultas en image_urls
CREATE INDEX IF NOT EXISTS idx_blog_posts_image_urls ON blog_posts USING gin(image_urls);

-- Verificar la estructura actualizada
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'blog_posts' 
ORDER BY ordinal_position;
