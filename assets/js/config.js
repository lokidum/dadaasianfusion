// =========================================================================
// DADA RESTAURANT — central configuration. This is your main edit surface.
// Swap booking provider URL, menu items, products, and image URLs here.
// =========================================================================

window.DADA_CONFIG = (function () {

  const BRAND = {
    name: "dada",
    tagline: "Modern Asian-fusion · Canberra",
    description: "Modern Asian-inspired dining and artisanal house-made treats."
  };

  const CONTACT = {
    address: "G4/12 Furzer Street, Phillip, ACT 2606",
    phone: "0493 514 593",
    phoneRaw: "+61493514593",
    email: "hello@dadarestaurant.com.au",
    reservationsEmail: "reservations@dadarestaurant.com.au",
    hours: [
      { day: "Tuesday — Thursday", time: "5:30 PM — 10:00 PM" },
      { day: "Friday — Saturday",  time: "5:30 PM — 11:00 PM" },
      { day: "Sunday",             time: "5:30 PM — 9:30 PM" },
      { day: "Monday",             time: "Closed" }
    ],
    socials: {
      instagram: "https://instagram.com/",
      facebook:  "https://facebook.com/",
      google:    "https://maps.google.com/"
    }
  };

  // TODO: wire to booking provider (OpenTable / SevenRooms / ResDiary)
  // When set to a URL string, booking form submission will redirect with form data appended.
  const BOOKING_PROVIDER_URL = null;

  // TODO: wire to checkout provider (Square / Stripe / Mr Yum / Bopple)
  const CHECKOUT_PROVIDER_URL = null;

  // Centralized image URL bank. Every <img data-asset-role="..."> reads from this map.
  // Replace any URL with a real Dada photo and it propagates everywhere it's used.
  const IMAGES = {
    hero:                 "https://lh3.googleusercontent.com/aida-public/AB6AXuDuLpFlmqQ6mUkF0LmZQjUtgEcKaC8DVI4chS8Aiwjk_Lo-vKEH2KILcvFwLPBoBNYWVkz_5HRzZkRzWHN0jLDLR7Vn7VAAvz7q4kqrhi3T2RsExqq2EnHRfQ4d31NwxQk3kfFRA-EzgMG8sM_R5W5JZb-rJYpKlsmccmpb_l7yZ3uBOzKcfvfwy36MOTwUSHkOENlrYG0OdRtwBRqbZ8aGmM-eXcZ-2RB4mvkrJ29hMrjJqMP7-13UkUKnRYR0wYqq-pPgrtRiJ_PB",
    highlightWombok:      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3X-RWmnPLqJYqQqd9HxLR9-aE5BfP6KU2PIkfHFvUF5fkjjLkr7w-djbAyP5GBpMjV5LH0e4hSEDKFv4FrsTHEY3kQVtxSpEx0DJBzS-EmwAxgFXJZRwsK1Vhd4Xq79xWqM4owMlBfP_TgBpwUtZkbjsLB9CHnGZ3CL2GP_yA8eDgWzkQ6JhB4VVCsCXOqdYxGSAjMrlOZbZw2pYBpHQ9Bdh4ZkVz_3ZTSCKDOZcfg6JEK2BGiAFcc7QmqXvgYDvyt8x1MQOC5_o",
    highlightKFC:         "https://lh3.googleusercontent.com/aida-public/AB6AXuDtBN_g9PHB-x5HBkS9NJrXg5SmYBgs8q-2nCqgvLY1WkHJYbgKqIQF_h0pbdtuMOhxn5sNlEhGzgUxOyKR3BCrCC72sgEOgVqo6m9C2v2qwjVQ8qE9p_8DLF66Lyrp1zL3VtkCKj9ezgM5OdkqCkSAdJOIODn-x_5T2STo8E9TGAo2u9c70JdiVrr97FAtCfWoOZxbqAQy9hLrFw9ZJOTtNz3uHrXAg3WeQpYsR0RDhAhFqgxAtjvK6XLOZ1V14ZNc5R7AbiC-LWAU",
    highlightMatcha:      "https://lh3.googleusercontent.com/aida-public/AB6AXuB55BBJgzIVMfvKpMBghd4PVDXdMfb4SUSAYDtVnP4n7Tf8t6qBQX4PqHGtZ9MZHWXFKLHN2HRcHrhO-q6q-zg-_3Jdpr3xfMQ6XcGZGqMSAmrPq9_xQXEtBfFwGEdoYJ2NJ_LhvFKvFy5L5yfdGCqYzwTbf99nGSV3a0XEh1JlqLfRcLrnZTwBFRkX6yfsxh1H9XxIIZ_z-vEgZGRGfRzdQp9Rg-MWzNXxbVKfQs5L0BiPHsR0_PyZKsKbXMIuhpqcUk7Z2qrFOTYx",
    editorialSmallPlates: "https://lh3.googleusercontent.com/aida-public/AB6AXuDKVcJMaSc5d_J-2c9ZUu7T9TqRwAaUkOnQzPxRn9bvr1ig8MzZ3WfqKLN-MFcjsdr8WGcXuTArD-FhX9eXuVsTRPpgVCSXJuKAhTcQ-rDfXdtBh8tMtO1AQUaHfBlA1zRYIcWxRxhbFEqMVwz8sw5BzwYzMlAaSi6dxFmiB8KGyBSPVU8C3QGu7uYFTAyOKjBOtRLeNz_eMbpNi8gC-Vw9hRlqWqK28pUUmKPPMUbA2GnGwLBoSqWBLZxCnvUk4QBQYHmKwUFzKZAJ",
    editorialMains:       "https://lh3.googleusercontent.com/aida-public/AB6AXuC2P-N2-z9jhCBdtmqf8FfYzRk_PuwwYqcKjyZP3HoO_OEsbBu8JJSgGdvX_-z8XSMhEFOlMNm9wEhRpQy_AjC9TUYUQvtUmKHoIxMx5VENPxlDwHpYsfYZHvy-9fS9Zk7DJTOEW2NTOyA6gKZJ-x8sjvyG_2EX0nOSL7iizf2v8q9NDHcWlt1PGn8b6FY7XHTQzeOMnTfFKKr0qvYr2Qm2pi9rXM7KNTQrPMjJD8MwGq50fqfgKE-zsXbswWqV98m-4PQg9aP7N1Hp",
    editorialDesserts:    "https://lh3.googleusercontent.com/aida-public/AB6AXuB55BBJgzIVMfvKpMBghd4PVDXdMfb4SUSAYDtVnP4n7Tf8t6qBQX4PqHGtZ9MZHWXFKLHN2HRcHrhO-q6q-zg-_3Jdpr3xfMQ6XcGZGqMSAmrPq9_xQXEtBfFwGEdoYJ2NJ_LhvFKvFy5L5yfdGCqYzwTbf99nGSV3a0XEh1JlqLfRcLrnZTwBFRkX6yfsxh1H9XxIIZ_z-vEgZGRGfRzdQp9Rg-MWzNXxbVKfQs5L0BiPHsR0_PyZKsKbXMIuhpqcUk7Z2qrFOTYx",
    editorialDrinks:      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoX-3X8jD8U4dY0EZQyrPxRTbZ3VK8nMfCwz4qLBlsZ4DXcQDLqkLk9Y_R-rE3yhSqe0WBdQRGc5n-tF2KGyqUWN1pK0xQHdyVoIvJxYUx7zwm8aMfNYDP4tNqLkkfvqAkqRyQX2BBHK13bDppWlNVo_QPjpV9CkKBjg-9o3X7M5_C-Y1zlAj99WzHo1IqsKqWFRkXKRWQSqL_xCDFzZXfPDpV1uTw7Z5gNkXTfBQ9j7XK4kK7p1QtPNb1JFkH9YQOErcuU_Vj",
    about:                "https://lh3.googleusercontent.com/aida-public/AB6AXuD9pNkLPwRgY2_3FQqVqAEpfBPJ7zM5XsK8RR1HfHvWzN4UrUm3F0lT2qH8B5cYxV9Y0Kkf-x8jOpJ7uB1XwQZG4kCJp9LcQVfQ1n8gqzG_-3jJxTyKxBdc4hZE5rW7vHs2yY6QqM9z7gVT4ZqgJxXQGMP4WfNZ3kCkbN8jPLp6kQH4nVw3xJyKbXqQ-T9F8gKfRwWqcVx-zZjPNHwLqM8KvBxRfYqfPwH3sZxR1mF",
    productChiliOil:      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQy7xPyTKb4WjFiyJgRpgPxKHQEHTm-bnpz_lJ_LbPRnD2WqHyrYTjqI0lh-MXxJoHhfYjVnpXVnzNkBV2vqA2I7m6JoIQX7vWQGgD0OS4xCe04oXfP4SmDRDl3InyD-OYwO5C-W7hUtwPLT-MhpglkXq42kp7zKCwj7DvKzWFGoyqLOdaUC6oo7BlfawTHXJfwKuRJaWeq-3ZGgVT0EDcwxbtTSGZRiVHFLfECoLPVOnv5XSrnH-vAIc4klFHxJSY9kqRoofZ1xpY",
    productTonkotsuKit:   "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Kg5XCfV5T0DH8E4hHpRRBnZBOnsRkLb_AfcXFKYUf3oJ8xGl5wjQjF4D0vJtMnxBPa1xVN9pj2YnRkVtH2GhcAQt9JdYJlOu8R0vR2QmDQXcMqf5xUWxR7vJaUOhRfTcAjUUtUE3Pp_DkN9YWXFnNYbZS2pwQlqJV2RGpL5MyOhVlEjBs4FdLcCV5xMfCnP4kSdAcRRzNqHhX1l_PqzRz3DLxFKLcNI3OQqJaLE5MTVRX0ufvf4QJh1nJqSqGRR2zVwO_RD8KkP2",
    productMatchaCrepe:   "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ6KO8FT_3o1tvShCQH7VqMxR4ZeMr3hZc-S0gNk9PXvFnWXJzqXLk_GbYHkRMyqEsxKvTb3vH7B0o1MQVbZ0Q7BTu2BJyL0DcDsX-rsRGZIJ8RKPSdF7HVx9wB7gK4LjqWPwHb8mzJpY-Zk2WfBJxgGqkN3vT7DnLJqxKQQrPzWxLT0xZNcRfXk4KCwxPdJ-PXHL_RZk29YN6QHcYRMpDR3xWxxhPxNbF6YJvCcvN_RsLwUDdRYPjcS-PFwQJ0jPGwKWNk1lD",
    productSoyGlaze:      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOmcAUmF8r5oWnZqVk5o6gIDxsfqHnPP3CJfRJW6FBmJzKqL7qFjdgDxsHCRGq91UNRjOOA4QaXh8DLDtQ-jOX9JNoLNNX4WqEBYwFLk-9LRkmKjj2lQzKkPHQ7iWyV2nLLqIqMQXp3wM2EgYpzqIQEDQ5xkV7lUbS5HW7QC58XzNeRZsUlj_aGiGV1jZP4MMqcvGr94UoVUEXFGHkqU8m1ZpFRKqI0nVcMl-c4mIqJEgmKqL5pjAsGNzbN2YJ0VK5fOQa9wuI",
    menuKoreanFC:         "https://lh3.googleusercontent.com/aida-public/AB6AXuDtBN_g9PHB-x5HBkS9NJrXg5SmYBgs8q-2nCqgvLY1WkHJYbgKqIQF_h0pbdtuMOhxn5sNlEhGzgUxOyKR3BCrCC72sgEOgVqo6m9C2v2qwjVQ8qE9p_8DLF66Lyrp1zL3VtkCKj9ezgM5OdkqCkSAdJOIODn-x_5T2STo8E9TGAo2u9c70JdiVrr97FAtCfWoOZxbqAQy9hLrFw9ZJOTtNz3uHrXAg3WeQpYsR0RDhAhFqgxAtjvK6XLOZ1V14ZNc5R7AbiC-LWAU"
  };

  // Booking time-slot options. Edit freely.
  const TIME_SLOTS = ["5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

  // Pickup-date options for the cart (order-online flow).
  const PICKUP_OPTIONS = [
    { value: "today",     label: "Today (after 4:00 PM)" },
    { value: "tomorrow",  label: "Tomorrow" },
    { value: "this-week", label: "Pick a day this week" }
  ];

  // Editorial image keyed off the active menu category tab.
  const CATEGORY_IMAGES = {
    "small-plates": { src: IMAGES.editorialSmallPlates, caption: "Small Plates — handheld bites, hand-folded, hand-finished." },
    "mains":        { src: IMAGES.editorialMains,       caption: "Mains — slow stocks, charred edges, deep umami." },
    "desserts":     { src: IMAGES.editorialDesserts,    caption: "Desserts — house-pastry, ceremonial matcha, brown butter." },
    "drinks":       { src: IMAGES.editorialDrinks,      caption: "Drinks — local pet-nat, plum highballs, hojicha cold-brew." }
  };

  // -------------------- MENU (16 items) --------------------
  const MENU_DATA = [
    // Small Plates
    { id: "wombok-pancake",   name: "Wombok Pancake",       category: "small-plates", price: 18, tags: ["V","VG","S"], desc: "Crispy savoy cabbage pancake, scallion, ginger-soy dipping sauce." },
    { id: "charred-edamame",  name: "Charred Edamame",      category: "small-plates", price: 12, tags: ["V","VG","GF","DF"], desc: "Smoked sea salt, black garlic oil, togarashi." },
    { id: "mushroom-tempura", name: "Mushroom Tempura",     category: "small-plates", price: 16, tags: ["V","DF"], desc: "Locally foraged wild mushrooms, yuzu ponzu, shiso." },
    { id: "wagyu-tartare",    name: "Wagyu Beef Tartare",   category: "small-plates", price: 24, tags: ["DF"], desc: "Hand-cut wagyu, cured egg yolk, crispy shallots, toasted brioche." },
    { id: "prawn-dumplings",  name: "Steamed Prawn Dumplings", category: "small-plates", price: 19, tags: [], desc: "Hand-folded, chive, chili-garlic crisp, aged black vinegar." },

    // Mains
    { id: "korean-fc",     name: "Korean Fried Chicken", category: "mains", price: 28, tags: ["DF","S"], desc: "Double-fried, signature chili glaze, crushed peanuts, pickled daikon." },
    { id: "kimchi-rice",   name: "Kimchi Fried Rice",    category: "mains", price: 22, tags: ["V"], desc: "House-aged kimchi, soft egg, seasonal greens, sesame." },
    { id: "miso-cod",      name: "Miso Black Cod",       category: "mains", price: 42, tags: ["GF","DF","S"], desc: "48-hour miso cure, charred bok choy, dashi, lime." },
    { id: "tonkotsu",      name: "Tonkotsu Ramen",       category: "mains", price: 26, tags: [], desc: "24-hour pork broth, chashu, ajitama, fresh alkaline noodles." },
    { id: "charred-eggplant", name: "Charred Eggplant",  category: "mains", price: 24, tags: ["V","VG","GF","DF"], desc: "Burnt scallion oil, white miso glaze, toasted sesame." },

    // Desserts
    { id: "matcha-cheesecake", name: "Matcha Basque Cheesecake", category: "desserts", price: 14, tags: ["V","GF","S"], desc: "Burnt-top Basque, ceremonial-grade matcha, brown butter." },
    { id: "sticky-date",       name: "Sticky Date Pudding",      category: "desserts", price: 14, tags: ["V"], desc: "Black sugar caramel, brown butter ice cream." },
    { id: "yuzu-sorbet",       name: "Yuzu Sorbet",              category: "desserts", price: 10, tags: ["V","VG","GF","DF"], desc: "House-churned, candied yuzu peel, shiso oil." },

    // Drinks
    { id: "plum-highball",  name: "Plum Wine Highball", category: "drinks", price: 16, tags: [], desc: "Hakushu, house plum, soda, lemon zest." },
    { id: "hojicha-cb",     name: "Cold-Brew Hojicha",  category: "drinks", price: 7,  tags: ["V"], desc: "Roasted green tea, slow-drip, oat milk option." },
    { id: "local-petnat",   name: "Local Pet-Nat",      category: "drinks", price: 18, tags: [], desc: "Murrumbateman natural wine. 18 / glass · 72 / bottle." }
  ];

  const MENU_CATEGORIES = [
    { id: "small-plates", label: "Small Plates" },
    { id: "mains",        label: "Mains" },
    { id: "desserts",     label: "Desserts" },
    { id: "drinks",       label: "Drinks" }
  ];

  // -------------------- PRODUCTS (Order Online — takeaway provisions) --------------------
  const PRODUCT_DATA = [
    {
      id: "chili-oil",
      name: "Signature Chili Oil",
      desc: "House-roasted, slow-rendered. The chili oil from our Korean fried chicken — bottled.",
      price: 14,
      image: IMAGES.productChiliOil,
      tags: ["VG","GF"],
      inStock: true
    },
    {
      id: "tonkotsu-kit",
      name: "Tonkotsu Kit for Two",
      desc: "Our 24-hour pork broth, fresh noodles, chashu, ajitama, scallion, nori — ready in 8 minutes.",
      price: 38,
      image: IMAGES.productTonkotsuKit,
      tags: ["DF"],
      inStock: true
    },
    {
      id: "matcha-crepe",
      name: "Matcha Mille Crêpe",
      desc: "Twenty paper-thin crêpes layered with ceremonial-grade matcha cream. Whole cake, serves 6–8.",
      price: 45,
      image: IMAGES.productMatchaCrepe,
      tags: ["V"],
      inStock: true
    },
    {
      id: "soy-glaze",
      name: "Aged Soy Glaze",
      desc: "Twelve-month-aged soy reduction. The glaze from our miso black cod.",
      price: 16,
      image: IMAGES.productSoyGlaze,
      tags: ["VG","DF"],
      inStock: false
    }
  ];

  const TESTIMONIALS = [
    { quote: "The best dining experience in Canberra. Every plate felt considered — every flavour cutting-edge.", author: "Olivia M. · Google Reviews" },
    { quote: "Exceptional catering to dietary requirements. As a coeliac, I felt safe and looked after — and the food was outstanding.", author: "James K. · Trip Advisor" },
    { quote: "The Korean fried chicken alone is worth the trip. Service is attentive without being intrusive.", author: "The Canberra Times" }
  ];

  return {
    BRAND, CONTACT, BOOKING_PROVIDER_URL, CHECKOUT_PROVIDER_URL,
    IMAGES, TIME_SLOTS, PICKUP_OPTIONS, CATEGORY_IMAGES,
    MENU_DATA, MENU_CATEGORIES, PRODUCT_DATA, TESTIMONIALS
  };
})();
