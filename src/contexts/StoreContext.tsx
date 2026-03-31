import { createContext, useContext, useState, ReactNode } from "react";

export interface StoreProduct {
  id: number;
  name: string;
  image: string;
  oldPrice: string;
  price: string;
  pixPrice: string;
  installment: string;
  description: string;
  category: string;
  subcategory: string;
  stock: number;
  active: boolean;
  colors: { name: string; hex: string }[];
  sizes: string[];
}

export interface StoreBanner {
  id: number;
  name: string;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  active: boolean;
  type: "hero" | "promo" | "destaque";
}

export interface StoreMenuItem {
  id: number;
  label: string;
  link: string;
}

export interface StoreCategory {
  name: string;
  image: string;
  subcategories: { id: number; name: string }[];
}

export interface StoreTestimonial {
  id: number;
  name: string;
  image: string;
  text: string;
  rating: number;
}

export interface PaymentBadge {
  id: number;
  name: string;
  active: boolean;
}

export interface SecurityBadge {
  id: number;
  name: string;
  active: boolean;
}

export interface ShippingProvider {
  name: string;
  desc: string;
  connected: boolean;
}

export interface PaymentGateway {
  name: string;
  desc: string;
  connected: boolean;
  apiKey: string;
  secretKey: string;
}

export interface StoreAppearance {
  storeName: string;
  primaryColor: string;
  bgColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  headerBgColor: string;
  footerBgColor: string;
  footerTextColor: string;
  topBarBgColor: string;
  topBarTextColor: string;
}

export interface StoreSettings {
  email: string;
  phone: string;
  cnpj: string;
  address: string;
  hours: string;
  instagram: string;
}

export interface StoreOrder {
  id: string;
  customer: string;
  email: string;
  total: string;
  status: "Entregue" | "Enviado" | "Processando" | "Cancelado";
  date: string;
  items: { name: string; qty: number; price: string }[];
}

interface StoreContextType {
  appearance: StoreAppearance;
  setAppearance: (a: StoreAppearance) => void;
  settings: StoreSettings;
  setSettings: (s: StoreSettings) => void;
  products: StoreProduct[];
  setProducts: (p: StoreProduct[]) => void;
  banners: StoreBanner[];
  setBanners: (b: StoreBanner[]) => void;
  menus: StoreMenuItem[];
  setMenus: (m: StoreMenuItem[]) => void;
  categories: StoreCategory[];
  setCategories: (c: StoreCategory[]) => void;
  testimonials: StoreTestimonial[];
  setTestimonials: (t: StoreTestimonial[]) => void;
  paymentBadges: PaymentBadge[];
  setPaymentBadges: (p: PaymentBadge[]) => void;
  securityBadges: SecurityBadge[];
  setSecurityBadges: (s: SecurityBadge[]) => void;
  paymentGateways: PaymentGateway[];
  setPaymentGateways: (g: PaymentGateway[]) => void;
  shippingProviders: ShippingProvider[];
  setShippingProviders: (s: ShippingProvider[]) => void;
  orders: StoreOrder[];
  setOrders: (o: StoreOrder[]) => void;
  // Auth
  currentUser: { email: string; name: string; role: "admin" | "client" } | null;
  setCurrentUser: (u: { email: string; name: string; role: "admin" | "client" } | null) => void;
  // Cart
  cart: { productId: number; qty: number; size: string; color: string }[];
  setCart: (c: { productId: number; qty: number; size: string; color: string }[]) => void;
}

