import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { Flame } from "lucide-react";

const CountdownBanner = () => {
  const { appearance } = useStore();
  const [time, setTime] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="py-8">
      <div className="container">
        <div className="rounded-xl overflow-hidden p-8 text-center text-white relative" style={{ backgroundColor: appearance.primaryColor }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="w-6 h-6 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wider">Oferta Relâmpago</span>
              <Flame className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Até 40% OFF em peças selecionadas</h3>
            <p className="text-white/80 text-sm mb-6">Aproveite antes que acabe!</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              {[
                { value: pad(time.hours), label: "Horas" },
                { value: pad(time.minutes), label: "Min" },
                { value: pad(time.seconds), label: "Seg" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-3 min-w-[64px]">
                    <span className="text-3xl font-bold">{t.value}</span>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5">{t.label}</p>
                  </div>
                  {i < 2 && <span className="text-3xl font-bold">:</span>}
                </div>
              ))}
            </div>
            <Link to="/categoria/Feminino">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 px-10 py-6 font-bold text-base">
                VER OFERTAS
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownBanner;
