import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { ProductPage } from "./pages/ProductPage.tsx";
import { Login } from "./components/Login.tsx";
import { SignUp } from "./components/SignUp.tsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.tsx";
import { WhishList } from "./components/WhishList.tsx";
import Cart from "./components/Cart.tsx";
import { CheckOut } from "./components/CheckOut.tsx";
import { AdminDashboard } from "./Admin/AdminDashboard.tsx";
import { Dashboard } from "./Admin/Dashboard.tsx";
import { Orders } from "./Admin/Orders.tsx";
import { AdminProduct } from "./Admin/AdminProduct.tsx";
import { Customers } from "./Admin/Customers.tsx";
import { AddProduct } from "./Admin/AddProduct.tsx";
import { Provider } from "react-redux";
import { store } from "./store.ts";
import { AdminCategories } from "./Admin/AdminCategories.tsx";
import { ProductDetails } from "./components/ProductDetails.tsx";
import { Profile } from "./components/Profile.tsx";
import { PrivateRouter } from "./components/PrivateRouter.tsx";
import Invoice from "./components/Invoice.tsx";
import UsersProduct from "./Admin/UsersProduct.tsx";
import { GetUserOrders } from "./components/GetUserOrders.tsx";
import { EditProduct } from "./Admin/EditProduct.tsx";
import { UserLayout } from "./Layouts/UserLayout.tsx";
import { AdminLayout } from "./Layouts/AdminLayout.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<UserLayout />}>
        <Route path="/" index={true} element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/product/:_id" element={<ProductDetailPage />} />

        <Route element={<PrivateRouter />}>
          <Route path="wishlist" element={<WhishList />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="profile" element={<Profile />} />
          <Route path="orders" element={<GetUserOrders />} />
          <Route path="order/:id" element={<UsersProduct />} />
        </Route>
      </Route>

      <Route element={<PrivateRouter />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/product" element={<AdminProduct />} />
            <Route path="/admin/cumstores" element={<Customers />} />
            <Route path="/admin/product/:_id" element={<ProductDetails />} />
            <Route path="/admin/product/create" element={<AddProduct />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/order/:id" element={<UsersProduct />} />
            <Route path="/admin/products/:_id" element={<EditProduct />} />
          </Route>
          <Route path="/orders" element={<GetUserOrders />} />
          <Route path="/order/:id" element={<UsersProduct />} />
        </Route>
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
