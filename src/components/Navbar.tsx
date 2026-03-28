import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MapPin, Menu } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    navigate(`/?${params.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main navbar */}
      <div className="navbar-gradient px-2 sm:px-4 py-2">
        <div className="max-w-[1500px] mx-auto flex items-center gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 px-2 py-1 border border-transparent hover:border-navbar-foreground rounded">
            <span className="text-navbar-foreground text-xl sm:text-2xl font-bold tracking-tight">
              amazon
            </span>
          </Link>

          {/* Deliver to */}
          <div className="hidden md:flex items-center gap-1 text-navbar-foreground px-2 py-1 border border-transparent hover:border-navbar-foreground rounded cursor-pointer">
            <MapPin size={18} />
            <div className="text-xs leading-tight">
              <span className="text-navbar-foreground/70">Deliver to</span>
              <br />
              <span className="font-bold text-sm">India</span>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="hidden sm:block bg-muted text-foreground text-xs px-2 rounded-l-md border-r border-border focus:outline-none"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 px-3 py-2 text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary sm:rounded-none rounded-l-md min-w-0"
            />
            <button type="submit" className="bg-primary hover:bg-accent px-3 sm:px-4 rounded-r-md transition-colors">
              <Search size={20} className="text-primary-foreground" />
            </button>
          </form>

          {/* Orders */}
          <Link to="/orders" className="hidden sm:flex flex-col text-navbar-foreground px-2 py-1 border border-transparent hover:border-navbar-foreground rounded text-xs">
            <span className="text-navbar-foreground/70">Returns</span>
            <span className="font-bold text-sm">& Orders</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="flex items-center text-navbar-foreground px-2 py-1 border border-transparent hover:border-navbar-foreground rounded relative">
            <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            </div>
            <span className="hidden sm:inline font-bold text-sm ml-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-navbar-secondary px-2 sm:px-4 py-1.5 overflow-x-auto">
        <div className="max-w-[1500px] mx-auto flex items-center gap-1 text-navbar-foreground text-sm whitespace-nowrap">
          <button className="flex items-center gap-1 px-2 py-1 hover:border hover:border-navbar-foreground rounded font-bold">
            <Menu size={18} /> All
          </button>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/?category=${c.id}`}
              className="px-2 py-1 hover:border hover:border-navbar-foreground rounded transition-colors"
            >
              {c.name}
            </Link>
          ))}
          <Link to="/orders" className="px-2 py-1 hover:border hover:border-navbar-foreground rounded sm:hidden">
            Orders
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
