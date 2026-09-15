import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BedDouble,
  CalendarCheck,
  UtensilsCrossed,
  Sparkles,
  Users,
  ReceiptText,
  LogOut,
  Bell,
  Hotel,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Tổng quan",
      path: "/dashboard",
      icon: LayoutDashboard,
      roles: ["Admin", "Receptionist"],
    },
    {
      name: "Sơ đồ buồng phòng",
      path: "/dashboard/rooms",
      icon: BedDouble,
      roles: ["Admin", "Receptionist", "Housekeeping"],
    },
    {
      name: "Đặt phòng & Check-in",
      path: "/dashboard/bookings",
      icon: CalendarCheck,
      roles: ["Admin", "Receptionist"],
    },
    {
      name: "Màn hình Bếp (KDS)",
      path: "/dashboard/kitchen",
      icon: UtensilsCrossed,
      roles: ["Admin", "Kitchen"],
    },
    {
      name: "Dọn phòng & Vệ sinh",
      path: "/dashboard/housekeeping",
      icon: Sparkles,
      roles: ["Admin", "Housekeeping", "Receptionist"],
    },
    {
      name: "Hóa đơn & Thu ngân",
      path: "/dashboard/invoices",
      icon: ReceiptText,
      roles: ["Admin", "Receptionist"],
    },
    {
      name: "Quản lý người dùng",
      path: "/dashboard/users",
      icon: Users,
      roles: ["Admin"],
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 border-r border-slate-800 shadow-xl">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-900 font-bold shadow-md shadow-amber-500/20">
            <Hotel className="w-5 h-5 text-slate-900" />
          </div>
          <div>
            <h1 className="font-bold text-white text-base leading-none">
              GRAND HOTEL
            </h1>
            <span className="text-[11px] text-amber-400 font-medium tracking-wide">
              Hệ Thống Quản Trị
            </span>
          </div>
        </div>

        {/* Current User Info Card */}
        <div className="p-4 mx-4 my-4 bg-slate-800/60 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-900 font-bold flex items-center justify-center text-sm">
            {user?.fullName?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">
              {user?.fullName || "Nhân viên"}
            </p>
            <span className="inline-block text-[10px] uppercase font-bold px-2 py-0.5 mt-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {user?.role || "Staff"}
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-slate-950" : "text-slate-400"}`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
          >
            &larr; Xem Cổng Khách Hàng
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-red-400 hover:text-white hover:bg-red-600/80 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-slate-500">
              Chi nhánh hiện tại:
            </span>
            <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700 border border-slate-200">
              Chi nhánh Quận 1 - TP. Hồ Chí Minh
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200"></div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-800 block">
                {user?.fullName || "Hệ Thống"}
              </span>
              <span className="text-[11px] text-slate-400 block">
                {user?.email || "admin@hotel.vn"}
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
