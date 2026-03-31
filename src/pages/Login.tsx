import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useStore } from "@/contexts/StoreContext";
import { toast } from "sonner";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { setCurrentUser } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      if (email === "admin@flex.com" && password === "admin") {
        setCurrentUser({ email, name: "Administrador", role: "admin" });
        toast.success("Bem-vindo, Admin!");
        navigate("/admin");
      } else if (email === "cliente@flex.com" && password === "cliente123") {
        setCurrentUser({ email, name: "Cliente Demo", role: "client" });
        toast.success("Bem-vindo(a)!");
        navigate("/minha-conta");
      } else {
        toast.error("E-mail ou senha inválidos!");
      }
    } else {
      if (!name.trim() || !email.trim() || !password.trim()) {
        toast.error("Preencha todos os campos!"); return;
      }
      setCurrentUser({ email, name, role: "client" });
      toast.success("Conta criada com sucesso!");
      navigate("/minha-conta");
    }
  };

  return (
    <Layout>
      <div className="container py-16 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-8">{isLogin ? "Entrar" : "Criar Conta"}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-sm font-medium block mb-1">Nome completo</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Seu nome" />
            </div>
          )}
          <div>
            <label className="text-sm font-medium block mb-1">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="seu@email.com" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" />
          </div>
          {!isLogin && (
            <div>
              <label className="text-sm font-medium block mb-1">Confirmar Senha</label>
              <input type="password" className="w-full border border-border rounded-sm p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="••••••••" />
            </div>
          )}
          <Button variant="shop" size="lg" className="w-full py-6">{isLogin ? "ENTRAR" : "CADASTRAR"}</Button>
        </form>

        {isLogin && (
          <p className="text-center mt-4">
            <a href="#" className="text-sm text-primary hover:underline">Esqueceu a senha?</a>
          </p>
        )}

        <div className="text-center mt-6 text-sm">
          {isLogin ? (
            <p>Não tem conta? <button onClick={() => setIsLogin(false)} className="text-primary font-semibold hover:underline">Cadastre-se</button></p>
          ) : (
            <p>Já tem conta? <button onClick={() => setIsLogin(true)} className="text-primary font-semibold hover:underline">Entrar</button></p>
          )}
        </div>

        <div className="mt-8 space-y-2">
          <div className="p-4 bg-muted rounded-sm text-xs text-muted-foreground text-center">
            <p className="font-semibold text-foreground mb-1">Acesso Admin (demo)</p>
            <p>Email: admin@flex.com | Senha: admin</p>
          </div>
          <div className="p-4 bg-muted rounded-sm text-xs text-muted-foreground text-center">
            <p className="font-semibold text-foreground mb-1">Acesso Cliente (demo)</p>
            <p>Email: cliente@flex.com | Senha: cliente123</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
