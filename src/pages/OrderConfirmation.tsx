import { useParams, Link } from "react-router-dom";
import { CheckCircle, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { orders } = useCart();
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground mb-4">Order not found</p>
        <Link to="/"><Button className="bg-primary text-primary-foreground rounded-full">Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4 py-8">
      <div className="bg-card rounded-md shadow-sm p-6 sm:p-8 text-center">
        <CheckCircle size={64} className="text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-card-foreground mb-2">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-1">Thank you for your purchase</p>
        <p className="text-sm text-card-foreground mb-6">
          Order ID: <span className="font-bold text-prime">{order.id}</span>
        </p>

        <div className="bg-muted/50 rounded-md p-4 text-left mb-6">
          <h3 className="font-bold text-card-foreground text-sm mb-2 flex items-center gap-2">
            <Package size={16} /> Delivery Address
          </h3>
          <p className="text-sm text-card-foreground">
            {order.address.fullName}<br />
            {order.address.addressLine1}<br />
            {order.address.addressLine2 && <>{order.address.addressLine2}<br /></>}
            {order.address.city}, {order.address.state} - {order.address.pincode}<br />
            Phone: {order.address.phone}
          </p>
        </div>

        <div className="text-left mb-6">
          <h3 className="font-bold text-card-foreground text-sm mb-3">Order Items</h3>
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
              <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-contain rounded" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground line-clamp-1">{product.title}</p>
                <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
              </div>
              <span className="text-sm font-bold text-card-foreground">₹{(product.price * quantity).toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between mt-3 pt-3 border-t border-border font-bold text-card-foreground">
            <span>Total</span>
            <span>₹{order.total.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Link to="/orders"><Button variant="outline" className="rounded-full">View Orders</Button></Link>
          <Link to="/"><Button className="bg-primary text-primary-foreground rounded-full">Continue Shopping</Button></Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
