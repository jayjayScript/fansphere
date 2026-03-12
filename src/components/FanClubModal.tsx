"use client";
import React, { useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FanClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  artistId: string;
  artistName: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  q1_howLongFan: string;
  q2_attendedShow: string;
  q3_careerAdvice: string;
  q4_wantConversation: "yes" | "no" | "";
}

type ModalState = "form" | "success" | "support";
type SmartsuppWindow = Window & { smartsupp?: (...args: unknown[]) => void };

const FanClubModal: React.FC<FanClubModalProps> = ({
  isOpen,
  onClose,
  artistId,
  artistName,
}) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<ModalState>("form");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    q1_howLongFan: "",
    q2_attendedShow: "",
    q3_careerAdvice: "",
    q4_wantConversation: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.location
    ) {
      toast.error("Please fill in all fields.");
      return;
    }
    setStep(2);
  };

  const openSupport = () => {
    if (typeof window !== "undefined") {
      const smartsupp = (window as SmartsuppWindow).smartsupp;
      if (typeof smartsupp === "function") {
        smartsupp("visitor:update", {
          name: formData.name,
          email: formData.email,
        });
        smartsupp("chat:open");
      }
    }
  };

  const openSupportWithMessage = (message: string) => {
    if (typeof window !== "undefined") {
      const smartsupp = (window as SmartsuppWindow).smartsupp;
      if (typeof smartsupp === "function") {
        // Tag the visitor so support team sees their info
        smartsupp("name", formData.name);
        smartsupp("email", formData.email);
        smartsupp("phone", formData.phone);
        smartsupp("variables", {
          "Wants to chat with": artistName,
          "Fan Club": "Joined",
          Location: formData.location,
        });
        // Open chat first, then send the message
        smartsupp("chat:open");
        setTimeout(() => {
          smartsupp("chat:send", message);
        }, 800); // small delay to ensure chat is open before sending
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.q4_wantConversation) {
      toast.error("Please answer all questions.");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        q1_howLongFan: formData.q1_howLongFan,
        q2_attendedShow: formData.q2_attendedShow,
        q3_careerAdvice: formData.q3_careerAdvice,
        q4_wantConversation: formData.q4_wantConversation,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/fan-club/join/${artistId}`,
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      if (formData.q4_wantConversation === "no") {
        setModalState("support");
        setTimeout(() => openSupport(), 500);
      } else {
        setModalState("success");
        setTimeout(() => {
          openSupportWithMessage(
            `Hi! I just joined ${artistName}'s fan club and I'd love to have a conversation with ${artistName}! 🎉`,
          );
        }, 500);
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Something went wrong.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setModalState("form");
    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      q1_howLongFan: "",
      q2_attendedShow: "",
      q3_careerAdvice: "",
      q4_wantConversation: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#18FFFF] to-[#FF4081] flex items-center justify-center flex-shrink-0">
              <Icon
                icon="mdi:account-group"
                width={20}
                height={20}
                className="text-black"
              />
            </div>
            <div>
              <h2 className="text-white font-bold text-[17px] leading-tight">
                Join {artistName}&apos;s Fan Club
              </h2>
              {modalState === "form" && (
                <p className="text-white/50 text-xs">Step {step} of 2</p>
              )}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-white/50 hover:text-white transition-colors p-1"
          >
            <Icon icon="lets-icons:close-ring-light" width={28} height={28} />
          </button>
        </div>

        {/* Step Indicator */}
        {modalState === "form" && (
          <div className="flex gap-2 px-5 pt-4">
            <div
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step >= 1 ? "bg-[#18FFFF]" : "bg-white/20"
              }`}
            />
            <div
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                step >= 2 ? "bg-[#18FFFF]" : "bg-white/20"
              }`}
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* SUCCESS STATE */}
          {modalState === "success" && (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#18FFFF]/20 to-[#18FFFF]/5 border border-[#18FFFF]/30 flex items-center justify-center">
                <Icon
                  icon="mdi:check-circle"
                  width={48}
                  height={48}
                  className="text-[#18FFFF]"
                />
              </div>
              <h3 className="text-white text-xl font-bold">
                Welcome to the Fan Club!
              </h3>
              <p className="text-white/60 text-sm">
                You&apos;re now an official member of {artistName}&apos;s fan
                club. A support representative will reach out to you shortly
                about your conversation request. 🎉
              </p>
              <button
                onClick={handleClose}
                className="mt-2 bg-[#18FFFF] text-black font-semibold py-2.5 px-8 rounded-xl hover:bg-[#00e5e5] transition-colors"
              >
                Awesome!
              </button>
            </div>
          )}

          {/* SUPPORT STATE */}
          {modalState === "support" && (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF4081]/20 to-[#FF4081]/5 border border-[#FF4081]/30 flex items-center justify-center">
                <Icon
                  icon="mdi:heart-outline"
                  width={48}
                  height={48}
                  className="text-[#FF4081]"
                />
              </div>
              <h3 className="text-white text-xl font-bold">
                Thank You for Participating!
              </h3>
              <p className="text-white/60 text-sm">
                Your survey has been recorded. A support representative will be
                with you shortly to assist you further.
              </p>
              <button
                onClick={() => openSupport()}
                className="mt-2 bg-gradient-to-r from-[#FF4081] to-[#f50057] text-white font-semibold py-2.5 px-8 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Icon icon="mdi:headset" width={18} />
                Chat with Support
              </button>
              <button
                onClick={handleClose}
                className="text-white/40 text-sm hover:text-white/70 transition-colors"
              >
                Close
              </button>
            </div>
          )}

          {/* STEP 1 — Personal Info */}
          {modalState === "form" && step === 1 && (
            <form
              onSubmit={handleStep1Next}
              className="flex flex-col gap-3 mt-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-white/60 text-xs mb-1 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#18FFFF]/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-white/60 text-xs mb-1 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#18FFFF]/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1 font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+1 234 567 8900"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#18FFFF]/50 focus:bg-white/10 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-white/60 text-xs mb-1 font-medium">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="City, Country"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#18FFFF]/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-gradient-to-r from-[#18FFFF] to-[#00e5e5] text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Continue
                <Icon icon="mdi:arrow-right" width={18} />
              </button>
            </form>
          )}

          {/* STEP 2 — Fan Questions */}
          {modalState === "form" && step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
              {/* Q1 */}
              <div>
                <label className="block text-white/70 text-xs mb-1.5 font-medium">
                  How long have you been a fan of {artistName}?
                </label>
                <input
                  type="text"
                  name="q1_howLongFan"
                  value={formData.q1_howLongFan}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 3 years, since 2019..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#18FFFF]/50 focus:bg-white/10 transition-all"
                />
              </div>

              {/* Q2 */}
              <div>
                <label className="block text-white/70 text-xs mb-1.5 font-medium">
                  Have you been to {artistName}&apos;s show before?
                </label>
                <div className="flex gap-3">
                  {["Yes", "No", "Not yet, but I want to!"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 cursor-pointer text-center text-xs py-2.5 px-2 rounded-xl border transition-all ${
                        formData.q2_attendedShow === opt
                          ? "border-[#18FFFF] bg-[#18FFFF]/10 text-[#18FFFF]"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="q2_attendedShow"
                        value={opt}
                        checked={formData.q2_attendedShow === opt}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Q3 */}
              <div>
                <label className="block text-white/70 text-xs mb-1.5 font-medium">
                  In your opinion, what could help {artistName} take their
                  career to the next level?
                </label>
                <textarea
                  name="q3_careerAdvice"
                  value={formData.q3_careerAdvice}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Share your thoughts..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#18FFFF]/50 focus:bg-white/10 transition-all resize-none"
                />
              </div>

              {/* Q4 */}
              <div>
                <label className="block text-white/70 text-xs mb-1.5 font-medium">
                  Would you like to have a conversation with {artistName}?
                </label>
                <div className="flex gap-3">
                  {[
                    {
                      label: "Yes, absolutely!",
                      value: "yes",
                      icon: "mdi:check-circle",
                      color: "text-[#18FFFF]",
                      activeBg: "border-[#18FFFF] bg-[#18FFFF]/10",
                    },
                    {
                      label: "No, thanks",
                      value: "no",
                      icon: "mdi:close-circle",
                      color: "text-[#FF4081]",
                      activeBg: "border-[#FF4081] bg-[#FF4081]/10",
                    },
                  ].map(({ label, value, icon, color, activeBg }) => (
                    <label
                      key={value}
                      className={`flex-1 cursor-pointer flex flex-col items-center gap-1 py-3 rounded-xl border transition-all ${
                        formData.q4_wantConversation === value
                          ? `${activeBg} ${color}`
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="q4_wantConversation"
                        value={value}
                        checked={formData.q4_wantConversation === value}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <Icon icon={icon} width={22} />
                      <span className="text-xs font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-white/20 text-white/70 font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                >
                  <Icon icon="mdi:arrow-left" width={18} />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !formData.q4_wantConversation}
                  className="flex-[2] bg-gradient-to-r from-[#18FFFF] to-[#00e5e5] text-black font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Icon
                        icon="mdi:loading"
                        className="animate-spin"
                        width={18}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Icon icon="mdi:account-check" width={18} />
                      Join Fan Club
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        theme="dark"
        transition={Slide}
      />
    </div>
  );
};

export default FanClubModal;
