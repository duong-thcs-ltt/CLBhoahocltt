import React, { useState, useEffect } from "react";
import { INITIAL_JOURNAL_ENTRIES } from "../data/curriculumData";
import { LabJournalEntry } from "../types";
import { 
  BookOpenCheck, 
  Plus, 
  Trash2, 
  Search, 
  Calendar, 
  ShieldCheck, 
  Printer, 
  Tag, 
  CheckCircle,
  FileText
} from "lucide-react";

interface LabJournalProps {
  onQuickSimJump?: (simType: string) => void;
}

const STORAGE_KEY = "clbhh_lab_journal_entries_2026";

export const LabJournal: React.FC<LabJournalProps> = () => {
  const [entries, setEntries] = useState<LabJournalEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_JOURNAL_ENTRIES;
  });

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  // Form states
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAuthor, setNewAuthor] = useState<string>("");
  const [newGrade, setNewGrade] = useState<string>("Lớp 8");
  const [newMaterials, setNewMaterials] = useState<string>("");
  const [newProcedure, setNewProcedure] = useState<string>("");
  const [newPhenomena, setNewPhenomena] = useState<string>("");
  const [newExplanation, setNewExplanation] = useState<string>("");
  const [newEquation, setNewEquation] = useState<string>("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const handleCreateEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim()) return;

    const entry: LabJournalEntry = {
      id: `entry-${Date.now()}`,
      title: newTitle,
      date: new Date().toISOString().split("T")[0],
      authorName: newAuthor,
      grade: newGrade,
      materialsUsed: newMaterials.split(",").map((s) => s.trim()).filter(Boolean),
      procedureNotes: newProcedure,
      observedPhenomena: newPhenomena,
      chemicalExplanation: newExplanation,
      equation: newEquation,
      safetyScore: 5,
      teacherFeedback: "Em đã thực hiện thí nghiệm rất nghiêm túc, tuân thủ an toàn phòng thí nghiệm và ghi chép hiện tượng rõ ràng!",
      tags: [newGrade, "Thực hành CLB"],
    };

    setEntries([entry, ...entries]);
    setIsAddingNew(false);
    // Reset
    setNewTitle("");
    setNewMaterials("");
    setNewProcedure("");
    setNewPhenomena("");
    setNewExplanation("");
    setNewEquation("");
  };

  const handleDeleteEntry = (id: string) => {
    if (window.confirm("Em có chắc chắn muốn xóa bản ghi nhật ký này không?")) {
      setEntries(entries.filter((item) => item.id !== id));
    }
  };

  const filteredEntries = entries.filter((item) => {
    const matchQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.observedPhenomena.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = selectedTag === "all" || item.tags.includes(selectedTag);
    return matchQuery && matchTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <BookOpenCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Sổ Tay "Nhật Ký Nhà Khoa Học Nhí"
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Ghi chép thí nghiệm, hiện tượng quan sát và nhận xét của Cô Huỳnh Thị Thùy Dương
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>In Sổ Tay</span>
          </button>

          <button
            onClick={() => setIsAddingNew(!isAddingNew)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{isAddingNew ? "Đóng Biểu Mẫu" : "Ghi Nhật Ký Mới"}</span>
          </button>
        </div>
      </div>

      {/* Add New Entry Modal / Drawer */}
      {isAddingNew && (
        <div className="bg-white rounded-2xl border-2 border-emerald-500 p-6 shadow-md space-y-4 animate-fadeIn">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Thêm Bản Ghi Thí Nghiệm Mới
          </h3>

          <form onSubmit={handleCreateEntry} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tên Thí Nghiệm *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Làm mực viết tàng hình bằng chanh"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Họ & Tên Học Sinh *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lớp</label>
                <select
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-emerald-500"
                >
                  <option value="Lớp 7">Lớp 7 (THCS Lý Tự Trọng)</option>
                  <option value="Lớp 8">Lớp 8 (THCS Lý Tự Trọng)</option>
                  <option value="Lớp 9">Lớp 9 (THCS Lý Tự Trọng)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Dụng Cụ & Hoá Chất Sử Dụng</label>
              <input
                type="text"
                placeholder="Cách nhau bởi dấu phẩy, ví dụ: Nước cốt chanh, Giấy trắng, Tăm bông, Máy sấy tóc"
                value={newMaterials}
                onChange={(e) => setNewMaterials(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hiện Tượng Quan Sát Được</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả màu sắc, bọt khí, sự biến đổi nhiệt độ..."
                  value={newPhenomena}
                  onChange={(e) => setNewPhenomena(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-emerald-500"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Giải Thích Khoa Học & Phương Trình</label>
                <textarea
                  rows={3}
                  placeholder="Giải thích vì sao xảy ra hiện tượng đó theo SGK Kết nối tri thức..."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl border-slate-300 focus:outline-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 border rounded-xl text-slate-600 font-bold hover:bg-slate-100"
              >
                Huỷ
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800"
              >
                Lưu Vào Sổ Tay
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên thí nghiệm, học sinh hoặc hiện tượng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-xl border-slate-200 text-xs focus:outline-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500">Lọc theo:</span>
          {["all", "Lớp 7", "Lớp 8", "Lớp 9", "Tháng 9", "Tháng 12", "Tháng 1"].map((tg) => (
            <button
              key={tg}
              onClick={() => setSelectedTag(tg)}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                selectedTag === tg
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tg === "all" ? "Tất cả" : tg}
            </button>
          ))}
        </div>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-400 text-xs">
            Chưa có bản ghi nào phù hợp với tìm kiếm.
          </div>
        ) : (
          filteredEntries.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
            >
              {/* Header: Title, Author, Date, Delete */}
              <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {item.grade}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Nhà khoa học nhí: <strong className="text-slate-700">{item.authorName}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-800">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>An toàn: 5/5 ★</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEntry(item.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Xoá bản ghi"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Materials */}
              {item.materialsUsed.length > 0 && (
                <div className="text-xs">
                  <span className="font-bold text-slate-700">Dụng cụ & Hoá chất: </span>
                  <span className="text-slate-600">{item.materialsUsed.join(" • ")}</span>
                </div>
              )}

              {/* Observations & Explanations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-slate-800">🔍 Hiện tượng quan sát:</p>
                  <p className="text-slate-700 leading-relaxed">{item.observedPhenomena}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 space-y-1">
                  <p className="font-bold text-emerald-900">🧪 Bản chất hoá học & Phương trình:</p>
                  <p className="text-slate-800 leading-relaxed">{item.chemicalExplanation}</p>
                  {item.equation && (
                    <code className="block mt-1.5 p-1.5 bg-white rounded font-mono text-[11px] text-emerald-900 font-bold border border-emerald-200">
                      {item.equation}
                    </code>
                  )}
                </div>
              </div>

              {/* Teacher Remarks Signature Stamp */}
              {item.teacherFeedback && (
                <div className="p-3 rounded-xl bg-teal-50/80 border border-teal-200 text-xs flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-teal-950">
                      Nhận xét của Cô Huỳnh Thị Thùy Dương (Chủ nhiệm CLB):{" "}
                    </span>
                    <span className="text-teal-900 italic">{item.teacherFeedback}</span>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
