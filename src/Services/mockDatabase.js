const STORAGE_KEYS = {
  products: "mock_products",
  featuredIds: "mock_featured_product_ids",
  users: "mock_users",
  orders: "mock_orders",
  cart: "mock_cart_items",
  session: "mock_active_user"
};

const defaultProducts = [
  {
    id: 10001,
    name: "Basics To Advanced In React",
    overview:
      "React is a JavaScript library for building user interfaces, primarily maintained by Meta (Facebook). It allows developers to create reusable UI components and manage the state and rendering of those components efficiently.",
    long_description:
      "React is a JavaScript library used to build interactive user interfaces. It's declarative, efficient, and component-based, making UI development predictable and scalable.",
    price: 29,
    poster:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 5,
    best_seller: true
  },
  {
    id: 10002,
    name: "Django Framework for Beginners",
    overview:
      "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design.",
    long_description:
      "Django is a powerful, open-source web framework written in Python. It is designed to make web development faster and easier by providing a clean and pragmatic way to build web applications. Django follows the batteries-included philosophy, meaning it comes with a lot of built-in features like an admin panel, user authentication, form handling, and a database interface, so you can focus on building your app rather than reinventing the wheel.",
    price: 19,
    poster:
      "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 2,
    best_seller: false
  },
  {
    id: 10003,
    name: "The Future of Design Systems",
    overview:
      "Design systems have become essential for building consistent, scalable digital experiences.",
    long_description:
      "The future of design systems lies in greater integration, intelligence, and inclusivity. As digital products grow in complexity, design systems are evolving from static libraries into dynamic, code-connected ecosystems that power entire user experiences.",
    price: 29,
    poster:
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=650&q=40",
    rating: 3,
    in_stock: true,
    size: 1,
    best_seller: false
  },
  {
    id: 10004,
    name: "The Complete Guide to Backend Development",
    overview:
      "This guide walks you through everything you need to know to become a skilled backend developer.",
    long_description:
      "Backend development refers to the server-side of web development—the part you don’t see but that powers everything behind the scenes. It handles databases, servers, application logic, authentication, APIs, and more.",
    price: 99,
    poster:
      "https://images.unsplash.com/photo-1595617795501-9661aafda72a?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 7,
    best_seller: true
  },
  {
    id: 10005,
    name: "Build a Blockchain from Scratch in Go",
    overview:
      "Create a minimal blockchain using Go (Golang), ideal for systems-level programming like blockchain.",
    long_description:
      "Blockchain is a decentralized ledger technology that powers cryptocurrencies like Bitcoin and Ethereum. Building a simple blockchain from scratch is one of the best ways to understand how it works internally—blocks, hashes, consensus, mining, transactions, and more.",
    price: 19,
    poster:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=650&q=40",
    rating: 3,
    in_stock: true,
    size: 3,
    best_seller: false
  },
  {
    id: 10006,
    name: "Frontend Fastlane Plan With Projects",
    overview:
      "A structured, accelerated path for mastering modern frontend development with hands-on projects.",
    long_description:
      "Equip you with real-world frontend skills rapidly through structured learning and practical projects. Beginners to intermediate developers wanting a career-ready frontend skillset in 12 weeks breaking down each phase with an explanation of what you'll learn, why it's important, and how the projects will reinforce those skills.",
    price: 99,
    poster:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 10,
    best_seller: false
  },
  {
    id: 10007,
    name: "Master the Code Review",
    overview:
      "Mastering code reviews to improve effectiveness in giving and receiving feedback.",
    long_description:
      "Mastering the code review is the ability to evaluate, critique, and improve code collaboratively in a way that enhances software quality, promotes team growth, and maintains a healthy development culture. It involves more than just spotting bugs — it's about nurturing a shared codebase and building a better engineering team.",
    price: 19,
    poster:
      "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 2,
    best_seller: false
  },
  {
    id: 10008,
    name: "JavaScript Basics To Advance With Shubham",
    overview:
      "A comprehensive program guiding learners from foundational JavaScript concepts to advanced topics.",
    long_description:
      "JavaScript Basics to Advance with Shubham is a complete journey through the JavaScript programming language — starting from core concepts and gradually progressing to advanced topics. This guide is designed to build your skills step-by-step with real-world examples, hands-on coding, and practical projects.",
    price: 29,
    poster:
      "https://images.unsplash.com/photo-1613490900233-141c5560d75d?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 3,
    best_seller: true
  },
  {
    id: 10009,
    name: "Python Deep Dive With Projects",
    overview:
      "Ideal for those looking to build real-world, advanced-level Python applications.",
    long_description:
      "Python Deep Dive with Projects is a comprehensive, hands-on program designed for learners who already understand the basics of Python and want to master intermediate to advanced concepts. This course emphasizes practical application through real-world projects.",
    price: 29,
    poster:
      "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 3,
    best_seller: false
  },
  {
    id: 10010,
    name: "Mastering Software Technique",
    overview:
      "Writing good code, architecting scalable systems, and using best practices for sustainable products.",
    long_description:
      "Mastering software technique refers to developing a high level of skill, precision, and efficiency in the design, development, and maintenance of software systems.",
    price: 19,
    poster:
      "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=650&q=40",
    rating: 4,
    in_stock: true,
    size: 1,
    best_seller: false
  },
  {
    id: 10011,
    name: "Web Development Foundation",
    overview:
      "Foundational knowledge for aspiring web developers covering core topics and best practices.",
    long_description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore?",
    price: 29,
    poster:
      "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 3,
    best_seller: true
  },
  {
    id: 10012,
    name: "Mastering Git and GitHub - A Practical Guide",
    overview:
      "Practical guide to version control workflows that scales with teams of any size.",
    long_description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore?",
    price: 9,
    poster:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=650&q=40",
    rating: 5,
    in_stock: true,
    size: 1,
    best_seller: false
  },
  {
    id: 10013,
    name: "Everything About React v16",
    overview:
      "Deep dive into React v16 capabilities, concurrent mode, and new APIs.",
    long_description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore?",
    price: 19,
    poster:
      "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=650&q=40",
    rating: 4,
    in_stock: false,
    size: 3,
    best_seller: false
  },
  {
    id: 10014,
    name: "Diving Deep With Python 2.7",
    overview:
      "Legacy Python coverage tailored for maintaining mature codebases.",
    long_description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore?",
    price: 19,
    poster:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=650&q=40",
    rating: 4,
    in_stock: false,
    size: 3,
    best_seller: false
  },
  {
    id: 10015,
    name: "Kickstart Your UI Design Career",
    overview:
      "All the essentials required to land your first UI design role and build a strong portfolio.",
    long_description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta aut, vel ipsum maxime quam quia, quaerat tempore minus odio exercitationem illum et eos, quas ipsa aperiam magnam officiis libero expedita quo voluptas deleniti sit dolore?",
    price: 9,
    poster:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=650&q=40",
    rating: 2,
    in_stock: false,
    size: 1,
    best_seller: false
  }
];

