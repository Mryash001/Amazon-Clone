import { Link } from "react-router-dom";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-8">
        <div className="bg-card rounded-md shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-card-foreground mb-2">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-4">Add items to get started</p>
          <Link to="/">
            <Button className="bg-primary hover:bg-accent text-primary-foreground rounded-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
        {/* Cart items */}
        <div className="bg-card rounded-md shadow-sm p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-card-foreground mb-1">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground mb-4">{items.length} item(s)</p>
          <hr className="border-border mb-4" />
          
          <div className="space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <img src={product.images[0]} alt={product.title} className="w-24 h-24 sm:w-32 sm:h-32 object-contain rounded" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-sm sm:text-base text-card-foreground line-clamp-2 hover:text-prime">{product.title}</h3>
                  </Link>
                  {product.inStock && <p className="text-xs text-success mt-1">In Stock</p>}
                  {product.isPrime && <span className="text-prime text-xs font-bold">Prime</span>}
                  
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded-md">
                      <button onClick={() => { updateQuantity(product.id, quantity - 1); toast.info("Quantity updated"); }} className="px-2 py-1 hover:bg-muted rounded-l-md">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 py-1 text-sm font-medium border-x border-border bg-muted/50">{quantity}</span>
                      <button onClick={() => { updateQuantity(product.id, quantity + 1); toast.info("Quantity updated"); }} className="px-2 py-1 hover:bg-muted rounded-r-md">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => { removeFromCart(product.id); toast.error("Item removed from cart"); }} className="text-deal text-sm flex items-center gap-1 hover:underline">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-bold text-card-foreground">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subtotal */}
        <div className="bg-card rounded-md shadow-sm p-4 h-fit lg:sticky lg:top-28">
          <p className="text-lg text-card-foreground">
            Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items):{" "}
            <span className="font-bold">₹{getCartTotal().toLocaleString()}</span>
          </p>
          <Link to="/checkout">
            <Button className="w-full mt-4 bg-primary hover:bg-accent text-primary-foreground rounded-full font-medium">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
