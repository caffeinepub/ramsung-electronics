import Map "mo:core/Map";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

actor {

  // ─── Legacy Types (retained for upgrade compatibility) ──────────────────────────

  type LegacySubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type CarListing = {
    id : Nat;
    make : Text;
    model : Text;
    year : Nat;
    price : Nat;
    mileage : Nat;
    fuelType : Text;
    transmission : Text;
    color : Text;
    imageUrl : Text;
    description : Text;
    available : Bool;
  };

  // Inquiry type kept with original `carInterest` field name for stable upgrade compatibility.
  // The frontend treats this field as "product interest".
  type Inquiry = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    carInterest : Text;
    timestamp : Int;
  };

  // ─── Legacy Stable Variables (must be retained to avoid discard errors) ────────────

  let submissions = Map.empty<Int, LegacySubmission>();
  let admins = Map.empty<Principal, {}>();
  let cars = Map.empty<Nat, CarListing>();
  var nextCarId : Nat = 0;

  // ─── New Types ───────────────────────────────────────────────────────────────────

  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Nat;
    description : Text;
    specs : [Text];
    imageUrl : Text;
    inStock : Bool;
    rating : Nat;
    reviews : Nat;
  };

  // ─── State ───────────────────────────────────────────────────────────────────

  var nextProductId : Nat = 0;
  var nextInquiryId : Nat = 0;
  let products = Map.empty<Nat, Product>();
  let inquiries = Map.empty<Nat, Inquiry>();

  // ─── Seed Data ───────────────────────────────────────────────────────────────

  func seedProducts() {
    if (nextProductId > 0) return;
    let seedData : [Product] = [
      // Refrigerators
      { id = 0; name = "Ramsung FrostFree 350L"; category = "Refrigerator"; price = 32999; description = "Double door frost-free refrigerator with inverter compressor and digital display."; specs = ["350L capacity", "Frost Free", "Inverter Compressor", "5 Star Rating", "10 Year Warranty"]; imageUrl = "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 128 },
      { id = 1; name = "Ramsung CoolEdge 220L"; category = "Refrigerator"; price = 18999; description = "Single door direct cool refrigerator, energy efficient with large vegetable box."; specs = ["220L capacity", "Direct Cool", "5 Star Rating", "Toughened Glass Shelves", "2 Year Warranty"]; imageUrl = "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 4; reviews = 95 },
      { id = 2; name = "Ramsung MultiDoor 500L"; category = "Refrigerator"; price = 65999; description = "French door multi-door refrigerator with water dispenser and smart diagnostics."; specs = ["500L capacity", "Multi-Door", "Water Dispenser", "Smart Inverter", "3 Year Warranty"]; imageUrl = "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 67 },
      // TVs
      { id = 3; name = "Ramsung CrystalView 55\" 4K"; category = "TV"; price = 49999; description = "55-inch 4K UHD Smart TV with HDR10+, built-in Alexa, and crystal display technology."; specs = ["55 inch 4K UHD", "HDR10+", "Smart TV", "60Hz", "Built-in Alexa"]; imageUrl = "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 203 },
      { id = 4; name = "Ramsung SlimOLED 65\""; category = "TV"; price = 124999; description = "65-inch OLED TV with infinite contrast, 120Hz refresh rate and Dolby Atmos sound."; specs = ["65 inch OLED", "120Hz", "Dolby Atmos", "4K HDR", "Slim Bezel"]; imageUrl = "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 87 },
      { id = 5; name = "Ramsung BasicSmart 32\" HD"; category = "TV"; price = 14999; description = "32-inch HD Ready Smart TV with built-in streaming apps and 20W sound output."; specs = ["32 inch HD", "Smart TV", "20W Sound", "2 HDMI", "USB Support"]; imageUrl = "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 4; reviews = 312 },
      // Mobiles
      { id = 6; name = "Ramsung Galaxy X20"; category = "Mobile"; price = 79999; description = "Flagship smartphone with 200MP camera, 5G, 5000mAh battery and Dynamic AMOLED display."; specs = ["200MP Camera", "5G", "5000mAh", "6.7\" AMOLED", "256GB Storage"]; imageUrl = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 451 },
      { id = 7; name = "Ramsung Mid Pro M15"; category = "Mobile"; price = 24999; description = "Mid-range powerhouse with 50MP triple camera, 6000mAh battery and fast charging."; specs = ["50MP Triple Camera", "6000mAh", "33W Fast Charge", "6.5\" Display", "128GB Storage"]; imageUrl = "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 4; reviews = 278 },
      { id = 8; name = "Ramsung Fold Z4"; category = "Mobile"; price = 159999; description = "Premium foldable smartphone with dual screen, S-Pen support and 12GB RAM."; specs = ["Foldable Display", "12GB RAM", "S-Pen", "5G", "512GB Storage"]; imageUrl = "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 134 },
      // Washing Machines
      { id = 9; name = "Ramsung WashPro 7Kg"; category = "Washing Machine"; price = 27999; description = "7Kg front-load washing machine with steam wash, AI wash cycle and hygiene steam."; specs = ["7Kg Load", "Front Load", "Steam Wash", "1400 RPM", "5 Star Rating"]; imageUrl = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 189 },
      { id = 10; name = "Ramsung EcoWash 8Kg"; category = "Washing Machine"; price = 35999; description = "8Kg top-load washing machine with eco bubble technology and digital inverter motor."; specs = ["8Kg Load", "Top Load", "Eco Bubble", "Digital Inverter", "10 Year Motor Warranty"]; imageUrl = "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 4; reviews = 143 },
      { id = 11; name = "Ramsung ComboWash 10Kg"; category = "Washing Machine"; price = 54999; description = "10Kg washer-dryer combo with AI OptiWash, QuickDrive and auto dose dispenser."; specs = ["10Kg Wash / 6Kg Dry", "Combo Unit", "AI OptiWash", "QuickDrive", "1600 RPM"]; imageUrl = "https://images.unsplash.com/photo-1567789884554-0b844b597180?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 76 },
      // AC
      { id = 12; name = "Ramsung WindCool 1.5T Split"; category = "AC"; price = 37999; description = "1.5 Ton 5-Star Split AC with triple inverter, 4-way swing and anti-bacterial filter."; specs = ["1.5 Ton", "5 Star", "Triple Inverter", "Wi-Fi Control", "4-Way Swing"]; imageUrl = "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 5; reviews = 217 },
      { id = 13; name = "Ramsung FreezeCool 2T Cassette"; category = "AC"; price = 62999; description = "2 Ton Cassette AC ideal for large spaces with 360-degree airflow and auto clean."; specs = ["2 Ton", "Cassette Type", "360° Airflow", "Auto Clean", "Inverter"]; imageUrl = "https://images.unsplash.com/photo-1580595999172-787970a962d9?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 4; reviews = 52 },
      { id = 14; name = "Ramsung PortaCool 1T Window"; category = "AC"; price = 24999; description = "1 Ton Window AC for small rooms with 5-star rating and dust filter with auto restart."; specs = ["1 Ton", "Window Type", "5 Star", "Auto Restart", "Turbo Cool"]; imageUrl = "https://images.unsplash.com/photo-1572660849062-6d4c58d36f2d?auto=format&fit=crop&w=800&q=80"; inStock = true; rating = 4; reviews = 98 },
    ];
    for (p in seedData.vals()) {
      products.add(p.id, p);
      nextProductId += 1;
    };
  };

  seedProducts();

  // ─── Product Functions ────────────────────────────────────────────────────────

  public query func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  public query func getProductById(id : Nat) : async ?Product {
    products.get(id);
  };

  // ─── Inquiry Functions ────────────────────────────────────────────────────────

  // Note: `carInterest` field is kept for stable upgrade compatibility.
  // The frontend passes the product category as this value.
  public shared func submitInquiry(
    name : Text, email : Text, phone : Text,
    message : Text, productInterest : Text
  ) : async Nat {
    let id = nextInquiryId;
    let inquiry : Inquiry = {
      id; name; email; phone; message;
      carInterest = productInterest;
      timestamp = Time.now();
    };
    inquiries.add(id, inquiry);
    nextInquiryId += 1;
    id;
  };

  public query func getAllInquiries() : async [Inquiry] {
    inquiries.values().toArray().sort(func(a, b) { Int.compare(b.timestamp, a.timestamp) });
  };

};
