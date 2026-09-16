import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";

export default function GuestLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const pathname = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("vi");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-margin flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-space-md group focus:outline-none">
            <div className="w-11 h-11 rounded-lg bg-secondary-container/40 flex items-center justify-center transition-colors group-hover:bg-secondary-container/60">
              <span className="material-symbols-outlined text-secondary text-[26px]">spa</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-tight group-hover:text-secondary transition-colors">
                Grand Horizon
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                Resort &amp; Suites
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-lg" data-active-classes="text-secondary font-title-md">
            <Link
              to="/"
              className={`font-title-md text-title-md transition-colors ${
                pathname === "/" ? "text-secondary font-semibold" : "text-on-surface-variant hover:text-secondary"
              }`}
              data-path="trang-chu"
            >
              Trang Chủ
            </Link>
            <Link
              to="/rooms"
              className={`font-title-md text-title-md transition-colors ${
                pathname === "/rooms" ? "text-secondary font-semibold" : "text-on-surface-variant hover:text-secondary"
              }`}
              data-path="kham-pha-phong"
            >
              Khám Phá Phòng
            </Link>
            <a
              href="/#dich-vu-tien-ich"
              className="font-title-md text-title-md text-on-surface-variant hover:text-secondary transition-colors"
              data-path="dich-vu-tien-ich"
            >
              Dịch Vụ &amp; Tiện Ích
            </a>
            <Link
              to="/dining"
              className={`font-title-md text-title-md transition-colors ${
                pathname === "/dining" ? "text-secondary font-semibold" : "text-on-surface-variant hover:text-secondary"
              }`}
              data-path="am-thuc-fb"
            >
              Ẩm Thực F&amp;B
            </Link>
            <a
              href="/#uu-dai-hoi-vien"
              className="font-title-md text-title-md text-on-surface-variant hover:text-secondary transition-colors"
              data-path="uu-dai-hoi-vien"
            >
              Ưu Đãi &amp; Hội Viên
            </a>
          </nav>

          {/* Right Action Icons & User */}
          <div className="flex items-center gap-space-md">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="hidden lg:flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface transition-colors py-space-xs px-space-sm rounded cursor-pointer"
                type="button"
              >
                <span className="font-label-md text-label-md">
                  {currentLang === "en" ? "🇺🇸 EN" : "🇻🇳 VN"}
                </span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-surface-container-lowest rounded-lg shadow-lg border border-surface-container-high py-1 z-50 animate-fade-in">
                  <button
                    onClick={() => {
                      setCurrentLang("vi");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-surface-container-low flex items-center gap-2 cursor-pointer ${
                      currentLang === "vi" ? "text-secondary font-semibold" : "text-on-surface"
                    }`}
                  >
                    🇻🇳 Tiếng Việt
                  </button>
                  <button
                    onClick={() => {
                      setCurrentLang("en");
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm hover:bg-surface-container-low flex items-center gap-2 cursor-pointer ${
                      currentLang === "en" ? "text-secondary font-semibold" : "text-on-surface"
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>
              )}
            </div>

            {/* Hotline */}
            <a
              className="hidden 2xl:flex items-center gap-space-xs text-on-surface-variant hover:text-secondary transition-colors px-space-sm"
              href="tel:19006868"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">support_agent</span>
              <span className="font-label-md text-label-md">1900 6868</span>
            </a>

            {/* Quick booking CTA */}
            <Link
              to="/rooms"
              className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm bg-secondary text-on-secondary rounded-lg font-label-lg text-label-lg hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-[0_2px_8px_rgba(114,91,56,0.18)] cursor-pointer"
              data-path="dat-phong-ngay"
            >
              Đặt Phòng Ngay
            </Link>

            {/* User Profile Avatar with dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-space-sm pl-space-xs cursor-pointer focus:outline-none text-left"
                type="button"
              >
                <div className="hidden md:flex flex-col text-right">
                  <span className="font-label-md text-label-md text-on-surface font-semibold truncate max-w-[140px]">
                    {user?.fullName || "Nguyễn Văn An"}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary">
                    {user?.role === "Admin"
                      ? "Quản Trị Viên"
                      : user?.role === "Staff"
                      ? "Nhân Viên"
                      : "Hội viên Gold"}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-surface-container-high">
                    <p className="font-title-md text-sm text-on-surface font-semibold truncate">
                      {user?.fullName || "Nguyễn Văn An"}
                    </p>
                    <p className="font-label-sm text-xs text-secondary truncate">
                      {user?.email || "nguyenvanan.vip@grandhorizon.com"}
                    </p>
                  </div>
                  {user?.role && user.role !== "Guest" && (
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                    >
                      Bảng Quản Trị Hệ Thống
                    </Link>
                  )}
                  <Link
                    to="/rooms"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 font-label-md text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    Khám Phá Buồng Phòng
                  </Link>
                  {user ? (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 font-label-md text-error hover:bg-error-container/20 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Đăng Xuất
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setUserDropdownOpen(false)}
                      className="block px-4 py-2 font-label-md text-secondary font-semibold hover:bg-secondary-container/20 transition-colors"
                    >
                      Đăng Nhập Tài Khoản
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-on-surface hover:text-secondary rounded-lg cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-surface-container-lowest border-b border-surface-container-high px-margin py-space-md space-y-space-sm shadow-xl">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-title-md text-on-surface hover:text-secondary border-b border-surface-container-low"
            >
              Trang Chủ
            </Link>
            <Link
              to="/rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-title-md text-on-surface hover:text-secondary border-b border-surface-container-low"
            >
              Khám Phá Phòng
            </Link>
            <a
              href="/#dich-vu-tien-ich"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-title-md text-on-surface hover:text-secondary border-b border-surface-container-low"
            >
              Dịch Vụ &amp; Tiện Ích
            </a>
            <Link
              to="/dining"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-title-md text-on-surface hover:text-secondary border-b border-surface-container-low"
            >
              Ẩm Thực F&amp;B
            </Link>
            <a
              href="/#uu-dai-hoi-vien"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 font-title-md text-on-surface hover:text-secondary border-b border-surface-container-low"
            >
              Ưu Đãi &amp; Hội Viên
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/rooms"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-space-sm bg-secondary text-on-secondary rounded-lg text-center font-label-lg shadow-sm"
              >
                Đặt Phòng Ngay
              </Link>
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-space-sm bg-surface-container-low text-on-surface rounded-lg text-center font-label-lg"
                >
                  Đăng Nhập Hội Viên
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Router Outlet */}
      <main className="w-full pt-20 bg-background flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-lowest text-on-surface-variant pt-space-xl pb-space-lg shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="w-full px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-gutter mb-space-xl">
            {/* Col 1 */}
            <div className="lg:col-span-4 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary text-[22px]">spa</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                    Grand Horizon
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    Resort &amp; Suites
                  </span>
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Khu nghỉ dưỡng sang trọng bậc nhất bên bờ đại dương nguyên sơ. Trải nghiệm đặc quyền nghỉ dưỡng thanh bình, ẩm thực thượng hạng và phong cách sống thượng lưu đẳng cấp 5 sao quốc tế.
              </p>
              <div className="flex items-center gap-space-md text-secondary">
                <span className="material-symbols-outlined text-[20px]">award_star</span>
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span className="material-symbols-outlined text-[20px]">hotel_class</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Chứng nhận Travelers' Choice 2024
                </span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="lg:col-span-2 flex flex-col gap-space-sm">
              <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider mb-space-xs">
                Khám Phá
              </h3>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                data-path="ve-chung-toi"
                href="#ve-chung-toi"
              >
                Về chúng tôi
              </a>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                data-path="chinh-sach-dat-phong-va-huy-phong"
                to="/rooms"
              >
                Chính sách &amp; Hủy phòng
              </Link>
              <Link
                className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                data-path="quy-dinh-luu-tru"
                to="/rooms"
              >
                Quy định lưu trú
              </Link>
              <a
                className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors"
                data-path="tuyen-dung"
                href="#tuyen-dung"
              >
                Tuyển dụng
              </a>
            </div>

            {/* Col 3 */}
            <div className="lg:col-span-3 flex flex-col gap-space-sm">
              <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider mb-space-xs">
                Liên Hệ
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">location_on</span>
                Bãi Dài, Bán Đảo Cam Ranh &amp; Phú Quốc, Việt Nam
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">mail</span>
                concierge@grandhorizonresort.com
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">call</span>
                Hotline: 1900 6868 - (0258) 398 8888
              </p>
              <p className="font-label-sm text-label-sm text-outline mt-space-xs">
                GPKD Lữ Hành Quốc Tế: 79-888/2022/TCDL-GP
              </p>
            </div>

            {/* Col 4 */}
            <div className="lg:col-span-3 flex flex-col gap-space-md">
              <h3 className="font-title-md text-title-md text-on-surface uppercase tracking-wider">
                Bảo Mật &amp; Thanh Toán
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Cổng giao dịch mã hóa 256-bit chuẩn PCI-DSS quốc tế.
              </p>
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="px-space-sm py-space-xs bg-surface-container-low rounded font-label-sm text-label-sm text-on-surface font-semibold">
                  VietQR
                </span>
                <span className="px-space-sm py-space-xs bg-surface-container-low rounded font-label-sm text-label-sm text-on-surface font-semibold">
                  VISA
                </span>
                <span className="px-space-sm py-space-xs bg-surface-container-low rounded font-label-sm text-label-sm text-on-surface font-semibold">
                  Mastercard
                </span>
                <span className="px-space-sm py-space-xs bg-surface-container-low rounded font-label-sm text-label-sm text-on-surface font-semibold">
                  VNPAY
                </span>
              </div>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
            <span className="font-body-sm text-body-sm text-outline">
              © 2024 Grand Horizon Resort &amp; Suites. Bản quyền thuộc về Tập đoàn Khách sạn &amp; Nghỉ dưỡng Grand Horizon.
            </span>
            <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
              <a className="hover:text-secondary transition-colors" data-path="chinh-sach-bao-mat" href="#">
                Chính sách bảo mật
              </a>
              <span>•</span>
              <a className="hover:text-secondary transition-colors" data-path="dieu-khoan-su-dung" href="#">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
