import { X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-card border-l border-border shadow-elevated animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border nav-bg">
          <h2 className="font-display font-bold text-lg text-white">Shopping Cart</h2>
          <button onClick={onClose} className="p-1.5 rounded text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-sm gap-3 px-8">
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-center text-xs">Your shopping cart is waiting. Give it purpose – fill it with products from the store.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-secondary/50 rounded-lg border border-border">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded object-contain bg-white p-1" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2">{item.product.name}</p>
                    <p className="text-sm font-bold text-foreground mt-1">₹{item.product.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-border rounded overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-secondary text-foreground">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-bold w-8 text-center text-foreground border-x border-border py-1">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-secondary text-foreground">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-accent text-xs hover:underline flex items-center gap-1">
                        <Trash2 className="h-3 w-3" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border space-y-3 bg-card">
              <div className="flex justify-between text-foreground">
                <span className="text-sm">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items):</span>
                <span className="font-bold text-lg">₹{totalPrice.toLocaleString()}</span>
              </div>
              <button
                onClick={() => { onClose(); navigate("/checkout"); }}
                className="w-full gradient-accent text-foreground py-3 rounded font-bold text-sm hover:brightness-110 transition-all"
              >
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
