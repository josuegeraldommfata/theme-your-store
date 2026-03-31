import { Search, User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";

const Header = () => {
  const { menus, appearance, currentUser, cart } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50" style={{ backgroundColor: appearance.headerBgColor }}>
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-3xl font-extrabold tracking-wider">
          <span style={{ color: appearance.textColor }}>{appearance.storeName.split(" ")[0] || "FLEX"}</span>
          <span className="text-primary text-lg font-medium tracking-[0.3em] ml-1" style={{ color: appearance.primaryColor }}>
            {appearance.storeName.split(" ").slice(1).join(" ") || "MODA"}
          </span>
        </Link>

        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              className="w-full border border-border rounded-sm py-2.5 px-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link to={currentUser ? (currentUser.role === "admin" ? "/admin" : "/minha-conta") : "/login"} className="flex items-center gap-2 text-sm">
            <User className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold leading-tight">{currentUser ? currentUser.name.split(" ")[0] : "Minha Conta"}</div>
              <div className="text-xs text-muted-foreground">{currentUser ? (currentUser.role === "admin" ? "Admin" : "Minha Conta") : "Entrar | Cadastrar"}</div>
            </div>
          </Link>
          <Link to="/carrinho" className="relative">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: appearance.primaryColor, color: appearance.buttonTextColor }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="border-t border-border">
        <div className="container flex items-center justify-center gap-8 py-3">
          {menus.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="text-sm font-semibold tracking-wide hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
