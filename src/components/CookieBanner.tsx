import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-foreground text-background p-4 shadow-2xl">
      <div className="container flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Cookie className="w-6 h-6 shrink-0 text-primary" />
          <p className="text-sm">
            Utilizamos cookies para melhorar sua experiência.{" "}
            <Link to="/politica-privacidade" className="text-primary hover:underline">Saiba mais</Link>
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="shop" size="sm" onClick={() => setVisible(false)} className="bg-primary text-primary-foreground">
            Aceitar
          </Button>
          <button onClick={() => setVisible(false)} className="p-1 hover:text-primary transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
