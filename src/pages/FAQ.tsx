import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChevronDown, Package, CreditCard, Truck, RotateCcw, Shield, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqCategories = [
  {
    title: "Orders & Delivery",
    icon: Truck,
    faqs: [
      { q: "How do I place an order?", a: "Browse products, add items to your cart, and proceed to checkout. Enter your shipping address, select a payment method, and confirm your order. You'll receive a confirmation email immediately." },
      { q: "What are the delivery timelines?", a: "Standard delivery takes 2-3 business days. Express delivery is available for select locations and typically arrives within 1 business day. You can track your order in real-time." },
      { q: "How can I track my order?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also check your order status in your account dashboard under 'My Orders'." },
      { q: "Do you deliver to all locations in India?", a: "Yes, we deliver across India including remote areas. Delivery times may vary for certain locations. Enter your PIN code at checkout to check availability." },
    ],
  },
  {
    title: "Payments",
    icon: CreditCard,
    faqs: [
      { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards (Visa, Mastercard, RuPay), UPI (Google Pay, PhonePe, Paytm), Net Banking, EMI options, and Cash on Delivery (COD)." },
      { q: "Is my payment information secure?", a: "Absolutely. We use 256-bit SSL encryption and are PCI DSS compliant. We never store your complete card information on our servers. All transactions are processed through certified payment gateways." },
      { q: "Can I pay using EMI?", a: "Yes, EMI options are available on select credit cards for orders above ₹3,000. You can check EMI availability at checkout." },
    ],
  },
  {
    title: "Returns & Refunds",
    icon: RotateCcw,
    faqs: [
      { q: "What is your return policy?", a: "We offer a 10-day return policy on most items. Products must be unused and in their original packaging. Electronics have a 7-day replacement guarantee." },
      { q: "How do I initiate a return?", a: "Go to 'My Orders' in your account, select the item, and click 'Return'. Choose your reason and schedule a pickup. Our delivery partner will collect the item from your address." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned item. UPI and wallet refunds are instant. Card refunds may take 7-10 business days to reflect." },
    ],
  },
  {
    title: "Account & Privacy",
    icon: Shield,
    faqs: [
      { q: "How do I create an account?", a: "Click 'Sign In' on the top right, then select 'Create Account'. Enter your name, email, and create a password. You can also sign in with Google for quick access." },
      { q: "How is my personal data protected?", a: "We follow strict data protection policies in compliance with Indian IT Act. Your data is encrypted and never shared with third parties without your consent." },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-1 max-w-3xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <HelpCircle className="h-8 w-8 text-accent" />
            <h1 className="font-display font-bold text-3xl text-foreground">Help Center</h1>
          </div>
          <p className="text-muted-foreground">Find answers to common questions about QuickCart</p>
        </div>

        <div className="space-y-6">
          {faqCategories.map((category, ci) => (
            <div key={ci} className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/30">
                <category.icon className="h-5 w-5 text-accent" />
                <h2 className="font-display font-bold text-base text-foreground">{category.title}</h2>
              </div>
              <div className="divide-y divide-border">
                {category.faqs.map((faq, fi) => {
                  const key = `${ci}-${fi}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={fi}>
                      <button onClick={() => toggleItem(key)}
                        className="w-full flex items-center justify-between p-4 md:px-5 text-left hover:bg-secondary/20 transition-colors">
                        <span className="font-medium text-sm text-foreground pr-4">{faq.q}</span>
                        <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 md:px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center p-6 bg-card rounded-xl border border-border shadow-card">
          <p className="text-sm text-foreground font-medium mb-1">Still have questions?</p>
          <p className="text-xs text-muted-foreground mb-3">Our support team is here to help</p>
          <a href="/contact" className="inline-flex items-center gap-1 gradient-accent text-accent-foreground px-5 py-2 rounded-full font-bold text-sm hover:brightness-110 transition-all">
            Contact Support
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
