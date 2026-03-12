"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";

interface SurveyEntry {
  _id: string;
  artistId: string;
  artistName: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  q1_howLongFan: string;
  q2_attendedShow: string;
  q3_careerAdvice: string;
  q4_wantConversation: "yes" | "no";
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  data: SurveyEntry[];
}

const LIMIT = 10;

const FanSurveyViewer = () => {
  const [surveys, setSurveys] = useState<SurveyEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchSurveys = useCallback(async (currentPage: number) => {
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_V2}/admin/fan-club?page=${currentPage}&limit=${LIMIT}`
      );
      setSurveys(res.data.data);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching surveys:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSurveys(page);
  }, [page, fetchSurveys]);

  const filtered = surveys.filter(
    (s) =>
      search === "" ||
      s.artistName.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 px-4">
        <div>
          <h3 className="text-white font-bold text-lg">Fan Survey Responses</h3>
          <p className="text-white/40 text-sm mt-0.5">
            {total} total submission{total !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 w-full md:w-[280px]">
          <Icon icon="mdi:magnify" className="text-white/40" width={18} />
          <input
            type="text"
            placeholder="Search by artist or fan name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white placeholder-white/30 text-sm focus:outline-none flex-1"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-white/40 hover:text-white/60">
              <Icon icon="mdi:close" width={16} />
            </button>
          )}
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Icon icon="mdi:loading" className="animate-spin text-[#18FFFF]" width={36} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3 text-white/30">
          <Icon icon="mdi:inbox-outline" width={48} />
          <p className="text-sm">No survey responses found.</p>
        </div>
      ) : (
        <div className="px-4 flex flex-col gap-3">
          {filtered.map((survey) => (
            <div
              key={survey._id}
              className="border border-white/10 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] transition-colors overflow-hidden"
            >
              {/* Row summary */}
              <button
                className="w-full text-left p-4 flex items-center justify-between gap-3"
                onClick={() =>
                  setExpandedId(expandedId === survey._id ? null : survey._id)
                }
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#18FFFF]/20 to-[#FF4081]/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">
                      {survey.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{survey.name}</p>
                    <p className="text-white/40 text-xs truncate">{survey.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="hidden sm:block text-right">
                    <span className="text-[#18FFFF] text-xs font-medium bg-[#18FFFF]/10 px-2 py-0.5 rounded-full">
                      {survey.artistName}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      survey.q4_wantConversation === "yes"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {survey.q4_wantConversation === "yes" ? "Wants Chat" : "No Chat"}
                  </span>
                  <Icon
                    icon={expandedId === survey._id ? "mdi:chevron-up" : "mdi:chevron-down"}
                    className="text-white/40"
                    width={18}
                  />
                </div>
              </button>

              {/* Expanded details */}
              {expandedId === survey._id && (
                <div className="px-4 pb-4 border-t border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {/* Personal Info */}
                    <div className="bg-white/5 rounded-xl p-3 space-y-2">
                      <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wide mb-2">
                        Personal Info
                      </p>
                      <InfoRow icon="mdi:phone" label="Phone" value={survey.phone} />
                      <InfoRow icon="mdi:map-marker" label="Location" value={survey.location} />
                      <InfoRow icon="mdi:calendar" label="Submitted" value={formatDate(survey.createdAt)} />
                    </div>

                    {/* Artist */}
                    <div className="bg-white/5 rounded-xl p-3 space-y-2">
                      <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wide mb-2">
                        Artist
                      </p>
                      <InfoRow icon="mdi:star" label="Artist" value={survey.artistName} highlight />
                    </div>

                    {/* Survey Q&A */}
                    <div className="sm:col-span-2 bg-white/5 rounded-xl p-3 space-y-3">
                      <p className="text-white/50 text-[11px] font-semibold uppercase tracking-wide mb-2">
                        Survey Answers
                      </p>
                      <QARow q={`How long a fan of ${survey.artistName}?`} a={survey.q1_howLongFan} />
                      <QARow q={`Attended ${survey.artistName}'s show?`} a={survey.q2_attendedShow} />
                      <QARow q={`Career advice for ${survey.artistName}:`} a={survey.q3_careerAdvice} />
                      <QARow
                        q={`Wants conversation with ${survey.artistName}?`}
                        a={survey.q4_wantConversation === "yes" ? "✅ Yes" : "❌ No"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6 px-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Icon icon="mdi:chevron-left" width={16} />
            Previous
          </button>
          <span className="text-white/50 text-sm">
            Page <span className="text-white font-bold">{page}</span> of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <Icon icon="mdi:chevron-right" width={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const InfoRow = ({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}) => (
  <div className="flex items-start gap-2">
    <Icon icon={icon} className="text-white/30 mt-0.5 flex-shrink-0" width={14} />
    <div>
      <span className="text-white/40 text-[11px]">{label}: </span>
      <span className={`text-[12px] ${highlight ? "text-[#18FFFF] font-semibold" : "text-white/80"}`}>
        {value}
      </span>
    </div>
  </div>
);

const QARow = ({ q, a }: { q: string; a: string }) => (
  <div>
    <p className="text-white/40 text-[11px] mb-0.5">{q}</p>
    <p className="text-white/80 text-[12px] leading-relaxed">{a}</p>
  </div>
);

export default FanSurveyViewer;
