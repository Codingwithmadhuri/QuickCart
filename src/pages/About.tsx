import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Zap, Users, Globe, Heart } from "lucide-react";

const About = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <div className="container mx-auto px-4 py-12 flex-1 max-w-3xl">
      <h1 className="font-display font-bold text-3xl text-foreground mb-4">About QuickCart</h1>
      <p className="text-muted-foreground mb-8 leading-relaxed">
        QuickCart is a next-generation e-commerce platform focused on speed, usability, and customer satisfaction.
        We believe shopping should be fast, intuitive, and enjoyable — that's why we've built a platform that puts the customer first.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { icon: Zap, title: "Lightning Fast", desc: "Optimized for speed so you spend less time waiting and more time finding what you love." },
          { icon: Users, title: "Customer First", desc: "Every feature is designed with our customers in mind. Your satisfaction is our top priority." },
          { icon: Globe, title: "Wide Selection", desc: "From electronics to fashion, we curate the best products from trusted brands worldwide." },
          { icon: Heart, title: "Quality Promise", desc: "We stand behind every product we sell with our quality guarantee and easy returns." },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-xl bg-card border border-border">
            <div className="p-2 rounded-lg bg-primary/10 w-fit mb-3">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

export default About;
