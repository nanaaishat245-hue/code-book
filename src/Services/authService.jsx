import { createId, delay, mockDatabase } from "./mockDatabase";

const persistToken = (token) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("token", JSON.stringify(token));
};

const persistEmail = (email) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem("email", JSON.stringify(email));
  window.localStorage.setItem("user", JSON.stringify(email));
};

const clearPersistence = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("email");
  window.localStorage.removeItem("user");
};

const normaliseEmail = (email = "") => email.trim().toLowerCase();

const login = async (authDetail) => {
  const { email, password } = authDetail;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const users = mockDatabase.getUsers();
  const user = users.find(
    (entry) =>
      normaliseEmail(entry.email) === normaliseEmail(email) &&
      entry.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = `token-${Date.now()}`;
  const sessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: Boolean(user.isAdmin),
    token
  };

  persistToken(token);
  persistEmail(user.email);
  mockDatabase.setActiveUser(sessionUser);

  return delay(sessionUser);
};

const register = async (authDetail) => {
  const { name, email, password } = authDetail;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const users = mockDatabase.getUsers();
  const emailExists = users.some(
    (user) => normaliseEmail(user.email) === normaliseEmail(email)
  );

  if (emailExists) {
    throw new Error("An account with this email already exists");
  }

  const newUser = {
    id: createId(),
    name: name.trim(),
    email: email.trim(),
    password,
    isAdmin: false
  };

  mockDatabase.saveUsers([...users, newUser]);

  return login({ email, password });
};

const logout = async () => {
  mockDatabase.setActiveUser(null);
  clearPersistence();
  return delay(true, 150);
};

const authService = {
  login,
  register,
  logout
};
export default authService;