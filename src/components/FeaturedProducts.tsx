"use client";

import { motion } from "framer-motion";

const PRODUCTS = [
  {
    id: 1,
    title: "Horizon AI SaaS Boilerplate",
    price: 79,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP92Qw4RDwmhRP0GKVZyDFIf1KicpwECV8URf12FWqze4eyOBDi11ZshC67Umjn1OgRuZFRtn42QiG13zquSvqiTLRzYLbskPLWVIXKLf-LrOGJBiu7OpwLUEviKD0chhCmbs5EVrsWXA2ahkHtvR42SShin-FHpeLYU7UpGgcFYX0WT3kIGpdtXVT-neTXQOXUkYaYhnaOQVToOXcMhjJVBPEqobzFSmZfWgAQkh7Fm43tu7wfaScQ1N3NiJ-WrhmzQy95sFSb5XF",
    tags: ["Next.js", "OpenAI", "Stripe"],
    isNew: true,
  },
  {
    id: 2,
    title: "Nexus Admin Dashboard",
    price: 49,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKeG_Tq6ChLi8_5fEgm-w4DZJdvRT-YohV8UgvOpS4pRhfheDOv7vXAqOGHrODDZGY8fxcy8RLh6Rx9g6-hT9qmkYlomEaTr5ub4N5cekib5sXpXa8jeTajGcMY7pytI5UuxrTP4NeV1i-USt52_mrZOtnegxKRi0Zk45x9LaGcVuI3wyZkvKTrKZ1dzhQ0Pa4RlQkpnfK4FrwgednDasXDaVWTqoBUKLXiYiF43Kss7_yS0CikOYbTmCPZGAuMb-HelMjpeBh36Ym",
    tags: ["React", "Tailwind", "Chart.js"],
    isNew: false,
  },
  {
    id: 3,
    title: "Quantum PHP API Engine",
    price: 39,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPqKhLs7t6D0yLmXLC5Q9oBbMCRVcN4dOQVz6JLKCDidJLxqlH1ojzNCkf7FylgX8lCFPU5GgZdmw4VbVJnfbYQjXk5GH3JuV0LMZApLFAYNC4a0CFrYELb9oXVCjaD1sE9AeBxgGwl9lPwnvgNHVq36tW_suUugEOqUolreFRYaGo328npizgkhJYkCieCfZEjmefwEo50SvUnZIE5KAcK9dwBbL298Ymbt5hmkzCD62bwPvUhi07Pm9UceP6nh1Z8xYv1w8ZoLOd",
    tags: ["Laravel", "Redis", "PHP 8.2"],
    isNew: false,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Featured Products</h2>
          <p className="text-on-surface-variant mt-2 max-w-xl">
            Curated top-tier assets for high-performance projects, reviewed by our elite developer team.
          </p>
        </div>
        <a href="#" className="text-primary font-semibold flex items-center gap-2 group hover:underline text-sm">
          View All Marketplace
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-sm">arrow_forward</span>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRODUCTS.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass-card rounded-3xl overflow-hidden group flex flex-col h-full cursor-pointer"
          >
            <div className="h-48 overflow-hidden relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={product.image}
                alt={product.title}
              />
              {product.isNew && (
                <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">
                  NEW
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-lg font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <span className="text-primary font-bold text-lg">${product.price}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-surface-container-high rounded text-[11px] text-on-surface-variant border border-outline-variant font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 bg-surface-bright text-on-surface rounded-xl text-sm font-semibold hover:bg-primary hover:text-on-primary group-hover:border-primary transition-all duration-200">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
