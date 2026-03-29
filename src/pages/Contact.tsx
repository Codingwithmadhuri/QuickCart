import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1 max-w-3xl">
        <h1 className="font-display font-bold text-3xl text-foreground mb-6">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "support@quickcart.com" },
              { icon: Phone, label: "Phone", value: "+91 9876543210" },
              { icon: MapPin, label: "Location", value: "Pune, India" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                <div className="p-2 rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-medium text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input placeholder="Your Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
              className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
              className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea placeholder="Your Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required
              className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            <button type="submit" className="w-full gradient-hero text-primary-foreground py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
