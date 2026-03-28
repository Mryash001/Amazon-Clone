import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-8">
      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-navbar-secondary hover:bg-navbar-secondary/80 text-navbar-foreground text-sm py-3 transition-colors"
      >
        Back to top
      </button>

      {/* Main footer links */}
      <div className="navbar-gradient px-4 py-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-navbar-foreground font-bold text-base mb-3">Get to Know Us</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Press Releases", "Amazon Science"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-navbar-foreground/70 text-sm hover:text-navbar-foreground hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-navbar-foreground font-bold text-base mb-3">Connect with Us</h3>
            <ul className="space-y-2">
              {["Facebook", "Twitter", "Instagram"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-navbar-foreground/70 text-sm hover:text-navbar-foreground hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-navbar-foreground font-bold text-base mb-3">Make Money with Us</h3>
            <ul className="space-y-2">
              {["Sell on Amazon", "Sell under Amazon Accelerator", "Protect and Build Your Brand", "Amazon Global Selling", "Supply to Amazon"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-navbar-foreground/70 text-sm hover:text-navbar-foreground hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-navbar-foreground font-bold text-base mb-3">Let Us Help You</h3>
            <ul className="space-y-2">
              {["Your Account", "Returns Centre", "Recalls and Product Safety Alerts", "100% Purchase Protection", "Amazon App Download", "Help"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-navbar-foreground/70 text-sm hover:text-navbar-foreground hover:underline">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-navbar-foreground/20 navbar-gradient">
        <div className="max-w-[1500px] mx-auto flex flex-col items-center py-6 gap-3">
          <Link to="/" className="text-navbar-foreground text-xl font-bold tracking-tight">
            amazon
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-navbar px-4 py-4">
        <div className="max-w-[1500px] mx-auto flex flex-wrap justify-center gap-4 text-navbar-foreground/60 text-xs">
          <Link to="/" className="hover:text-navbar-foreground hover:underline">Conditions of Use & Sale</Link>
          <Link to="/" className="hover:text-navbar-foreground hover:underline">Privacy Notice</Link>
          <Link to="/" className="hover:text-navbar-foreground hover:underline">Interest-Based Ads</Link>
          <span>© 1996-2025, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
