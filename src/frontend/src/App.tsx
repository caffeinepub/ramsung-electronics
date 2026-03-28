import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import {
  ChevronRight,
  Eye,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Refrigerator,
  ShoppingCart,
  Smartphone,
  Star,
  Tv,
  WashingMachine,
  Wind,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiX, SiYoutube } from "react-icons/si";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const queryClient = new QueryClient();

type Category =
  | "All"
  | "Refrigerator"
  | "TV"
  | "Mobile"
  | "Washing Machine"
  | "AC";

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  description: string;
  specs: string[];
  imageUrl: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Ramsung RF450 French Door",
    category: "Refrigerator",
    price: 68999,
    description:
      "Spacious 450L French door refrigerator with twin cooling technology and smart humidity control for ultra-fresh food storage.",
    specs: [
      "450L Capacity",
      "Twin Cooling Plus",
      "Digital Inverter",
      "5-Star Energy Rating",
      "All-Around Cooling",
      "Door Alarm",
    ],
    imageUrl: "/assets/generated/ramsung-refrigerator-rf450.dim_600x600.jpg",
    inStock: true,
    rating: 5,
    reviews: 328,
  },
  {
    id: 2,
    name: "Ramsung SBS700 Side-by-Side",
    category: "Refrigerator",
    price: 89999,
    description:
      "Premium side-by-side refrigerator with built-in water & ice dispenser, SpacePlus ice system, and WiFi connectivity.",
    specs: [
      "700L Total Capacity",
      "Water & Ice Dispenser",
      "SpacePlus Ice System",
      "WiFi Connected",
      "Linear Cooling",
      "Holiday Mode",
    ],
    imageUrl:
      "/assets/generated/ramsung-refrigerator-side-by-side.dim_600x600.jpg",
    inStock: true,
    rating: 4,
    reviews: 194,
  },
  {
    id: 3,
    name: 'Ramsung QLED 65" 4K Pro',
    category: "TV",
    price: 129999,
    description:
      "65-inch QLED 4K Smart TV with Quantum Dot technology, 120Hz refresh rate, and built-in Dolby Atmos sound for cinematic experience.",
    specs: [
      '65" QLED 4K',
      "120Hz Refresh Rate",
      "Dolby Atmos Sound",
      "HDMI 2.1 x4",
      "SmartHub OS",
      "Voice Assistant",
    ],
    imageUrl: "/assets/generated/ramsung-tv-qled65.dim_600x600.jpg",
    inStock: true,
    rating: 5,
    reviews: 512,
  },
  {
    id: 4,
    name: 'Ramsung OLED 55" Evo',
    category: "TV",
    price: 109999,
    description:
      "55-inch OLED Evo panel with self-lit pixels delivering infinite contrast, perfect blacks, and breathtaking color accuracy.",
    specs: [
      '55" OLED Evo',
      "α9 AI Processor",
      "ATSC 3.0 Tuner",
      "Filmmaker Mode",
      "Game Optimizer",
      "VRR Support",
    ],
    imageUrl: "/assets/generated/ramsung-tv-oled-55.dim_600x600.jpg",
    inStock: true,
    rating: 5,
    reviews: 287,
  },
  {
    id: 5,
    name: "Ramsung Galaxy X50 Pro",
    category: "Mobile",
    price: 54999,
    description:
      "Flagship smartphone with 200MP pro camera, 5000mAh battery, and 120Hz Dynamic AMOLED 2X display for stunning visuals.",
    specs: [
      '6.8" AMOLED 120Hz',
      "200MP + 12MP + 10MP",
      "4nm Octa-Core CPU",
      "12GB RAM / 256GB",
      "5000mAh Battery",
      "5G Ready",
    ],
    imageUrl: "/assets/generated/ramsung-mobile-galaxy-x50.dim_600x600.jpg",
    inStock: true,
    rating: 5,
    reviews: 843,
  },
  {
    id: 6,
    name: "Ramsung Flip Z5",
    category: "Mobile",
    price: 74999,
    description:
      "Iconic foldable flip smartphone with FlexHinge design, compact form factor and Flex Mode for hands-free convenience.",
    specs: [
      '6.7" Foldable AMOLED',
      '1.9" Cover Display',
      "12MP + 12MP Camera",
      "8GB RAM / 256GB",
      "3700mAh Battery",
      "Flex Mode",
    ],
    imageUrl: "/assets/generated/ramsung-mobile-flip-z5.dim_600x600.jpg",
    inStock: true,
    rating: 4,
    reviews: 396,
  },
  {
    id: 7,
    name: "Ramsung WM800 FrontLoad",
    category: "Washing Machine",
    price: 42999,
    description:
      "8kg front-load washing machine with AI-powered load sensing, EcoSilence Drive motor, and Hygiene Steam cycle for deep cleaning.",
    specs: [
      "8kg Capacity",
      "1400 RPM Spin",
      "AI Load Sensing",
      "Hygiene Steam",
      "EcoSilence Drive",
      "15-min Quick Wash",
    ],
    imageUrl: "/assets/generated/ramsung-washing-machine-wm800.dim_600x600.jpg",
    inStock: true,
    rating: 4,
    reviews: 215,
  },
  {
    id: 8,
    name: "Ramsung TL600 Top Load",
    category: "Washing Machine",
    price: 28999,
    description:
      "6.5kg top-load washing machine with 5 wash programs, Diamond Drum, and Wobble technology for gentle fabric care.",
    specs: [
      "6.5kg Capacity",
      "Diamond Drum",
      "Wobble Technology",
      "5 Wash Programs",
      "Child Lock",
      "Eco Tub Clean",
    ],
    imageUrl:
      "/assets/generated/ramsung-washing-machine-topload.dim_600x600.jpg",
    inStock: false,
    rating: 4,
    reviews: 178,
  },
  {
    id: 9,
    name: "Ramsung TurboFrost 2-Ton Inverter",
    category: "AC",
    price: 49999,
    description:
      "2-ton 5-star inverter split AC with TurboFrost technology, Wi-Fi control, and auto-clean function for all-season comfort.",
    specs: [
      "2 Ton Capacity",
      "5-Star Rating",
      "Inverter Compressor",
      "Wi-Fi Control",
      "Auto Clean",
      "PM 2.5 Filter",
    ],
    imageUrl: "/assets/generated/ramsung-ac-inverter-2ton.dim_600x600.jpg",
    inStock: true,
    rating: 5,
    reviews: 463,
  },
  {
    id: 10,
    name: "Ramsung CoolWindow 1-Ton",
    category: "AC",
    price: 29999,
    description:
      "1-ton window AC with 3-star energy rating, anti-bacterial filter, and auto-restart function for compact rooms.",
    specs: [
      "1 Ton Capacity",
      "3-Star Rating",
      "Anti-Bacterial Filter",
      "Auto Restart",
      "Sleep Mode",
      "Self-Diagnosis",
    ],
    imageUrl: "/assets/generated/ramsung-ac-window-1ton.dim_600x600.jpg",
    inStock: true,
    rating: 4,
    reviews: 132,
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Refrigerator",
  "TV",
  "Mobile",
  "Washing Machine",
  "AC",
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Refrigerator: <Refrigerator className="w-4 h-4" />,
  TV: <Tv className="w-4 h-4" />,
  Mobile: <Smartphone className="w-4 h-4" />,
  "Washing Machine": <WashingMachine className="w-4 h-4" />,
  AC: <Wind className="w-4 h-4" />,
};

