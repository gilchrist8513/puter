import { getAllProducts } from "@/lib/products";
import ScoutClient from "@/components/ScoutClient";

export default async function ScoutPage() {
  const products = getAllProducts();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Scout Products</h1>
        <p className="text-sm text-gray-600">Research, compare, and generate ad copy.</p>
      </div>
      <ScoutClient products={products} />
    </div>
  );
}

