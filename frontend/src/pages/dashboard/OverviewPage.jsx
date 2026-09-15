import React, { useState, useEffect } from "react";
import {
  BedDouble,
  UserCheck,
  CalendarDays,
  DollarSign,
  ArrowUpRight,
  Clock,
  AlertCircle,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";

export default function OverviewPage() {
  const [stats, setStats] = useState({
    totalRooms: 120,
    occupiedRooms: 68,
    availableRooms: 42,
    cleaningRooms: 10,
    occupancyRate: 56.6,
    todayRevenue: 48500000,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axiosClient.get("/bookings");
        if (res?.data) {
          setRecentBookings(res.data.slice(0, 5));
        }
      } catch (err) {
        console.error("Lỗi tải dữ liệu tổng quan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Tổng Quan Hoạt Động Khách Sạn
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Dữ liệu vận hành phòng, tỷ lệ lấp đầy và doanh thu cập nhật thời gian
          thực.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Tỷ lệ lấp đầy phòng
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats.occupancyRate}%
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4.2% so với hôm qua
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BedDouble className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Phòng đang có khách
            </span>
            <span className="text-2xl font-extrabold text-slate-900">
              {stats.occupiedRooms} / {stats.totalRooms}
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Còn {stats.availableRooms} phòng sẵn sàng đón khách
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Phòng cần dọn vệ sinh
            </span>
            <span className="text-2xl font-extrabold text-amber-600">
              {stats.cleaningRooms}
            </span>
            <span className="text-[11px] text-amber-600 font-medium block mt-1">
              Đang phân bổ nhân viên dọn dẹp
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-1">
              Doanh thu hôm nay
            </span>
            <span className="text-2xl font-extrabold text-emerald-600">
              {(stats.todayRevenue / 1000000).toFixed(1)} tr đ
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> Doanh thu phòng &amp;
              F&amp;B
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Danh Sách Lượt Đặt Phòng Mới Nhất
            </h2>
            <p className="text-xs text-slate-400">
              Các lượt khách đặt trực tuyến hoặc tại quầy lễ tân
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5">Mã Đặt</th>
                <th className="px-6 py-3.5">Khách Hàng</th>
                <th className="px-6 py-3.5">Hạng Phòng</th>
                <th className="px-6 py-3.5">Ngày Nhận / Trả</th>
                <th className="px-6 py-3.5">Tổng Tiền</th>
                <th className="px-6 py-3.5">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.length > 0 ? (
                recentBookings.map((b) => (
                  <tr
                    key={b.BookingId}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-mono font-bold text-amber-600">
                      #{b.BookingId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">
                        {b.CustomerName || "Khách đặt"}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {b.CustomerPhone || b.CustomerEmail}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">
                      {b.RoomTypeName}
                    </td>
                    <td className="px-6 py-4">
                      {b.CheckInDate} &rarr; {b.CheckOutDate}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {Number(b.TotalAmount).toLocaleString("vi-VN")} đ
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {b.Status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">
                    Chưa có lượt đặt phòng nào hiển thị
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
