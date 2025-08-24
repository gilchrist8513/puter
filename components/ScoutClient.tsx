"use client";
import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ScoutClient({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState("Direct Response");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.category, p.description].some((f) => f.toLowerCase().includes(q))
    );
  }, [products, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded border bg-white px-3 py-2 text-sm sm:max-w-sm"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Ad style</span>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="rounded border bg-white px-3 py-2 text-sm"
          >
            <option>Direct Response</option>
            <option>Conversational</option>
            <option>Storytelling</option>
            <option>UGC/TikTok</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} defaultStyle={style} />
        ))}
      </div>
    </div>
  );
}

