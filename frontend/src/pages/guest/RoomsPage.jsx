import React, { useState, useEffect } from "react";
import { Users, Bed, Check, Calendar, AlertCircle } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";

export default function RoomsPage() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    checkInDate: "2025-10-01",
    checkOutDate: "2025-10-03",
    adults: 2,
    children: 0,
    roomQuantity: 1,
    specialRequests: "",
  });
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axiosClient.get("/rooms/types");
        if (res?.data) {
          setRoomTypes(res.data);
        }
      } catch (err) {
        console.error("Không thể tải danh sách phòng:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTypes();
  }, []);

  const handleBookNow = (type) => {
    setSelectedType(type);
    setBookingSuccess(null);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        userId: user ? user.id : 1,
        roomTypeId: selectedType.RoomTypeId,
        ...bookingForm,
      };
      const res = await axiosClient.post("/bookings", payload);
      if (res?.success) {
        setBookingSuccess(res.data);
      }
    } catch (err) {
      alert(err.message || "Lỗi khi đặt phòng");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Danh Sách Hạng Phòng Khách Sạn
        </h1>
        <p className="text-sm text-slate-500">
          Lựa chọn không gian nghỉ dưỡng phù hợp cho chuyến công tác hoặc kỳ
          nghỉ gia đình của bạn.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          Đang tải danh sách phòng...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roomTypes.map((type) => (
            <div
              key={type.RoomTypeId}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="h-52 bg-slate-200 relative overflow-hidden">
                <img
                  src={
                    type.ImageUrl ||
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800"
                  }
                  alt={type.TypeName}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 px-3 py-1 bg-slate-900/80 backdrop-blur text-amber-400 font-bold text-xs rounded-lg">
                  {type.AvailableCount > 0
                    ? `Còn ${type.AvailableCount} phòng trống`
                    : "Hết phòng"}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {type.TypeName}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                    {type.Description ||
                      "Không gian nghỉ dưỡng sang trọng đầy đủ tiện nghi tiêu chuẩn 5 sao."}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 mb-4 pb-4 border-b border-slate-100">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-amber-600" /> Tối đa{" "}
                      {type.MaxOccupancy || 2} khách
                    </span>
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-amber-600" /> Giường King /
                      Twin
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div>
                    <span className="text-xs text-slate-400 block">
                      Giá mỗi đêm từ
                    </span>
                    <span className="text-xl font-bold text-amber-600">
                      {Number(type.BasePrice).toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                  <button
                    onClick={() => handleBookNow(type)}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Đặt phòng ngay
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedType && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Đặt Phòng: {selectedType.TypeName}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Đơn giá: {Number(selectedType.BasePrice).toLocaleString("vi-VN")}{" "}
              đ/đêm
            </p>

            {bookingSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-800 mb-1">
                  Đặt phòng thành công!
                </h4>
                <p className="text-xs text-slate-500 mb-2">
                  Mã đặt phòng:{" "}
                  <strong className="text-amber-600 font-mono text-sm">
                    {bookingSuccess.bookingCode}
                  </strong>
                </p>
                <p className="text-xs text-slate-500 mb-6">
                  Tổng tiền:{" "}
                  {Number(bookingSuccess.totalAmount).toLocaleString("vi-VN")} đ
                  (Đặt cọc:{" "}
                  {Number(bookingSuccess.depositAmount).toLocaleString("vi-VN")}{" "}
                  đ)
                </p>
                <button
                  onClick={() => setSelectedType(null)}
                  className="px-6 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                >
                  Đóng cửa sổ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ngày nhận phòng
                    </label>
                    <input
                      type="date"
                      value={bookingForm.checkInDate}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          checkInDate: e.target.value,
                        })
                      }
                      required
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ngày trả phòng
                    </label>
                    <input
                      type="date"
                      value={bookingForm.checkOutDate}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          checkOutDate: e.target.value,
                        })
                      }
                      required
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số người lớn
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={bookingForm.adults}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          adults: parseInt(e.target.value),
                        })
                      }
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trẻ em
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={bookingForm.children}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          children: parseInt(e.target.value),
                        })
                      }
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số phòng
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={bookingForm.roomQuantity}
                      onChange={(e) =>
                        setBookingForm({
                          ...bookingForm,
                          roomQuantity: parseInt(e.target.value),
                        })
                      }
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedType(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl transition"
                  >
                    {submitting ? "Đang xử lý..." : "Xác nhận đặt phòng"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