const defaultProducts: StoreProduct[] = [
  { id: 1, name: "Tênis Casual Branco Confort", image: "/products/product-1.jpg", oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$179,91", installment: "5x de R$39,98 sem juros", description: "Tênis casual branco de alta qualidade, perfeito para o dia a dia. Feito com materiais premium e design moderno.", category: "Calçados", subcategory: "Tênis", stock: 45, active: true, colors: [{ name: "Branco", hex: "#FFFFFF" }, { name: "Preto", hex: "#222222" }, { name: "Azul", hex: "#2563EB" }, { name: "Vermelho", hex: "#DC2626" }], sizes: ["P", "M", "G", "GG"] },
  { id: 2, name: "Bolsa Couro Premium Elegance", image: "/products/product-2.jpg", oldPrice: "R$349,90", price: "R$279,90", pixPrice: "R$251,91", installment: "6x de R$46,65 sem juros", description: "Bolsa em couro legítimo com acabamento premium. Design elegante e sofisticado.", category: "Acessórios", subcategory: "Bolsas", stock: 12, active: true, colors: [{ name: "Marrom", hex: "#8B4513" }, { name: "Preto", hex: "#222222" }, { name: "Caramelo", hex: "#D2691E" }, { name: "Vinho", hex: "#722F37" }], sizes: ["Único"] },
  { id: 3, name: "Óculos de Sol Gold Edition", image: "/products/product-3.jpg", oldPrice: "R$189,90", price: "R$149,90", pixPrice: "R$134,91", installment: "3x de R$49,97 sem juros", description: "Óculos de sol com armação dourada e lentes polarizadas. Proteção UV400.", category: "Acessórios", subcategory: "Óculos", stock: 28, active: true, colors: [{ name: "Dourado", hex: "#DAA520" }, { name: "Prata", hex: "#C0C0C0" }, { name: "Preto", hex: "#222222" }, { name: "Rose", hex: "#B76E79" }], sizes: ["Único"] },
  { id: 4, name: "Camiseta Básica Premium Algodão", image: "/products/product-4.jpg", oldPrice: "R$129,90", price: "R$89,90", pixPrice: "R$80,91", installment: "3x de R$29,97 sem juros", description: "Camiseta básica em algodão premium 100%. Modelagem confortável e durável.", category: "Masculino", subcategory: "Camisetas", stock: 88, active: true, colors: [{ name: "Branco", hex: "#FFFFFF" }, { name: "Preto", hex: "#222222" }, { name: "Cinza", hex: "#808080" }, { name: "Azul Marinho", hex: "#000080" }], sizes: ["P", "M", "G", "GG"] },
  { id: 5, name: "Vestido Floral Verão", image: "/products/product-1.jpg", oldPrice: "R$299,90", price: "R$219,90", pixPrice: "R$197,91", installment: "4x de R$54,98 sem juros", description: "Vestido floral leve e elegante, perfeito para o verão. Tecido fluido e confortável.", category: "Feminino", subcategory: "Vestidos", stock: 35, active: true, colors: [{ name: "Floral Rosa", hex: "#FF69B4" }, { name: "Floral Azul", hex: "#6495ED" }, { name: "Floral Amarelo", hex: "#FFD700" }, { name: "Branco", hex: "#FFFFFF" }], sizes: ["P", "M", "G", "GG"] },
  { id: 6, name: "Jaqueta Jeans Classic", image: "/products/product-2.jpg", oldPrice: "R$399,90", price: "R$319,90", pixPrice: "R$287,91", installment: "6x de R$53,32 sem juros", description: "Jaqueta jeans clássica com lavagem média. Peça atemporal.", category: "Feminino", subcategory: "Blusas", stock: 20, active: true, colors: [{ name: "Azul Claro", hex: "#87CEEB" }, { name: "Azul Escuro", hex: "#00008B" }, { name: "Preto", hex: "#222222" }, { name: "Cinza", hex: "#808080" }], sizes: ["P", "M", "G", "GG"] },
  { id: 7, name: "Calça Jogger Moletom", image: "/products/product-3.jpg", oldPrice: "R$179,90", price: "R$139,90", pixPrice: "R$125,91", installment: "3x de R$46,63 sem juros", description: "Calça jogger em moletom macio. Perfeita para looks casuais e esportivos.", category: "Masculino", subcategory: "Calças", stock: 55, active: true, colors: [{ name: "Cinza", hex: "#808080" }, { name: "Preto", hex: "#222222" }, { name: "Azul Marinho", hex: "#000080" }, { name: "Verde", hex: "#228B22" }], sizes: ["P", "M", "G", "GG"] },
  { id: 8, name: "Sandália Rasteira Dourada", image: "/products/product-4.jpg", oldPrice: "R$159,90", price: "R$119,90", pixPrice: "R$107,91", installment: "3x de R$39,97 sem juros", description: "Sandália rasteira com detalhes dourados. Conforto e elegância para o dia a dia.", category: "Calçados", subcategory: "Sandálias", stock: 40, active: true, colors: [{ name: "Dourado", hex: "#DAA520" }, { name: "Prata", hex: "#C0C0C0" }, { name: "Rose", hex: "#B76E79" }, { name: "Preto", hex: "#222222" }], sizes: ["35", "36", "37", "38", "39", "40"] },
];

const defaultOrders: StoreOrder[] = [
  { id: "#1234", customer: "Maria Silva", email: "maria@email.com", total: "R$199,90", status: "Entregue", date: "30/03/2026", items: [{ name: "Tênis Casual Branco", qty: 1, price: "R$199,90" }] },
  { id: "#1233", customer: "João Santos", email: "joao@email.com", total: "R$399,80", status: "Enviado", date: "29/03/2026", items: [{ name: "Bolsa Couro Premium", qty: 1, price: "R$279,90" }, { name: "Camiseta Premium", qty: 1, price: "R$89,90" }] },
  { id: "#1232", customer: "Ana Costa", email: "ana@email.com", total: "R$149,90", status: "Processando", date: "29/03/2026", items: [{ name: "Óculos Gold Edition", qty: 1, price: "R$149,90" }] },
  { id: "#1231", customer: "Pedro Oliveira", email: "pedro@email.com", total: "R$599,70", status: "Entregue", date: "28/03/2026", items: [{ name: "Tênis Casual Branco", qty: 2, price: "R$399,80" }, { name: "Camiseta Premium", qty: 1, price: "R$89,90" }] },
  { id: "#1230", customer: "Camila Souza", email: "camila@email.com", total: "R$219,90", status: "Enviado", date: "28/03/2026", items: [{ name: "Vestido Floral Verão", qty: 1, price: "R$219,90" }] },
  { id: "#1229", customer: "Cliente Demo", email: "cliente@flex.com", total: "R$319,80", status: "Processando", date: "31/03/2026", items: [{ name: "Tênis Casual Branco", qty: 1, price: "R$199,90" }, { name: "Sandália Rasteira", qty: 1, price: "R$119,90" }] },
];

const StoreContext = createContext<StoreContextType | null>(null);

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [appearance, setAppearance] = useState<StoreAppearance>({
    storeName: "Flex Moda",
    primaryColor: "#d6246e",
    bgColor: "#ffffff",
    textColor: "#222222",
    buttonColor: "#d6246e",
    buttonTextColor: "#ffffff",
    headerBgColor: "#ffffff",
    footerBgColor: "#222222",
    footerTextColor: "#ffffff",
    topBarBgColor: "#d6246e",
    topBarTextColor: "#ffffff",
  });

  const [settings, setSettings] = useState<StoreSettings>({
    email: "contato@flexmoda.com.br",
    phone: "(11) 99999-0000",
    cnpj: "12.345.678/0001-00",
    address: "São Paulo/SP - Brasil",
    hours: "Seg a sex das 9 às 12h | 14-18h",
    instagram: "@flexmoda",
  });

  const [products, setProducts] = useState<StoreProduct[]>(defaultProducts);

  const [banners, setBanners] = useState<StoreBanner[]>([
    { id: 1, name: "Banner Principal 1", image: "", title: "Nova Coleção Feminina", subtitle: "Até 30% OFF em peças selecionadas", cta: "COMPRAR AGORA", link: "/", active: true, type: "hero" },
    { id: 2, name: "Banner Principal 2", image: "", title: "Streetwear Masculino", subtitle: "Novidades toda semana", cta: "VER COLEÇÃO", link: "/", active: true, type: "hero" },
    { id: 3, name: "Promo 1", image: "", title: "Até 50% OFF", subtitle: "", cta: "", link: "/", active: true, type: "promo" },
    { id: 4, name: "Promo 2", image: "", title: "Frete Grátis", subtitle: "", cta: "", link: "/", active: true, type: "promo" },
    { id: 5, name: "Promo 3", image: "", title: "Novidades", subtitle: "", cta: "", link: "/", active: true, type: "promo" },
    { id: 6, name: "Banner Destaque", image: "", title: "Coleção Premium", subtitle: "Exclusividade que você merece", cta: "", link: "/", active: true, type: "destaque" },
  ]);

  const [menus, setMenus] = useState<StoreMenuItem[]>([
    { id: 1, label: "FEMININO", link: "/" },
    { id: 2, label: "MASCULINO", link: "/" },
    { id: 3, label: "CALÇADOS", link: "/" },
    { id: 4, label: "ACESSÓRIOS", link: "/" },
    { id: 5, label: "MARCAS", link: "/" },
  ]);

  const [categories, setCategories] = useState<StoreCategory[]>([
    { name: "Blusas", image: "", subcategories: [{ id: 1, name: "Camisetas" }, { id: 2, name: "Regatas" }] },
    { name: "Calças", image: "", subcategories: [{ id: 3, name: "Jeans" }, { id: 4, name: "Moletom" }] },
    { name: "Vestidos", image: "", subcategories: [{ id: 5, name: "Longos" }, { id: 6, name: "Curtos" }] },
    { name: "Conjuntos", image: "", subcategories: [{ id: 7, name: "Fitness" }, { id: 8, name: "Casual" }] },
    { name: "Jaquetas", image: "", subcategories: [{ id: 9, name: "Jeans" }, { id: 10, name: "Moletom" }] },
    { name: "Acessórios", image: "", subcategories: [{ id: 11, name: "Bolsas" }, { id: 12, name: "Óculos" }] },
  ]);

  const [testimonials, setTestimonials] = useState<StoreTestimonial[]>([
    { id: 1, name: "Maria Silva", image: "", text: "Produtos de qualidade excepcional! Entrega rápida e atendimento maravilhoso.", rating: 5 },
    { id: 2, name: "João Santos", image: "", text: "Melhor loja online que já comprei. Preços justos e as peças são exatamente como mostradas.", rating: 5 },
    { id: 3, name: "Ana Costa", image: "", text: "Compro sempre aqui. A qualidade dos produtos e o atendimento são incomparáveis.", rating: 5 },
    { id: 4, name: "Pedro Oliveira", image: "", text: "Fiquei impressionado com a velocidade da entrega e a qualidade. Voltarei a comprar!", rating: 5 },
  ]);

  const [paymentBadges, setPaymentBadges] = useState<PaymentBadge[]>([
    { id: 1, name: "Visa", active: true },
    { id: 2, name: "Mastercard", active: true },
    { id: 3, name: "Amex", active: true },
    { id: 4, name: "Elo", active: true },
    { id: 5, name: "Hipercard", active: true },
    { id: 6, name: "Discover", active: false },
    { id: 7, name: "Boleto", active: true },
    { id: 8, name: "Pix", active: true },
  ]);

  const [securityBadges, setSecurityBadges] = useState<SecurityBadge[]>([
    { id: 1, name: "SSL 256 Bits", active: true },
    { id: 2, name: "Google Safe Browsing", active: true },
    { id: 3, name: "Norton Secured", active: false },
  ]);

  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
    { name: "Mercado Pago", desc: "Receba pagamentos via Pix, cartão, boleto", connected: true, apiKey: "APP_USP-****-1234", secretKey: "****" },
    { name: "PagSeguro", desc: "Pagamentos com PagSeguro/PagBank", connected: false, apiKey: "", secretKey: "" },
    { name: "Pagar.me", desc: "Gateway de pagamento completo", connected: false, apiKey: "", secretKey: "" },
  ]);

  const [shippingProviders, setShippingProviders] = useState<ShippingProvider[]>([
    { name: "Correios", desc: "PAC, SEDEX, Mini Envios", connected: true },
    { name: "Melhor Envio", desc: "Cotação com múltiplas transportadoras", connected: false },
    { name: "Jadlog", desc: "Encomendas e cargas", connected: false },
  ]);

  const [orders, setOrders] = useState<StoreOrder[]>(defaultOrders);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: "admin" | "client" } | null>(null);
  const [cart, setCart] = useState<{ productId: number; qty: number; size: string; color: string }[]>([]);

  return (
    <StoreContext.Provider value={{
      appearance, setAppearance,
      settings, setSettings,
      products, setProducts,
      banners, setBanners,
      menus, setMenus,
      categories, setCategories,
      testimonials, setTestimonials,
      paymentBadges, setPaymentBadges,
      securityBadges, setSecurityBadges,
      paymentGateways, setPaymentGateways,
      shippingProviders, setShippingProviders,
      orders, setOrders,
      currentUser, setCurrentUser,
      cart, setCart,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
