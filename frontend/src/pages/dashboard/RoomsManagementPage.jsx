import React, { useState, useEffect } from "react";
import {
  BedDouble,
  CheckCircle2,
  UserCheck,
  Sparkles,
  Wrench,
  RefreshCw,
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { useSocket } from "../../context/SocketContext";

export default function RoomsManagementPage() {
  const [rooms, setRooms] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const socket = useSocket();

  const fetchRooms = async () => {
    try {
      const url = filterStatus ? `/rooms?status=${filterStatus}` : "/rooms";
      const res = await axiosClient.get(url);
      if (res?.data) {
        setRooms(res.data);
      }
    } catch (err) {
      console.error("Không thể tải sơ đồ phòng:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [filterStatus]);

  // Nghe cập nhật trạng thái phòng qua WebSocket
  useEffect(() => {
    if (!socket) return;
    const handleStatusUpdate = ({ roomId, status }) => {
      setRooms((prev) =>
        prev.map((r) =>
          r.RoomId === Number(roomId) ? { ...r, Status: status } : r,
        ),
      );
    };

    socket.on("room:statusUpdated", handleStatusUpdate);
    return () => socket.off("room:statusUpdated", handleStatusUpdate);
  }, [socket]);

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedRoom) return;
    try {
      await axiosClient.patch(`/rooms/${selectedRoom.RoomId}/status`, {
        status: newStatus,
      });
      setSelectedRoom((prev) => ({ ...prev, Status: newStatus }));
      fetchRooms();
    } catch (err) {
      alert(err.message || "Lỗi khi cập nhật trạng thái phòng");
    }
  };

  const statusConfig = {
    CleanAvailable: {
      label: "Sạch & Trống",
      color: "bg-emerald-500 text-white border-emerald-600",
      badge: "bg-emerald-50 text-emerald-700",
    },
    Occupied: {
      label: "Đang Có Khách",
      color: "bg-rose-500 text-white border-rose-600",
      badge: "bg-rose-50 text-rose-700",
    },
    Dirty: {
      label: "Chờ Dọn Dẹp",
      color: "bg-amber-500 text-white border-amber-600",
      badge: "bg-amber-50 text-amber-700",
    },
    Cleaning: {
      label: "Đang Dọn Phòng",
      color: "bg-blue-500 text-white border-blue-600",
      badge: "bg-blue-50 text-blue-700",
    },
    Maintenance: {
      label: "Bảo Trì",
      color: "bg-slate-500 text-white border-slate-600",
      badge: "bg-slate-50 text-slate-700",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Sơ Đồ Phòng Vận Hành (Room Rack)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi thời gian thực trạng thái buồng phòng, hỗ trợ phân công dọn
            dẹp.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus("")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
              filterStatus === ""
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-600 border-slate-200"
            }`}
          >
            Tất cả
          </button>
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                filterStatus === key
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              {config.label}
            </button>
          ))}
          <button
            onClick={fetchRooms}
            title="Làm mới"
            className="p-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Room Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          Đang tải sơ đồ phòng...
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {rooms.map((room) => {
            const conf =
              statusConfig[room.Status] || statusConfig.CleanAvailable;
            return (
              <div
                key={room.RoomId}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-2xl border cursor-pointer transition transform hover:-translate-y-1 shadow-sm flex flex-col justify-between h-32 ${conf.color}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black tracking-tight">
                    {room.RoomNumber}
                  </span>
                  <span className="text-[10px] font-semibold opacity-90">
                    Tầng {room.Floor}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-medium truncate opacity-90 mb-1">
                    {room.TypeName}
                  </p>
                  <span className="inline-block text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded bg-black/20 backdrop-blur">
                    {conf.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Room Quick Action Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Phòng {selectedRoom.RoomNumber}
                </h3>
                <span className="text-xs text-slate-500">
                  {selectedRoom.TypeName} &bull; Tầng {selectedRoom.Floor}
                </span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-bold ${statusConfig[selectedRoom.Status]?.badge}`}
              >
                {statusConfig[selectedRoom.Status]?.label}
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-700 mb-3">
              Chuyển đổi trạng thái phòng:
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              <button
                onClick={() => handleUpdateStatus("CleanAvailable")}
                className="p-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold text-left flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Sạch &amp; Sẵn sàng
              </button>
              <button
                onClick={() => handleUpdateStatus("Cleaning")}
                className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold text-left flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Đang Dọn Dẹp
              </button>
              <button
                onClick={() => handleUpdateStatus("Dirty")}
                className="p-2.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-semibold text-left flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Bẩn (Chờ Dọn)
              </button>
              <button
                onClick={() => handleUpdateStatus("Maintenance")}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl text-xs font-semibold text-left flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" /> Bảo Trì Thiết Bị
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedRoom(null)}
                className="px-5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
