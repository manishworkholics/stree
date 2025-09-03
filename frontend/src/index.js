import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/booking-management" element={<BookingManagement />} />
        <Route path="/jewellery-management" element={<JewelleryManagement />} />
        <Route path="/lehenga-inventory" element={<LehengaInventory />} />


        <Route path="/event-details/:id" element={<EventDetail />} />
        <Route path="/view-quotation" element={<Viewquotation />} />
        <Route path="/category-master" element={<CategoryMaster />} />
        <Route path="/category-item-master" element={<CategoryItemMaster />} />
        <Route path="/term-and-conditions-master" element={<TermAndConditionsMaster />} />
        <Route path="/master" element={<Master />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
