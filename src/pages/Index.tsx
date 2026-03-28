import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const Index = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const categoryFilter = searchParams.get("category") || "";

  const filtered = products.filter((p) => {
    const matchesQuery = !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesQuery && matchesCategory;
  });

  const activeCategory = categories.find((c) => c.id === categoryFilter);

  return (
    <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-4">
      {/* Hero banner */}
      {!query && !categoryFilter && (
        <div className="relative rounded-md overflow-hidden mb-4 bg-gradient-to-r from-secondary to-navbar h-32 sm:h-48 flex items-center px-6 sm:px-12">
          <div className="text-secondary-foreground">
            <h1 className="text-xl sm:text-3xl font-bold mb-1">Great Deals on Top Products</h1>
            <p className="text-sm sm:text-base opacity-80">Shop the best deals across electronics, clothing, books & more</p>
          </div>
        </div>
      )}

      {/* Category chips */}
      {!query && !categoryFilter && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {categories.map((c) => (
            <a
              key={c.id}
              href={`/?category=${c.id}`}
              className="bg-card rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="font-bold text-card-foreground text-sm mb-2">{c.name}</h3>
              <img src={c.image} alt={c.name} className="w-full h-32 object-cover rounded" loading="lazy" />
              <span className="text-prime text-xs mt-2 inline-block">See more</span>
            </a>
          ))}
        </div>
      )}

      {/* Results header */}
      {(query || categoryFilter) && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-foreground">
            {query ? `Results for "${query}"` : `${activeCategory?.name || "Products"}`}
          </h2>
          <p className="text-sm text-muted-foreground">{filtered.length} results</p>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No products found</p>
          <a href="/" className="text-prime text-sm mt-2 inline-block hover:underline">Browse all products</a>
        </div>
      )}
    </div>
  );
};

export default Index;
