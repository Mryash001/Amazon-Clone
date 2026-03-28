import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Orders = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-8">
        <div className="bg-card rounded-md shadow-sm p-8 text-center">
          <Package size={48} className="text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-card-foreground mb-2">No Orders Yet</h2>
          <p className="text-muted-foreground mb-4">Start shopping to see your orders here</p>
          <Link to="/"><Button className="bg-primary text-primary-foreground rounded-full">Start Shopping</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-card rounded-md shadow-sm overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
              <div className="flex gap-6">
                <div>
                  <span className="text-muted-foreground">ORDER PLACED</span>
                  <p className="text-card-foreground font-medium">{new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">TOTAL</span>
                  <p className="text-card-foreground font-medium">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">ORDER #</span>
                <p className="text-prime font-medium">{order.id}</p>
              </div>
            </div>
            <div className="p-4">
              {order.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                  <Link to={`/product/${product.id}`}>
                    <img src={product.images[0]} alt={product.title} className="w-16 h-16 object-contain rounded" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${product.id}`} className="text-sm text-card-foreground hover:text-prime line-clamp-1">{product.title}</Link>
                    <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <span className="text-sm font-bold text-card-foreground">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
