import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  Utensils,
  Wifi,
  Clock,
  ArrowRight,
} from "lucide-react";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  // Search Engine State
  const [checkInDate, setCheckInDate] = useState('2025-10-15');
  const [checkOutDate, setCheckOutDate] = useState('2025-10-18');
  const [occupancy, setOccupancy] = useState('02 ADULTS · 00 KIDS · 01 ROOM');

  // Newsletter State
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/rooms?checkIn=${checkInDate}&checkOut=${checkOutDate}`);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Trải nghiệm nghỉ dưỡng 5 sao
            tiêu chuẩn quốc tế
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Nơi Khởi Đầu Của Những <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Kỳ Nghỉ Đẳng Cấp &amp; Thượng Lưu
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hệ thống Grand Hotel kết hợp sự tiện nghi sang trọng, dịch vụ ẩm
            thực tinh tế cùng quy trình phục vụ số hóa thời gian thực hàng đầu.
          </p>
    <div className="flex flex-col w-full">
      {/* Top Blueprint Metadata Band */}
      <div className="w-full border-b border-primary bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter-desktop py-space-xs flex flex-wrap items-center justify-between text-on-surface-variant font-caption text-caption uppercase tracking-wider">
          <div className="flex items-center gap-space-md">
            <span>[ ARCH-SPEC: GUEST-PORTAL-V1 ]</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">GRID: 12-COL 24PX GUTTER</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">STATE: LOW-FIDELITY WIREFRAME</span>
          </div>
          <div className="flex items-center gap-space-sm">
            <span className="inline-block w-2 h-2 border border-primary bg-surface-container-lowest"></span>
            <span>INDEX: SCREEN-01 // HOME</span>
          </div>
        </div>
      </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/rooms"
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-2xl shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              Khám phá phòng &amp; Đặt ngay <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-2xl border border-slate-700 transition flex items-center justify-center"
            >
              Cổng Quản Trị Nhân Viên
            </Link>
      {/* SECTION 1: HERO & QUICK BOOKING ENGINE */}
      <section className="w-full border-b border-primary bg-surface-container-lowest py-space-2xl md:py-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop flex flex-col gap-space-2xl">
          {/* Split Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Text Column */}
            <div className="lg:col-span-6 flex flex-col gap-space-lg">
              <div className="inline-flex items-center gap-space-xs self-start border border-primary px-space-xs py-space-xxs">
                <span className="font-caption text-caption uppercase tracking-widest text-primary">
                  [ MODULE : 01 // WELCOME ]
                </span>
              </div>
              <div className="flex flex-col gap-space-md">
                <h1 className="font-headline-xl text-headline-xl text-primary uppercase tracking-tight">
                  EXPERIENCE SEAMLESS HOSPITALITY &amp; COMFORT
                </h1>
                {/* Skeleton Subtitle Rows */}
                <div className="space-y-space-xs pt-space-xs">
                  <div className="h-2.5 w-full bg-secondary-fixed"></div>
                  <div className="h-2.5 w-5/6 bg-secondary-fixed"></div>
                  <div className="h-2.5 w-4/6 bg-secondary-fixed"></div>
                </div>
              </div>

              {/* Direct Key Specs */}
              <div className="grid grid-cols-3 gap-space-md border-t border-b border-primary py-space-md mt-space-xs">
                <div className="flex flex-col">
                  <span className="font-caption text-caption text-on-surface-variant uppercase">CHECK-IN</span>
                  <span className="font-headline-sm text-headline-sm uppercase text-primary">15:00 HRS</span>
                </div>
                <div className="flex flex-col border-l border-primary pl-space-md">
                  <span className="font-caption text-caption text-on-surface-variant uppercase">CHECK-OUT</span>
                  <span className="font-headline-sm text-headline-sm uppercase text-primary">11:00 HRS</span>
                </div>
                <div className="flex flex-col border-l border-primary pl-space-md">
                  <span className="font-caption text-caption text-on-surface-variant uppercase">RATING</span>
                  <span className="font-headline-sm text-headline-sm uppercase text-primary">5-STAR CLASS</span>
                </div>
              </div>
            </div>

            {/* Hero Diagram / Media Placeholder Box (16:9) */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-video border border-primary bg-surface-container-lowest flex items-center justify-center overflow-hidden">
                {/* Full diagonal X structural metaphor */}
                <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" x2="100" y1="0" y2="100" />
                  <line x1="100" x2="0" y1="0" y2="100" />
                </svg>

                {/* Technical Grid Overlay Lines */}
                <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-r border-b border-primary"></div>
                  <div className="border-b border-primary"></div>
                  <div className="border-r border-primary"></div>
                  <div className="border-r border-primary"></div>
                  <div className="border-r border-primary"></div>
                  <div></div>
                </div>

                <div className="relative z-10 border border-primary bg-surface-container-lowest px-space-md py-space-xs flex flex-col items-center">
                  <span className="font-caption text-caption uppercase text-primary tracking-widest">[ HERO IMAGE PLACEHOLDER (16:9) ]</span>
                  <span className="font-caption text-caption text-on-surface-variant text-[9px] mt-space-xxs">SCHEMATIC: 1920 X 1080 PX</span>
                </div>
                <span className="absolute bottom-2 left-2 font-caption text-caption text-on-surface-variant">[CAM_01]</span>
                <span className="absolute top-2 right-2 font-caption text-caption text-on-surface-variant">[SCALE: 1:1]</span>
              </div>
            </div>
          </div>

          {/* Quick Booking Widget / Search Bar Bar */}
          <div className="w-full border border-primary bg-surface-container-lowest p-space-md">
            <div className="border-b border-primary pb-space-xs mb-space-md flex justify-between items-center">
              <span className="font-caption text-caption uppercase tracking-wider text-primary">
                [ MODULE : 02 // REAL-TIME AVAILABILITY QUERY ]
              </span>
              <span className="font-caption text-caption uppercase text-on-surface-variant">ENGINE STATE: READY</span>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md items-end">
              {/* Check-in Box */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-caption text-caption uppercase tracking-wider text-primary flex items-center gap-space-xxs">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  CHECK-IN DATE
                </label>
                <div className="relative flex items-center border border-primary bg-surface-container-lowest px-space-md py-space-xs focus-within:border-2">
                  <input
                    className="w-full bg-transparent font-label-md text-label-md uppercase text-primary focus:outline-none"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                </div>
                <span className="font-caption text-caption text-on-surface-variant">STANDARD CHECK-IN: 15:00</span>
              </div>

              {/* Check-out Box */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-caption text-caption uppercase tracking-wider text-primary flex items-center gap-space-xxs">
                  <span className="material-symbols-outlined text-[14px]">event_available</span>
                  CHECK-OUT DATE
                </label>
                <div className="relative flex items-center border border-primary bg-surface-container-lowest px-space-md py-space-xs focus-within:border-2">
                  <input
                    className="w-full bg-transparent font-label-md text-label-md uppercase text-primary focus:outline-none"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
                <span className="font-caption text-caption text-on-surface-variant">STANDARD CHECK-OUT: 11:00</span>
              </div>

              {/* Guests / Rooms Dropdown Box */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-caption text-caption uppercase tracking-wider text-primary flex items-center gap-space-xxs">
                  <span className="material-symbols-outlined text-[14px]">group</span>
                  OCCUPANCY &amp; UNITS
                </label>
                <div className="relative flex items-center border border-primary bg-surface-container-lowest px-space-md py-space-xs focus-within:border-2">
                  <select
                    value={occupancy}
                    onChange={(e) => setOccupancy(e.target.value)}
                    className="w-full bg-transparent font-label-md text-label-md uppercase text-primary focus:outline-none appearance-none cursor-pointer"
                  >
                    <option>02 ADULTS · 00 KIDS · 01 ROOM</option>
                    <option>01 ADULT · 00 KIDS · 01 ROOM</option>
                    <option>02 ADULTS · 01 KIDS · 01 ROOM</option>
                    <option>04 ADULTS · 02 KIDS · 02 ROOMS</option>
                  </select>
                  <span className="material-symbols-outlined text-[16px] pointer-events-none text-primary ml-space-xs">arrow_drop_down</span>
                </div>
                <span className="font-caption text-caption text-on-surface-variant">MAX 4 GUESTS / STANDARD UNIT</span>
              </div>

              {/* Action Button */}
              <div className="flex flex-col gap-space-xs">
                <label className="font-caption text-caption uppercase tracking-wider text-transparent select-none hidden lg:block">ACTION</label>
                <button
                  className="w-full h-[38px] border border-primary bg-primary text-on-primary hover:bg-surface-container-lowest hover:text-primary font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center gap-space-xs cursor-pointer"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[16px]">search</span>
                  [ SEARCH AVAILABILITY ]
                </button>
                <span className="font-caption text-caption text-on-surface-variant text-right hidden lg:block">INSTANT CONFIRMATION</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            Dịch Vụ &amp; Trải Nghiệm Khác Biệt
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Hệ sinh thái thông minh mang lại trải nghiệm liền mạch từ lúc đặt
            phòng trực tuyến đến khi nhận phòng và gọi món tại phòng.
          </p>
      {/* SECTION 2: FEATURED ROOM TYPES */}
      <section className="w-full border-b border-primary bg-surface-container-lowest py-space-2xl md:py-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-primary pb-space-md mb-space-2xl gap-space-sm">
            <div>
              <div className="font-caption text-caption uppercase tracking-widest text-on-surface-variant mb-space-xxs">
                [ CATALOG : 03 // ACCOMMODATION UNITS ]
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase">FEATURED ROOM TYPES</h2>
            </div>
            <div className="flex items-center gap-space-md">
              <span className="font-caption text-caption uppercase text-on-surface-variant">TOTAL INVENTORY: 48 KEYS</span>
              <div className="flex gap-space-xs">
                <button className="w-8 h-8 border border-primary flex items-center justify-center hover:bg-secondary-fixed transition-colors" title="Filter layout">
                  <span className="material-symbols-outlined text-[18px]">view_agenda</span>
                </button>
                <button className="w-8 h-8 border border-primary bg-primary text-on-primary flex items-center justify-center" title="Grid layout">
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3-Column Grid of Room Wireframe Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xl">
            {/* CARD 1: DELUXE KING SUITE */}
            <article className="border border-primary bg-surface-container-lowest flex flex-col">
              <div className="border-b border-primary px-space-md py-space-xs flex justify-between items-center bg-surface-container-lowest">
                <span className="font-caption text-caption uppercase text-on-surface-variant">CODE: RM-101</span>
                <span className="font-caption text-caption border border-primary px-space-xxs uppercase">AVAILABLE</span>
              </div>
              <div className="relative w-full aspect-video border-b border-primary bg-surface-container-lowest flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" x2="100" y1="0" y2="100" />
                  <line x1="100" x2="0" y1="0" y2="100" />
                </svg>
                <div className="relative z-10 border border-primary bg-surface-container-lowest px-space-xs py-space-xxs">
                  <span className="font-caption text-caption uppercase text-primary tracking-wide">[ ROOM IMAGE : DLX-KING ]</span>
                </div>
                <span className="absolute top-2 left-2 font-caption text-caption text-on-surface-variant">400x250</span>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between gap-space-lg">
                <div className="space-y-space-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md text-primary uppercase">DELUXE KING SUITE</h3>
                    <span className="font-caption text-caption text-on-surface-variant">FL 04-08</span>
                  </div>
                  <div className="space-y-space-xs py-space-xs">
                    <div className="h-2 w-full bg-secondary-fixed"></div>
                    <div className="h-2 w-3/4 bg-secondary-fixed"></div>
                  </div>
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ KING BED ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ 45 M² ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ FREE WIFI ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ BALCONY ]</span>
                  </div>
                </div>
                <div className="border-t border-primary pt-space-md flex items-center justify-between">
                  <div>
                    <div className="font-caption text-caption uppercase text-on-surface-variant">RATE PER 24H</div>
                    <div className="font-headline-md text-headline-md text-primary">$180 <span className="font-body-sm text-body-sm text-on-surface-variant">/ NIGHT</span></div>
                  </div>
                  <button
                    onClick={() => navigate('/rooms')}
                    className="border border-primary px-space-md py-space-xs font-label-md text-label-md uppercase bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                  >
                    [ VIEW DETAILS ]
                  </button>
                </div>
              </div>
            </article>

            {/* CARD 2: EXECUTIVE OCEAN VIEW */}
            <article className="border border-primary bg-surface-container-lowest flex flex-col">
              <div className="border-b border-primary px-space-md py-space-xs flex justify-between items-center bg-surface-container-lowest">
                <span className="font-caption text-caption uppercase text-on-surface-variant">CODE: RM-204</span>
                <span className="font-caption text-caption border border-primary px-space-xxs uppercase">LIMITED (2 LEFT)</span>
              </div>
              <div className="relative w-full aspect-video border-b border-primary bg-surface-container-lowest flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" x2="100" y1="0" y2="100" />
                  <line x1="100" x2="0" y1="0" y2="100" />
                </svg>
                <div className="relative z-10 border border-primary bg-surface-container-lowest px-space-xs py-space-xxs">
                  <span className="font-caption text-caption uppercase text-primary tracking-wide">[ ROOM IMAGE : EXEC-OCEAN ]</span>
                </div>
                <span className="absolute top-2 left-2 font-caption text-caption text-on-surface-variant">400x250</span>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between gap-space-lg">
                <div className="space-y-space-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md text-primary uppercase">EXECUTIVE OCEAN VIEW</h3>
                    <span className="font-caption text-caption text-on-surface-variant">FL 09-14</span>
                  </div>
                  <div className="space-y-space-xs py-space-xs">
                    <div className="h-2 w-full bg-secondary-fixed"></div>
                    <div className="h-2 w-4/5 bg-secondary-fixed"></div>
                  </div>
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ 1 QUEEN + SOFA ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ 58 M² ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ OCEAN VISTA ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ MINI-BAR ]</span>
                  </div>
                </div>
                <div className="border-t border-primary pt-space-md flex items-center justify-between">
                  <div>
                    <div className="font-caption text-caption uppercase text-on-surface-variant">RATE PER 24H</div>
                    <div className="font-headline-md text-headline-md text-primary">$260 <span className="font-body-sm text-body-sm text-on-surface-variant">/ NIGHT</span></div>
                  </div>
                  <button
                    onClick={() => navigate('/rooms')}
                    className="border border-primary px-space-md py-space-xs font-label-md text-label-md uppercase bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                  >
                    [ VIEW DETAILS ]
                  </button>
                </div>
              </div>
            </article>

            {/* CARD 3: STANDARD DOUBLE */}
            <article className="border border-primary bg-surface-container-lowest flex flex-col">
              <div className="border-b border-primary px-space-md py-space-xs flex justify-between items-center bg-surface-container-lowest">
                <span className="font-caption text-caption uppercase text-on-surface-variant">CODE: RM-012</span>
                <span className="font-caption text-caption border border-primary px-space-xxs uppercase">AVAILABLE</span>
              </div>
              <div className="relative w-full aspect-video border-b border-primary bg-surface-container-lowest flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" x2="100" y1="0" y2="100" />
                  <line x1="100" x2="0" y1="0" y2="100" />
                </svg>
                <div className="relative z-10 border border-primary bg-surface-container-lowest px-space-xs py-space-xxs">
                  <span className="font-caption text-caption uppercase text-primary tracking-wide">[ ROOM IMAGE : STD-DBL ]</span>
                </div>
                <span className="absolute top-2 left-2 font-caption text-caption text-on-surface-variant">400x250</span>
              </div>
              <div className="p-space-md flex-1 flex flex-col justify-between gap-space-lg">
                <div className="space-y-space-sm">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-headline-md text-primary uppercase">STANDARD DOUBLE</h3>
                    <span className="font-caption text-caption text-on-surface-variant">FL 01-03</span>
                  </div>
                  <div className="space-y-space-xs py-space-xs">
                    <div className="h-2 w-full bg-secondary-fixed"></div>
                    <div className="h-2 w-2/3 bg-secondary-fixed"></div>
                  </div>
                  <div className="flex flex-wrap gap-space-xs pt-space-xs">
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ 2 TWIN BEDS ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ 32 M² ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ WORK DESK ]</span>
                    <span className="border border-primary px-space-xs py-space-xxs font-label-sm text-label-sm uppercase">[ SHOWER ]</span>
                  </div>
                </div>
                <div className="border-t border-primary pt-space-md flex items-center justify-between">
                  <div>
                    <div className="font-caption text-caption uppercase text-on-surface-variant">RATE PER 24H</div>
                    <div className="font-headline-md text-headline-md text-primary">$130 <span className="font-body-sm text-body-sm text-on-surface-variant">/ NIGHT</span></div>
                  </div>
                  <button
                    onClick={() => navigate('/rooms')}
                    className="border border-primary px-space-md py-space-xs font-label-md text-label-md uppercase bg-surface-container-lowest hover:bg-primary hover:text-on-primary transition-colors cursor-pointer"
                  >
                    [ VIEW DETAILS ]
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* Pagination / Inventory Footer Control */}
          <div className="border border-primary mt-space-xl p-space-sm flex flex-col sm:flex-row justify-between items-center gap-space-sm">
            <span className="font-caption text-caption uppercase text-on-surface-variant">SHOWING 3 OF 12 ROOM SCHEMATICS</span>
            <div className="flex items-center gap-space-xs">
              <button className="border border-primary px-space-sm py-space-xxs font-caption text-caption uppercase hover:bg-secondary-fixed">
                [ &lt; PREV ]
              </button>
              <span className="border border-primary bg-primary text-on-primary px-space-sm py-space-xxs font-caption text-caption uppercase">01</span>
              <button className="border border-primary px-space-sm py-space-xxs font-caption text-caption uppercase hover:bg-secondary-fixed">02</button>
              <button className="border border-primary px-space-sm py-space-xxs font-caption text-caption uppercase hover:bg-secondary-fixed">03</button>
              <button className="border border-primary px-space-sm py-space-xxs font-caption text-caption uppercase hover:bg-secondary-fixed">
                [ NEXT &gt; ]
              </button>
            </div>
          </div>
        </div>
      </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
      {/* SECTION 3: HOTEL AMENITIES & SERVICES */}
      <section className="w-full border-b border-primary bg-surface-container-lowest py-space-2xl md:py-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="border-b border-primary pb-space-md mb-space-2xl flex flex-col sm:flex-row justify-between sm:items-end gap-space-xs">
            <div>
              <div className="font-caption text-caption uppercase tracking-widest text-on-surface-variant mb-space-xxs">
                [ FACILITY : 04 // INFRASTRUCTURE ]
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase">HOTEL AMENITIES &amp; SERVICES</h2>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Check-in Thông Minh &amp; QR Code
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Mã QR xác nhận đặt phòng tức thì, hỗ trợ thủ tục nhận phòng nhanh
              chóng và không mất thời gian chờ đợi tại sảnh.
            </p>
            <span className="font-caption text-caption uppercase text-on-surface-variant">PROPERTY STANDARDS: ISO-9001 COMPLIANT</span>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <Utensils className="w-6 h-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {/* Service Box 1: FINE DINING */}
            <div className="border border-primary p-space-md flex flex-col justify-between gap-space-md bg-surface-container-lowest">
              <div className="space-y-space-md">
                <div className="flex justify-between items-center border-b border-outline-variant pb-space-xs">
                  <span className="font-caption text-caption uppercase text-on-surface-variant">[ SVC-01 ]</span>
                  <span className="font-caption text-caption uppercase border border-primary px-space-xxs">OPEN 07-23H</span>
                </div>
                <div className="relative w-12 h-12 border border-primary bg-surface-container-lowest flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" x2="100" y1="0" y2="100" />
                    <line x1="100" x2="0" y1="0" y2="100" />
                  </svg>
                  <span className="material-symbols-outlined relative z-10 text-primary text-[20px] bg-surface-container-lowest px-space-xxs">
                    restaurant
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary uppercase">FINE DINING</h3>
                <div className="space-y-space-xs">
                  <div className="h-2 w-full bg-secondary-fixed"></div>
                  <div className="h-2 w-4/5 bg-secondary-fixed"></div>
                  <div className="h-2 w-3/5 bg-secondary-fixed"></div>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-space-xs">
                <span className="font-caption text-caption text-on-surface-variant uppercase">[ CHEF-CURATED MENUS ]</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Ẩm Thực Gọi Món Tại Phòng (F&amp;B)
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Khách hàng tự do chọn món ăn từ thực đơn trực tuyến, đơn được
              chuyển thẳng tới màn hình bếp KDS theo thời gian thực.
            </p>

            {/* Service Box 2: SPA & WELLNESS */}
            <div className="border border-primary p-space-md flex flex-col justify-between gap-space-md bg-surface-container-lowest">
              <div className="space-y-space-md">
                <div className="flex justify-between items-center border-b border-outline-variant pb-space-xs">
                  <span className="font-caption text-caption uppercase text-on-surface-variant">[ SVC-02 ]</span>
                  <span className="font-caption text-caption uppercase border border-primary px-space-xxs">BY APPT</span>
                </div>
                <div className="relative w-12 h-12 border border-primary bg-surface-container-lowest flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" x2="100" y1="0" y2="100" />
                    <line x1="100" x2="0" y1="0" y2="100" />
                  </svg>
                  <span className="material-symbols-outlined relative z-10 text-primary text-[20px] bg-surface-container-lowest px-space-xxs">
                    spa
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary uppercase">SPA &amp; WELLNESS</h3>
                <div className="space-y-space-xs">
                  <div className="h-2 w-full bg-secondary-fixed"></div>
                  <div className="h-2 w-5/6 bg-secondary-fixed"></div>
                  <div className="h-2 w-2/3 bg-secondary-fixed"></div>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-space-xs">
                <span className="font-caption text-caption text-on-surface-variant uppercase">[ HYDROTHERAPY + SAUNA ]</span>
              </div>
            </div>

            {/* Service Box 3: INFINITY POOL */}
            <div className="border border-primary p-space-md flex flex-col justify-between gap-space-md bg-surface-container-lowest">
              <div className="space-y-space-md">
                <div className="flex justify-between items-center border-b border-outline-variant pb-space-xs">
                  <span className="font-caption text-caption uppercase text-on-surface-variant">[ SVC-03 ]</span>
                  <span className="font-caption text-caption uppercase border border-primary px-space-xxs">ROOFTOP</span>
                </div>
                <div className="relative w-12 h-12 border border-primary bg-surface-container-lowest flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" x2="100" y1="0" y2="100" />
                    <line x1="100" x2="0" y1="0" y2="100" />
                  </svg>
                  <span className="material-symbols-outlined relative z-10 text-primary text-[20px] bg-surface-container-lowest px-space-xxs">
                    pool
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary uppercase">INFINITY POOL</h3>
                <div className="space-y-space-xs">
                  <div className="h-2 w-full bg-secondary-fixed"></div>
                  <div className="h-2 w-3/4 bg-secondary-fixed"></div>
                  <div className="h-2 w-4/5 bg-secondary-fixed"></div>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-space-xs">
                <span className="font-caption text-caption text-on-surface-variant uppercase">[ HEATED SALTWATER ]</span>
              </div>
            </div>

            {/* Service Box 4: 24/7 CONCIERGE */}
            <div className="border border-primary p-space-md flex flex-col justify-between gap-space-md bg-surface-container-lowest">
              <div className="space-y-space-md">
                <div className="flex justify-between items-center border-b border-outline-variant pb-space-xs">
                  <span className="font-caption text-caption uppercase text-on-surface-variant">[ SVC-04 ]</span>
                  <span className="font-caption text-caption uppercase border border-primary px-space-xxs">ALWAYS ON</span>
                </div>
                <div className="relative w-12 h-12 border border-primary bg-surface-container-lowest flex items-center justify-center">
                  <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <line x1="0" x2="100" y1="0" y2="100" />
                    <line x1="100" x2="0" y1="0" y2="100" />
                  </svg>
                  <span className="material-symbols-outlined relative z-10 text-primary text-[20px] bg-surface-container-lowest px-space-xxs">
                    support_agent
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary uppercase">24/7 CONCIERGE</h3>
                <div className="space-y-space-xs">
                  <div className="h-2 w-full bg-secondary-fixed"></div>
                  <div className="h-2 w-4/6 bg-secondary-fixed"></div>
                  <div className="h-2 w-1/2 bg-secondary-fixed"></div>
                </div>
              </div>
              <div className="border-t border-outline-variant pt-space-xs">
                <span className="font-caption text-caption text-on-surface-variant uppercase">[ DIAL #00 FROM SUITE ]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

          <div className="p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
      {/* SECTION 4: TESTIMONIALS / HIGHLIGHT BANNER */}
      <section className="w-full border-b border-primary bg-surface-container-lowest py-space-2xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="border border-primary p-space-lg md:p-space-xl bg-surface-container-lowest">
            <div className="flex flex-wrap items-center justify-between border-b border-primary pb-space-xs mb-space-lg gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="font-caption text-caption uppercase tracking-wider text-primary">
                  [ MODULE : 05 // VERIFIED GUEST EVALUATION ]
                </span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="font-caption text-caption uppercase text-on-surface-variant">VERIFIED STAY : SEP 2025</span>
                <span className="border border-primary px-space-xxs font-caption text-caption uppercase">[ ★★★★★ 5.0 ]</span>
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Hỗ Trợ &amp; Buồng Phòng 24/7
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Đội ngũ buồng phòng và lễ tân luôn sẵn sàng hỗ trợ, đảm bảo không
              gian sạch khuẩn và dịch vụ chuyên nghiệp nhất.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              {/* Large Quote Structural Box */}
              <div className="lg:col-span-8 space-y-space-md">
                <div className="font-headline-xl text-headline-xl text-outline-variant select-none">“</div>
                <div className="space-y-space-sm -mt-space-md">
                  <div className="h-3 w-full bg-secondary-fixed"></div>
                  <div className="h-3 w-11/12 bg-secondary-fixed"></div>
                  <div className="h-3 w-4/5 bg-secondary-fixed"></div>
                </div>
                <div className="pt-space-md flex items-center gap-space-md">
                  <div className="relative w-10 h-10 border border-primary bg-surface-container-lowest flex items-center justify-center shrink-0">
                    <svg className="absolute inset-0 w-full h-full stroke-outline stroke-[1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <line x1="0" x2="100" y1="0" y2="100" />
                      <line x1="100" x2="0" y1="0" y2="100" />
                    </svg>
                    <span className="material-symbols-outlined text-[16px] text-primary relative z-10">person</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm uppercase text-primary">[ GUEST REVIEW : VERIFIED_USER_882 ]</span>
                    <span className="font-caption text-caption text-on-surface-variant uppercase">STAY TYPE: BUSINESS SUITE / 4 NIGHTS</span>
                  </div>
                </div>
              </div>

              {/* Rating & Metric Blueprint Box */}
              <div className="lg:col-span-4 border border-primary p-space-md space-y-space-sm bg-surface-container-lowest">
                <div className="font-caption text-caption uppercase text-on-surface-variant border-b border-primary pb-space-xxs">
                  SCORE BREAKDOWN
                </div>
                <div className="space-y-space-xs">
                  <div className="flex justify-between font-caption text-caption uppercase">
                    <span>CLEANLINESS</span>
                    <span>10.0 / 10</span>
                  </div>
                  <div className="w-full h-1.5 border border-primary bg-surface-container-lowest">
                    <div className="h-full bg-primary w-full"></div>
                  </div>

                  <div className="flex justify-between font-caption text-caption uppercase pt-space-xxs">
                    <span>COMFORT &amp; BEDDING</span>
                    <span>9.8 / 10</span>
                  </div>
                  <div className="w-full h-1.5 border border-primary bg-surface-container-lowest">
                    <div className="h-full bg-primary w-[98%]"></div>
                  </div>

                  <div className="flex justify-between font-caption text-caption uppercase pt-space-xxs">
                    <span>SERVICE EFFICIENCY</span>
                    <span>10.0 / 10</span>
                  </div>
                  <div className="w-full h-1.5 border border-primary bg-surface-container-lowest">
                    <div className="h-full bg-primary w-full"></div>
                  </div>
                </div>
                <div className="pt-space-xs text-right">
                  <span className="font-caption text-caption text-on-surface-variant uppercase">[ AGGREGATE : 9.9/10 ]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: NEWSLETTER / CTA SECTION */}
      <section className="w-full bg-surface-container-lowest py-space-2xl md:py-space-3xl">
        <div className="max-w-container-max mx-auto px-gutter-desktop">
          <div className="border-2 border-primary p-space-xl md:p-space-2xl flex flex-col items-center text-center bg-surface-container-lowest">
            <div className="border border-primary px-space-xs py-space-xxs mb-space-md">
              <span className="font-caption text-caption uppercase tracking-widest text-primary">
                [ MODULE : 06 // DISPATCH NOTIFICATION ENGINE ]
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary uppercase max-w-xl">
              SUBSCRIBE FOR EXCLUSIVE OFFERS
            </h2>

            <div className="space-y-space-xs w-full max-w-md my-space-md">
              <div className="h-2 w-full bg-secondary-fixed"></div>
              <div className="h-2 w-3/4 mx-auto bg-secondary-fixed"></div>
            </div>

            {subscribed ? (
              <div className="border border-primary bg-primary text-on-primary px-space-md py-space-xs font-label-md text-label-md uppercase tracking-wider">
                [ THANK YOU! EMAIL REGISTERED IN DISPATCH ENGINE ]
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full max-w-lg mt-space-sm flex flex-col sm:flex-row gap-space-xs">
                <div className="relative flex-1 border border-primary bg-surface-container-lowest px-space-md py-space-xs focus-within:border-2">
                  <input
                    className="w-full bg-transparent font-label-md text-label-md uppercase text-primary placeholder:text-outline focus:outline-none"
                    placeholder="[ ENTER YOUR EMAIL ADDRESS ]"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button
                  className="border border-primary bg-primary text-on-primary hover:bg-surface-container-lowest hover:text-primary px-space-xl py-space-xs font-label-md text-label-md uppercase tracking-wider transition-colors cursor-pointer shrink-0"
                  type="submit"
                >
                  [ SUBSCRIBE ]
                </button>
              </form>
            )}

            <div className="mt-space-md flex items-center gap-space-xs">
              <div className="w-3 h-3 border border-primary flex items-center justify-center cursor-pointer">
                <div className="w-1.5 h-1.5 bg-primary"></div>
              </div>
              <span className="font-caption text-caption text-on-surface-variant uppercase">
                [ X ] I AGREE TO BLUEPRINT DATA RETENTION POLICY &amp; DISPATCH COMMUNICATIONS
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
