export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string;
}

export interface Program {
  id: string;
  title: string;
  short_description: string;
  full_description?: string;
  image_url?: string;
  status: 'active' | 'upcoming' | 'completed';
  category_id: string;
  target_audience?: string;
  external_form_url?: string;
  requirements?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

// Tipo más flexible para componentes que no necesitan todos los campos
export interface ProgramBase {
  id: string;
  title: string;
  short_description: string;
  status: 'active' | 'upcoming' | 'completed';
  target_audience?: string;
  external_form_url?: string;
  featured: boolean;
  created_at: string;
  categories?: {
    name: string;
    color: string;
  };
}

export interface ProgramFormData {
  title: string;
  short_description: string;
  full_description?: string;
  image_url?: string;
  status: 'active' | 'upcoming' | 'completed';
  category_id: string;
  target_audience?: string;
  external_form_url?: string;
  requirements?: string;
  featured: boolean;
}
