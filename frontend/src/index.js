import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import EventDetail from "./Pages/EventDetail.jsx";
import Billing from "./Pages/Billing.jsx";
import MonthlyReport from "./Pages/MonthlyReport.jsx";
import BookingManagement from "./Pages/BookingManagement";
import JewelleryManagement from "./Pages/JewelleryManagement";
import CategoryMaster from "./Pages/CategoryMaster";
import CategoryItemMaster from "./Pages/CategoryItemMaster";
import TermAndConditionsMaster from "./Pages/TermAndConditionsMaster";
import Viewquotation from "./Pages/Viewquotation.jsx";
import Master from "./Pages/Master.jsx";
import LehengaInventory from "./Pages/LehengaInventory.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/rental-system">
    <Routes>
      <Route path="/" element={<App />}>
        {/* Public Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/monthly-report"
          element={
            <ProtectedRoute>
              <MonthlyReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-management"
          element={
            <ProtectedRoute>
              <BookingManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jewellery-management"
          element={
            <ProtectedRoute>
              <JewelleryManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/lehenga-inventory"
          element={
            <ProtectedRoute>
              <LehengaInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-details/:id"
          element={
            <ProtectedRoute>
              <EventDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-quotation"
          element={
            <ProtectedRoute>
              <Viewquotation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category-master"
          element={
            <ProtectedRoute>
              <CategoryMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category-item-master"
          element={
            <ProtectedRoute>
              <CategoryItemMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/term-and-conditions-master"
          element={
            <ProtectedRoute>
              <TermAndConditionsMaster />
            </ProtectedRoute>
          }
        />
        <Route
          path="/master"
          element={
            <ProtectedRoute>
              <Master />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
