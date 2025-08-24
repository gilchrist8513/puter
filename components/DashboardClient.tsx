"use client";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function DashboardClient({ products }: { products: Product[] }) {
  const [style, setStyle] = useState("Direct Response");
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Ad style</div>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} defaultStyle={style} />
        ))}
      </div>
    </div>
  );
}

