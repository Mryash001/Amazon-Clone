import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart, ShippingAddress } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const { items, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: "", phone: "", addressLine1: "", addressLine2: "", city: "", state: "", pincode: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ShippingAddress, string>>>({});

  if (items.length === 0) {
    return (
      <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-8 text-center">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Link to="/"><Button className="bg-primary text-primary-foreground rounded-full">Continue Shopping</Button></Link>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!address.fullName.trim()) e.fullName = "Required";
    if (!address.phone.trim() || !/^\d{10}$/.test(address.phone.trim())) e.phone = "Enter valid 10-digit number";
    if (!address.addressLine1.trim()) e.addressLine1 = "Required";
    if (!address.city.trim()) e.city = "Required";
    if (!address.state.trim()) e.state = "Required";
    if (!address.pincode.trim() || !/^\d{6}$/.test(address.pincode.trim())) e.pincode = "Enter valid 6-digit pincode";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const orderId = placeOrder(address);
    navigate(`/order-confirmation/${orderId}`);
  };

  const handleChange = (field: keyof ShippingAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const total = getCartTotal();
  const delivery = total > 499 ? 0 : 40;

  return (
    <div className="max-w-[1500px] mx-auto px-2 sm:px-4 py-4">
      <h1 className="text-2xl font-bold text-foreground mb-4">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4">
          {/* Shipping form */}
          <div className="bg-card rounded-md shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold text-card-foreground mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={address.fullName} onChange={handleChange("fullName")} placeholder="John Doe" />
                {errors.fullName && <p className="text-deal text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={address.phone} onChange={handleChange("phone")} placeholder="9876543210" />
                {errors.phone && <p className="text-deal text-xs mt-1">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="addr1">Address Line 1</Label>
                <Input id="addr1" value={address.addressLine1} onChange={handleChange("addressLine1")} placeholder="House/Flat No., Street" />
                {errors.addressLine1 && <p className="text-deal text-xs mt-1">{errors.addressLine1}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="addr2">Address Line 2 (optional)</Label>
                <Input id="addr2" value={address.addressLine2} onChange={handleChange("addressLine2")} placeholder="Landmark, Area" />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={address.city} onChange={handleChange("city")} placeholder="Mumbai" />
                {errors.city && <p className="text-deal text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={address.state} onChange={handleChange("state")} placeholder="Maharashtra" />
                {errors.state && <p className="text-deal text-xs mt-1">{errors.state}</p>}
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" value={address.pincode} onChange={handleChange("pincode")} placeholder="400001" />
                {errors.pincode && <p className="text-deal text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-card rounded-md shadow-sm p-4 h-fit lg:sticky lg:top-28">
            <h2 className="text-lg font-bold text-card-foreground mb-3">Order Summary</h2>
            <div className="space-y-2 text-sm">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between text-card-foreground">
                  <span className="line-clamp-1 flex-1 mr-2">{product.title} × {quantity}</span>
                  <span className="flex-shrink-0">₹{(product.price * quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <hr className="border-border my-3" />
            <div className="flex justify-between text-sm text-card-foreground">
              <span>Items:</span><span>₹{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-card-foreground">
              <span>Delivery:</span><span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
            </div>
            <hr className="border-border my-3" />
            <div className="flex justify-between text-lg font-bold text-deal">
              <span>Order Total:</span><span>₹{(total + delivery).toLocaleString()}</span>
            </div>
            <Button type="submit" className="w-full mt-4 bg-primary hover:bg-accent text-primary-foreground rounded-full font-medium" size="lg">
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
