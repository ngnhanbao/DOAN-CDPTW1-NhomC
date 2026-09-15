import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import GuestLayout from "../layouts/GuestLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import HomePage from "../pages/guest/HomePage";
import RoomsPage from "../pages/guest/RoomsPage";
import LoginPage from "../pages/auth/LoginPage";
import OverviewPage from "../pages/dashboard/OverviewPage";
import RoomsManagementPage from "../pages/dashboard/RoomsManagementPage";
import KitchenKDSPage from "../pages/dashboard/KitchenKDSPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Cổng Khách Hàng (Guest Portal) */}
      <Route element={<GuestLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/dining" element={<RoomsPage />} />
        <Route path="/services" element={<RoomsPage />} />
      </Route>

      {/* Xác thực tài khoản */}
      <Route path="/login" element={<LoginPage />} />

      {/* Cổng Quản Trị & Vận Hành Nhân Viên */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<OverviewPage />} />
        <Route path="rooms" element={<RoomsManagementPage />} />
        <Route path="bookings" element={<OverviewPage />} />
        <Route path="kitchen" element={<KitchenKDSPage />} />
        <Route path="housekeeping" element={<RoomsManagementPage />} />
        <Route path="invoices" element={<OverviewPage />} />
        <Route path="users" element={<OverviewPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
