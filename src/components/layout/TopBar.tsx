import { Phone, Mail, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "@/contexts/StoreContext";

const TopBar = () => {
  const { settings, appearance } = useStore();

  return (
    <div className="text-xs py-2" style={{ backgroundColor: appearance.topBarBgColor, color: appearance.topBarTextColor }}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {settings.phone}</span>
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {settings.email}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {settings.hours}</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/quem-somos" className="hover:underline">Sobre Nós</Link>
          <Link to="/fale-conosco" className="hover:underline">Fale Conosco</Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
