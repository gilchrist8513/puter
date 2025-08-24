import { getTopTrendingProducts } from "@/lib/products";
import DashboardClient from "@/components/DashboardClient";

export default async function Page() {
  const products = getTopTrendingProducts(6);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trending Products</h1>
        <p className="text-sm text-gray-600">High heat score and healthy margins.</p>
      </div>
      <DashboardClient products={products} />
    </div>
  );
}

