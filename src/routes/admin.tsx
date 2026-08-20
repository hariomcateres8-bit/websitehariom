import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Shield,
  Utensils,
  Package,
  X,
  Save,
  ListChecks,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Search,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Layers,
  IndianRupee,
  Users,
  RefreshCw,
  Download,
  FileText,
  Upload,
  FileDown,
} from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site-layout";
import {
  downloadMasterMenuPdf,
  downloadPackagesPdf,
  downloadAdminDishesPdf,
  downloadCustomPackagesPdf,
} from "@/lib/master-pdf-downloader";
import {
  DISH_CATALOG,
  PACKAGES,
  COMPANY_INFO,
  CONTACT,
  TERMS_AND_CONDITIONS,
} from "@/lib/menu-data";
import {
  useAdminData,
  initAdminData,
  addCustomDish,
  updateCustomDish,
  removeCustomDish,
  addCustomPackage,
  updateCustomPackage,
  removeCustomPackage,
  clearAllAdminData,
  type CustomDish,
  type CustomPackage,
} from "@/lib/admin-store";

/** Parses a stored menu item entry ("name" or "name [img]<url>[img]") into name + image. */
function parseMenuItem(entry: string): { name: string; image?: string } {
  const imgMatch = entry.match(/\[img\](.*?)\[img\]/);
  if (imgMatch) {
    return { name: entry.replace(/\[img\].*?\[img\]/, "").trim(), image: imgMatch[1] };
  }
  return { name: entry };
}

export const Route = createFileRoute("/admin")({
  component: AdminPanelPage,
});

// 👇 Admin login credentials — sirf yahan code se change karein
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "hariom@123";
const AUTH_KEY = "hariom_admin_auth";

const EMPTY_DISH = { name: "", category: "", image: "" };
const EMPTY_PACKAGE = {
  name: "",
  price: 0,
  tagline: "",
  image: "",
  color: "#f2c94c",
  minPax: 500,
  categories: [{ name: "", count: 1, note: "", menuItems: [] }],
};

