import { Route, Routes } from "react-router-dom";
import { HomePage, ProductList } from "../Pages";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import ProductDetails from "../Pages/ProductDetails";
import ProductsDemo from "../Pages/ProductsDemo";
import CartPage from "../Pages/Cart/CartPage";
import Dashboardpage from "../Pages/Dashboard/Dashboardpage";
import Order from "../Pages/Order/Order";
import AdminPage from "../Pages/Admin/AdminPage"
import AdminProtectedRoute from "./AdminProtectedRoute";


export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
         <Route path="/products" element={<ProductList/>}/>
        <Route path="/products/:id" element={<ProductDetails/>}/>
       <Route path="/demo" element={<ProductsDemo/>}/>
       <Route path="/Cart" element={<CartPage/>}/>
       <Route path="/dashboard" element={<Dashboardpage/>} />
       <Route path="/Order-Summary" element={<Order/>} />
       <Route path="/admin" element=
       {<AdminProtectedRoute>
        <AdminPage/>
       </AdminProtectedRoute>}/>
      </Routes>
    </>
  )
}