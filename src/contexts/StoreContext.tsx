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
  rating?: number;
  reviews?: number;
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
  image: string;
  active: boolean;
}

export interface SecurityBadge {
  id: number;
  name: string;
  image: string;
  active: boolean;
}

export interface ShippingProvider {
  name: string;
  desc: string;
  connected: boolean;
  token: string;
  apiKey: string;
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
  logo: string;
  favicon: string;
}

export interface StoreSettings {
  email: string;
  phone: string;
  whatsapp: string;
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
  paymentMethod?: string;
  shippingMethod?: string;
}

export interface StoreCoupon {
  code: string;
  discount: number;
  type: "percent" | "fixed";
  active: boolean;
  minValue: number;
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
  coupons: StoreCoupon[];
  setCoupons: (c: StoreCoupon[]) => void;
  currentUser: { email: string; name: string; role: "admin" | "client" } | null;
  setCurrentUser: (u: { email: string; name: string; role: "admin" | "client" } | null) => void;
  cart: { productId: number; qty: number; size: string; color: string }[];
  setCart: (c: { productId: number; qty: number; size: string; color: string }[]) => void;
  wishlist: number[];
  setWishlist: (w: number[]) => void;
}

const defaultProducts: StoreProduct[] = [
  { id: 1, name: "Tênis Casual Branco Confort", image: "/products/product-1.jpg", oldPrice: "R$249,90", price: "R$199,90", pixPrice: "R$179,91", installment: "5x de R$39,98 sem juros", description: "Tênis casual branco de alta qualidade, perfeito para o dia a dia. Feito com materiais premium e design moderno. Solado em borracha antiderrapante, palmilha anatômica e forro macio. Ideal para quem busca conforto e estilo em um único calçado.", category: "Calçados", subcategory: "Tênis", stock: 45, active: true, colors: [{ name: "Branco", hex: "#FFFFFF" }, { name: "Preto", hex: "#222222" }, { name: "Azul", hex: "#2563EB" }, { name: "Vermelho", hex: "#DC2626" }], sizes: ["37", "38", "39", "40", "41", "42"], rating: 4.8, reviews: 127 },
  { id: 2, name: "Bolsa Couro Premium Elegance", image: "/products/product-2.jpg", oldPrice: "R$349,90", price: "R$279,90", pixPrice: "R$251,91", installment: "6x de R$46,65 sem juros", description: "Bolsa em couro legítimo com acabamento premium. Design elegante e sofisticado para todas as ocasiões. Compartimento principal espaçoso com bolso interno para celular e organizador de cartões.", category: "Acessórios", subcategory: "Bolsas", stock: 12, active: true, colors: [{ name: "Marrom", hex: "#8B4513" }, { name: "Preto", hex: "#222222" }, { name: "Caramelo", hex: "#D2691E" }, { name: "Vinho", hex: "#722F37" }], sizes: ["Único"], rating: 4.9, reviews: 89 },
  { id: 3, name: "Óculos de Sol Gold Edition", image: "/products/product-3.jpg", oldPrice: "R$189,90", price: "R$149,90", pixPrice: "R$134,91", installment: "3x de R$49,97 sem juros", description: "Óculos de sol com armação dourada e lentes polarizadas. Proteção UV400 certificada. Acompanha estojo rígido e flanela de limpeza. Design atemporal que combina com qualquer visual.", category: "Acessórios", subcategory: "Óculos", stock: 28, active: true, colors: [{ name: "Dourado", hex: "#DAA520" }, { name: "Prata", hex: "#C0C0C0" }, { name: "Preto", hex: "#222222" }, { name: "Rose", hex: "#B76E79" }], sizes: ["Único"], rating: 4.7, reviews: 56 },
  { id: 4, name: "Camiseta Básica Premium Algodão", image: "/products/product-4.jpg", oldPrice: "R$129,90", price: "R$89,90", pixPrice: "R$80,91", installment: "3x de R$29,97 sem juros", description: "Camiseta básica em algodão premium 100%. Modelagem confortável e durável. Costura reforçada e gola ribana que não deforma. Perfeita para compor looks casuais e esportivos.", category: "Masculino", subcategory: "Camisetas", stock: 88, active: true, colors: [{ name: "Branco", hex: "#FFFFFF" }, { name: "Preto", hex: "#222222" }, { name: "Cinza", hex: "#808080" }, { name: "Azul Marinho", hex: "#000080" }], sizes: ["P", "M", "G", "GG"], rating: 4.6, reviews: 203 },
  { id: 5, name: "Vestido Floral Verão", image: "/products/product-5.jpg", oldPrice: "R$299,90", price: "R$219,90", pixPrice: "R$197,91", installment: "4x de R$54,98 sem juros", description: "Vestido floral leve e elegante, perfeito para o verão. Tecido fluido e confortável com modelagem soltinha. Estampa exclusiva feita com tingimento natural.", category: "Feminino", subcategory: "Vestidos", stock: 35, active: true, colors: [{ name: "Floral Rosa", hex: "#FF69B4" }, { name: "Floral Azul", hex: "#6495ED" }, { name: "Floral Amarelo", hex: "#FFD700" }, { name: "Branco", hex: "#FFFFFF" }], sizes: ["P", "M", "G", "GG"], rating: 4.9, reviews: 145 },
  { id: 6, name: "Jaqueta Jeans Classic", image: "/products/product-6.jpg", oldPrice: "R$399,90", price: "R$319,90", pixPrice: "R$287,91", installment: "6x de R$53,32 sem juros", description: "Jaqueta jeans clássica com lavagem média. Peça atemporal que combina com tudo. Bolsos frontais e botões metálicos. Acabamento premium em cada detalhe.", category: "Feminino", subcategory: "Blusas", stock: 20, active: true, colors: [{ name: "Azul Claro", hex: "#87CEEB" }, { name: "Azul Escuro", hex: "#00008B" }, { name: "Preto", hex: "#222222" }, { name: "Cinza", hex: "#808080" }], sizes: ["P", "M", "G", "GG"], rating: 4.7, reviews: 78 },
  { id: 7, name: "Calça Jogger Moletom", image: "/products/product-7.jpg", oldPrice: "R$179,90", price: "R$139,90", pixPrice: "R$125,91", installment: "3x de R$46,63 sem juros", description: "Calça jogger em moletom macio. Perfeita para looks casuais e esportivos. Cintura elástica com cordão e punhos canelados. Conforto para o dia inteiro.", category: "Masculino", subcategory: "Calças", stock: 55, active: true, colors: [{ name: "Cinza", hex: "#808080" }, { name: "Preto", hex: "#222222" }, { name: "Azul Marinho", hex: "#000080" }, { name: "Verde", hex: "#228B22" }], sizes: ["P", "M", "G", "GG"], rating: 4.5, reviews: 92 },
  { id: 8, name: "Sandália Rasteira Dourada", image: "/products/product-8.jpg", oldPrice: "R$159,90", price: "R$119,90", pixPrice: "R$107,91", installment: "3x de R$39,97 sem juros", description: "Sandália rasteira com detalhes dourados. Conforto e elegância para o dia a dia. Palmilha almofadada e tiras ajustáveis. Acabamento artesanal.", category: "Calçados", subcategory: "Sandálias", stock: 40, active: true, colors: [{ name: "Dourado", hex: "#DAA520" }, { name: "Prata", hex: "#C0C0C0" }, { name: "Rose", hex: "#B76E79" }, { name: "Preto", hex: "#222222" }], sizes: ["35", "36", "37", "38", "39", "40"], rating: 4.8, reviews: 67 },
  { id: 9, name: "Blusa Cropped Tricot", image: "/products/product-1.jpg", oldPrice: "R$169,90", price: "R$129,90", pixPrice: "R$116,91", installment: "3x de R$43,30 sem juros", description: "Blusa cropped em tricot macio e confortável. Modelagem moderna e elegante. Perfeita para looks casuais e sofisticados.", category: "Feminino", subcategory: "Blusas", stock: 32, active: true, colors: [{ name: "Bege", hex: "#F5DEB3" }, { name: "Preto", hex: "#222222" }, { name: "Rosa", hex: "#FFB6C1" }, { name: "Branco", hex: "#FFFFFF" }], sizes: ["P", "M", "G"], rating: 4.6, reviews: 43 },
  { id: 10, name: "Relógio Masculino Sport", image: "/products/product-3.jpg", oldPrice: "R$459,90", price: "R$349,90", pixPrice: "R$314,91", installment: "6x de R$58,32 sem juros", description: "Relógio esportivo com pulseira em silicone e caixa em aço inox. Resistente à água até 50m. Cronógrafo funcional.", category: "Acessórios", subcategory: "Relógios", stock: 15, active: true, colors: [{ name: "Preto", hex: "#222222" }, { name: "Azul", hex: "#1E3A5F" }, { name: "Prata", hex: "#C0C0C0" }, { name: "Dourado", hex: "#DAA520" }], sizes: ["Único"], rating: 4.8, reviews: 31 },
  { id: 11, name: "Bermuda Cargo Masculina", image: "/products/product-7.jpg", oldPrice: "R$159,90", price: "R$119,90", pixPrice: "R$107,91", installment: "3x de R$39,97 sem juros", description: "Bermuda cargo em sarja com bolsos laterais. Confortável e estilosa. Perfeita para o verão.", category: "Masculino", subcategory: "Bermudas", stock: 42, active: true, colors: [{ name: "Cáqui", hex: "#C3B091" }, { name: "Preto", hex: "#222222" }, { name: "Verde", hex: "#556B2F" }, { name: "Azul", hex: "#4682B4" }], sizes: ["P", "M", "G", "GG"], rating: 4.4, reviews: 58 },
  { id: 12, name: "Saia Midi Plissada", image: "/products/product-5.jpg", oldPrice: "R$229,90", price: "R$179,90", pixPrice: "R$161,91", installment: "4x de R$44,98 sem juros", description: "Saia midi plissada em tecido leve e fluido. Caimento perfeito e elegante. Cintura alta com elástico confortável.", category: "Feminino", subcategory: "Saias", stock: 25, active: true, colors: [{ name: "Preto", hex: "#222222" }, { name: "Bege", hex: "#F5DEB3" }, { name: "Vinho", hex: "#722F37" }, { name: "Verde", hex: "#2E8B57" }], sizes: ["P", "M", "G", "GG"], rating: 4.7, reviews: 36 },
];

