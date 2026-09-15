import React, { useState, useEffect } from "react";
import {
  Utensils,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  RefreshCw,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useSocket } from "../../context/SocketContext";

export default function KitchenKDSPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();

  const fetchKitchenOrders = async () => {
    try {
      const res = await axiosClient.get("/food-orders/kitchen");
      if (res?.data) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error("Không thể tải đơn bếp:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKitchenOrders();
  }, []);

  // Nghe sự kiện đơn mới và cập nhật trạng thái qua WebSocket
  useEffect(() => {
    if (!socket) return;

    socket.on("kitchen:newOrder", () => {
      fetchKitchenOrders();
    });

    socket.on("kitchen:statusUpdated", () => {
      fetchKitchenOrders();
    });

    return () => {
      socket.off("kitchen:newOrder");
      socket.off("kitchen:statusUpdated");
    };
  }, [socket]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await axiosClient.patch(`/food-orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchKitchenOrders();
    } catch (err) {
      alert(err.message || "Lỗi khi cập nhật trạng thái món");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Màn Hình Bếp (Kitchen Display System)
            </h1>
            <p className="text-xs text-slate-500">
              Nhận đơn gọi món tại phòng theo thời gian thực và quản lý chế
              biến.
            </p>
          </div>
        </div>

        <button
          onClick={fetchKitchenOrders}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 rounded-xl shadow-sm transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Làm mới đơn
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">
          Đang tải danh sách đơn món...
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
          <Utensils className="w-12 h-12 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold">
            Hiện tại không có đơn gọi món nào cần xử lý
          </p>
          <span className="text-xs text-slate-400">
            Đơn gọi món mới sẽ tự động hiển thị ngay khi khách đặt.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.FoodOrderId}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-sm font-black text-slate-900 block">
                    ĐƠN #{order.FoodOrderId} &bull;{" "}
                    {order.RoomNumber
                      ? `Phòng ${order.RoomNumber}`
                      : `Bàn ${order.TableNumber || "N/A"}`}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-amber-500" />{" "}
                    {new Date(order.OrderTime).toLocaleTimeString("vi-VN")}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                    order.Status === "Pending"
                      ? "bg-amber-100 text-amber-800"
                      : order.Status === "Preparing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {order.Status}
                </span>
              </div>

              {/* Items List */}
              <div className="p-4 flex-1 space-y-2.5">
                {order.items?.map((item) => (
                  <div
                    key={item.FoodOrderDetailId}
                    className="flex justify-between items-start text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-800 text-sm">
                        {item.Quantity}x{" "}
                      </span>
                      <span className="font-semibold text-slate-700">
                        {item.ItemName}
                      </span>
                      {item.Note && (
                        <p className="text-[11px] text-amber-600 italic">
                          *{item.Note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                {order.Note && (
                  <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200/60 text-[11px] text-amber-800">
                    <strong>Ghi chú đơn:</strong> {order.Note}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                {order.Status === "Pending" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(order.FoodOrderId, "Preparing")
                    }
                    className="col-span-2 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Bắt đầu nấu (Preparing)
                  </button>
                )}
                {order.Status === "Preparing" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(order.FoodOrderId, "Ready")
                    }
                    className="col-span-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Món đã xong (Ready to Serve)
                  </button>
                )}
                {order.Status === "Ready" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(order.FoodOrderId, "Delivering")
                    }
                    className="col-span-2 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow transition"
                  >
                    Đang chuyển tới phòng
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
