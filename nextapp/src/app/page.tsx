"use client";
import { useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client';
import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/home/Hero.jsx";
import ActiveCampaigns from "@/components/home/ActiveCampaigns";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_urls: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
}

function BlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (!error && data) setPosts(data);
      setLoading(false);
    }

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5D84C4]"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Últimas Publicaciones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.image_urls && post.image_urls[0] && (
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image_urls[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-sm text-[#5D84C4] font-medium mb-1">
                  {formatDate(post.published_at || post.created_at)}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {post.content.slice(0, 120)}...
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-[#5D84C4] font-medium hover:underline"
                >
                  Leer más →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Patronato de Ayuda Cumbres de Santa Fe, A.C."
        subtitle="Transformando vidas a través del apoyo comunitario"
        ctaButtons={[
          { text: "Quiero ayudar", href: "/como-aportar", primary: true },
          { text: "Solicitar apoyo", href: "/programas", primary: false },
          {
            text: "Conoce nuestras actividades",
            href: "/proyectos",
            primary: false,
          },
        ]}
      />

      {/* Featured Programs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestros Programas
          </h2>
          <ActiveCampaigns />
        </div>
      </section>

      {/* Últimas publicaciones del blog */}
      <BlogPreviewSection />
    </div>
  );
}
