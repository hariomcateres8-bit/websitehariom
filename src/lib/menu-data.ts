import { getCustomDishes, getCustomPackages } from "@/lib/admin-store";
import type { CustomPackage } from "@/lib/admin-store";

export type PackageId = "classic" | "regal" | "grand" | "majestic";

/** Package ids used in URLs / built-in package lookup. Custom ids are strings. */
export type AnyPackageId = PackageId | (string & {});

export interface PackageOption {
  label: string;
  minPax: number;
  categories: {
    name: string;
    count: number;
    note?: string;
    menuItems?: string[];
  }[];
}

export interface Package {
  id: PackageId;
  name: string;
  price: number;
  tagline: string;
  color: string;
  options: PackageOption[];
}

export const PACKAGES: Package[] = [
  {
    id: "classic",
    name: "Classic",
    price: 850,
    tagline: "Traditional Gujarati thali with all the essentials",
    color: "#f2c94c",
    options: [
      {
        label: "Option 1",
        minPax: 500,
        categories: [
          { name: "Welcome Juice / Mocktail", count: 1 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Live Chat", count: 2 },
          { name: "Farsan", count: 1 },
          { name: "Chutney", count: 1 },
          { name: "Sweet", count: 2 },
          { name: "Main Course", count: 2 },
          { name: "Indian Bread", count: 2 },
          { name: "Papad", count: 1 },
          { name: "Dal", count: 1 },
          { name: "Rice", count: 1 },
          { name: "Salad", count: 2 },
          { name: "Achar", count: 1 },
          { name: "Mukhwas", count: 1 },
          { name: "Dessert", count: 1 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
      {
        label: "Option 2",
        minPax: 1000,
        categories: [
          { name: "Welcome Juice / Mocktail", count: 2 },
          { name: "Soup", count: 2 },
          { name: "Starters", count: 2 },
          { name: "Live Chat", count: 3 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Sweet", count: 2 },
          { name: "Main Course", count: 2 },
          { name: "Indian Bread", count: 2 },
          { name: "Papad", count: 2 },
          { name: "Dal", count: 1 },
          { name: "Rice", count: 1 },
          { name: "Salad", count: 3 },
          { name: "Achar", count: 1 },
          { name: "Mukhwas", count: 1 },
          { name: "Dessert", count: 1 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
    ],
  },
  {
    id: "regal",
    name: "Regal",
    price: 1050,
    tagline: "Royal multi-course banquet with Mocktail Bar & Special Live Counters",
    color: "#ec4899",
    options: [
      {
        label: "Option 1",
        minPax: 500,
        categories: [
          { name: "Welcome Fresh", count: 1 },
          { name: "Mocktail", count: 6 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Live Counter", count: 3 },
          { name: "Sweet", count: 2 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Main Course", count: 3 },
          { name: "Indian Bread", count: 3 },
          { name: "Papad", count: 2 },
          { name: "Dal", count: 1 },
          { name: "Rice", count: 1 },
          { name: "Salad", count: 2 },
          { name: "Achar", count: 2 },
          { name: "Mukhwas", count: 1 },
          { name: "Dessert", count: 1 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
      {
        label: "Option 2",
        minPax: 1000,
        categories: [
          { name: "Welcome Fresh", count: 2 },
          { name: "Mocktail Bar", count: 7 },
          { name: "Shots", count: 1 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Live Counter", count: 2 },
          {
            name: "Special Live Counter",
            count: 1,
            note: "Italian, Mexican, Oriental, Mongolian, Lebanese, Moroccan, Thai, Swiss Counter, Amritsari",
          },
          { name: "Sweet", count: 3 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Main Course", count: 3 },
          { name: "Indian Bread", count: 3 },
          { name: "Papad", count: 2 },
          { name: "Dal", count: 1 },
          { name: "Rice", count: 1 },
          { name: "Salad", count: 3 },
          { name: "Achar", count: 2 },
          { name: "Paan", count: 1 },
          { name: "Dessert", count: 2 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
    ],
  },
  {
    id: "grand",
    name: "Grand",
    price: 1200,
    tagline: "An expanded spread with live counters and specials",
    color: "#9dc94c",
    options: [
      {
        label: "Option 1",
        minPax: 500,
        categories: [
          { name: "Welcome Fresh", count: 1 },
          { name: "Mocktail Bar", count: 7 },
          { name: "Shots", count: 2 },
          { name: "Mobile Starters", count: 1 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Live Counter", count: 3 },
          {
            name: "Special Live",
            count: 1,
            note: "Italian, Mexican, Oriental, Mongolian, Lebanese, Moroccan, Thai, Swiss Counter, Amritsari",
          },
          { name: "Sweet", count: 3 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Main Course", count: 3 },
          { name: "Indian Bread", count: 3 },
          { name: "Papad", count: 2 },
          { name: "Dal", count: 1 },
          { name: "Rice", count: 1 },
          { name: "Salad", count: 3 },
          { name: "Achar", count: 2 },
          { name: "Paan", count: 1 },
          { name: "Dessert", count: 2 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
      {
        label: "Option 2",
        minPax: 1000,
        categories: [
          { name: "Welcome Fresh", count: 2 },
          { name: "Mocktail Bar", count: 1 },
          { name: "Shots", count: 3 },
          { name: "Mobile Starters", count: 2 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Live Counter", count: 3 },
          {
            name: "Special Live",
            count: 1,
            note: "Italian, Mexican, Oriental, Mongolian, Lebanese, Moroccan, Thai, Swiss Counter, Amritsari",
          },
          { name: "Sweet", count: 4 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Main Course", count: 3 },
          { name: "Indian Bread", count: 4 },
          { name: "Papad", count: 2 },
          { name: "Dal", count: 2 },
          { name: "Rice", count: 2 },
          { name: "Salad", count: 3 },
          { name: "Achar", count: 2 },
          { name: "Mukhwas", count: 1 },
          { name: "Paan Counter", count: 1 },
          { name: "Dessert", count: 3 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
    ],
  },
  {
    id: "majestic",
    name: "Majestic",
    price: 1600,
    tagline: "Our premium royal spread — pure indulgence",
    color: "#4cbdd6",
    options: [
      {
        label: "Option 1",
        minPax: 500,
        categories: [
          { name: "Welcome Fresh", count: 2 },
          { name: "Mocktail Bar", count: 7 },
          { name: "Shots", count: 2 },
          { name: "Mobile Starters", count: 2 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Live Counter", count: 3 },
          {
            name: "Special Live",
            count: 2,
            note: "Italian, Mexican, Oriental, Mongolian, Lebanese, Moroccan, Thai, Swiss Counter, Amritsari",
          },
          { name: "Sweet", count: 4 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Main Course", count: 3 },
          { name: "Indian Bread", count: 4 },
          { name: "Papad", count: 3 },
          { name: "Dal", count: 2 },
          { name: "Rice", count: 3 },
          { name: "Salad", count: 3 },
          { name: "Achar", count: 2 },
          { name: "Paan Mukhwas", count: 1 },
          { name: "Dessert Bar", count: 1 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
      {
        label: "Option 2",
        minPax: 1000,
        categories: [
          { name: "Welcome Fresh", count: 3 },
          { name: "Mocktail Bar", count: 7 },
          { name: "Shots", count: 3 },
          { name: "Mobile Starters", count: 2 },
          { name: "Soup", count: 2 },
          { name: "Starter", count: 2 },
          { name: "Bread Station", count: 1 },
          { name: "Live Counter", count: 3 },
          {
            name: "Special Live",
            count: 2,
            note: "Italian, Mexican, Oriental, Mongolian, Lebanese, Moroccan, Thai, Swiss Counter, Amritsari",
          },
          { name: "Sweet", count: 5 },
          { name: "Farsan", count: 2 },
          { name: "Chutney", count: 2 },
          { name: "Main Course", count: 4 },
          { name: "Indian Bread", count: 4 },
          { name: "Papad", count: 3 },
          { name: "Dal", count: 2 },
          { name: "Rice", count: 2 },
          { name: "Salad Bar", count: 5 },
          { name: "Achar", count: 2 },
          { name: "Paan Counter", count: 1 },
          { name: "Western Dessert Bar", count: 1 },
          { name: "200 ml water bottle", count: 1 },
        ],
      },
    ],
  },
];

// Dish catalog — comprehensive 18-page PDF menu options per category
export const DISH_CATALOG: Record<string, string[]> = {
  // Page 3: Drinks, Starters & Sweets
  Appetizers: [
    "Orange",
    "Orange Guava",
    "Watermelon Falsa",
    "Black Grapes Pomegranate",
    "Sweet Lime",
    "Pineapple",
    "Apple Juice",
    "Guava",
    "Black Grapes",
    "Black Grapes Green Grapes",
    "Kiwi",
    "Kiwi Pineapple",
    "Orange Almond",
    "Orange Peach",
    "Plum Pineapple",
    "Guava Pineapple",
    "Hajma Hajam",
    "Lemon Mint Mojito",
    "Masala Butter Milk",
    "Lemon Water",
    "Coconut Water",
    "Sugarcane",
    "Thandai (Flavour)",
    "Guava Mojito",
    "Lovers Fly",
    "Orange Colada",
    "Pineapple Lemon Mojito",
    "Orange Strawberry",
  ],
  "Welcome Juice / Mocktail": [
    "Orange",
    "Orange Guava",
    "Watermelon Falsa",
    "Black Grapes Pomegranate",
    "Sweet Lime",
    "Pineapple",
    "Apple Juice",
    "Guava",
    "Lemon Mint Mojito",
    "Masala Butter Milk",
    "Sugarcane",
    "Thandai (Flavour)",
  ],
  "Welcome Fresh": [
    "Coconut Water",
    "Fresh Sugarcane",
    "Nimbu Pani",
    "Chaas",
    "Kesar Lassi",
    "Mint Cooler",
    "Sweet Lime",
    "Pineapple",
  ],
  "Mocktails & Beverages": [
    "French Kiss",
    "Deep - Blue- Sea",
    "Virgin -Mojito",
    "Blue Heaven",
    "Purple Rain",
    "Rose - Martini",
    "Orange Blossom",
    "Winter Cool",
    "Green Dragon",
    "Hawaiian Kiss",
    "Guava Smoothie",
    "Strawberry Smoothie",
    "Pina Colada",
    "Coconut Litchi Mocktail",
    "Coconut Litchi Cooler",
    "Pink Lady",
    "Guava Strawberry",
    "Blue Logan",
    "Apple Bear",
    "Fruit Punch",
  ],
  "Mocktail Bar": [
    "Virgin Mojito",
    "Blue Lagoon",
    "Pina Colada",
    "Fruit Punch",
    "Strawberry Fizz",
    "Mango Tango",
    "Green Apple Cooler",
    "French Kiss",
    "Blue Heaven",
    "Purple Rain",
  ],
  Shots: ["Wheatgrass Shot", "Ginger Shot", "Amla Shot", "Turmeric Shot", "Pani Puri Shots"],
  "Tea & Coffee": [
    "Green Tea",
    "Masala Tea",
    "Peppermint Tea",
    "Kashmiri Kahva",
    "Kesar Tea",
    "Espresso Coffee",
    "Cappuccino",
    "Chocolate Coffee Bar",
  ],
  "Mobile Starters": [
    "Badam Butterscotch Ball",
    "Cheese Paneer Wonton",
    "Mini Cheese Paneer Samosa",
    "Cheese Spinach Ball",
    "Cheese Capsicum Samosa",
    "Cheese Corn Volvo",
    "Assorted Barbeque",
    "Cheese Potato Shot",
    "Cheese Muncheese Ball",
    "Chocolate Tart",
    "Chinese Ball",
    "Cheese Corn Cake",
    "Pan Roll",
    "Litchi Bite",
    "Fried Ravioli with Schezwan Sauce",
  ],
  "Sweet Starter": [
    "Pista Banquet",
    "Anjeer Exotica",
    "Khajoor Lounge",
    "Tri Colour Dry Fruit Cake",
    "Cashew Choco Roll",
    "Orange Petha Roll",
    "Turkish Delight",
    "Assorted Sandesh",
    "Fresh Fruits",
  ],

  // Page 4: Soups & Starters
  Soups: [
    "Cream of Broccoli & Asparagus Topped With Cappuccino",
    "Thai Coriander Soup with Crispy Rice",
    "Tomato Bisque with Basil & Feta Cheese",
    "Orange Tomato Soup",
    "Mexican Chilly Beans Tomato Soup",
    "Lemon Coriander Soup",
    "Hot and Sour Soup",
    "Asian Green Soup",
    "Broccoli Almond Soup",
    "Californian Almond Soup with Almond Chunks",
    "Cheese Corn Tomato Soup",
    "Z Soup",
    "Cream of Tomato Soup",
    "Manchow Soup",
    "Minestrone Soup",
    "Italian Vegetable Broth Soup",
    "Mutter Mushroom Soup",
    "Malaysian Green Soup",
    "Thai Green Soup",
    "Veg Green Coconut Soup",
    "Thai Coconut Soup",
    "Tomato Basil Soup",
    "Cheese Tomato Soup",
    "Vegetable Corn Soup",
    "Double Corn Maaza Soup",
    "Watermelon Cold Soup",
    "Vegetable Chimney Soup",
    "Vegetable Clear Soup",
    "Vegetable Tuscan Soup",
    "Thai Clear Soup (Tom-Yum-Phak)",
    "Talumien Soup",
    "Herbs and Veggies Soup",
    "Cappuccino of Corn Soup",
    "Shanghai Veg. Soup",
    "Japanese Miso Soup",
    "Roasted Pumpkin Soup",
    "Laska Lemon Soup",
    "Hot - Pot Station",
    "Khowsuey Soup",
    "Water Chestnuts And Coriander Chilli Broth Soup",
    "Garden Green Soup",
    "Veg Oriental Soup",
  ],
  Soup: [
    "Sweet Corn Soup",
    "Manchow Soup",
    "Tomato Basil",
    "Hot & Sour",
    "Cream of Broccoli",
    "Lemon Coriander",
    "Palak Shorba",
    "Tomato Bisque",
    "Asian Green Soup",
  ],

  "Starters & Snacks": [
    "Barbecue",
    "Cheese Jalapeno Fritters",
    "Onion Capsicum Fritters",
    "Assorted Canapes Nachos",
    "Panini",
    "Cheese Garlic Bread",
    "Vegetable Croissant",
    "Paneer Finger Schezwan",
    "Tacos",
    "Paneer Chilly Fry",
    "Arancini Ball",
    "Sundried Tomato Pesto Grilled Paneer",
    "Panko Fried Balsamic Soaked Cheesy",
    "Litchis On a Lolo Russo Leaf",
    "American Corn Potato Roll",
    "Baby Corn Bhajiya",
    "Coin Pizza",
    "Baby Corn Chilly Fry",
    "Soya Keema Bruschetta",
    "Butter Stick",
    "Bread Station",
    "Cheese Broccoli Spinach Tart",
    "Dry Manchurian Chilly Fry",
    "Corn Capsicum Tikki",
    "Cheese Spinach Panini",
    "Crispy Water Chestnut",
    "Cheese Spinach Straw",
    "Grilled Cottage Cheese with Barbecue Sauce",
    "Cheese Potato Fritters",
    "Dry Paneer Tikka",
    "Herbs Itna Potato",
    "French Fry With Cheese Sauce",
    "Calzone Pocket",
    "Lebanese Panini",
    "Mexican Cheese Pouches Tart",
    "Lollipop",
    "Mexican Jalapeno Cheese Pouches Tikki",
    "Mexican Puff",
    "Pizza Platters",
    "Paneer Coriander Schezwan",
    "Spinach and Corn Quiche",
    "Thai Spicy Paneer",
    "Vegetable Fritters",
    "Vegetable Bucket",
    "Volvo In Cheese Broccoli",
    "Cheese Spinach Cigar",
    "Russian Salad Tartlets",
    "Herbs & Onion Croissant",
    "Cocktail Samosas",
    "Paneer Tikki",
    "Corn Mexican Croquettes",
    "Vegetable Satay with Peanut Sauce",
    "Honey Chilli Cauliflower",
    "Sesame On Toast",
    "Stuffed Zucchini Roll",
    "Mutter Bhakharwadi",
    "Small Quesadillas",
    "Vegetable Ganneri Kebab Served in Shot Glass",
    "Paneer Cubes Tossed in Pesto Sauce",
    "Samosa Canapes",
    "Herbed Potato Wedges",
    "Semolina Puchka",
    "Potato Mozzarella on Sugarcane Sticks",
    "Tomato Fondue",
    "Cocktail Aloo Mutter Kachori",
    "Tandoori Momos",
    "Sundried Tomato Pesto Grilled Paneer & Pimento",
    "Shashlik",
    "Faldhari Kebab",
    "Lucknowi Tunday Kebab",
    "Japanese Tempura",
    "Green Chilli Masala Cheese Finger",
    "Masala Podi Idlis",
    "Cheese Vegetable Basil Tarts",
    "Mini Rossly With Salsa",
    "Cheese Palak Kebab",
    "Vegetable Kebab",
    "Chinese Kebab",
    "Cheese Pudina Kebab",
    "Hara Bhara Kebab",
    "Til Ka Seekh",
    "Rajma Kebab",
  ],
  Starter: [
    "Paneer Tikka",
    "Hara Bhara Kebab",
    "Veg Seekh Kebab",
    "Cheese Balls",
    "Corn Cheese Roll",
    "Mushroom Duplex",
    "Dahi Ke Kebab",
    "Cheese Jalapeno Fritters",
    "Cheese Garlic Bread",
  ],

  // Page 5: Chaat
  "Indian Live Chaat": [
    "Paan Patta Chaat",
    "Crispy Aloo Tikki with Mutter Patila",
    "Ragda Patties",
    "Dahi Papadi Chaat",
    "Ragda Samosa Chaat",
    "Pani Puri",
    "Sev Papadi Chaat",
    "Khasta Kachori Chaat",
    "Stuffed Aloo Tikki",
    "Dahi Masti Chaat",
    "Rajbhog Chaat",
    "Aloo Tikki",
    "Basket Chaat",
    "Bengali Khumcha Chaat",
    "Bread Tikki Chaat",
    "Corn Caps Tikki",
    "Dry Fruit Chana Chaat",
    "Dal Pakavan",
    "Dhokla Chaat",
    "Kurmura Chaat",
    "Idli Takatak",
    "Rasgulla Spicy Chaat",
    "Tikki Cholle",
    "Churhaa Mutter ki Chat",
    "Agra Ka Bhalla",
    "English Dry Fruit Chaat",
    "Bombay Bhel Puri Chaat",
    "Lotan Ki Cholle Chaat",
    "Khajoor Sakkariya Chaat",
    "Muth Kachori Chaat",
    "Chilla (Paneer, Mutter, Hyderabadi, Plain)",
  ],
  "Live Chat": [
    "Pani Puri",
    "Sev Puri",
    "Dahi Puri",
    "Bhel Puri",
    "Ragda Pattice",
    "Dabeli",
    "Vada Pav",
    "Paan Patta Chaat",
    "Dal Pakavan",
  ],

  // Page 6: Regional Chaats, Italian Live, Pasta, Risotto & Breads
  "Banarasi Chaat": [
    "Palak Papdi",
    "Banarasi Dahi Gujiya",
    "Aloo Mutter Chaat",
    "Kachori Channa",
    "Kalmi Chaat",
    "Tamater Ki Chaat",
  ],
  "Special Chaat": [
    "Moonglet Chaat",
    "Bread Tikki",
    "Sprouted Chaat",
    "Dosa (Spring, Mini, Rava)",
    "Uttapam",
  ],
  "Indore Chaat": [
    "Sabudana Ki Khichadi",
    "Sabudana Kees",
    "Makai Chivda Chaat",
    "Aloo Sabudana Tikki",
  ],
  "Italian Live - Pizza Bar": [
    "Margarita",
    "Tri Pepperoni",
    "Indian Special Pizza",
    "Romano Pizza",
  ],
  "Pasta Bar": ["Penne", "Fusilli", "Farfalle", "Macaroni", "Spaghetti", "Ravioli in Pink Sauce"],
  "Italian Sauces": [
    "Basil Pesto Sauce",
    "Arrabiata Sauce",
    "Cheese Sauce",
    "Roasted Red Paper Sauce",
    "Sun Dried Tomato Sauce",
    "Neapolitan",
  ],
  Risotto: [
    "Risotto Eila Milano",
    "Exotic Fruit Risotto",
    "Peas Asparagus and Cheese Risotto",
    "Rice Risotto",
    "Sundried Tomato And Pink Nut",
  ],
  "Italian & Continental Main Course": [
    "Vegetable Au Gratin",
    "Baked Veg. Princess",
    "Cauliflower Mornay",
    "Vegetable Lasagna",
    "Caponata Piccante",
    "Cannelloni Florentine",
    "Bread Basket",
    "Garlic Bread with Stuffed Olives & Cheese",
  ],
  "Assortment of Breads": [
    "Dinner Rolls",
    "Sesame Buns",
    "Hard Roll",
    "Bread Sticks",
    "Wholesome Loaves of Whole Wheat",
    "Bran Bread",
    "Brown and Seven-grain Breads",
  ],
  "Bread Station": [
    "Assorted Kulcha",
    "Stuffed Naan",
    "Focaccia",
    "Garlic Bread",
    "Dinner Rolls",
    "Sesame Buns",
  ],

  // Page 7: Mexican, South American, Thai & Oriental
  Mexican: [
    "Mexican Cilinton Rice",
    "Mexican Tit Bit on Tawa",
    "Vegetable Quesadilla",
    "Mini Tacos",
    "Tostadas",
    "Nacho Chips with Red & Green Salsa",
    "Flaunts (Crisp Tortilla Rolls)",
  ],
  "South American Live": [
    "Jamaican Jerk Banana with Pineapple Salsa",
    "Chipotle Rice with Tomato Salsa & Sour Cream",
    "Beans Rio",
    "Brazilian Spikes Corn with Barbecue Sauce",
  ],
  "Thai Special": [
    "Pad Thai Noodles",
    "Assortment of 3 Type Chilli Sauces",
    "Spicy Vegetable Green Curry with Bamboo Shoots",
    "Som Tom Salad",
    "Japanese Soba Noodles",
    "Noodles In Black Beans Sauce",
    "Thai Style Spring Roll",
    "Thai Green Curry with Steam Rice",
    "Thai Red Curry with Steam Rice",
    "Veg Dumpling In Garlic Sauce",
    "Thai Green Papaya Salad",
    "Crispy Vegetable Salad",
    "Silken Tofu And Pokchoy",
    "Snow Peas And Water Chestnuts with Soy & Sesame",
    "Spice Polynesian Pico",
    "Paca Vegetable Curry",
    "Khao-Pao",
    "Kaeng-Phat-Phuk",
    "Stir-Fried-Tofu",
    "Phaneng-Phak",
    "Phat-Phak Seisa Hai",
    "Sesame Kimchi Salad",
  ],
  "Oriental / Chinese Pan Asian": [
    "Wok Tossed Vegetable Hakka Noodles",
    "Hakka Noodles",
    "American Chopsuey",
    "Garlic Ginger Noodles",
    "Burnt Garlic Noodles",
    "Lemon Chilli Flat Noodles",
    "Dry Manchurian",
    "Fried Rice",
    "Ginger Fired Rice",
    "Schezwan Fried Rice",
    "Burnt Garlic And Chilli Rice",
    "Paneer Pepper Chilli",
    "Paneer Schezwan",
    "Paneer Baby Corn In Schezwan Sauce",
    "Honeyed Schezwan Paneer With Sesame",
    "Vegetable Manchurian",
    "Cabbage And Coriander Manchurian",
    "Vegetable Hong Kong",
    "Oriental Stir Fry",
    "Stir Fried Babycorn",
    "Crispy Corn Salt & Pepper",
    "Chilli Wild Pepper Potato",
    "Three Treasure in Hot Garlic Sauce",
    "Steward Noodles with Exotic Vegetable",
    "Vegetable Spring Roll",
    "Paneer Chong",
    "Water Chestnut Stir Fry",
    "Chinese Pancake",
    "Crispy Potato Chilli",
    "Paneer Hunan Style",
    "Mix Vegetable Hot Pot",
    "Singapore Noodles",
    "Stir Fried Vegetable",
    "Vegetable in Coriander Sauce",
    "Vegetable in Wild Mushrooms in Green Pepper Sauce",
  ],

  // Page 8: Indonesian, Mongolian, Swiss, Lebanese, Fusion & Sizzlers
  Indonesian: ["Burmese Khow Suey with Assorted Toppings"],
  Mongolian: [
    "Exotic Vegetables (Broccoli, Zucchini, Pak Choi, Snow Peas)",
    "Mongolian Sauces (Soya Garlic, Hunan, Hoisin, Ginger)",
  ],
  Swiss: [
    "Bhaji Pav Fondue",
    "Cheese Fondue with Fresh Baguettes",
    "Pepper Fondue",
    "Potato Roasty With Two Dip Yam Roasty",
    "Falafel Stuffed With Lettuce Salad",
  ],
  Lebanese: [
    "Paneer Shawarma",
    "Baba Ghanoush",
    "Tabbuleh",
    "Fattoush",
    "Varieties of Hummus with Pita Bread",
  ],
  "Fusion Counter": [
    "Gnocchi Tikka Masala",
    "Spaghetti Kachori",
    "Masala Pesto Idli Skewers",
    "Sammy Bruschetta Samosa Lollipop",
    "Lifafa Paneer in Makhani Sauce",
    "Grilled Ginger Chilli Arvi",
  ],
  Sizzlers: [
    "Indian Panorama Sizzler",
    "Chinese Dragon Sizzler",
    "Mexican Mafioso Sizzler",
    "Italian Sizzler",
  ],
  "Faan & Mai (Rice Specials)": [
    "Seven Jewel Rice",
    "Fortune Rice",
    "Pot Rice",
    "Schezwan Rice",
    "Veg. Fried Rice",
    "Veg. Chinese Choupsey",
  ],
  "Special Live": [
    "Italian Risotto",
    "Mexican Tacos",
    "Oriental Noodles",
    "Mongolian Bowl",
    "Lebanese Mezze",
    "Moroccan Tagine",
    "Thai Curry",
    "Swiss Rosti",
    "Amritsari Kulcha",
  ],
  "Live Counter": [
    "Live Pasta",
    "Live Dosa",
    "Live Chaat",
    "Live Pav Bhaji",
    "Live Chinese Wok",
    "Live Tandoor",
    "Bhaji Pav Fondue",
    "Paneer Shawarma",
  ],

  // Page 9: Cantonese Dimsums, Israeli, South Indian & Salads
  "Cantonese Dimsums": [
    "Flat And Exotic Vegetable Dimsum",
    "Spinach And Stuffed Flour Dough",
    "Water Chestnut And Sesame Chinese",
    "Paneer Tikki Dimsum",
    "Broccoli And Chinese Cabbage",
    "Asparagus Dimsum",
  ],
  Dips: ["Soya Sauce", "Sweet Coriander Sauce", "Chilli Dip"],
  Israeli: ["Manoush", "Hot Griddle Laffa Druze Pita", "Crunchy Lettuce With Falafel Bullets"],
  "South Indian": [
    "Assorted Dosa (Masala, Mysore, Plain, Cheese, Chinese)",
    "Appam",
    "Mysore Rava Dhosa",
    "Jodhpuri Rava Dhosa",
    "Uttapam",
    "Idli",
    "Medu Vada",
    "Rasam Vada",
    "Paysam",
    "Sambhar",
    "Madrasi Chutney",
    "Maysore Chutney",
    "Malkapuri Chutney",
    "Vegetable Korma",
    "Curd Rice",
    "Lemon Rice",
    "Bisibele Rice",
    "Orange Rice",
    "Pongal",
  ],
  Salads: [
    "Hara Chana Salad",
    "Aloo Chana Salad",
    "Indonesian Gado Gado",
    "Japanese Salad",
    "Peanut Coconut Salad",
    "Potato Sweet Chilly Salad",
    "Thai Raw Papaya Salad",
    "Sprouted Beans Salad",
    "American Corn Salad",
    "Celery & Radish Salad",
    "Cherry Tomato With Mint & Basil",
    "Coleslaw Hawaiian Salad",
    "Young Carrot Salad",
    "Beet To Potato Salad",
    "Cucumber Ginger Salad",
    "Kim Chi Salad",
    "Sam Tom Salad",
    "Tomato & Mozzarella Salad",
    "Yellow Tucson Salad",
    "Creamy Russian Salad",
    "Cucumber & Dill Salad",
    "Diced Cucumber Salad",
    "Egyptian Lettuce Salad",
    "Exotic Vegetable Salad",
    "Fresh Watermelon Noisette Salad",
    "Garden Fresh Green Salad",
    "German Potato Salad",
    "Grated Carrot & Russian Salad",
    "Lentil & Sweet Pepper Salad",
    "Mexican Three-Beans Salad",
    "Orange Walnut Salad",
    "Walnut Salad",
    "Italian Pasta Salad",
    "Mexican Pasta Salad",
    "Pasta Asparagus & Potato Salad",
    "Potato & Spring Onion Salad",
    "Assorted Vegetable in Clinton Dressing",
    "Insalata Celebes Salad",
    "Tossed Julienne Salad",
    "Woldrop Salad",
    "Hara Chana Makai Ka Salad",
    "Sprouted Mug Salad",
    "American Lippi",
    "Kolso Oven Salad",
    "Mexican Chime",
    "Thousand Island Salad",
    "Creamy Salad",
    "Ascot City Vegetable Salad",
    "Collegian Salad",
    "Pineapple Groundnut Salad",
    "Smokey Aloo Salad",
    "Asian Salad",
    "Contadina Salad",
    "Caesar Salad",
    "Insalata Mista Salad",
    "Masala Magic Salad",
    "Orange Dressing Salad",
  ],
  Salad: [
    "Green Salad",
    "Kachumber",
    "Russian Salad",
    "Sprouts Salad",
    "Fruit Salad",
    "Greek Salad",
  ],
  "Salad Bar": [
    "Caesar Salad",
    "Greek Salad",
    "Waldorf Salad",
    "Fattoush",
    "Quinoa Bowl",
    "Caprese",
  ],

  // Page 10: Farsan, Patties, Samosas, Bake Dish & Garnishes
  Farsan: [
    "Vegetable Roll",
    "Dosa Roll",
    "Burmese Roll",
    "Aloo Mutter Pudina Roll",
    "Corn Paneer Roll",
    "Corn Roll",
    "Cheese Roll",
    "Asparagus Roll",
    "Chilly Tortilla Cress Roll",
    "Spring Roll",
    "Mexican Tawa Roll",
    "Chinese Cigar",
    "Aloo Mutter Cigar",
    "Potato Cigar",
    "Khaman",
    "Dhokla",
    "Fafda",
    "Patra",
    "Handvo",
    "Muthiya",
  ],
  "Patties & Tikki": [
    "Ratalu Vatana Patties",
    "Gajar Patties",
    "Tiranga Patties",
    "Corn Coconut Patties",
    "Sing Khopra Patties",
    "Potato Palak Patties",
    "Ragda Patties",
    "Green Chana Tikki",
    "Corn Capsicum Tikki",
    "Crispy Onion Tikki",
    "Ratalu Pizza",
    "Vegetable Gold Coin",
    "Bengali Kachori Chhole Ragda",
  ],
  "Samosa Special": [
    "Punjabi Samosa",
    "Cheese Chilli Samosa",
    "Navatad Samosa",
    "Lilvana Envelope",
    "Patra Samosa",
    "Lilvana Cigar",
    "Vegetable Corn Samosa",
    "Mix Bhajiya Bataka Vada",
    "Dal Vada",
    "Bhel Sanjori",
    "Corn Cutlet Pasta Sauce",
    "Sev Usal",
  ],
  "Bake Dish": [
    "Lasagna Baked Dish",
    "Pineapple Macaroni Baked Dish",
    "Pineapple Macaroni Spaghetti",
    "Cheese Spinach Baked Dish",
    "Corn Spaghetti",
    "Mexican Raloniz",
    "Corn Palak Cheese Canneloni",
    "Snow Potato Bake Dish",
  ],
  Garnishes: [
    "Herb Croutons",
    "Gherkins",
    "Pickled Onion",
    "Coriander",
    "Roasted Garlic",
    "Brown Onions",
    "Lemon Segments",
  ],
  "Chutney & Achar": [
    "Green Chutney",
    "Mango Pickle",
    "Lemon Pickle",
    "Bengali Pickle",
    "Green Chilly Pickle",
    "Pineapple Salsa",
    "Mango Salsa",
    "Spring Onion",
    "Vinegar Onion",
    "Onion Ring",
    "Raw Onion",
    "Sambharia Chilly",
    "Angoor Sambharia",
    "Lasan Chutney",
    "Peanut & Tomato Chutney",
    "Sweet Mango Chutney",
    "Tomato Chutney",
    "Khajoor Chutney",
    "Onion Chutney",
    "Mooli Chutney",
    "Mint Chutney",
    "Coriander Chutney",
  ],
  Chutney: ["Green Chutney", "Sweet Tamarind", "Garlic Chutney", "Coconut Chutney", "Mint Yogurt"],
  Achar: ["Mango Pickle", "Mixed Pickle", "Lemon Pickle", "Chilli Pickle"],
  Dressings: [
    "Italian Dressing",
    "Salsa Ranchero",
    "Lemon Dressing",
    "Thousand Island Dressing",
    "Tohini Creamy",
    "Sour Creamy",
    "Vinaigrette",
    "French Dressing",
    "Mustard Mayo",
  ],

  // Page 11: Basundi, Rabadi, Chhena Pai, Rasmalai
  "Sweet Basundi": [
    "Kesar Pista Basundi",
    "Sitafal Basundi",
    "Angoori Basundi",
    "Dry Fruit Basundi",
    "Ghevar Basundi",
    "Anjeer Basundi",
    "Suttar Fenni Basundi",
    "Adad Bundi Basundi",
    "Green Bundi Basundi",
    "Strawberry Basundi",
    "Browni Basundi",
    "Choco Chips Basundi",
  ],
  Rabadi: [
    "Orange Rabadi",
    "Strawberry Rabadi",
    "Mawa Malpua Rabadi",
    "Dry Fruit Rabadi",
    "Lachha Rabadi",
    "Pista Rabadi",
    "Badam Ladoo Rabadi",
    "Baked Bundi Rabadi",
    "Ghewar Rabadi",
    "Kiwi Bonanza",
    "Badam Halwa In Badam Katori with Rabadi Special",
  ],
  "Chhena Pai": [
    "Mango Chhena",
    "Orange Chhena",
    "Sitafal Chhena",
    "Apple Chhena",
    "Chandani",
    "Rasika",
    "Cream Kerry",
    "Mango Delight",
    "American Dry Fruit Chhena",
  ],
  Rasmalai: [
    "Paina King Rasmalai",
    "Strawberry Rasmalai",
    "Mango King Rasmalai",
    "Pista Rasmalai",
    "Creamy Dry Fruit Rasmalai",
    "Ras Madhuri Rasmalai",
    "Strawberry Fiasto Rasamalai",
  ],
  "Sweet Special": [
    "Indrani In Kuldi",
    "Fruit Mango Tango",
    "Triangle Lencha",
    "Coconut Tango",
    "Pen Cake",
  ],
  Sweet: [
    "Gulab Jamun",
    "Rasgulla",
    "Rasmalai",
    "Kaju Katli",
    "Motichoor Ladoo",
    "Gajar Halwa",
    "Malpua",
    "Jalebi",
    "Kesar Pista Basundi",
    "Sitafal Basundi",
  ],

  // Page 12: Halwa, Dudh Pak, Winter & Meerut Counters
  "Halwa & Sweets": [
    "Butter Scotch Halwa",
    "Coconut Chinese Handi",
    "Tawa Mithai",
    "Special Tender Coconut",
    "Mewa Khichdi",
    "Badam Seekh Kabab",
    "Baked Badam Malai Roti",
    "Khajoor Ka Gur Ka Rasgulla",
    "Pista Stuffed Pan Cake with Cream",
    "Strawberry Sandesh",
    "Pineapple Sandesh",
    "Hot Coffee Chaat",
    "Litchi Suraj Mukhi",
    "Matki Litchi Bowri",
    "Doctor Special (Sugar Free Kaccha Golla)",
    "Milk Cake Ka Khaurchan",
    "Orange Alaska",
    "Kesar Ke Kurkure Kangan",
    "Badam Cranberry Tart",
    "Fruit Pizza",
    "Kharbooja Ka Thanda Halwa",
    "Pista Stuffed Pan Cake with Almond Gravy",
    "Petha Gillori",
    "Mango Feasta",
    "Orange Feasta",
    "Pista Samosa",
    "Kesar Malpua",
    "Pista Malpua",
    "Orange Malpua",
    "Mawa Malpua",
    "Jodhpuri Malpua Pizza",
    "Anjeer Bake Badam Jalwa",
    "Baked Anjeer Badam Bundi",
    "Kaju Baked Halwa",
    "Carrot Halwa",
    "Kaju Baked Badam Halwa",
    "Dry Fruit Halwa",
    "Badam Halwa",
    "Mohanthal",
    "Kaju Halwa",
    "Moong Dal Halwa",
    "Mix Fruit Halwa",
    "Makkhan Santra",
    "Browni Halwa",
    "Almond Prism",
    "Anjeer Akharot Halwa",
    "Madhur Milan Halwa",
    "Kaju Akharot Halwa",
    "Kaju Baked Bund",
  ],
  "Dudh Pak & Kheer": [
    "Sev Dudhpak",
    "Carrot Dudhpak",
    "Dudhi Dudhpak",
    "Badam Dudhpak",
    "Gajar Ki Kheer",
    "Pahadi Kheer",
    "Punjabi Dry Fruit Kheer",
  ],
  "Winter Special Counter": [
    "Makai Na Rotala",
    "Bajari Na Rotala",
    "4 Type Bhaji",
    "Rajasthani Kadhi with Bajara Khichadi",
    "Ghee - Butter - Jaggery",
    "Vadhvani Marcha",
    "Roasted Papad",
    "Masala ButterMilk",
  ],
  "Meerut Counter": [
    "Four Type Ghee Parotha's",
    "Aloo Subji",
    "Kashifal Ki Bhaji",
    "Green Onion Radish Chutney",
    "Pickles",
    "Matka Dahi",
    "Tomato Chutney",
    "Mooli Chutney",
    "Lemon Wedges",
    "Cut Chillies",
    "Onion Chutney",
  ],

  // Page 13: Rajasthani, Patiala House, Vrindavan, Kalkatey, Avadhi, North Indian
  "Rajasthani Special": [
    "Pyaaz Kachori",
    "4 Variety Roti (Missi Roti, Satpati Roti, Bajre Ki Roti)",
    "Ker Sangari Subji",
    "Methi Mangodi Subji",
    "Rajasthani Mirchi Vada",
    "Saraso Bhaji",
    "Churma (Kesar, Badam, Rose)",
    "Mirchi Vada",
    "Mutter Kachori",
    "Bati (Masala, Mawa, Plain)",
    "Achari Ker Sangri",
    "Aloo Jodhpuri",
    "Sanger Ka Kofta",
    "Hare Chane Ki Sukhi Subji",
    "Govind Gatta Ki Sabji",
    "Jodhpuri Gatta Ki Sabji",
    "Jaipuri Kadai Mutter",
    "Kadi Tadka",
    "Rajasthani Pulav",
    "Fali Fry",
    "Keria Fry",
    "Dal Panchmela",
    "Bajre Ki Kadhi",
    "Bajre Ki Roti",
    "Moth Ki Roti",
    "Gud, Makhan",
    "Masala Butter Milk",
    "Pudina Chutney",
    "Methi Chutney",
    "Khichiya",
  ],
  "Patiala House": [
    "Amritsari Channa",
    "Amritsari Kulcha",
    "Dal Daba",
    "Paneer Aap Ki Pasand",
    "Live Preparation Of Paneer In Kadai Gravy",
    "Makhhani Gravy",
    "House Favourite Paneer Bhurji",
  ],
  "Vrindavan Ki Bedmi Aloo": ["Bedmi Puri", "Aloo Jholwala", "Methi Ki Chutney", "Dahi", "Pickles"],
  "Kalkatey Ki Kathi": [
    "Paneer Tawa Masala",
    "Soya Nuggets And Nutrela",
    "Hara Masale Ka Bhuna Aloo with Varqui Paratha",
    "Rumali Roti",
    "Ginger Jullienes",
    "Red & Green Chilli Julliennes",
    "Jullienes Of Hara Pyaz Hara Chutney",
  ],
  "Avadhi Food": [
    "Paneer Zafrani",
    "Kofta In Green Gravy",
    "Hing Dhaniye Ke Chatpatte Chharra Aloo",
    "Chutki Mutter Dilruba",
    "Sunehri Bhindi",
    "Paneer Tikka Masala",
    "Adrak Gobi Da Keema",
    "Dum Ka Bharwa Karela",
    "Hasrat E Husan",
    "Singharey Ka Oorma",
    "Dal Tandoori",
    "Subz Dum Kathal Khullar Ki Biryani",
  ],
  "North Indian": [
    "Shahi Paneer",
    "Paneer Bhurji",
    "Basani Corn And Bhindi",
    "Khoya Makhana Mutter",
    "Palak Vadiyon Wale Chawal Punjabi Kadhi",
    "Rajma Chawal",
  ],

  // Page 14: Paratha Gali, Taste of Gujarat, Mughlai, Vegetable Punjabi, Gujarati Sabji
  "Paratha Gali": [
    "Paratha (Paneer, Dal Aloo, Gobhi Paratha)",
    "Tawa Subziyan (Karela, Bhindi, Arvi, Tamater Bharva, Aloo Bharva)",
    "Dahi",
    "Mixed Pickles",
  ],
  "Taste of Gujarat": [
    "Panki",
    "Baby Handvo",
    "Bajre Ka Uttapa",
    "Dal Dhokli",
    "Fada Khichdi",
    "Khichu Live",
    "Satpadi Roti",
    "Gatta Nu Shaak",
  ],
  Mughlai: [
    "Kaleji Paneer",
    "Rumali Roti",
    "Takatak With Kulcha",
    "Mushroom Masala With Pav",
    "Soya Bean Chaap",
    "Veg Biryani",
  ],
  "Vegetable Punjabi": [
    "Paneer Lababdar",
    "Paneer Butter Masala",
    "Kadai Paneer",
    "Paneer Ka Salan",
    "Paneer Amritsari",
    "Paneer Pasanda",
    "Paaneer Palak Kaju",
    "Paneer Bhurji Lacchadar",
    "Paneer Luckhnabi",
    "Dum Pukht Paneer",
    "Kaleji Paneer Curry",
    "Paneer Capsicum in Saffron Gravy",
    "Paneer Dum Anadi",
    "Paneer Khada Masala",
    "Paneer Lajawab",
    "Kadhai Vegetable In Dry Gravy",
    "Hara Makai Korma",
    "Khoya Kaju Daanedar",
    "Khoya Mutter Korma",
    "Vegetable Begum Bahar",
    "Methi Mutter Malai",
    "Corn Tomato Paneer Bhartha",
    "Chok Mutter Adraki",
    "Millennium Tarkari",
    "Vegetable Kolhapuri",
    "Chilli Milli Tarkari",
    "Sarso Ka Saag",
    "Vegetable Jalfry",
    "Alu Do Pyaaza",
    "Kashmiri Dum Alu",
    "Rajasthani Bataki",
    "Dum Aloo Chutney wala",
    "Paneer Laheri Masala",
    "Chilly Paneer Babycorn",
    "Khupani Kofta",
    "Kofta Shaam Savera",
    "Chana Chum Kofta",
    "Cheese Angoori",
    "Jamuni Kofta",
    "Kesarwale Paneer Ka Kofta",
    "Stuffed Capsicum/Parwal/Carrots/Tomato",
    "Stuff Potato Ravaiya",
    "Tawa Mehfil",
    "Litchi Badam Ki Subji",
    "Bhindi Bahurani",
    "Vegetable Exotica In Three Gravy",
    "Haldi Ghati Ka Paneer",
  ],
  "Main Course": [
    "Paneer Butter Masala",
    "Shahi Paneer",
    "Kadai Paneer",
    "Palak Paneer",
    "Malai Kofta",
    "Veg Kolhapuri",
    "Dum Aloo",
    "Mix Veg",
    "Paneer Lababdar",
    "Vegetable Lasagna",
  ],
  "Gujarati Sabji": [
    "Green Gujarati",
    "Bhindi Masala",
    "Bhindi Kit Kat",
    "Mutter Bhindi Dry",
    "Bhindi Capsicum Dry",
    "Papadi Lilwa/ Papadi Lilwa Khandwi",
    "Mutter Corn Capsicum Fansi",
    "Dana Muthiya Papdi",
    "Papadi Muthiya",
    "Fangavela Kathor Nu Shak",
  ],

  // Page 15: Gujarati Shaak, Kathol, Punjabi Dal, Indian Breads, Puri
  "Gujarati Shaak & Kathol": [
    "Undhiya / Mini Undhiya",
    "Surti Undhiyu",
    "Green Chatani Bataka",
    "Lila Chana Vatana NU Shak with Ponk",
    "Patra Ane Muthiya Dahi Ma",
    "Green Gujarati Sambhariya",
    "Lilva Ni Dhokli",
    "Parwal Bharela (Green)",
    "Valor Muthiya Dana",
    "Surti Dana Muthiya",
    "Gawar Dhokli",
    "Methi Dana Nu Shak",
    "Malai Parwar",
    "Bataka Nu Shaak",
    "Green Chana With Khandavi",
    "Green Gwalior",
    "Fangela (Mug/Moth)",
    "Ranguni Val",
    "Chana Ni Dal (Khatiyawadi)",
    "Navratana Kathor",
    "Desi Chana",
    "Rimjhim Aloo",
    "Rajma",
  ],
  "Punjabi Dal & Kadhi": [
    "Black Rajma Dal",
    "Black Dal",
    "Rajasthani Dal",
    "Muglai Dal / Dal Bukhara",
    "Tadka Dal / Dal Fry",
    "Palak Dal",
    "Pahadi Dal",
    "Punjabi Dal",
    "Hayderabadi Dal",
    "Kadi Pakoda Fry",
    "Punjabi Kadhi",
    "Sindhi Kadhi",
    "Rajasthani Kadhi",
  ],
  Dal: [
    "Dal Makhani",
    "Dal Tadka",
    "Panchmel Dal",
    "Gujarati Dal",
    "Dal Fry",
    "Black Rajma Dal",
    "Punjabi Dal",
  ],
  "Indian Breads": [
    "Aloo Mutter Paratha",
    "Aloo Gobi Paratha",
    "Palak Paratha",
    "Reddish Paratha",
    "Paneer Paratha",
    "Mutter Paneer Paratha",
    "Nariyal Paratha",
    "Lacchedar Fudina Paratha",
    "Mirchi Paratha",
    "Fudina Paratha",
    "Reshmi Sahi Luchha Paratha",
    "Missi Roti",
    "Makai Ki Roti",
    "Tandoori Roti",
    "Roomali Roti",
    "Fudina Roti",
    "Fulka Roti",
    "Bhakhri",
    "Khasta Roti / Shermal Roti",
    "Reshmi Roti",
    "Bajre Ki Roti",
    "Plain Naan",
    "Baby Butter Ki Roti",
    "Cheese Naan / Paneer Naan",
    "Fudina Naan / Aloo Naan",
    "Khandari Naan",
    "Gilafi Naan",
    "Hariyali Naan",
    "Badami Naan",
    "Garlic Naan",
    "Stuffed Masala Naan",
    "Plain Puri",
    "Palak Puri / Tomato Puri",
    "Kalkatta Puri",
    "Locha Puri",
  ],
  "Indian Bread": [
    "Butter Naan",
    "Garlic Naan",
    "Tandoori Roti",
    "Missi Roti",
    "Laccha Paratha",
    "Rumali Roti",
    "Kulcha",
    "Aloo Paratha",
  ],

  // Page 16: Kulcha, Raytu, Gujarati Dal, Rice, Khichadi & Papad
  "Kulcha Special": [
    "Plain Kulcha",
    "Stuffed Kulcha",
    "Masala Kulcha",
    "Paneer Kulcha",
    "Amrutsari Kulcha",
    "Fudina Kulcha",
    "Lazeez Cheese Kulcha",
  ],
  "Raytu & Raitu": [
    "Kakdi Raytu",
    "Bundi Raytu",
    "Paneer Palak Raytu",
    "Pineapple Raytu",
    "Mix Fruit Raytu",
    "Vegetable Raytu",
    "Gajar NU Raytu",
    "Green Grapes Raytu",
  ],
  "Gujarati Dal & Kadhi": [
    "Gujarati Dal",
    "Dhan Shaak",
    "Methi Dabka Dal",
    "Dal Dakho",
    "Panchukati Dal",
    "Osaman Chhuti Dal",
    "Gujrati Kadhi",
    "Palak Green Kadhi",
    "Bundi Kadhi",
    "Bhatiya Kadhi",
    "Onion Tometo Kadhi",
    "Bhindi Kadhi",
  ],
  "Rice & Biryani": [
    "Taj Laving Rice",
    "Jira Rice",
    "Pulav Vegetable",
    "Peas Pulav",
    "Mint Lemon Rice",
    "Brown Rice",
    "Tiranga Rice",
    "Kashmiri Pulav",
    "Veg. Biriyani",
    "Gatta No Pulav",
    "Bamboo Rice",
    "Dana Rice",
    "Tomato Rice",
    "Ring Veg. Rice",
    "Handi Biryani",
    "Dum Biryani",
    "Baby Potato Onion Pulav",
    "Three layer Rice",
    "Rice Cury Sizzler",
    "Maharashtrian Rice",
    "Corn Bhutta Rice",
    "Muglai Pulav",
    "Shahi Biryani",
    "Hyderabadi Biryani",
  ],
  Rice: [
    "Jeera Rice",
    "Veg Biryani",
    "Kashmiri Pulao",
    "Steamed Rice",
    "Peas Pulao",
    "Dum Biryani",
    "Hyderabadi Biryani",
  ],
  "Gujarati Khichadi": [
    "Live Palak Khichadi",
    "Birbal Khichadi",
    "Masala Khichadi",
    "Dal Khichadi",
    "Akhar Khichadi",
    "Aag Ki Khichadi",
  ],
  "Papad & Fryms": [
    "Sabudana Papad",
    "Masala Papad",
    "Roasted Papad",
    "Roasted Masala Papad",
    "Amrutsari Papad",
    "Aloo Ki Papad",
    "Disco Papad",
    "Khichiya Papad",
    "Khichiya Masala Papad",
    "Sarevada Masala Papad",
    "Muthiya Papad",
    "Bikaneri Papad",
    "Adad Papad",
    "SoyabeAn Papad",
    "Mix Fryms",
  ],
  Papad: ["Roasted Papad", "Fried Papad", "Masala Papad", "Punjabi Papad", "Khichiya Papad"],

  // Page 17: Desserts, Puddings, Fruit Dishes, Kulfi & Mukhvas
  "Dessert & Puddings": [
    "Chocolate Truffle Pudding",
    "Chocolate Walnut Pudding",
    "Chocolate Marge Pan Pudding",
    "Chocolate Flax Pudding",
    "Chocolate Nuts Pudding",
    "Chocolate Coffee Pudding",
    "Devils Food Pudding",
    "Trifle Black Forest Pudding",
    "Pineapple Pudding",
    "Kimball Brownie Pudding",
    "Coconut Pineapple",
    "Seasonal Pudding",
    "Honey & Nut Tart",
    "Mocha Souffle",
    "Coconut Souffle",
    "Fresh Orange Pudding",
    "Fresh Paige Orange Pudding",
    "Fresh Coconut Orange Pudding",
    "Chocolate Date Walnut Orange Pudding",
    "Fresh Strawberry Walnut Pudding",
    "Fresh Strawberry Tiramisu Pudding",
    "Fresh Strawberry Kimball Brownie Pudding",
    "Mini Pastries",
    "Assorted Fruit Tart",
    "Brownie With Flavour Ice-cream",
    "Assorted Cakes",
    "Chocolate Strawberry Pudding",
    "Peach And Plum Pudding",
    "Peach And Pineapple Pudding",
    "Peach And Swenson Pudding",
    "Fresh Mango Pudding",
    "Jigger Honey Cheese Cake",
    "Mango Cheese Cake",
    "Strawberry Cheese Cake",
    "Pis Orange Cheese Cake",
    "Kiwi Pineapple Pudding",
    "Strawberry Mousse",
    "Pineapple Soufflé",
    "Fresh Orange Souffle",
    "Red Velvet Pastry",
    "Red Velvet Pudding",
    "Molten Chocolate Cake",
    "Pinterest Orio Pudding",
    "Pistachio Litchi",
    "Chocolate Delight",
    "Orio Delight",
    "Caremal Castere",
    "Banana Pudding",
  ],
  Dessert: [
    "Ice Cream Sundae",
    "Fruit Trifle",
    "Chocolate Mousse",
    "Kulfi Falooda",
    "Gulab Jamun with Ice Cream",
    "Molten Chocolate Cake",
    "Tiramisu",
  ],
  "Dessert Bar": [
    "Assorted Pastries",
    "Kulfi Station",
    "Ice Cream Bar",
    "Waffles",
    "Chocolate Fountain",
  ],
  "Western Dessert Bar": [
    "Tiramisu",
    "Cheesecake",
    "Chocolate Fountain",
    "Macarons",
    "Crème Brûlée",
  ],
  "Fruit Dishes & Kulfi": [
    "Indian / Imported Fruits",
    "Ice-cream (All Flavours)",
    "Baraf Gola",
    "Baraf Chin",
    "BPK Kulfi",
    "Ice Cream With Faluda",
    "Ice Cream With Rabdi",
    "Live Kulfi",
    "Chopaty Kulfi",
  ],
  "Mukhvas & Paan": [
    "Live Paan",
    "Shayri Paan",
    "Variety Mukhwas",
    "Masala Kharek",
    "Flavour Mukhwas",
    "Meetha Paan",
    "Chocolate Paan",
    "Fire Paan",
  ],
  Mukhwas: ["Saunf Mix", "Sweet Mukhwas", "Meethi Supari", "Roasted Fennel"],
  Paan: ["Meetha Paan", "Sada Paan", "Chocolate Paan"],
  "Paan Counter": ["Meetha Paan", "Chocolate Paan", "Fire Paan", "Silver Paan"],
  "Paan Mukhwas": ["Meetha Paan with Mukhwas Assortment"],
};

export const CONTACT = {
  phone: "9824615399",
  altPhone: "9824615399",
  whatsapp: "919824615399",
  email: "contact@hariomcatars.com",
  name: "Khimjibhai Purohit",
  business: "Hariom Caterers",
};

export const DISH_IMAGES: Record<string, string> = {
  // Welcome Juice / Mocktail
  "Fresh Lime Soda":
    "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80",
  "Jal Jeera":
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80",
  "Aam Panna":
    "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80",
  "Rose Milk":
    "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=500&q=80",
  "Kokum Sherbet":
    "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=500&q=80",
  "Watermelon Cooler":
    "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=500&q=80",

  // Welcome Fresh
  "Coconut Water":
    "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?auto=format&fit=crop&w=500&q=80",
  "Fresh Sugarcane":
    "https://images.unsplash.com/photo-1622484210800-20e363b90a59?auto=format&fit=crop&w=500&q=80",
  "Nimbu Pani":
    "https://images.unsplash.com/photo-1523371054106-bbf80586c38c?auto=format&fit=crop&w=500&q=80",
  Chaas:
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80",
  "Kesar Lassi":
    "https://images.unsplash.com/photo-1571006682858-a4c8d5152897?auto=format&fit=crop&w=500&q=80",
  "Mint Cooler":
    "https://images.unsplash.com/photo-1517821099606-cef63a9bcda6?auto=format&fit=crop&w=500&q=80",

  // Mocktail Bar
  "Virgin Mojito":
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80",
  "Blue Lagoon":
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80",
  "Pina Colada":
    "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=500&q=80",
  "Fruit Punch":
    "https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=500&q=80",
  "Strawberry Fizz":
    "https://images.unsplash.com/photo-1468465236047-6aac20937e92?auto=format&fit=crop&w=500&q=80",
  "Mango Tango":
    "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=500&q=80",
  "Green Apple Cooler":
    "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80",

  // Shots
  "Wheatgrass Shot":
    "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=500&q=80",
  "Ginger Shot":
    "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=500&q=80",
  "Amla Shot":
    "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
  "Turmeric Shot":
    "https://images.unsplash.com/photo-1615485290177-3843a6d9460c?auto=format&fit=crop&w=500&q=80",

  // Soup
  "Sweet Corn Soup":
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80",
  "Manchow Soup":
    "https://images.unsplash.com/photo-1603105037880-880cd4edfb5d?auto=format&fit=crop&w=500&q=80",
  "Tomato Basil":
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=500&q=80",
  "Hot & Sour":
    "https://images.unsplash.com/photo-1588566565463-180a5b2090d2?auto=format&fit=crop&w=500&q=80",
  "Cream of Broccoli":
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
  "Lemon Coriander":
    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=500&q=80",
  "Palak Shorba":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",

  // Starter
  "Paneer Tikka":
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
  "Hara Bhara Kebab":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Veg Seekh Kebab":
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
  "Cheese Balls":
    "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80",
  "Corn Cheese Roll":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Mushroom Duplex":
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=80",
  "Dahi Ke Kebab":
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",

  // Mobile Starters
  "Assorted Canapes":
    "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=500&q=80",
  "Mini Pizzas":
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
  "Bruschetta Trio":
    "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=500&q=80",
  "Cheese Fondue Cups":
    "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=500&q=80",

  // Live Chat
  "Pani Puri":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Sev Puri":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Dahi Puri":
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
  "Bhel Puri":
    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80",
  "Ragda Pattice":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  Dabeli:
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Vada Pav":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",

  // Live Counter
  "Live Pasta":
    "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80",
  "Live Dosa":
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80",
  "Live Chaat":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Live Pav Bhaji":
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80",
  "Live Chinese Wok":
    "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80",
  "Live Tandoor":
    "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",

  // Special Live
  "Italian Risotto":
    "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80",
  "Mexican Tacos":
    "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=500&q=80",
  "Oriental Noodles":
    "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=500&q=80",
  "Mongolian Bowl":
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
  "Lebanese Mezze":
    "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=500&q=80",
  "Moroccan Tagine":
    "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=500&q=80",
  "Thai Curry":
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=500&q=80",
  "Swiss Rosti":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  "Amritsari Kulcha":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",

  // Bread Station
  "Assorted Kulcha":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Stuffed Naan":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  Focaccia:
    "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=500&q=80",
  "Garlic Bread":
    "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80",

  // Farsan
  Khaman:
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  Dhokla:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  Fafda:
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80",
  Patra:
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  Handvo:
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
  Muthiya:
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",

  // Chutney
  "Green Chutney":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
  "Sweet Tamarind":
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80",
  "Garlic Chutney":
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80",
  "Coconut Chutney":
    "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=500&q=80",
  "Mint Yogurt":
    "https://images.unsplash.com/photo-1571006682858-a4c8d5152897?auto=format&fit=crop&w=500&q=80",

  // Sweet
  "Gulab Jamun":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  Rasgulla:
    "https://images.unsplash.com/photo-1571006682858-a4c8d5152897?auto=format&fit=crop&w=500&q=80",
  Rasmalai:
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80",
  "Kaju Katli":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Motichoor Ladoo":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Gajar Halwa":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  Malpua:
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
  Jalebi:
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",

  // Main Course
  "Paneer Butter Masala":
    "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=500&q=80",
  "Shahi Paneer":
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=500&q=80",
  "Kadai Paneer":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
  "Palak Paneer":
    "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=500&q=80",
  "Malai Kofta":
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80",
  "Veg Kolhapuri":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
  "Dum Aloo":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  "Mix Veg":
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",

  // Indian Bread
  "Butter Naan":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Garlic Naan":
    "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=500&q=80",
  "Tandoori Roti":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Missi Roti":
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
  "Laccha Paratha":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  "Rumali Roti":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  Kulcha:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",

  // Papad
  "Roasted Papad":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Fried Papad":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Masala Papad":
    "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=500&q=80",
  "Punjabi Papad":
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",

  // Dal
  "Dal Makhani":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
  "Dal Tadka":
    "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80",
  "Panchmel Dal":
    "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
  "Gujarati Dal":
    "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?auto=format&fit=crop&w=500&q=80",
  "Dal Fry":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",

  // Rice
  "Jeera Rice":
    "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=500&q=80",
  "Veg Biryani":
    "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80",
  "Kashmiri Pulao":
    "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=500&q=80",
  "Steamed Rice":
    "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=500&q=80",
  "Peas Pulao":
    "https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=500&q=80",

  // Salad
  "Green Salad":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  Kachumber:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
  "Russian Salad":
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80",
  "Sprouts Salad":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  "Fruit Salad":
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
  "Greek Salad":
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
  "Caesar Salad":
    "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=500&q=80",
  "Waldorf Salad":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  Fattoush:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80",
  "Quinoa Bowl":
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  Caprese:
    "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a8c?auto=format&fit=crop&w=500&q=80",

  // Achar
  "Mango Pickle":
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80",
  "Mixed Pickle":
    "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=500&q=80",
  "Lemon Pickle":
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80",
  "Chilli Pickle":
    "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=500&q=80",

  // Mukhwas & Paan
  "Saunf Mix":
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
  "Sweet Mukhwas":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Meethi Supari":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Roasted Fennel":
    "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=500&q=80",
  "Meetha Paan":
    "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=500&q=80",
  "Sada Paan":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",
  "Chocolate Paan":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  "Fire Paan":
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80",
  "Silver Paan":
    "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80",

  // Dessert
  "Ice Cream Sundae":
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80",
  "Fruit Trifle":
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80",
  "Chocolate Mousse":
    "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=500&q=80",
  "Kulfi Falooda":
    "https://images.unsplash.com/photo-1571006682858-a4c8d5152897?auto=format&fit=crop&w=500&q=80",
  "Gulab Jamun with Ice Cream":
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80",
  "Assorted Pastries":
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=80",
  "Kulfi Station":
    "https://images.unsplash.com/photo-1571006682858-a4c8d5152897?auto=format&fit=crop&w=500&q=80",
  "Ice Cream Bar":
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80",
  Waffles:
    "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=500&q=80",
  Tiramisu:
    "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80",
  Cheesecake:
    "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=500&q=80",
  "Chocolate Fountain":
    "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=500&q=80",
  Macarons:
    "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=500&q=80",
  "Crème Brûlée":
    "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=500&q=80",
};

/**
 * Returns the dish catalog (only admin-added custom dishes).
 * Built-in catalog is NOT shown; only dishes added from the Admin Panel appear.
 */
export function getMergedDishCatalog(): Record<string, string[]> {
  const customDishes = getCustomDishes();
  if (customDishes.length === 0) return {};

  const merged: Record<string, string[]> = {};

  for (const dish of customDishes) {
    const cat = dish.category?.trim();
    if (!cat) continue;
    if (!merged[cat]) merged[cat] = [];
    if (!merged[cat].includes(dish.name)) merged[cat].push(dish.name);
  }

  return merged;
}

/** Returns package list (only admin-added custom packages). Built-in packages are NOT shown. */
export function getMergedPackages(): (Package | CustomPackage)[] {
  return getCustomPackages();
}

export function getDishImage(dishName: string): string {
  const customDishes = getCustomDishes();
  if (customDishes.length > 0) {
    const found = customDishes.find((d) => d.name === dishName);
    if (found?.image) return found.image;
  }
  if (DISH_IMAGES[dishName]) {
    return DISH_IMAGES[dishName];
  }
  const name = dishName.toLowerCase();
  if (name.includes("paneer")) {
    return "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80";
  }
  if (name.includes("soup")) {
    return "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80";
  }
  if (name.includes("pizza")) {
    return "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("pasta") ||
    name.includes("penne") ||
    name.includes("fusilli") ||
    name.includes("ravioli")
  ) {
    return "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("chaat") ||
    name.includes("puri") ||
    name.includes("tikki") ||
    name.includes("bhel") ||
    name.includes("sev") ||
    name.includes("kachori") ||
    name.includes("samosa") ||
    name.includes("vada")
  ) {
    return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=500&q=80";
  }
  if (name.includes("salad")) {
    return "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("rice") ||
    name.includes("pulao") ||
    name.includes("biryani") ||
    name.includes("khichdi") ||
    name.includes("risotto")
  ) {
    return "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("roti") ||
    name.includes("naan") ||
    name.includes("paratha") ||
    name.includes("kulcha") ||
    name.includes("bread") ||
    name.includes("roll")
  ) {
    return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("dal") ||
    name.includes("kadhi") ||
    name.includes("curry") ||
    name.includes("gravy") ||
    name.includes("shaak") ||
    name.includes("subji") ||
    name.includes("sabji")
  ) {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("sweet") ||
    name.includes("halwa") ||
    name.includes("jamun") ||
    name.includes("rabadi") ||
    name.includes("basundi") ||
    name.includes("rasmalai") ||
    name.includes("kaju") ||
    name.includes("malpua") ||
    name.includes("jalebi") ||
    name.includes("mithai")
  ) {
    return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("pudding") ||
    name.includes("cake") ||
    name.includes("tiramisu") ||
    name.includes("pastry") ||
    name.includes("mousse") ||
    name.includes("ice cream") ||
    name.includes("ice-cream") ||
    name.includes("kulfi") ||
    name.includes("dessert") ||
    name.includes("tart") ||
    name.includes("brownie")
  ) {
    return "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=500&q=80";
  }
  if (
    name.includes("juice") ||
    name.includes("mojito") ||
    name.includes("mocktail") ||
    name.includes("cooler") ||
    name.includes("drink") ||
    name.includes("tea") ||
    name.includes("coffee") ||
    name.includes("soda") ||
    name.includes("shot") ||
    name.includes("shake") ||
    name.includes("smoothie")
  ) {
    return "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=500&q=80";
  }

  return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=500&q=80";
}

export const TERMS_AND_CONDITIONS: string[] = [
  "Minimum 500 persons require.",
  "Above rates are for Ahmedabad City only.",
  "Rate may vary according to minimum number of persons, and outstation charges will be extra.",
  "PRO-Public Relations Girls & VIP Service Boys if required will be provided",
  "Panchola will be served for maximum 30 person, above 30 will be charged 1000 per person extra.",
  "Display Counters will be charged extra.",
  "Specialty counter will be with main course. (No Separate Plate)",
  "In case of persons less than 500, extra charge will be applicable.",
  "Charges will be counted on the actual number of persons or the guaranteed number of person whichever is higher.",
  "In case the number of persons increases, the management will offer food & services for only 10% above the number of guaranteed. Thereon the management will levy a 20% surcharge ( in addition to the rate per head) for any further increase in the number of guests.",
  "Any reduction in guranteed persons is allowed 48 hrs prior to the function & not later.",
  "Above rates are of Food & Service, Taxes : Service Tax Extra as per Applicable.",
  "The Package 1 includes 20 Ltr Packaged Drinking water Jar, if 200ml Mineral water Bottles required Extra Charges will be Applicable.",
  "Kitchen Area, Tables, and Wash Basin, Electrical Plug Points in Kitchen & on Ground, Buffet counters/any other furniture & its linen will be provided by the guest.",
  "Payment terms 30% Advance against confirmation ( Non Refundable in case of Cancellation or Postponement). Rest 70% of the payment shall be made 5 days prior to the function & balance if any, strictly at the end of the function by Cash / Cheque ( Local Cheque only).",
  "Minimum guarantee given at the time of booking will not be reduced.",
  "Management is not liable for any loss of guest's belongings during the function.",
  "Extra charges will be applicable for the items not included in the menu.",
  "Consumption of Alcohol in the Function & elesewhere within the premises is strictly Prohibited.",
  "The taste of food will be maintained up to 4 hours actual time agreed with the party.",
  "The management shall not be liable for any inconvenience caused by an act of God, Nature or accident or failure of any services which are beyond the control of management.",
];

export interface ExclusionRate {
  item: string;
  rate: string;
}

export const EXCLUSION_RATES: ExclusionRate[] = [
  { item: "Juice / Mocktail", rate: "@ Rs.60/-" },
  { item: "Sweet (Regular)", rate: "@ Rs.70/-" },
  { item: "Dessert", rate: "@ Rs.80/-" },
  { item: "Sweet (Special)", rate: "@ Rs.90/-" },
  { item: "Soup", rate: "@ Rs.45/-" },
  { item: "Kesariya Milk", rate: "@ Rs.80/-" },
  { item: "Starters / Farsan", rate: "@ Rs.50/-" },
  { item: "Speciality Counter", rate: "@ Rs.250/-" },
  { item: "Chaat", rate: "@ Rs.60/-" },
  { item: "Fruit Counter (Indian + Exotic)", rate: "@ Rs.275/-" },
  { item: "Vegetable", rate: "@ Rs.50/-" },
  { item: "Fruit Counter (Exotic)", rate: "@ Rs.450/-" },
  { item: "Fussion Dessert", rate: "@ Rs.125/-" },
  { item: "Exotic Coffee bar", rate: "@ Rs.200/-" },
  { item: "200 ml Mineral Water Bottles", rate: "@ Rs. 30 per Person Extra." },
];

export const COMPANY_INFO = {
  name: "Hariom Caterers",
  owner: "Khimjibhai Purohit",
  phone: "9824615399",
  whatsapp: "919824615399",
  email: "contact@hariomcatars.com",
  city: "Ahmedabad, Gujarat",
  tagline: "Exquisite Pure Vegetarian Event Catering",
  aboutUs:
    "Hariom Caterers is Ahmedabad's premier vegetarian catering firm, renowned for over 25 years of culinary mastery. We specialize in opulent royal weddings, grand receptions, corporate galas, and festive celebrations. Our hallmark is immaculate hygiene, live interactive food counters, authentic traditional Gujarati thalis, and global gourmet fusion.",
  highlights: [
    "100% Pure Vegetarian & Authentic Flavors",
    "State-of-the-Art Live Cooking Stations",
    "Experienced Master Chefs & Professional Service Staff",
    "Customizable Menus for All Occasions",
    "Highest Standards of Food Hygiene & Quality Control",
  ],
};

export function getDishesForCategory(catName: string): string[] {
  if (!catName) return [];

  if (DISH_CATALOG[catName] && DISH_CATALOG[catName].length > 0) {
    return DISH_CATALOG[catName];
  }

  const norm = catName.trim().toLowerCase();

  if (
    norm.includes("welcome") ||
    norm.includes("mocktail") ||
    norm.includes("juice") ||
    norm.includes("drink") ||
    norm.includes("beverage")
  ) {
    const list = [
      ...(DISH_CATALOG["Welcome Juice / Mocktail"] || []),
      ...(DISH_CATALOG["Mocktails & Beverages"] || []),
      ...(DISH_CATALOG["Mocktail Bar"] || []),
      ...(DISH_CATALOG["Welcome Fresh"] || []),
      ...(DISH_CATALOG["Appetizers"] || []),
    ];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (norm.includes("soup")) {
    const list = [...(DISH_CATALOG["Soups"] || []), ...(DISH_CATALOG["Soup"] || [])];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (norm.includes("starter") || norm.includes("snack") || norm.includes("shot")) {
    const list = [
      ...(DISH_CATALOG["Starters & Snacks"] || []),
      ...(DISH_CATALOG["Starter"] || []),
      ...(DISH_CATALOG["Mobile Starters"] || []),
      ...(DISH_CATALOG["Sweet Starter"] || []),
      ...(DISH_CATALOG["Shots"] || []),
    ];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (
    norm.includes("chat") ||
    norm.includes("chaat") ||
    norm.includes("counter") ||
    norm.includes("live")
  ) {
    const list = [
      ...(DISH_CATALOG["Indian Live Chaat"] || []),
      ...(DISH_CATALOG["Live Chat"] || []),
      ...(DISH_CATALOG["Banarasi Chaat"] || []),
      ...(DISH_CATALOG["Special Chaat"] || []),
      ...(DISH_CATALOG["Indore Chaat"] || []),
      ...(DISH_CATALOG["Italian Live - Pizza Bar"] || []),
      ...(DISH_CATALOG["Pasta Bar"] || []),
      ...(DISH_CATALOG["Mexican"] || []),
      ...(DISH_CATALOG["Thai Special"] || []),
      ...(DISH_CATALOG["Oriental / Chinese Pan Asian"] || []),
    ];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (norm.includes("farsan")) {
    if (DISH_CATALOG["Farsan"]) return DISH_CATALOG["Farsan"];
  }

  if (
    norm.includes("main") ||
    norm.includes("sabz") ||
    norm.includes("sabj") ||
    norm.includes("curry")
  ) {
    if (DISH_CATALOG["Main Course Sabzi"]) return DISH_CATALOG["Main Course Sabzi"];
  }

  if (
    norm.includes("bread") ||
    norm.includes("roti") ||
    norm.includes("naan") ||
    norm.includes("puri") ||
    norm.includes("paratha")
  ) {
    const list = [
      ...(DISH_CATALOG["Roti / Indian Bread"] || []),
      ...(DISH_CATALOG["Bread Station"] || []),
      ...(DISH_CATALOG["Assortment of Breads"] || []),
    ];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (norm.includes("dal") || norm.includes("kadhi")) {
    if (DISH_CATALOG["Dal / Kadhi"]) return DISH_CATALOG["Dal / Kadhi"];
  }

  if (norm.includes("rice") || norm.includes("pulao") || norm.includes("biryani")) {
    if (DISH_CATALOG["Rice / Biryani"]) return DISH_CATALOG["Rice / Biryani"];
  }

  if (
    norm.includes("sweet") ||
    norm.includes("dessert") ||
    norm.includes("mithai") ||
    norm.includes("halwa") ||
    norm.includes("ice cream")
  ) {
    const list = [
      ...(DISH_CATALOG["Sweets & Halwa"] || []),
      ...(DISH_CATALOG["Desserts"] || []),
      ...(DISH_CATALOG["Dessert"] || []),
      ...(DISH_CATALOG["Western Dessert Bar"] || []),
    ];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (norm.includes("salad")) {
    const list = [...(DISH_CATALOG["Salad Bar"] || []), ...(DISH_CATALOG["Salads"] || [])];
    if (list.length > 0) return Array.from(new Set(list));
  }

  if (norm.includes("chutney")) {
    if (DISH_CATALOG["Chutney"]) return DISH_CATALOG["Chutney"];
    return [
      "Green Mint Chutney",
      "Sweet Tamarind Dates Chutney",
      "Garlic Red Chutney",
      "Pineapple Chutney",
      "Raw Mango Chutney",
    ];
  }

  if (norm.includes("achar") || norm.includes("pickle")) {
    if (DISH_CATALOG["Achar"]) return DISH_CATALOG["Achar"];
    return [
      "Mango Achar",
      "Lemon Chilly Achar",
      "Gunda Achar",
      "Kerda Achar",
      "Chhundo",
      "Sweet Mango Pickle",
    ];
  }

  if (norm.includes("paan") || norm.includes("mukhwas")) {
    if (DISH_CATALOG["Mukhwas & Paan"]) return DISH_CATALOG["Mukhwas & Paan"];
  }

  if (norm.includes("papad")) {
    if (DISH_CATALOG["Papad"]) return DISH_CATALOG["Papad"];
    return [
      "Udad Papad",
      "Nylon Papad",
      "Nagli Papad",
      "Khichiya Papad",
      "Sabudana Papad",
      "Rice Papad",
      "Papad Churma",
      "Masala Roasted Papad",
    ];
  }

  if (norm.includes("water") || norm.includes("bottle")) {
    if (DISH_CATALOG["200 ml water bottle"]) return DISH_CATALOG["200 ml water bottle"];
    return ["200 ml Packaged Mineral Water Bottles", "Bisleri Water Bottle 200ml"];
  }

  const matches = Object.keys(DISH_CATALOG).filter(
    (k) => k.toLowerCase().includes(norm) || norm.includes(k.toLowerCase()),
  );
  if (matches.length > 0) {
    const combined = matches.flatMap((k) => DISH_CATALOG[k] || []);
    return Array.from(new Set(combined));
  }

  return [];
}
