import React from "react"
import { Redirect } from "react-router-dom"
import ProductListing from "../pages/Product/ProductListing"
import Login from "../pages/Authentication/Login"
import Dashboard from "../pages/Authentication/Dashboard"
import ViewProduct from "../pages/Product/ViewProduct"
import AddProduct from "../pages/Product/AddProduct"
import UpdateProduct from "../pages/Product/UpdateProduct"

const authRoutes = [
  { path: "/login", component: Login },
  // { path: "**", component: Login},
]

const userRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/products", component: ProductListing},
  { path: "/products/view-product/:id", component: ViewProduct},
  { path: "/add-product", component: AddProduct},
  { path: "/products/update-product/:id", component: UpdateProduct},
  { path: "/", exact: true, component: () => <Redirect to="/login" /> },
]

export { userRoutes, authRoutes}