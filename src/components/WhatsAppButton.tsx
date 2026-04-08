import { MessageCircle } from "lucide-react";
import { useStore } from "@/contexts/StoreContext";

const WhatsAppButton = () => {
  const { settings } = useStore();
  const phone = (settings.whatsapp || settings.phone).replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/55${phone}?text=Olá! Gostaria de mais informações.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all group"
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      <span className="absolute right-16 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
        Fale conosco!
      </span>
    </a>
  );
};

export default WhatsAppButton;
