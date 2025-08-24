"use client";
import { useState } from "react";
import type { Product } from "@/lib/products";

type Variant = { headline: string; body: string };

export default function ProductCard({
  product,
  defaultStyle = "Direct Response",
}: {
  product: Product;
  defaultStyle?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [style, setStyle] = useState(defaultStyle);
  const [variants, setVariants] = useState<Variant[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function makeAds() {
    setIsLoading(true);
    setError(null);
    setVariants(null);
    try {
      const res = await fetch("/api/generate-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, style }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to generate ads");
      setVariants(data.variants);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-tight">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
          <div className="text-xs text-gray-500">{product.category}</div>
        </div>
        <div className="text-right text-sm">
          <div className="font-medium">Margin {product.marginPct}%</div>
          <div className="text-gray-600">Heat {product.heatScore}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
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
        <button
          onClick={makeAds}
          disabled={isLoading}
          className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Generating..." : "Make Ads"}
        </button>
      </div>

      {error && (
        <div className="mt-3 rounded border border-red-200 bg-red-50 p-3 text-xs text-red-700">
          {error}
        </div>
      )}

      {variants && (
        <div className="mt-4 space-y-3">
          {variants.map((v, i) => (
            <div key={i} className="rounded border bg-gray-50 p-3">
              <div className="font-medium">{v.headline}</div>
              <div className="text-sm text-gray-700 whitespace-pre-line">{v.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

