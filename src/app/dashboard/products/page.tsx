import { products } from "@/products/data/products";
import { ProductCard } from "@/products/components";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {/* Product Card */}
      {products.map((product) => (
        <ProductCard key={product.id} {...product}></ProductCard>
      ))}
    </div>
  );
}
