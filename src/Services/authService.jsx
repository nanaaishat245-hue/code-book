// import { createId, delay, mockDatabase } from "./mockDatabase";
import {USER_ENDPOINTS, apiRequest} from "../config/api"


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



const transformUserData = (userData) => {
   return {
    id: userData._id,
    _id: userData._id,
    name: userData.name,
    email: userData.email,
    isAdmin: Boolean(userData.isAdmin),
    cartList: userData.cartList || [],
    orderList: userData.orderList || [],
   };
};



const login = async (authDetail) => {
  const { email, password } = authDetail;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }


try {
  const userData = await apiRequest(USER_ENDPOINTS.LOGIN, {
    method: "POST",
    body: JSON.stringify({
      email: normaliseEmail(email),
      password,
    })
  })

const transformedUserData = transformUserData(userData);
persistEmail(transformUserData.email);

return transformedUserData;

} catch (error) {
  throw new Error (error.message || "invalid email or password")
}
}



const register = async (authDetail) => {
  const { name, email, password } = authDetail;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

 
try {
  const userData = await apiRequest(USER_ENDPOINTS.REGISTER_USER, {
    method: "POST",
    body: JSON.stringify({
      name: name.trim(),
      email: normaliseEmail(email),
      password,
    })
  })


const transformedUserData = transformUserData(userData);
persistEmail(transformedUserData.email);

return transformedUserData;

} catch (error) {
      throw new Error(error.message ||"failed to register");

}
}


const logout = async () => {
 try {
  await apiRequest(USER_ENDPOINTS.LOGOUT, {
    method: "POST",
  })
  clearPersistence;
  return true;

 } catch (error) {
  clearPersistence()
 throw new Error(error.message   || "Failed to logout");

 }
};

const authService = {
  login,
  register,
  logout
};
export default authService;