const defaultOrders: StoreOrder[] = [
  { id: "#1234", customer: "Maria Silva", email: "maria@email.com", total: "R$199,90", status: "Entregue", date: "30/03/2026", items: [{ name: "Tênis Casual Branco", qty: 1, price: "R$199,90" }], paymentMethod: "PIX", shippingMethod: "SEDEX" },
  { id: "#1233", customer: "João Santos", email: "joao@email.com", total: "R$399,80", status: "Enviado", date: "29/03/2026", items: [{ name: "Bolsa Couro Premium", qty: 1, price: "R$279,90" }, { name: "Camiseta Premium", qty: 1, price: "R$89,90" }], paymentMethod: "Cartão", shippingMethod: "PAC" },
  { id: "#1232", customer: "Ana Costa", email: "ana@email.com", total: "R$149,90", status: "Processando", date: "29/03/2026", items: [{ name: "Óculos Gold Edition", qty: 1, price: "R$149,90" }], paymentMethod: "PIX", shippingMethod: "SEDEX" },
  { id: "#1231", customer: "Pedro Oliveira", email: "pedro@email.com", total: "R$599,70", status: "Entregue", date: "28/03/2026", items: [{ name: "Tênis Casual Branco", qty: 2, price: "R$399,80" }, { name: "Camiseta Premium", qty: 1, price: "R$89,90" }], paymentMethod: "Cartão", shippingMethod: "Express" },
  { id: "#1230", customer: "Camila Souza", email: "camila@email.com", total: "R$219,90", status: "Enviado", date: "28/03/2026", items: [{ name: "Vestido Floral Verão", qty: 1, price: "R$219,90" }], paymentMethod: "Boleto", shippingMethod: "PAC" },
  { id: "#1229", customer: "Cliente Demo", email: "cliente@flex.com", total: "R$319,80", status: "Enviado", date: "31/03/2026", items: [{ name: "Tênis Casual Branco", qty: 1, price: "R$199,90" }, { name: "Sandália Rasteira", qty: 1, price: "R$119,90" }], paymentMethod: "PIX", shippingMethod: "SEDEX" },
  { id: "#1228", customer: "Fernanda Lima", email: "fernanda@email.com", total: "R$449,80", status: "Entregue", date: "27/03/2026", items: [{ name: "Jaqueta Jeans Classic", qty: 1, price: "R$319,90" }, { name: "Blusa Cropped Tricot", qty: 1, price: "R$129,90" }], paymentMethod: "Cartão", shippingMethod: "PAC" },
  { id: "#1227", customer: "Ricardo Mendes", email: "ricardo@email.com", total: "R$349,90", status: "Cancelado", date: "26/03/2026", items: [{ name: "Relógio Masculino Sport", qty: 1, price: "R$349,90" }], paymentMethod: "Boleto", shippingMethod: "SEDEX" },
];

