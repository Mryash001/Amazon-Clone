import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/StarRating";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [currentImage, setCurrentImage] = useState(0);

  const product = products.find((p) => p.id === id);
  if (!product) return <div className="text-center py-20 text-muted-foreground">Product not found</div>;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  return (
    <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-4">
      <div className="bg-card rounded-md shadow-sm p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* Image section */}
          <div>
            <div className="relative aspect-square flex items-center justify-center bg-card rounded-md border border-border overflow-hidden mb-3">
              <img
                src={product.images[currentImage]}
                alt={product.title}
                className="max-h-full max-w-full object-contain p-4"
              />
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImage((p) => (p - 1 + product.images.length) % product.images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 rounded-full p-1 shadow hover:bg-card"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentImage((p) => (p + 1) % product.images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 rounded-full p-1 shadow hover:bg-card"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-16 h-16 rounded border-2 overflow-hidden ${i === currentImage ? "border-primary" : "border-border"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details section */}
          <div>
            <h1 className="text-lg sm:text-xl font-medium text-card-foreground mb-2">{product.title}</h1>

            <div className="flex items-center gap-2 mb-3">
              <StarRating rating={product.rating} />
              <span className="text-prime text-sm">{product.reviewCount.toLocaleString()} ratings</span>
            </div>

            <hr className="border-border mb-3" />

            {discount > 0 && (
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-deal text-sm font-semibold">-{discount}%</span>
                <span className="text-2xl sm:text-3xl font-bold text-card-foreground">₹{product.price.toLocaleString()}</span>
              </div>
            )}
            {!discount && <span className="text-2xl sm:text-3xl font-bold text-card-foreground mb-1 block">₹{product.price.toLocaleString()}</span>}
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground mb-1">
                M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span>
              </p>
            )}
            {product.isPrime && <span className="text-prime text-sm font-bold">Prime</span>}

            <p className={`text-sm mt-3 font-medium ${product.inStock ? "text-success" : "text-deal"}`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>

            <p className="text-sm text-card-foreground mt-3 leading-relaxed">{product.description}</p>

            {/* Specifications */}
            <div className="mt-4 border border-border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? "bg-muted/50" : ""}>
                      <td className="px-3 py-2 font-medium text-muted-foreground w-1/3">{key}</td>
                      <td className="px-3 py-2 text-card-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button
                onClick={() => addToCart(product)}
                className="flex-1 bg-primary hover:bg-accent text-primary-foreground rounded-full font-medium"
                size="lg"
                disabled={!product.inStock}
              >
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 bg-accent hover:bg-primary text-accent-foreground rounded-full font-medium"
                size="lg"
                disabled={!product.inStock}
              >
                <Zap size={18} className="mr-2" /> Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
