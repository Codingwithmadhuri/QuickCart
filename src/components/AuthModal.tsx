import { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User as UserIcon, Chrome } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePassword = (p: string) => p.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast({ title: "Invalid email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    if (!validatePassword(password)) {
      toast({ title: "Weak password", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    if (!isLogin && !name.trim()) {
      toast({ title: "Name required", description: "Please enter your full name.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const success = isLogin ? await login(email, password) : await register(name, email, password);
      if (success) {
        toast({ title: isLogin ? "Welcome back!" : "Account created!", description: "You're now signed in." });
        onClose();
        setName(""); setEmail(""); setPassword("");
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const resetAndSwitch = () => {
    setIsLogin(!isLogin);
    setName(""); setEmail(""); setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="relative bg-card border border-border rounded-xl shadow-elevated w-full max-w-[420px] overflow-hidden"
      >
        {/* Header */}
        <div className="nav-bg px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <span className="font-display font-extrabold text-xl text-white">Quick</span>
              <span className="font-display font-extrabold text-xl text-accent">Cart</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => { setIsLogin(true); setName(""); }}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors relative ${isLogin ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Sign In
            {isLogin && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 text-sm font-semibold text-center transition-colors relative ${!isLogin ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            Create Account
            {!isLogin && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
              transition={{ duration: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {!isLogin && (
                <div>
                  <label className="text-xs font-bold text-foreground mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm transition-all" />
                  </div>
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-foreground mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input type={showPassword ? "text" : "password"} placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-sm transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Password must be at least 6 characters
                </p>
              </div>

              <button type="submit" disabled={loading}
                className="w-full gradient-accent text-foreground py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all disabled:opacity-50 shadow-md">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                    Please wait...
                  </span>
                ) : isLogin ? "Sign In" : "Create Account"}
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Social login */}
          <div className="mt-5">
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
              <span className="relative bg-card px-3 text-xs text-muted-foreground">or continue with</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-medium hover:bg-secondary transition-colors">
              <Chrome className="h-4 w-4" />
              Sign in with Google
            </button>
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              By continuing, you agree to QuickCart's{" "}
              <span className="text-accent hover:underline cursor-pointer">Conditions of Use</span>{" "}and{" "}
              <span className="text-accent hover:underline cursor-pointer">Privacy Notice</span>.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
