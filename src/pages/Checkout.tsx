import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Shield } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

type Step = "address" | "payment" | "summary" | "confirmation";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("address");
  const [address, setAddress] = useState({ name: "", street: "", city: "", state: "", zip: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("card");

  if (items.length === 0 && step !== "confirmation") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-4">
          <p className="text-lg font-medium">Your QuickCart is empty</p>
          <button onClick={() => navigate("/products")} className="gradient-accent text-foreground px-6 py-2.5 rounded font-bold text-sm hover:brightness-110 transition-all">
            Continue Shopping
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const steps: { key: Step; label: string }[] = [
    { key: "address", label: "Delivery address" },
    { key: "payment", label: "Payment method" },
    { key: "summary", label: "Review items" },
    { key: "confirmation", label: "Confirmation" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === step);

  const handlePlaceOrder = () => {
    clearCart();
    setStep("confirmation");
    toast({ title: "Order placed!", description: "Your order has been confirmed." });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6 flex-1 max-w-3xl">
        {/* Steps - Amazon style */}
        <div className="flex items-center justify-between mb-6 bg-card rounded-lg p-4 shadow-card">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${i <= currentIndex ? "gradient-accent text-foreground" : "bg-secondary text-muted-foreground"}`}>
                {i < currentIndex ? "✓" : i + 1}
              </div>
              <span className={`text-xs hidden sm:inline ${i <= currentIndex ? "text-foreground font-bold" : "text-muted-foreground"}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < currentIndex ? "bg-accent" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_280px] gap-4">
          <div>
            {step === "address" && (
              <div className="bg-card border border-border rounded-lg p-5 shadow-card">
                <h2 className="font-display font-bold text-lg mb-4 text-foreground">1. Delivery address</h2>
                <div className="grid gap-3">
                  <div>
                    <label className="text-xs font-bold text-foreground mb-1 block">Full name</label>
                    <input placeholder="John Doe" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} required
                      className="w-full px-3 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-foreground mb-1 block">Address</label>
                    <input placeholder="House no., Building, Street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} required
                      className="w-full px-3 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-foreground mb-1 block">City</label>
                      <input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required
                        className="w-full px-3 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-foreground mb-1 block">State</label>
                      <input placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} required
                        className="w-full px-3 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-foreground mb-1 block">PIN Code</label>
                      <input placeholder="411001" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required
                        className="w-full px-3 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-foreground mb-1 block">Phone</label>
                      <input placeholder="+91 98765 43210" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} required
                        className="w-full px-3 py-2.5 rounded border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
                    </div>
                  </div>
                </div>
                <button onClick={() => {
                  if (!address.name || !address.street || !address.city) {
                    toast({ title: "Missing fields", description: "Please fill in all address fields.", variant: "destructive" });
                    return;
                  }
                  setStep("payment");
                }} className="w-full gradient-accent text-foreground py-2.5 rounded font-bold text-sm mt-4 hover:brightness-110 transition-all">
                  Use this address
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-card border border-border rounded-lg p-5 shadow-card">
                <h2 className="font-display font-bold text-lg mb-4 text-foreground">2. Payment method</h2>
                <div className="space-y-2">
                  {[
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay" },
                    { id: "upi", label: "UPI", desc: "Google Pay, PhonePe, Paytm" },
                    { id: "cod", label: "Cash on Delivery / Pay on Delivery", desc: "₹0 convenience fee" },
                  ].map((m) => (
                    <label key={m.id}
                      className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${paymentMethod === m.id ? "border-accent bg-accent/5" : "border-border hover:bg-secondary"}`}>
                      <input type="radio" name="payment" value={m.id} checked={paymentMethod === m.id} onChange={() => setPaymentMethod(m.id)} className="accent-accent" />
                      <div>
                        <p className="text-sm font-bold text-foreground">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <button onClick={() => setStep("address")} className="flex-1 py-2.5 rounded font-bold text-sm border border-border text-foreground hover:bg-secondary transition-colors">
                    Back
                  </button>
                  <button onClick={() => setStep("summary")} className="flex-1 gradient-accent text-foreground py-2.5 rounded font-bold text-sm hover:brightness-110 transition-all">
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === "summary" && (
              <div className="bg-card border border-border rounded-lg p-5 shadow-card">
                <h2 className="font-display font-bold text-lg mb-4 text-foreground">3. Review items and delivery</h2>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3 p-2 border-b border-border last:border-0">
                      <img src={item.product.image} alt="" className="w-16 h-16 rounded object-contain bg-white p-1" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground line-clamp-1">{item.product.name}</p>
                        <p className="text-sm font-bold text-foreground">₹{item.product.price.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-[11px] text-success">FREE delivery</p>
                      </div>
                      <span className="text-sm font-bold text-foreground shrink-0">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep("payment")} className="flex-1 py-2.5 rounded font-bold text-sm border border-border text-foreground hover:bg-secondary transition-colors">
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="flex-1 gradient-accent text-foreground py-2.5 rounded font-bold text-sm hover:brightness-110 transition-all">
                    Place your order
                  </button>
                </div>
              </div>
            )}

            {step === "confirmation" && (
              <div className="text-center py-12 bg-card rounded-lg shadow-card">
                <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
                <h2 className="font-display font-bold text-2xl text-foreground mb-2">Order Placed!</h2>
                <p className="text-muted-foreground mb-1">Thank you for your order.</p>
                <p className="text-sm text-muted-foreground mb-6">Your items will be delivered in 2-3 business days.</p>
                <button onClick={() => navigate("/products")} className="gradient-accent text-foreground px-8 py-2.5 rounded font-bold text-sm hover:brightness-110 transition-all">
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          {step !== "confirmation" && (
            <div className="bg-card border border-border rounded-lg p-4 shadow-card h-fit">
              <button onClick={step === "summary" ? handlePlaceOrder : () => {}}
                className="w-full gradient-accent text-foreground py-2 rounded font-bold text-xs hover:brightness-110 transition-all mb-3">
                {step === "summary" ? "Place your order" : "Proceed"}
              </button>
              <div className="border-t border-border pt-3 space-y-2">
                <h3 className="font-bold text-sm text-foreground">Order Summary</h3>
                <div className="flex justify-between text-xs text-muted-foreground"><span>Items ({items.reduce((s, i) => s + i.quantity, 0)}):</span><span>₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-xs text-muted-foreground"><span>Delivery:</span><span className="text-success">FREE</span></div>
                <div className="flex justify-between font-bold text-foreground text-base pt-2 border-t border-border">
                  <span>Order Total:</span><span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-[10px] text-muted-foreground">
                <Shield className="h-3 w-3" /> Secure checkout
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