function formatPrice(price: number): string {
  return `\u20B9${price.toLocaleString("en-IN")}`;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          // biome-ignore lint/suspicious/noArrayIndexKey: static star display
          key={i}
          className={`w-3.5 h-3.5 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function ProductCard({
  product,
  onViewDetails,
}: { product: Product; onViewDetails: (p: Product) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden border-brand-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card h-full flex flex-col">
        <div className="relative overflow-hidden bg-brand-blue-light/30 aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
          <Badge
            className="absolute top-3 left-3 text-xs font-semibold"
            style={{
              backgroundColor: "oklch(var(--brand-blue))",
              color: "white",
            }}
          >
            {product.category}
          </Badge>
          {!product.inStock && (
            <div className="absolute inset-0 bg-foreground/50 flex items-center justify-center">
              <Badge
                variant="destructive"
                className="text-sm font-bold px-3 py-1"
              >
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4 flex flex-col flex-1 gap-2">
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="pt-1">
            <span className="font-display font-bold text-xl text-brand-blue">
              {formatPrice(product.price)}
            </span>
          </div>
          <div className="flex gap-2 mt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
              onClick={() => onViewDetails(product)}
              data-ocid="products.view_details.button"
            >
              <Eye className="w-3 h-3 mr-1" /> View Details
            </Button>
            <Button
              type="button"
              size="sm"
              className="flex-1 text-xs bg-brand-blue hover:bg-brand-blue-dark text-white transition-colors"
              disabled={!product.inStock}
              data-ocid="products.buy_now.button"
            >
              <ShoppingCart className="w-3 h-3 mr-1" /> Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProductModal({
  product,
  open,
  onClose,
}: { product: Product | null; open: boolean; onClose: () => void }) {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl w-full p-0 overflow-hidden"
        data-ocid="product.modal"
      >
        <div className="grid md:grid-cols-2">
          <div className="bg-brand-blue-light/30 flex items-center justify-center p-8 min-h-[280px]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-64 w-full object-contain"
            />
          </div>
          <div className="p-6 flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <Badge
                className="w-fit text-xs mb-1"
                style={{
                  backgroundColor: "oklch(var(--brand-blue))",
                  color: "white",
                }}
              >
                {product.category}
              </Badge>
              <DialogTitle className="font-display text-xl leading-snug">
                {product.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-brand-blue">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
            <div>
              <h4 className="font-semibold text-sm mb-2">Key Specifications</h4>
              <ul className="grid grid-cols-1 gap-1.5">
                {product.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-sm">
                    <ChevronRight className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2 mt-auto pt-2">
              <Button
                type="button"
                className="flex-1 bg-brand-blue hover:bg-brand-blue-dark text-white"
                disabled={!product.inStock}
                data-ocid="product.modal.buy_now.button"
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Buy Now
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white"
                onClick={() => {
                  onClose();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                data-ocid="product.modal.enquire.button"
              >
                Enquire
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ContactForm() {
  const { actor } = useActor();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    product: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const fullMessage = `Phone: ${form.phone}\nProduct Interest: ${form.product}\n\n${form.message}`;
      await actor.submitContactForm(form.name, form.email, fullMessage);
    },
    onSuccess: () => {
      toast.success("Enquiry submitted! We'll contact you soon.");
      setForm({ name: "", email: "", phone: "", product: "", message: "" });
    },
    onError: () => {
      toast.error("Failed to submit. Please try again.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="space-y-4"
      data-ocid="contact.form"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="contact-name" className="text-sm font-medium">
            Full Name *
          </Label>
          <Input
            id="contact-name"
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            required
            data-ocid="contact.name.input"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="contact-email" className="text-sm font-medium">
            Email *
          </Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            required
            data-ocid="contact.email.input"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="contact-phone" className="text-sm font-medium">
            Phone Number
          </Label>
          <Input
            id="contact-phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
            data-ocid="contact.phone.input"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-sm font-medium">Product Interest</Label>
          <Select
            value={form.product}
            onValueChange={(v) => setForm((p) => ({ ...p, product: v }))}
          >
            <SelectTrigger data-ocid="contact.product.select">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.filter((c) => c !== "All").map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-1">
        <Label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </Label>
        <Textarea
          id="contact-message"
          placeholder="Tell us about your requirements..."
          rows={4}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          data-ocid="contact.message.textarea"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold py-3 h-auto"
        disabled={mutation.isPending}
        data-ocid="contact.submit.button"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </Button>
    </form>
  );
}

function Navbar({ activeSection }: { activeSection: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = ["home", "products", "about", "contact"];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-border shadow-xs">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button
          type="button"
          onClick={() => scrollTo("home")}
          className="flex items-center"
          aria-label="Go to homepage"
        >
          <img
            src="/assets/generated/ramsung-logo-transparent.dim_400x120.png"
            alt="Ramsung"
            className="h-10 object-contain"
          />
        </button>
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <button
              type="button"
              key={link}
              onClick={() => scrollTo(link)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeSection === link
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
              data-ocid={`nav.${link}.link`}
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          ))}
        </nav>
        <Button
          type="button"
          className="hidden md:flex bg-brand-blue hover:bg-brand-blue-dark text-white text-sm"
          onClick={() => scrollTo("contact")}
          data-ocid="nav.enquire.button"
        >
          Get Quote
        </Button>
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu.button"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white border-t border-brand-border px-4 py-3 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => scrollTo(link)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium capitalize text-left transition-colors hover:bg-muted"
                data-ocid={`nav.mobile.${link}.link`}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function RamsungApp() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSection] = useState("home");

  const filteredProducts =
    activeCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar activeSection={activeSection} />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[90vh] flex items-center overflow-hidden pt-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-banner.dim_1200x500.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/70 to-brand-navy/30" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 text-xs font-semibold px-3 py-1 bg-brand-blue/80 text-white border-0">
              New Collection 2026
            </Badge>
            <h1 className="font-display font-bold text-4xl md:text-6xl text-white leading-tight mb-4">
              Smarter Living
              <span className="block" style={{ color: "oklch(0.75 0.15 264)" }}>
                Starts Here
              </span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
              Explore Ramsung's premium range of home appliances & electronics —
              designed for modern Indian homes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                size="lg"
                className="bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold px-8 h-12"
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.shop_now.button"
              >
                Shop Now <ChevronRight className="ml-1 w-5 h-5" />
              </Button>
              <Button
                type="button"
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 font-semibold px-8 h-12 bg-transparent"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="hero.get_quote.button"
              >
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-navy/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "20+ Years", label: "Trusted Since 2005" },
              { value: "5 Lakh+", label: "Happy Customers" },
              { value: "500+", label: "Service Centers" },
              { value: "5★ Rating", label: "Customer Satisfaction" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="font-display font-bold text-lg text-white">
                  {value}
                </div>
                <div className="text-white/60 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Our Products
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover our full range of premium home appliances and electronics
              built for performance and longevity.
            </p>
          </motion.div>

          {/* Category Tabs */}
          <div
            className="flex flex-wrap gap-2 justify-center mb-8"
            data-ocid="products.category.tab"
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-brand-blue text-white shadow-md"
                    : "bg-white border border-brand-border text-muted-foreground hover:border-brand-blue hover:text-brand-blue"
                }`}
                data-ocid={`products.${cat.toLowerCase().replace(" ", "_")}.tab`}
              >
                {cat !== "All" && CATEGORY_ICONS[cat]}
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            data-ocid="products.list"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="products.empty_state"
            >
              No products in this category.
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-brand-blue-light/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 text-xs font-semibold px-3 py-1 bg-brand-blue/10 text-brand-blue border-0">
                About Us
              </Badge>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                Two Decades of Innovation
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Since 2005, Ramsung has been delivering world-class electronics
                and home appliances across India. Our commitment to innovation,
                quality, and customer satisfaction makes us a trusted name in
                every home.
              </p>
              <ul className="space-y-3">
                {[
                  "Industry-leading 5-year comprehensive warranty",
                  "Pan-India network of 500+ authorized service centers",
                  "ISO 9001:2015 certified manufacturing",
                  "Energy-efficient products with BEE star ratings",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <ChevronRight className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                className="mt-6 bg-brand-blue hover:bg-brand-blue-dark text-white"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="about.contact.button"
              >
                Contact Us <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: <Refrigerator className="w-7 h-7" />,
                  label: "Refrigerators",
                  count: "25+ Models",
                },
                {
                  icon: <Tv className="w-7 h-7" />,
                  label: "Televisions",
                  count: "30+ Models",
                },
                {
                  icon: <Smartphone className="w-7 h-7" />,
                  label: "Mobiles",
                  count: "20+ Models",
                },
                {
                  icon: <Wind className="w-7 h-7" />,
                  label: "Air Conditioners",
                  count: "15+ Models",
                },
              ].map(({ icon, label, count }) => (
                <Card
                  key={label}
                  className="p-5 text-center shadow-card border-brand-border hover:shadow-card-hover transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-3 text-brand-blue">
                    {icon}
                  </div>
                  <div className="font-display font-semibold text-foreground text-sm">
                    {label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {count}
                  </div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Get in Touch
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have questions or need a quote? Our team is ready to help you find
              the perfect product.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
            <div className="md:col-span-3">
              <Card className="p-6 shadow-card border-brand-border">
                <ContactForm />
              </Card>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
              {[
                {
                  icon: <Phone className="w-5 h-5" />,
                  label: "Phone",
                  value: "+91 8133045342",
                },
                {
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "ramsung@gmail.com",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Address",
                  value: "Silchar, Assam, India",
                },
              ].map(({ icon, label, value }) => (
                <Card
                  key={label}
                  className="p-4 shadow-xs border-brand-border flex items-start gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="font-medium text-sm text-foreground">
                      {value}
                    </div>
                  </div>
                </Card>
              ))}
              <Card className="p-5 shadow-xs border-brand-blue/20 bg-brand-blue/5 mt-auto">
                <h4 className="font-semibold text-sm mb-1">Business Hours</h4>
                <p className="text-xs text-muted-foreground">
                  Mon – Sat: 9:00 AM – 7:00 PM
                </p>
                <p className="text-xs text-muted-foreground">
                  Sunday: 10:00 AM – 5:00 PM
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-navy text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <img
                src="/assets/generated/ramsung-logo-transparent.dim_400x120.png"
                alt="Ramsung"
                className="h-10 mb-3 brightness-200"
              />
              <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                Smarter Living Starts Here. Bringing world-class electronics and
                home appliances to every Indian home since 2005.
              </p>
              <div className="flex gap-3 mt-4">
                {[
                  {
                    icon: <SiFacebook />,
                    label: "Facebook",
                    href: "https://facebook.com",
                  },
                  {
                    icon: <SiInstagram />,
                    label: "Instagram",
                    href: "https://instagram.com",
                  },
                  { icon: <SiX />, label: "X", href: "https://x.com" },
                  {
                    icon: <SiYoutube />,
                    label: "YouTube",
                    href: "https://youtube.com",
                  },
                ].map(({ icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand-blue hover:text-white transition-colors text-sm"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Products</h4>
              <ul className="space-y-2">
                {[
                  "Refrigerators",
                  "Televisions",
                  "Smartphones",
                  "Washing Machines",
                  "Air Conditioners",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#products"
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Support</h4>
              <ul className="space-y-2">
                {[
                  "Contact Us",
                  "Service Centers",
                  "Warranty Policy",
                  "Register Product",
                  "FAQs",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#contact"
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-white/50 text-xs">
            <span>
              &copy; {new Date().getFullYear()} Ramsung Electronics. All rights
              reserved.
            </span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors"
            >
              Built with ❤️ using caffeine.ai
            </a>
          </div>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RamsungApp />
    </QueryClientProvider>
  );
}
