import { useState } from "react";
import { Search, User, ShoppingBag, X, Menu as MenuIcon, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";

const Header = () => {
  const { menus, appearance, currentUser, cart, products } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const searchResults = searchTerm.length >= 2
    ? products.filter(p => p.active && (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
      )).slice(0, 5)
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) setShowResults(false);
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50 shadow-sm" style={{ backgroundColor: appearance.headerBgColor }}>
      <div className="container flex items-center justify-between py-4">
        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
          <MenuIcon className="w-6 h-6" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          {appearance.logo ? (
            <img src={appearance.logo} alt={appearance.storeName} className="h-10 object-contain" />
          ) : (
            <>
              <span className="text-2xl md:text-3xl font-extrabold tracking-wider" style={{ color: appearance.textColor }}>
                {appearance.storeName.split(" ")[0] || "FLEX"}
              </span>
              <span className="text-primary text-sm md:text-lg font-medium tracking-[0.3em]" style={{ color: appearance.primaryColor }}>
                {appearance.storeName.split(" ").slice(1).join(" ") || "MODA"}
              </span>
            </>
          )}
        </Link>

        <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                className="w-full border border-border rounded-full py-2.5 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {searchTerm ? (
                <button type="button" onClick={() => { setSearchTerm(""); setShowResults(false); }} className="absolute right-10 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              ) : null}
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full" style={{ backgroundColor: appearance.primaryColor }}>
                <Search className="w-4 h-4 text-white" />
              </button>
            </div>
          </form>
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-xl z-50 mt-1 max-h-80 overflow-y-auto">
              {searchResults.map(p => (
                <Link key={p.id} to={`/produto/${p.id}`} onClick={() => { setShowResults(false); setSearchTerm(""); }} className="flex items-center gap-3 p-3 hover:bg-muted transition-colors">
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">{p.price}</span>
                    <p className="text-xs font-medium" style={{ color: appearance.primaryColor }}>{p.pixPrice} PIX</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          {showResults && searchTerm.length >= 2 && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg shadow-xl z-50 mt-1 p-4 text-center text-sm text-muted-foreground">
              Nenhum produto encontrado para "{searchTerm}"
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link to={currentUser ? (currentUser.role === "admin" ? "/admin" : "/minha-conta") : "/login"} className="hidden md:flex items-center gap-2 text-sm">
            <User className="w-5 h-5" />
            <div className="text-left">
              <div className="font-semibold leading-tight">{currentUser ? currentUser.name.split(" ")[0] : "Minha Conta"}</div>
              <div className="text-xs text-muted-foreground">{currentUser ? (currentUser.role === "admin" ? "Admin" : "Minha Conta") : "Entrar | Cadastrar"}</div>
            </div>
          </Link>
          <Link to={currentUser ? (currentUser.role === "admin" ? "/admin" : "/minha-conta") : "/login"} className="md:hidden">
            <User className="w-5 h-5" />
          </Link>
          <Link to="/carrinho" className="relative">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-in zoom-in-50" style={{ backgroundColor: appearance.primaryColor, color: appearance.buttonTextColor }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block border-t border-border">
        <div className="container flex items-center justify-center gap-8 py-3">
          {menus.map((item) => (
            <Link key={item.id} to={item.link} className="text-sm font-semibold tracking-wide hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center">
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileMenu && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileMenu(false)}>
          <div className="bg-background w-72 h-full shadow-xl p-6 space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">{appearance.storeName}</span>
              <button onClick={() => setMobileMenu(false)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={e => { e.preventDefault(); setMobileMenu(false); }} className="relative mb-4">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full border border-border rounded-full py-2 px-4 text-sm"
              />
            </form>
            {menus.map(item => (
              <Link key={item.id} to={item.link} onClick={() => setMobileMenu(false)} className="block py-2 font-semibold text-sm hover:text-primary">
                {item.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4 mt-4 space-y-2">
              <Link to="/login" onClick={() => setMobileMenu(false)} className="block py-2 text-sm hover:text-primary">Minha Conta</Link>
              <Link to="/carrinho" onClick={() => setMobileMenu(false)} className="block py-2 text-sm hover:text-primary">Carrinho ({cartCount})</Link>
              <Link to="/ajuda" onClick={() => setMobileMenu(false)} className="block py-2 text-sm hover:text-primary">Ajuda</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