const defaultFeaturedIds = [10004, 10006, 10008];

const defaultUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    isAdmin: true
  },
  {
    id: 2,
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123",
    isAdmin: false
  }
];

const defaultOrders = [
  {
    id: 1,
    userId: 2,
    orderId: "ORD-001",
    paymentId: "PAY-001",
    quantity: 2,
    amount_paid: 58,
    createdAt: new Date().toISOString(),
    cartList: defaultProducts.filter((product) =>
      [10001, 10008].includes(product.id)
    ),
    user: {
      id: 2,
      name: "Demo User",
      email: "demo@example.com"
    }
  }
];

const safeParse = (value, fallback) => {
  if (typeof value !== "string") {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const getFromStorage = (key, fallback) => {
  if (typeof window === "undefined") {
    return fallback;
  }
  const storedValue = window.localStorage.getItem(key);
  if (!storedValue) {
    return fallback;
  }
  return safeParse(storedValue, fallback);
};

const setInStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const mockDatabase = {
  getProducts() {
    return getFromStorage(STORAGE_KEYS.products, defaultProducts);
  },
  saveProducts(products) {
    setInStorage(STORAGE_KEYS.products, products);
  },
  getFeaturedIds() {
    return getFromStorage(STORAGE_KEYS.featuredIds, defaultFeaturedIds);
  },
  saveFeaturedIds(ids) {
    setInStorage(STORAGE_KEYS.featuredIds, ids);
  },
  getUsers() {
    return getFromStorage(STORAGE_KEYS.users, defaultUsers);
  },
  saveUsers(users) {
    setInStorage(STORAGE_KEYS.users, users);
  },
  getOrders() {
    return getFromStorage(STORAGE_KEYS.orders, defaultOrders);
  },
  saveOrders(orders) {
    setInStorage(STORAGE_KEYS.orders, orders);
  },
  getCartItems() {
    return getFromStorage(STORAGE_KEYS.cart, []);
  },
  saveCartItems(items) {
    setInStorage(STORAGE_KEYS.cart, items);
  },
  getActiveUser() {
    return getFromStorage(STORAGE_KEYS.session, null);
  },
  setActiveUser(user) {
    if (!user) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEYS.session);
        window.localStorage.removeItem(STORAGE_KEYS.cart);
      }
      return;
    }
    setInStorage(STORAGE_KEYS.session, user);
  }
};

export const createId = () => Date.now();

export const delay = (value, time = 250) =>
  new Promise((resolve) => setTimeout(() => resolve(value), time));
