import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Hotel, User, LogOut, Calendar, Phone, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: 'ROOMS', path: '/rooms' },
    { label: 'SERVICES', path: '/services' },
    { label: 'DINING', path: '/dining' },
    { label: 'ABOUT US', path: '/about-us' },
    { label: 'MY BOOKINGS', path: '/my-bookings' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Banner Contact */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-6 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-amber-500" /> Hotline: 1900 8888
            (24/7)
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-500" /> TP. Hồ Chí Minh
            &bull; Đà Nẵng &bull; Nha Trang
          </span>
        </div>
        <div className="flex items-center gap-3">
          {user?.role && user.role !== "Guest" && (
            <Link
              to="/dashboard"
              className="text-amber-400 hover:underline font-medium"
            >
              Vào Trang Vận Hành ({user.role})
            </Link>
          )}
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Hotel className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                GRAND HOTEL
    <div className="bg-surface-container-lowest text-on-surface font-body-md text-body-md min-h-screen flex flex-col">
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest border-b border-primary">
        <div className="h-16 max-w-container-max mx-auto px-gutter-desktop flex items-center justify-between">
          {/* Logo Box */}
          <Link to="/" className="flex items-center gap-space-sm">
            <div className="relative w-36 h-9 border border-primary bg-surface-container-lowest flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full stroke-outline-variant stroke-[0.75]" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" />
                <line x1="100" y1="0" x2="0" y2="100" />
              </svg>
              <span className="relative z-10 bg-surface-container-lowest px-space-xs font-caption text-caption uppercase text-primary border border-outline-variant">
                [ HOTEL LOGO ]
              </span>
              <span className="text-[11px] uppercase tracking-widest text-amber-600 font-semibold">
                Luxury &amp; Resort
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
            <Link to="/" className="hover:text-amber-600 transition-colors">
              Trang chủ
            </Link>
            <Link
              to="/rooms"
              className="hover:text-amber-600 transition-colors"
            >
              Hạng phòng
            </Link>
            <Link
              to="/dining"
              className="hover:text-amber-600 transition-colors"
            >
              Ẩm thực F&B
            </Link>
            <Link
              to="/services"
              className="hover:text-amber-600 transition-colors"
            >
              Dịch vụ & Spa
            </Link>
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-space-lg">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/rooms' && location.pathname === '/');
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`uppercase transition-colors py-1 ${
                    isActive
                      ? 'border-b-2 border-primary font-headline-sm text-primary'
                      : 'font-label-md text-label-md text-on-surface-variant hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
          {/* User / Sign In Action */}
          <div className="flex items-center gap-space-md">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-700 hidden sm:inline">
                  {user.fullName || user.email}
                </span>
              <div className="flex items-center gap-space-sm">
                <Link
                  to={user.role === 'Guest' ? '/my-bookings' : '/dashboard'}
                  className="border border-primary bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wide transition-colors"
                >
                  [ {user.role === 'Guest' ? user.fullName || 'MY ACCOUNT' : `DASHBOARD (${user.role})`} ]
                </Link>
                <button
                  onClick={logout}
                  title="Đăng xuất"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Sign Out"
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
              <div className="flex items-center gap-space-sm">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-amber-600 transition"
                  className="border border-primary bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-primary px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wide transition-colors"
                >
                  Đăng nhập
                  [ SIGN IN / REGISTER ]
                </Link>
                <Link
                  to="/rooms"
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-sm transition flex items-center gap-2"
                  to="/login"
                  className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
                >
                  <Calendar className="w-4 h-4" /> Đặt phòng ngay
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1">
      {/* Main Content Area */}
      <main className="w-full pt-16 bg-surface-container-lowest flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <Hotel className="w-5 h-5 text-amber-500" />
              <span>GRAND HOTEL RESORT</span>
      <footer className="w-full bg-surface-container-lowest border-t border-primary mt-auto">
        <div className="max-w-container-max mx-auto px-gutter-desktop py-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-2xl">
            {/* Column 1 */}
            <div className="space-y-space-md">
              <div className="border border-primary p-space-xs inline-block bg-surface-container-lowest">
                <span className="font-headline-sm text-headline-sm uppercase text-primary">[ HOTEL NAME ]</span>
              </div>
              <div className="space-y-space-xs">
                <div className="h-2.5 w-4/5 bg-secondary-fixed"></div>
                <div className="h-2.5 w-3/5 bg-secondary-fixed"></div>
                <div className="h-2.5 w-2/3 bg-secondary-fixed"></div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Hệ sinh thái khách sạn và khu nghỉ dưỡng đẳng cấp quốc tế. Mang
              đến trải nghiệm lưu trú và ẩm thực đỉnh cao cho quý khách hàng.
            </p>

            {/* Column 2 */}
            <div className="space-y-space-sm">
              <div className="font-headline-sm text-headline-sm uppercase text-primary border-b border-outline-variant pb-space-xs">
                EXPLORE
              </div>
              <div className="space-y-space-xs pt-space-xs">
                <div className="h-2.5 w-24 bg-secondary-fixed"></div>
                <div className="h-2.5 w-28 bg-secondary-fixed"></div>
                <div className="h-2.5 w-20 bg-secondary-fixed"></div>
                <div className="h-2.5 w-32 bg-secondary-fixed"></div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="space-y-space-sm">
              <div className="font-headline-sm text-headline-sm uppercase text-primary border-b border-outline-variant pb-space-xs">
                SUPPORT
              </div>
              <div className="space-y-space-xs pt-space-xs">
                <div className="h-2.5 w-24 bg-secondary-fixed"></div>
                <div className="h-2.5 w-36 bg-secondary-fixed"></div>
                <div className="h-2.5 w-28 bg-secondary-fixed"></div>
                <div className="h-2.5 w-16 bg-secondary-fixed"></div>
              </div>
            </div>

            {/* Column 4 */}
            <div className="space-y-space-sm">
              <div className="font-headline-sm text-headline-sm uppercase text-primary border-b border-outline-variant pb-space-xs">
                CONTACT
              </div>
              <div className="space-y-space-xs pt-space-xs">
                <div className="h-2.5 w-3/4 bg-secondary-fixed"></div>
                <div className="h-2.5 w-1/2 bg-secondary-fixed"></div>
                <div className="h-2.5 w-2/3 bg-secondary-fixed"></div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">
              Hệ thống phòng
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/rooms" className="hover:text-amber-400">
                  Phòng Deluxe View Biển
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-amber-400">
                  Executive Suite
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="hover:text-amber-400">
                  Presidential Villa
                </Link>
              </li>
            </ul>

          {/* Bottom Bar */}
          <div className="border-t border-outline-variant pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm">
            <span className="font-caption text-caption text-on-surface-variant uppercase">
              [ © 2025 HOTEL SYSTEM. ALL RIGHTS RESERVED ]
            </span>
            <div className="flex items-center gap-space-md">
              <span className="font-caption text-caption text-on-surface-variant uppercase">WIREFRAME SPEC V1.0</span>
              <span className="font-caption text-caption text-on-surface-variant uppercase">STATUS: DRAFT</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">
              Dành cho nhân viên
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-amber-400">
                  Cổng Quản Trị &amp; Lễ Tân
                </Link>
              </li>
              <li>
                <Link to="/dashboard/kitchen" className="hover:text-amber-400">
                  Màn Hình Bếp (KDS)
                </Link>
              </li>
              <li>
                <Link to="/dashboard/rooms" className="hover:text-amber-400">
                  Vận Hành Buồng Phòng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">
              Liên hệ
            </h4>
            <p className="text-xs leading-relaxed">
              Địa chỉ: 123 Đại lộ Lê Lợi, Quận 1, TP. Hồ Chí Minh
            </p>
            <p className="text-xs mt-2">Email: contact@grandhotel.vn</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Grand Hotel Management System - Đồ
          án Chuyên đề Phát triển Web 1 (Nhóm C).
        </div>
      </footer>
    </div>
  );
}
