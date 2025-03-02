
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import BasePage from "./pages/BasePage";
import ProductsPage from "./pages/ProductsPage";


const router = createBrowserRouter([
    {path: '/', element: <BasePage />},

])

const root = createRoot(document.getElementById("root"));
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);