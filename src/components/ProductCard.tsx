import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-card rounded-md shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block p-4">
        <div className="aspect-square flex items-center justify-center mb-3 overflow-hidden rounded">
          <img
            src={product.images[0]}
            alt={product.title}
            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <h3 className="text-sm text-card-foreground line-clamp-2 leading-snug mb-1">{product.title}</h3>
        <div className="flex items-center gap-1 mb-1">
          <div className="flex items-center bg-success text-success-foreground text-xs px-1.5 py-0.5 rounded gap-0.5">
            {product.rating} <Star size={10} fill="currentColor" />
          </div>
          <span className="text-muted-foreground text-xs">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-lg font-bold text-card-foreground">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-xs text-deal font-semibold">{discount}% off</span>
            </>
          )}
        </div>
        {product.isPrime && (
          <span className="text-prime text-xs font-bold mt-1 inline-block">Prime</span>
        )}
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-accent text-primary-foreground text-sm font-medium rounded-full"
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