const defaultCoupons: StoreCoupon[] = [
  { code: "FLEX10", discount: 10, type: "percent", active: true, minValue: 100 },
  { code: "FRETE50", discount: 50, type: "fixed", active: true, minValue: 200 },
  { code: "PRIMEIRACOMPRA", discount: 15, type: "percent", active: true, minValue: 0 },
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
    logo: "",
    favicon: "",
  });

  const [settings, setSettings] = useState<StoreSettings>({
    email: "contato@flexmoda.com.br",
    phone: "(11) 99999-0000",
    whatsapp: "(11) 99999-0000",
    cnpj: "12.345.678/0001-00",
    address: "São Paulo/SP - Brasil",
    hours: "Seg a sex das 9 às 12h | 14-18h",
    instagram: "@flexmoda",
  });

  const [products, setProducts] = useState<StoreProduct[]>(defaultProducts);

  const [banners, setBanners] = useState<StoreBanner[]>([
    { id: 1, name: "Banner Principal 1", image: "", title: "Nova Coleção Feminina", subtitle: "Até 30% OFF em peças selecionadas", cta: "COMPRAR AGORA", link: "/categoria/Feminino", active: true, type: "hero" },
    { id: 2, name: "Banner Principal 2", image: "", title: "Streetwear Masculino", subtitle: "Novidades toda semana", cta: "VER COLEÇÃO", link: "/categoria/Masculino", active: true, type: "hero" },
    { id: 3, name: "Promo 1", image: "", title: "Até 50% OFF", subtitle: "", cta: "", link: "/categoria/Feminino", active: true, type: "promo" },
    { id: 4, name: "Promo 2", image: "", title: "Frete Grátis", subtitle: "", cta: "", link: "/categoria/Calçados", active: true, type: "promo" },
    { id: 5, name: "Promo 3", image: "", title: "Novidades", subtitle: "", cta: "", link: "/categoria/Acessórios", active: true, type: "promo" },
    { id: 6, name: "Banner Destaque", image: "", title: "Coleção Premium", subtitle: "Exclusividade que você merece", cta: "CONFERIR", link: "/categoria/Feminino", active: true, type: "destaque" },
  ]);

  const [menus, setMenus] = useState<StoreMenuItem[]>([
    { id: 1, label: "FEMININO", link: "/categoria/Feminino" },
    { id: 2, label: "MASCULINO", link: "/categoria/Masculino" },
    { id: 3, label: "CALÇADOS", link: "/categoria/Calçados" },
    { id: 4, label: "ACESSÓRIOS", link: "/categoria/Acessórios" },
    { id: 5, label: "OFERTAS", link: "/categoria/Ofertas" },
  ]);

  const [categories, setCategories] = useState<StoreCategory[]>([
    { name: "Blusas", image: "", subcategories: [{ id: 1, name: "Camisetas" }, { id: 2, name: "Regatas" }, { id: 13, name: "Croppeds" }] },
    { name: "Calças", image: "", subcategories: [{ id: 3, name: "Jeans" }, { id: 4, name: "Moletom" }, { id: 14, name: "Legging" }] },
    { name: "Vestidos", image: "", subcategories: [{ id: 5, name: "Longos" }, { id: 6, name: "Curtos" }, { id: 15, name: "Midi" }] },
    { name: "Conjuntos", image: "", subcategories: [{ id: 7, name: "Fitness" }, { id: 8, name: "Casual" }] },
    { name: "Jaquetas", image: "", subcategories: [{ id: 9, name: "Jeans" }, { id: 10, name: "Moletom" }, { id: 16, name: "Couro" }] },
    { name: "Acessórios", image: "", subcategories: [{ id: 11, name: "Bolsas" }, { id: 12, name: "Óculos" }, { id: 17, name: "Relógios" }, { id: 18, name: "Bijuterias" }] },
  ]);

  const [testimonials, setTestimonials] = useState<StoreTestimonial[]>([
    { id: 1, name: "Maria Silva", image: "", text: "Produtos de qualidade excepcional! Entrega rápida e atendimento maravilhoso. Recomendo a todos!", rating: 5 },
    { id: 2, name: "João Santos", image: "", text: "Melhor loja online que já comprei. Preços justos e as peças são exatamente como mostradas nas fotos.", rating: 5 },
    { id: 3, name: "Ana Costa", image: "", text: "Compro sempre aqui. A qualidade dos produtos e o atendimento são incomparáveis. Virei cliente fiel!", rating: 5 },
    { id: 4, name: "Pedro Oliveira", image: "", text: "Fiquei impressionado com a velocidade da entrega e a qualidade do acabamento. Com certeza voltarei!", rating: 5 },
  ]);

  const [paymentBadges, setPaymentBadges] = useState<PaymentBadge[]>([
    { id: 1, name: "Visa", image: "", active: true },
    { id: 2, name: "Mastercard", image: "", active: true },
    { id: 3, name: "Amex", image: "", active: true },
    { id: 4, name: "Elo", image: "", active: true },
    { id: 5, name: "Hipercard", image: "", active: true },
    { id: 6, name: "Discover", image: "", active: false },
    { id: 7, name: "Boleto", image: "", active: true },
    { id: 8, name: "Pix", image: "", active: true },
  ]);

  const [securityBadges, setSecurityBadges] = useState<SecurityBadge[]>([
    { id: 1, name: "SSL 256 Bits", image: "", active: true },
    { id: 2, name: "Google Safe Browsing", image: "", active: true },
    { id: 3, name: "Norton Secured", image: "", active: false },
  ]);

  const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
    { name: "Mercado Pago", desc: "Receba pagamentos via Pix, cartão, boleto", connected: true, apiKey: "APP_USP-****-1234", secretKey: "****" },
    { name: "PagSeguro", desc: "Pagamentos com PagSeguro/PagBank", connected: false, apiKey: "", secretKey: "" },
    { name: "Pagar.me", desc: "Gateway de pagamento completo", connected: false, apiKey: "", secretKey: "" },
  ]);

  const [shippingProviders, setShippingProviders] = useState<ShippingProvider[]>([
    { name: "Correios", desc: "PAC, SEDEX, Mini Envios", connected: true, token: "TOKEN-CORREIOS-****", apiKey: "" },
    { name: "Melhor Envio", desc: "Cotação com múltiplas transportadoras", connected: false, token: "", apiKey: "" },
    { name: "Jadlog", desc: "Encomendas e cargas", connected: false, token: "", apiKey: "" },
  ]);

  const [orders, setOrders] = useState<StoreOrder[]>(defaultOrders);
  const [coupons, setCoupons] = useState<StoreCoupon[]>(defaultCoupons);
  const [currentUser, setCurrentUser] = useState<{ email: string; name: string; role: "admin" | "client" } | null>(null);
  const [cart, setCart] = useState<{ productId: number; qty: number; size: string; color: string }[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([1, 2, 5]);

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
      coupons, setCoupons,
      currentUser, setCurrentUser,
      cart, setCart,
      wishlist, setWishlist,
    }}>
      {children}
    </StoreContext.Provider>
  );
};
