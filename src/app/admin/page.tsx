"use client"
import { useState } from "react";
import Image from "next/image";
import img from "@/assets/pexels-steve-28574351.jpg";
import Form from "./components/Form";
import FanSurveyViewer from "./components/FanSurveyViewer";
import { Icon } from "@iconify/react/dist/iconify.js";

type AdminTab = "artists" | "surveys";

const AdminPage = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("artists");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthorized(true);
    } else {
      setError("Incorrect password.");
    }
  };

  // If not authorized, show the password form
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          {/* Header card */}
          <div className="border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden mb-6">
            <div className="flex">
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#18FFFF]/10 border border-[#18FFFF]/20 flex items-center justify-center">
                    <Icon icon="mdi:shield-lock" width={16} className="text-[#18FFFF]" />
                  </div>
                  <span className="text-[#18FFFF] text-xs font-semibold uppercase tracking-wider">Admin Portal</span>
                </div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                  Authentication Required
                </h1>
                <p className="text-white/50 text-sm mt-1">Enter admin credentials to continue.</p>
              </div>
              <div className="w-[130px] h-[140px] overflow-hidden rounded-e-2xl flex-shrink-0">
                <Image
                  src={img}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  alt="Admin"
                />
              </div>
            </div>
          </div>

          {/* Password form */}
          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus-within:border-[#18FFFF]/40 transition-colors">
              <Icon icon="mdi:lock-outline" className="text-white/30" width={18} />
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="text-white/30 hover:text-white/60 transition-colors"
              >
                <Icon
                  icon={showPassword ? "uiw:eye-o" : "mdi:eye-off-outline"}
                  width={18}
                />
              </button>
            </div>
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                <Icon icon="mdi:alert-circle-outline" className="text-red-400" width={16} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-[#18FFFF] to-[#00e5f0] text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:login" width={18} />
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authorized — show admin dashboard with tabs
  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <div className="p-4 md:p-6">
        <div className="max-w-5xl mx-auto border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="flex">
            <div className="p-5 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#18FFFF]/10 border border-[#18FFFF]/20 flex items-center justify-center">
                  <Icon icon="mdi:shield-check" width={16} className="text-[#18FFFF]" />
                </div>
                <span className="text-[#18FFFF] text-xs font-semibold uppercase tracking-wider">Admin Dashboard</span>
              </div>
              <h1 className="text-white text-2xl md:text-4xl font-bold">
                Welcome, Admin 👋
              </h1>
              <p className="text-white/40 text-sm mt-1">Manage your artists and fan survey responses.</p>
            </div>
            <div className="w-[140px] h-[140px] overflow-hidden rounded-e-2xl flex-shrink-0">
              <Image
                src={img}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                alt="Admin"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-1.5 mb-6">
          <button
            onClick={() => setActiveTab("artists")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "artists"
                ? "bg-[#18FFFF] text-black shadow-[0_0_15px_rgba(24,255,255,0.3)]"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon icon="mdi:account-music" width={18} />
            Manage Artists
          </button>
          <button
            onClick={() => setActiveTab("surveys")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "surveys"
                ? "bg-[#18FFFF] text-black shadow-[0_0_15px_rgba(24,255,255,0.3)]"
                : "text-white/50 hover:text-white hover:bg-white/5"
            }`}
          >
            <Icon icon="mdi:clipboard-text" width={18} />
            Fan Survey Responses
          </button>
        </div>

        {/* Tab content */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
          {activeTab === "artists" ? <Form /> : <FanSurveyViewer />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