function AdminPanelPage() {
  const { customDishes, customPackages } = useAdminData();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualSync = async () => {
    setIsRefreshing(true);
    await initAdminData(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    initAdminData();
    try {
      if (typeof window !== "undefined" && window.sessionStorage.getItem(AUTH_KEY) === "yes") {
        setIsLoggedIn(true);
      }
    } catch {
      // ignore
    }
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"dishes" | "packages">("dishes");
  const [searchQuery, setSearchQuery] = useState("");

  const [dishForm, setDishForm] = useState<Omit<CustomDish, "id">>(EMPTY_DISH);
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [packageForm, setPackageForm] = useState<Omit<CustomPackage, "id">>(EMPTY_PACKAGE);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  const handleExportMasterJson = () => {
    const fullData = {
      catererInfo: {
        name: COMPANY_INFO.name,
        tagline: COMPANY_INFO.tagline,
        proprietor: COMPANY_INFO.proprietor,
        experience: COMPANY_INFO.experience,
        foodType: COMPANY_INFO.pureVegBadge,
        contact: {
          phoneNumbers: CONTACT.phones,
          email: CONTACT.email,
          address: CONTACT.address,
        },
      },
      signatureDishesWithImages: [
        {
          id: "royal-grazing-table",
          name: "Royal Live Grazing Table",
          category: "Signature Live Counter",
          tagline: "Proprietor Khimjibhai's Masterpiece",
          description:
            "A lavish royal grazing spread featuring artisanal cheese platters, cold dip bowls, gourmet bruschetta, seasoned nuts, and fresh seasonal fruit garnishes on illuminated wooden bars.",
          ingredients: [
            "Artisanal Cheese",
            "Cold Dips",
            "Herbed Lavash",
            "Fresh Berries",
            "Seasoned Almonds",
          ],
          image: "/src/assets/images/WhatsApp Image 2026-08-01 at 10.31.57 AM.jpeg",
        },
        {
          id: "cocktail-canapes-platter",
          name: "Gourmet Canapes & Starters",
          category: "Cocktail Finger Foods",
          tagline: "Handcrafted Fusion Delicacies",
          description:
            "Crisp savory tartlets, micro-canapes topped with spiced relish, avocado cream, and handcrafted fusion finger foods prepared fresh on-site for high-end celebrations.",
          ingredients: [
            "Savory Tartlets",
            "Spiced Herb Relish",
            "Avocado Mousse",
            "Microgreens",
            "Crispy Rounds",
          ],
          image: "/src/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (1).jpeg",
        },
        {
          id: "artisanal-dips-bar",
          name: "Cold Counter Dips & Crisps",
          category: "Artisanal Grazing Station",
          tagline: "Cold-Pressed Fresh Purees & Lavash",
          description:
            "Authentic freshly ground hummus, beetroot dip, creamy herb tahina, and garlic yogurt dip paired with freshly baked lavash ribbons and grishni breadsticks.",
          ingredients: [
            "Beetroot Hummus",
            "Classic Tahini Dip",
            "Garlic Herb Dip",
            "Lavash Ribbons",
            "Grishni",
          ],
          image: "/src/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (3).jpeg",
        },
        {
          id: "live-tandoor-starters",
          name: "Live Tandoori & Paneer Delicacies",
          category: "Live Sizzling Station",
          tagline: "Fresh Charcoal Grilled Delights",
          description:
            "Tender cottage cheese marinated in secret royal spices, skewered with bell peppers and roasted in live clay ovens, served piping hot with fresh pudina chutney.",
          ingredients: [
            "Farm-Fresh Paneer",
            "Secret Spices",
            "Roasted Bell Peppers",
            "Mint Coriander Glaze",
            "Chaat Masala",
          ],
          image: "/src/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (7).jpeg",
        },
        {
          id: "royal-sweets-platter",
          name: "Desi Ghee Royal Mithai Platter",
          category: "Traditional Grand Sweets",
          tagline: "Authentic Gujarati & Rajasthani Rasoi",
          description:
            "Rich traditional sweets crafted with 100% pure desi ghee, saffron strands, and premium nuts — including Mohanthal, Basundi, Kesar Rasgulla, and live Kesariya Jalebi.",
          ingredients: [
            "Pure Desi Ghee",
            "Kashmiri Kesar",
            "Pistachio & Almonds",
            "Fresh Mawa",
            "Cardamom",
          ],
          image: "/src/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (11).jpeg",
        },
        {
          id: "grand-banquet-spread",
          name: "Grand Royal Feast Presentation",
          category: "5-Star Banquet Experience",
          tagline: "Flawless Hospitality for 500 to 5,000+ Guests",
          description:
            "Comprehensive multi-course catering spread with brass chafing dishes, live counters, custom beverage bars, and impeccably trained hospitality managers.",
          ingredients: [
            "Multi-Course Feast",
            "Live Beverage Bar",
            "Brass Buffet Crockery",
            "Uniformed Hospitality",
          ],
          image: "/src/assets/images/WhatsApp Image 2026-08-01 at 10.31.58 AM (15).jpeg",
        },
      ],
      masterPackages: PACKAGES,
      dishCatalogByCategory: DISH_CATALOG,
      customAdminDishes: customDishes,
      customAdminPackages: customPackages,
      termsAndConditions: TERMS_AND_CONDITIONS,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hariom-complete-master-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Complete Master JSON (All Dishes, Packages & Images) downloaded!");
  };

  const handleExportJson = () => {
    const data = { customDishes, customPackages, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hariom-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Admin Data Backup JSON exported!");
  };

  const handleDownloadMenuSampleJson = () => {
    const sample = {
      customDishes: [
        { name: "Paneer Butter Masala", category: "MAIN COURSE (PANEER & VEG)" },
        { name: "Dal Tadka", category: "DAL & KADI" },
        { name: "Gulab Jamun", category: "DESSERTS & SWEETS" },
      ],
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-menu-planner-dishes.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sample Menu Planner JSON downloaded!");
  };

  const handleDownloadPackageSampleJson = () => {
    const sample = {
      customPackages: [
        {
          name: "VVIP Royal Buffet",
          price: 750,
          tagline: "Exclusive 7-Course Luxury Catering",
          minPax: 300,
          color: "#D97706",
          categories: [
            {
              name: "WELCOME DRINKS & MOCKTAILS",
              count: 3,
              menuItems: ["Blue Lagoon", "Fresh Lime Soda"],
            },
            {
              name: "STARTERS & SNACKS",
              count: 4,
              menuItems: ["Paneer Tikka", "Hara Bhara Kabab"],
            },
            {
              name: "MAIN COURSE (PANEER & VEG)",
              count: 5,
              menuItems: ["Paneer Lababdar", "Mix Veg"],
            },
            {
              name: "DESSERTS & SWEETS",
              count: 3,
              menuItems: ["Kesar Rasgulla", "Ice Cream"],
            },
          ],
        },
      ],
    };
    const blob = new Blob([JSON.stringify(sample, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sample-package-planner-packages.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Sample Package Planner JSON downloaded!");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const rawText = evt.target?.result as string;
        let parsed: Record<string, unknown> | unknown[];
        try {
          parsed = JSON.parse(rawText);
        } catch {
          const match = rawText.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
          if (match) {
            parsed = JSON.parse(match[0]);
          } else {
            throw new Error("Invalid format");
          }
        }

        let addedDishes = 0;
        let addedPkgs = 0;

        const obj = parsed as Record<string, unknown>;
        const isArr = Array.isArray(parsed);

        const rawDishList = Array.isArray(obj.customDishes)
          ? obj.customDishes
          : Array.isArray(obj.dishes)
            ? obj.dishes
            : Array.isArray(obj.custom_dishes)
              ? obj.custom_dishes
              : isArr &&
                  (parsed as Record<string, unknown>[]).every(
                    (x) => x && typeof x === "object" && "category" in x,
                  )
                ? (parsed as Record<string, unknown>[])
                : [];

        const rawPkgList = Array.isArray(obj.customPackages)
          ? obj.customPackages
          : Array.isArray(obj.packages)
            ? obj.packages
            : Array.isArray(obj.custom_packages)
              ? obj.custom_packages
              : isArr &&
                  (parsed as Record<string, unknown>[]).every(
                    (x) => x && typeof x === "object" && ("price" in x || "categories" in x),
                  )
                ? (parsed as Record<string, unknown>[])
                : [];

        if (rawDishList.length > 0) {
          rawDishList.forEach((d) => {
            const item = d as Record<string, unknown>;
            if (item && typeof item === "object" && item.name && item.category) {
              addCustomDish({
                name: String(item.name).trim(),
                category: String(item.category).trim(),
                image: item.image ? String(item.image).trim() : "",
              });
              addedDishes++;
            }
          });
        }

        if (rawPkgList.length > 0) {
          rawPkgList.forEach((p) => {
            const item = p as Record<string, unknown>;
            if (item && typeof item === "object" && item.name) {
              const rawCats = Array.isArray(item.categories) ? item.categories : [];
              const categories = rawCats.map((c) => {
                const catObj = (c || {}) as Record<string, unknown>;
                return {
                  name: String(catObj.name || "").trim(),
                  count: Number(catObj.count) || 1,
                  note: catObj.note ? String(catObj.note) : undefined,
                  menuItems: Array.isArray(catObj.menuItems)
                    ? catObj.menuItems.map(String)
                    : undefined,
                };
              });

              addCustomPackage({
                name: String(item.name).trim(),
                price: Number(item.price) || 0,
                tagline: item.tagline ? String(item.tagline).trim() : "",
                image: item.image ? String(item.image).trim() : "",
                color: item.color ? String(item.color).trim() : "#f2c94c",
                minPax: Number(item.minPax) || 500,
                categories,
              });
              addedPkgs++;
            }
          });
        }

        if (addedDishes === 0 && addedPkgs === 0) {
          toast.error("No valid dish or package records found in file.");
        } else {
          toast.success(
            `Data imported successfully! (${addedDishes} dishes, ${addedPkgs} packages). Display updated category-wise in Packages & Menu Planner.`,
          );
        }
      } catch {
        toast.error("Failed to parse file. Please upload a valid JSON/text data file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // Menu item "add new" form (per category) inside the package form.
  const [addingItemForCat, setAddingItemForCat] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemImage, setNewItemImage] = useState("");

  // Menu item "edit" form (per category) inside the package form.
  const [editingItemCatIdx, setEditingItemCatIdx] = useState<number | null>(null);
  const [editingItemValue, setEditingItemValue] = useState("");
  const [editingItemName, setEditingItemName] = useState("");
  const [editingItemImage, setEditingItemImage] = useState("");

  const resetDishForm = () => {
    setDishForm(EMPTY_DISH);
    setEditingDishId(null);
  };

  const resetPackageForm = () => {
    setPackageForm(EMPTY_PACKAGE);
    setEditingPackageId(null);
  };

  const handleSaveDish = () => {
    if (!dishForm.name.trim()) return;
    if (editingDishId) {
      updateCustomDish(editingDishId, dishForm);
    } else {
      addCustomDish(dishForm);
    }
    resetDishForm();
  };

  const handleEditDish = (d: CustomDish) => {
    setDishForm({ name: d.name, category: d.category, image: d.image });
    setEditingDishId(d.id);
    setTab("dishes");
  };

  const handleSavePackage = () => {
    if (!packageForm.name.trim()) return;
    const cleaned = {
      ...packageForm,
      categories: packageForm.categories.filter((c) => c.name.trim()),
    };
    if (editingPackageId) {
      updateCustomPackage(editingPackageId, cleaned);
    } else {
      addCustomPackage(cleaned);
    }
    resetPackageForm();
  };

  const handleEditPackage = (p: CustomPackage) => {
    setPackageForm({
      name: p.name,
      price: p.price,
      tagline: p.tagline,
      image: p.image,
      color: p.color,
      minPax: p.minPax,
      categories: p.categories.map((c) => ({ ...c })),
    });
    setEditingPackageId(p.id);
    setTab("packages");
  };

  const updateCategory = (idx: number, field: string, value: string | number) => {
    const next = [...packageForm.categories];
    next[idx] = { ...next[idx], [field]: value };
    setPackageForm({ ...packageForm, categories: next });
  };

  const addMenuItemToCategory = (catIdx: number) => {
    const name = newItemName.trim();
    if (!name) return;
    const next = packageForm.categories.map((c, i) => {
      if (i !== catIdx) return c;
      const items = c.menuItems ?? [];
      const image = newItemImage.trim();
      const entry = image ? `${name} [img]${image}[img]` : name;
      if (!items.includes(entry)) items.push(entry);
      return { ...c, menuItems: items };
    });
    setPackageForm({ ...packageForm, categories: next });
    setNewItemName("");
    setNewItemImage("");
    setAddingItemForCat(null);
  };

  const removeMenuItemFromCategory = (catIdx: number, item: string) => {
    const next = packageForm.categories.map((c, i) => {
      if (i !== catIdx) return c;
      return { ...c, menuItems: (c.menuItems ?? []).filter((m) => m !== item) };
    });
    setPackageForm({ ...packageForm, categories: next });
  };

  // Starts editing an existing menu item — only name and image can be changed.
  const startEditingMenuItem = (catIdx: number, item: string) => {
    const { name, image } = parseMenuItem(item);
    setAddingItemForCat(null);
    setEditingItemCatIdx(catIdx);
    setEditingItemValue(item);
    setEditingItemName(name);
    setEditingItemImage(image ?? "");
  };

  // Applies the name/image edit back into the package form state.
  const saveMenuItemEdit = (catIdx: number) => {
    const name = editingItemName.trim();
    if (!name) return;
    const image = editingItemImage.trim();
    const newEntry = image ? `${name} [img]${image}[img]` : name;

    const next = packageForm.categories.map((c, i) => {
      if (i !== catIdx) return c;
      return {
        ...c,
        menuItems: (c.menuItems ?? []).map((m) => (m === editingItemValue ? newEntry : m)),
      };
    });
    setPackageForm({ ...packageForm, categories: next });
    setEditingItemCatIdx(null);
    setEditingItemValue("");
    setEditingItemName("");
    setEditingItemImage("");
  };

  const cancelMenuItemEdit = () => {
    setEditingItemCatIdx(null);
    setEditingItemValue("");
    setEditingItemName("");
    setEditingItemImage("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError("");
      try {
        window.sessionStorage.setItem(AUTH_KEY, "yes");
      } catch {
        // ignore
      }
    } else {
      setError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setError("");
    try {
      window.sessionStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
  };

  const filteredDishes = customDishes.filter(
    (d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredPackages = customPackages.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isLoggedIn) {
    return (
      <SiteLayout>
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=80"
              alt="Admin Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero" />
          </div>
          <div className="relative max-w-6xl mx-auto px-4 text-primary-foreground">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-xs tracking-widest uppercase text-gold font-bold mb-3">
                <Shield className="w-4 h-4" /> Hariom Caterers Portal
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold">Admin Management</h1>
              <p className="mt-3 text-primary-foreground/85 max-w-xl mx-auto text-sm md:text-base">
                Secure access to customize dishes, menu categories, and catering packages across all
                browsers.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-background">
          <div className="max-w-md mx-auto">
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border/60 backdrop-blur-sm">
              <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-gradient-gold text-primary-foreground shadow-md mb-6">
                <Lock className="w-8 h-8" />
              </div>
              <h2 className="text-center font-display font-bold text-2xl text-foreground mb-1">
                Admin Sign In
              </h2>
              <p className="text-center text-xs text-muted-foreground mb-6">
                Enter your administrative credentials to continue
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground/80">
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                    className="w-full border border-input bg-background/50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground/80">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      autoComplete="current-password"
                      className="w-full border border-input bg-background/50 px-4 py-3 pr-11 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition cursor-pointer p-1"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-bold hover:bg-primary/90 transition shadow-lg hover:shadow-xl cursor-pointer active:scale-[0.98]"
                >
                  <Lock className="w-4 h-4" /> Authenticate &amp; Access
                </button>
              </form>
            </div>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Header Banner */}
      <section className="relative py-14 overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=80"
            alt="Admin Background"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 text-primary-foreground">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 backdrop-blur-md border border-gold/40 text-xs tracking-widest uppercase text-gold font-bold mb-2">
                <Shield className="w-3.5 h-3.5" /> Live Admin Control Panel
              </div>
              <h1 className="text-2xl md:text-4xl font-display font-bold">
                Menu &amp; Package Manager
              </h1>
              <p className="mt-2 text-primary-foreground/85 text-xs md:text-sm max-w-xl">
                Changes saved here persist instantly to the server and automatically sync across all
                browsers &amp; devices.
              </p>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex items-center gap-3">
              <div className="bg-background/20 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
                <p className="text-xl font-bold font-display text-gold">{customDishes.length}</p>
                <p className="text-[10px] text-primary-foreground/80 uppercase font-semibold">
                  Custom Dishes
                </p>
              </div>
              <div className="bg-background/20 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 text-center min-w-[90px]">
                <p className="text-xl font-bold font-display text-gold">{customPackages.length}</p>
                <p className="text-[10px] text-primary-foreground/80 uppercase font-semibold">
                  Custom Packages
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 px-4 bg-background min-h-[70vh]">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Bar: Tabs, Live Status, Manual Sync, Logout */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-2.5 rounded-3xl border border-border/60 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab("dishes")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  tab === "dishes"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Utensils className="w-4 h-4" /> Custom Dishes
                <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-background/20 font-mono">
                  {customDishes.length}
                </span>
              </button>

              <button
                onClick={() => setTab("packages")}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  tab === "packages"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Package className="w-4 h-4" /> Custom Packages
                <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] bg-background/20 font-mono">
                  {customPackages.length}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto px-2">
              {/* Sync status badge */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Multi-Browser Sync Active</span>
              </div>

              <button
                onClick={handleManualSync}
                disabled={isRefreshing}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition cursor-pointer"
                title="Force sync from server"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin text-primary" : ""}`}
                />
              </button>

              <div className="h-4 w-px bg-border my-auto" />

              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to clear ALL custom dishes and packages?")
                  ) {
                    clearAllAdminData();
                  }
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-destructive hover:bg-destructive/10 px-3 py-1.5 rounded-xl transition cursor-pointer"
                title="Delete all custom data"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:bg-muted/60 px-3 py-1.5 rounded-xl transition cursor-pointer"
                title="Logout from Admin"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

          {/* PDF Exporter & Data Tool Hub */}
          <div className="bg-card rounded-3xl p-6 border border-primary/20 shadow-card space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-1">
                  <Download className="w-3.5 h-3.5" /> Data &amp; PDF Management Hub
                </div>
                <h3 className="font-display font-bold text-lg text-foreground">
                  Menu Planner &amp; Package Planner PDF Download &amp; Import
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Download official PDF catalogs or import custom dishes and packages into your Menu
                  Planner &amp; Package Planner.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleExportMasterJson}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition shadow-sm cursor-pointer"
                  title="Download complete Master JSON with 500+ Dishes, All Packages and Real Images"
                >
                  <Download className="w-4 h-4" /> Download Complete Master JSON (All Dishes +
                  Packages + Images)
                </button>

                <button
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition cursor-pointer border border-amber-500/30"
                  title="Backup custom added items to JSON file"
                >
                  <FileDown className="w-3.5 h-3.5" /> Custom Items Backup JSON
                </button>

                <a
                  href="/hariom-master-dishes-and-packages.json"
                  download="hariom-master-dishes-and-packages.json"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-semibold hover:bg-secondary/80 transition border border-border"
                  title="Direct link to Master JSON file"
                >
                  <Download className="w-3.5 h-3.5 text-primary" /> Static Master JSON
                </a>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* MENU PLANNER HUB CARD */}
              <div className="bg-background/80 rounded-2xl p-4 border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <Utensils className="w-4 h-4" /> Menu Planner (Dishes &amp; Catalog)
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-primary/10 text-primary rounded-full font-semibold">
                    {customDishes.length} Custom Dishes
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Download PDF catalog for all Menu Planner categories, or import new custom dishes
                  from JSON file.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => downloadAdminDishesPdf(customDishes)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary/90 transition cursor-pointer"
                    title="Download Menu Planner Dishes PDF"
                  >
                    <FileText className="w-3.5 h-3.5" /> Download Dishes PDF
                  </button>

                  <button
                    onClick={downloadMasterMenuPdf}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-bold hover:bg-secondary/80 transition cursor-pointer border border-border"
                    title="Download Master Menu Catalog PDF"
                  >
                    <FileDown className="w-3.5 h-3.5 text-gold" /> Master Menu PDF
                  </button>

                  <label
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition cursor-pointer shadow-sm ml-auto"
                    title="Import Menu Planner Dishes JSON file"
                  >
                    <Upload className="w-3.5 h-3.5" /> Import Menu Data
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={handleDownloadMenuSampleJson}
                    className="text-[11px] text-muted-foreground hover:text-foreground underline decoration-dotted ml-1"
                    title="Download sample JSON format for Menu Planner"
                  >
                    Sample JSON
                  </button>
                </div>
              </div>

              {/* PACKAGE PLANNER HUB CARD */}
              <div className="bg-background/80 rounded-2xl p-4 border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                    <Package className="w-4 h-4" /> Package Planner (Packages &amp; Meals)
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full font-semibold">
                    {customPackages.length} Custom Packages
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Download printable Package PDF reports, or import complete meal packages into
                  Package Planner.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => downloadCustomPackagesPdf(customPackages)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-sm hover:bg-emerald-700 transition cursor-pointer"
                    title="Download Package Planner PDF"
                  >
                    <Package className="w-3.5 h-3.5" /> Download Packages PDF
                  </button>

                  <button
                    onClick={downloadPackagesPdf}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-bold hover:bg-secondary/80 transition cursor-pointer border border-border"
                    title="Download Full Packages List PDF"
                  >
                    <FileDown className="w-3.5 h-3.5 text-emerald-600" /> Packages List PDF
                  </button>

                  <label
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition cursor-pointer shadow-sm ml-auto"
                    title="Import Package Planner JSON file"
                  >
                    <Upload className="w-3.5 h-3.5" /> Import Package Data
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={handleDownloadPackageSampleJson}
                    className="text-[11px] text-muted-foreground hover:text-foreground underline decoration-dotted ml-1"
                    title="Download sample JSON format for Package Planner"
                  >
                    Sample JSON
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DISHES TAB */}
          {tab === "dishes" ? (
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Add / Edit Dish Form */}
              <div className="lg:col-span-2 bg-card rounded-3xl p-6 shadow-card border border-border/60 h-fit space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-gold" />
                    {editingDishId ? "Edit Custom Dish" : "Add New Dish"}
                  </h2>
                  {editingDishId && (
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      Editing Mode
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                      Dish Name *
                    </label>
                    <input
                      value={dishForm.name}
                      onChange={(e) => setDishForm({ ...dishForm, name: e.target.value })}
                      placeholder="e.g. Special Paneer Lababdar"
                      className="w-full border border-input bg-background/50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                      Category *
                    </label>
                    <input
                      value={dishForm.category}
                      onChange={(e) => setDishForm({ ...dishForm, category: e.target.value })}
                      placeholder="e.g. Main Course, Starters, Sweets"
                      className="w-full border border-input bg-background/50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                      Image URL (Optional)
                    </label>
                    <div className="relative">
                      <input
                        value={dishForm.image}
                        onChange={(e) => setDishForm({ ...dishForm, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full border border-input bg-background/50 px-4 py-3 pr-10 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                      />
                      <ImageIcon className="w-4 h-4 text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Image Live Preview */}
                  {dishForm.image && (
                    <div className="relative rounded-2xl overflow-hidden border border-border h-32 bg-muted">
                      <img
                        src={dishForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold">
                        Image Preview
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSaveDish}
                      disabled={!dishForm.name.trim()}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full text-xs font-bold hover:bg-primary/90 transition shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      {editingDishId ? "Update Dish" : "Save Dish"}
                    </button>
                    {editingDishId && (
                      <button
                        onClick={resetDishForm}
                        className="inline-flex items-center justify-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-3 rounded-full text-xs font-bold hover:bg-secondary/80 transition cursor-pointer"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Dish List */}
              <div className="lg:col-span-3 bg-card rounded-3xl p-6 shadow-card border border-border/60 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
                  <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <ListChecks className="w-5 h-5" />
                    Added Custom Dishes ({filteredDishes.length})
                  </h2>

                  {/* Search box */}
                  <div className="relative min-w-[200px]">
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search dishes..."
                      className="w-full border border-input bg-background/50 pl-9 pr-3 py-1.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                {filteredDishes.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-border rounded-2xl">
                    <Utensils className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm font-bold text-foreground">No dishes found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {searchQuery
                        ? "Try a different search query."
                        : "Fill the form on the left to add a custom dish."}
                    </p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                    {filteredDishes.map((d) => (
                      <div
                        key={d.id}
                        className={`flex items-start justify-between gap-3 border rounded-2xl p-3 transition hover:shadow-sm ${
                          editingDishId === d.id
                            ? "border-primary bg-primary/5"
                            : "border-border/60 bg-background/50"
                        }`}
                      >
                        <div className="flex gap-3 min-w-0">
                          {d.image ? (
                            <img
                              src={d.image}
                              alt={d.name}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-border"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-muted-foreground">
                              <Utensils className="w-5 h-5" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-bold text-foreground text-sm truncate">{d.name}</p>
                            <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1">
                              {d.category || "General"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => handleEditDish(d)}
                            className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition cursor-pointer"
                            title="Edit dish"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeCustomDish(d.id)}
                            className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition cursor-pointer"
                            title="Delete dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* PACKAGES TAB */
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Add / Edit Package Form */}
              <div className="lg:col-span-2 bg-card rounded-3xl p-6 shadow-card border border-border/60 h-fit space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-border/40">
                  <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <Package className="w-5 h-5 text-gold" />
                    {editingPackageId ? "Edit Package" : "Add New Package"}
                  </h2>
                  {editingPackageId && (
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
                      Editing Mode
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                      Package Name *
                    </label>
                    <input
                      value={packageForm.name}
                      onChange={(e) => setPackageForm({ ...packageForm, name: e.target.value })}
                      placeholder="e.g. Royal Deluxe Feast"
                      className="w-full border border-input bg-background/50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                        Price (₹ / plate)
                      </label>
                      <div className="relative">
                        <IndianRupee className="w-3.5 h-3.5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          value={packageForm.price || ""}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, price: Number(e.target.value) })
                          }
                          placeholder="450"
                          className="w-full border border-input bg-background/50 pl-9 pr-3 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                        Min Pax
                      </label>
                      <div className="relative">
                        <Users className="w-3.5 h-3.5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="number"
                          value={packageForm.minPax || ""}
                          onChange={(e) =>
                            setPackageForm({ ...packageForm, minPax: Number(e.target.value) })
                          }
                          placeholder="100"
                          className="w-full border border-input bg-background/50 pl-9 pr-3 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                      Tagline
                    </label>
                    <input
                      value={packageForm.tagline}
                      onChange={(e) => setPackageForm({ ...packageForm, tagline: e.target.value })}
                      placeholder="e.g. Royal multi-course wedding banquet"
                      className="w-full border border-input bg-background/50 px-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-foreground/80">
                      Image URL (Optional)
                    </label>
                    <div className="relative">
                      <input
                        value={packageForm.image}
                        onChange={(e) => setPackageForm({ ...packageForm, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full border border-input bg-background/50 px-4 py-3 pr-10 rounded-2xl outline-none focus:ring-2 focus:ring-primary focus:bg-background text-foreground text-sm transition"
                      />
                      <ImageIcon className="w-4 h-4 text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Categories & Menu Items builder */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-foreground/80">
                        Categories &amp; Menu Items ({packageForm.categories.length})
                      </label>
                      <button
                        onClick={() =>
                          setPackageForm({
                            ...packageForm,
                            categories: [
                              ...packageForm.categories,
                              { name: "", count: 1, note: "", menuItems: [] },
                            ],
                          })
                        }
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:bg-primary/10 px-2.5 py-1 rounded-full transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Category
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {packageForm.categories.map((c, idx) => {
                        const items = c.menuItems ?? [];
                        return (
                          <div
                            key={idx}
                            className="border border-border/70 bg-background/40 rounded-2xl p-3 space-y-2"
                          >
                            <div className="flex items-center gap-2">
                              <input
                                value={c.name}
                                onChange={(e) => updateCategory(idx, "name", e.target.value)}
                                placeholder="Category (e.g. Starters)"
                                className="flex-1 border border-input bg-background px-3 py-2 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary text-foreground font-semibold"
                              />
                              <input
                                type="number"
                                value={c.count}
                                onChange={(e) =>
                                  updateCategory(idx, "count", Number(e.target.value))
                                }
                                className="w-16 border border-input bg-background px-2 py-2 rounded-xl text-xs text-center outline-none focus:ring-2 focus:ring-primary text-foreground font-semibold"
                                title="Allowed item count"
                              />
                              {packageForm.categories.length > 1 && (
                                <button
                                  onClick={() =>
                                    setPackageForm({
                                      ...packageForm,
                                      categories: packageForm.categories.filter(
                                        (_, i) => i !== idx,
                                      ),
                                    })
                                  }
                                  className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition cursor-pointer"
                                  title="Remove category"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>

                            {/* Menu items list */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">
                                  Items ({items.length})
                                </span>
                              </div>

                              {items.length === 0 ? (
                                <p className="text-[11px] text-muted-foreground italic">
                                  No items added to this category yet.
                                </p>
                              ) : (
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                  {items.map((m) => {
                                    const { name: itemName, image: itemImg } = parseMenuItem(m);
                                    return (
                                      <span
                                        key={m}
                                        className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground pl-2 pr-1 py-1 rounded-full text-xs border border-border/50"
                                      >
                                        {itemImg && (
                                          <img
                                            src={itemImg}
                                            alt=""
                                            className="w-4 h-4 rounded-full object-cover shrink-0"
                                            onError={(e) => {
                                              (e.currentTarget as HTMLImageElement).style.display =
                                                "none";
                                            }}
                                          />
                                        )}
                                        <span className="truncate max-w-[120px]">{itemName}</span>
                                        <button
                                          onClick={() => startEditingMenuItem(idx, m)}
                                          className="p-0.5 rounded-full hover:bg-primary/15 text-primary cursor-pointer"
                                          title="Edit item (name & image)"
                                        >
                                          <Pencil className="w-3 h-3" />
                                        </button>
                                        <button
                                          onClick={() => removeMenuItemFromCategory(idx, m)}
                                          className="p-0.5 rounded-full hover:bg-destructive/15 text-destructive cursor-pointer"
                                          title="Remove item"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      </span>
                                    );
                                  })}
                                </div>
                              )}

                              {/* Inline edit form for an existing menu item (name + image only) */}
                              {editingItemCatIdx === idx && (
                                <div className="space-y-2 border-t border-border/60 pt-2 bg-primary/5 p-2 rounded-xl mb-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase text-primary">
                                      Edit Item (Name &amp; Image)
                                    </span>
                                    <button
                                      onClick={cancelMenuItemEdit}
                                      className="text-[11px] font-bold text-muted-foreground hover:text-foreground cursor-pointer"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                  <input
                                    value={editingItemName}
                                    onChange={(e) => setEditingItemName(e.target.value)}
                                    placeholder="Item name *"
                                    className="w-full border border-input bg-background px-3 py-1.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary text-foreground"
                                  />
                                  <input
                                    value={editingItemImage}
                                    onChange={(e) => setEditingItemImage(e.target.value)}
                                    placeholder="Image URL (optional)"
                                    className="w-full border border-input bg-background px-3 py-1.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary text-foreground"
                                  />
                                  <div className="flex gap-2 pt-1">
                                    <button
                                      onClick={() => saveMenuItemEdit(idx)}
                                      disabled={!editingItemName.trim()}
                                      className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/90 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <Save className="w-3 h-3" /> Update Item
                                    </button>
                                    <button
                                      onClick={cancelMenuItemEdit}
                                      className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold hover:bg-secondary/80 transition cursor-pointer"
                                    >
                                      <X className="w-3 h-3" /> Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Add new menu item form for this category */}
                            {addingItemForCat === idx ? (
                              <div className="space-y-2 border-t border-border/60 pt-2 bg-card p-2 rounded-xl">
                                <input
                                  value={newItemName}
                                  onChange={(e) => setNewItemName(e.target.value)}
                                  placeholder="Menu item name *"
                                  className="w-full border border-input bg-background px-3 py-1.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary text-foreground"
                                />
                                <input
                                  value={newItemImage}
                                  onChange={(e) => setNewItemImage(e.target.value)}
                                  placeholder="Image URL (optional)"
                                  className="w-full border border-input bg-background px-3 py-1.5 rounded-lg text-xs outline-none focus:ring-2 focus:ring-primary text-foreground"
                                />
                                <div className="flex gap-2 pt-1">
                                  <button
                                    onClick={() => addMenuItemToCategory(idx)}
                                    className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold hover:bg-primary/90 transition cursor-pointer"
                                  >
                                    <Save className="w-3 h-3" /> Add Item
                                  </button>
                                  <button
                                    onClick={() => {
                                      setAddingItemForCat(null);
                                      setNewItemName("");
                                      setNewItemImage("");
                                    }}
                                    className="inline-flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold hover:bg-secondary/80 transition cursor-pointer"
                                  >
                                    <X className="w-3 h-3" /> Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setAddingItemForCat(idx);
                                  setNewItemName("");
                                  setNewItemImage("");
                                }}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:bg-primary/10 px-2.5 py-1 rounded-full transition cursor-pointer"
                              >
                                <Plus className="w-3 h-3" /> Add Menu Item
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleSavePackage}
                      disabled={!packageForm.name.trim()}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full text-xs font-bold hover:bg-primary/90 transition shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-4 h-4" />
                      {editingPackageId ? "Update Package" : "Save Package"}
                    </button>
                    {editingPackageId && (
                      <button
                        onClick={resetPackageForm}
                        className="inline-flex items-center justify-center gap-1.5 bg-secondary text-secondary-foreground px-4 py-3 rounded-full text-xs font-bold hover:bg-secondary/80 transition cursor-pointer"
                      >
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Package List */}
              <div className="lg:col-span-3 bg-card rounded-3xl p-6 shadow-card border border-border/60 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/40">
                  <h2 className="font-display font-bold text-lg text-primary flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Added Custom Packages ({filteredPackages.length})
                  </h2>

                  {/* Search box */}
                  <div className="relative min-w-[200px]">
                    <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search packages..."
                      className="w-full border border-input bg-background/50 pl-9 pr-3 py-1.5 rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>
                </div>

                {filteredPackages.length === 0 ? (
                  <div className="text-center py-12 px-4 border border-dashed border-border rounded-2xl">
                    <Package className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm font-bold text-foreground">No packages found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {searchQuery
                        ? "Try a different search query."
                        : "Fill the form on the left to add a custom package."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {filteredPackages.map((p) => (
                      <div
                        key={p.id}
                        className={`border rounded-2xl p-4 transition space-y-3 ${
                          editingPackageId === p.id
                            ? "border-primary bg-primary/5"
                            : "border-border/60 bg-background/50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex gap-3 min-w-0">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="w-14 h-14 rounded-2xl object-cover shrink-0 border border-border"
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).style.display = "none";
                                }}
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-2xl bg-gradient-gold text-primary-foreground flex items-center justify-center shrink-0 shadow-sm font-bold text-lg">
                                {p.name.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <h3 className="font-bold text-foreground text-base truncate">
                                {p.name}
                              </h3>
                              <p className="text-xs text-muted-foreground truncate">
                                {p.tagline || "Custom Package"}
                              </p>

                              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                <span className="inline-flex items-center gap-0.5 text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                                  <IndianRupee className="w-3 h-3" /> {p.price} / plate
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                                  Min {p.minPax} pax
                                </span>
                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary px-2.5 py-0.5 rounded-full">
                                  {p.categories?.length || 0} Categories
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={() => handleEditPackage(p)}
                              className="p-2 rounded-xl text-primary hover:bg-primary/10 transition cursor-pointer"
                              title="Edit package"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeCustomPackage(p.id)}
                              className="p-2 rounded-xl text-destructive hover:bg-destructive/10 transition cursor-pointer"
                              title="Delete package"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Summary of categories */}
                        {p.categories && p.categories.length > 0 && (
                          <div className="pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                            {p.categories.map((cat, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-semibold text-foreground/80 bg-background border border-border/60 px-2 py-0.5 rounded-md"
                              >
                                {cat.name} ({cat.count})
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
