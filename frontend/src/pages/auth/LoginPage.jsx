import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Mail, AlertCircle, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-primary-container relative flex flex-col justify-center items-center p-6 text-on-surface overflow-hidden">
      {/* Ambient Gold & Navy Glow Background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-surface-container-lowest rounded-xl p-space-xl shadow-2xl border border-surface-container-high relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-secondary-container/40 rounded-xl flex items-center justify-center text-secondary mx-auto mb-3 shadow-sm">
            <span className="material-symbols-outlined text-[30px] text-secondary">spa</span>
          </div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
            Grand Horizon Resort &amp; Suites
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface mt-1">
            Cổng Thông Tin Đăng Nhập
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Dành cho Thượng khách Hội viên &amp; Đội ngũ vận hành
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-error-container/40 border border-error/30 text-error text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1.5 font-semibold">
              Địa chỉ Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user_1@hoteldomain.vn"
                className="w-full text-sm pl-10 pr-4 py-2.5 bg-surface-container-low border border-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-on-surface"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1.5 font-semibold">
              Mật khẩu bảo mật
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full text-sm pl-10 pr-4 py-2.5 bg-surface-container-low border border-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-on-surface"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-lg text-label-lg rounded-lg shadow-md transition cursor-pointer"
          >
            {submitting ? "Đang xác thực bảo mật..." : "Đăng Nhập"}
          </button>
        </form>

        {/* Quick switch presets for testing roles */}
        <div className="mt-8 pt-6 border-t border-surface-container">
          <p className="font-label-sm text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider mb-2 text-center">
            Chọn nhanh vai trò thử nghiệm (Password: 123456)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => quickSwitch("user_1@hoteldomain.vn")}
              className="px-2.5 py-2 bg-surface-container-low hover:bg-secondary-container/40 text-xs font-medium text-on-surface rounded-lg border border-surface-container-high text-left truncate cursor-pointer transition"
            >
              👑 Quản Trị (Admin)
            </button>
            <button
              type="button"
              onClick={() => quickSwitch("user_2@hoteldomain.vn")}
              className="px-2.5 py-2 bg-surface-container-low hover:bg-secondary-container/40 text-xs font-medium text-on-surface rounded-lg border border-surface-container-high text-left truncate cursor-pointer transition"
            >
              🛎️ Lễ Tân (Reception)
            </button>
            <button
              type="button"
              onClick={() => quickSwitch("user_3@hoteldomain.vn")}
              className="px-2.5 py-2 bg-surface-container-low hover:bg-secondary-container/40 text-xs font-medium text-on-surface rounded-lg border border-surface-container-high text-left truncate cursor-pointer transition"
            >
              👨‍🍳 Bếp Trưởng (Kitchen)
            </button>
            <button
              type="button"
              onClick={() => quickSwitch("user_4@hoteldomain.vn")}
              className="px-2.5 py-2 bg-surface-container-low hover:bg-secondary-container/40 text-xs font-medium text-on-surface rounded-lg border border-surface-container-high text-left truncate cursor-pointer transition"
            >
              🧹 Buồng Phòng (Housekeeper)
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-on-surface-variant">
          <Link to="/" className="inline-flex items-center gap-1 hover:text-secondary transition font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Trở về trang chủ Grand Horizon
          </Link>
        </div>
      </div>
    </div>
  );
}
