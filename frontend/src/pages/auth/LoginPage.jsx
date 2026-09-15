import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Hotel, KeyRound, Mail, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("user_1@hoteldomain.vn");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === "Guest") {
        navigate("/");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.message ||
          "Đăng nhập không thành công, vui lòng kiểm tra lại tài khoản.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const quickSwitch = (roleEmail) => {
    setEmail(roleEmail);
    setPassword("123456");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 mx-auto mb-3 shadow-md shadow-amber-500/20">
            <Hotel className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            Đăng Nhập Hệ Thống
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hệ thống quản lý khách sạn &amp; đặt phòng thông minh
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Email đăng nhập
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user_1@hoteldomain.vn"
                className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full text-xs pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-amber-500/10 transition"
          >
            {submitting ? "Đang xác thực..." : "Đăng Nhập"}
          </button>
        </form>

        {/* Quick switch presets for testing roles */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 text-center">
            Chọn nhanh vai trò kiểm thử (Password: 123456)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => quickSwitch("user_1@hoteldomain.vn")}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-50 text-[11px] font-medium text-slate-700 rounded-lg border border-slate-200 text-left truncate"
            >
              👑 Admin (user_1)
            </button>
            <button
              type="button"
              onClick={() => quickSwitch("user_2@hoteldomain.vn")}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-50 text-[11px] font-medium text-slate-700 rounded-lg border border-slate-200 text-left truncate"
            >
              🛎️ Lễ tân (user_2)
            </button>
            <button
              type="button"
              onClick={() => quickSwitch("user_3@hoteldomain.vn")}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-50 text-[11px] font-medium text-slate-700 rounded-lg border border-slate-200 text-left truncate"
            >
              👨‍🍳 Đầu bếp (user_3)
            </button>
            <button
              type="button"
              onClick={() => quickSwitch("user_4@hoteldomain.vn")}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-amber-50 text-[11px] font-medium text-slate-700 rounded-lg border border-slate-200 text-left truncate"
            >
              🧹 Buồng phòng (user_4)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          <Link to="/" className="hover:text-amber-600 transition">
            &larr; Quay lại trang chủ khách sạn
          </Link>
        </div>
      </div>
    </div>
  );
}
