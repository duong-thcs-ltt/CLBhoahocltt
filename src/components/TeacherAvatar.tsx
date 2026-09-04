import React, { useRef, useState } from "react";
import { useTeacherAvatar } from "../context/TeacherAvatarContext";
import { Camera, Upload, Check, RefreshCw, X, Sparkles, Loader2, ShieldCheck } from "lucide-react";

interface TeacherAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  allowEdit?: boolean;
  bordered?: boolean;
}

export const TeacherAvatar: React.FC<TeacherAvatarProps> = ({
  size = "md",
  className = "",
  allowEdit = true,
  bordered = true,
}) => {
  const { avatarUrl, handleFileUpload, resetAvatar, isUploading } = useTeacherAvatar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-14 h-14 text-sm",
    lg: "w-20 h-20 text-base",
    xl: "w-44 h-44 sm:w-52 sm:h-52 text-lg",
  }[size];

  const processFile = async (file: File) => {
    setErrorMessage(null);
    try {
      await handleFileUpload(file);
      setUploadSuccess(true);
      setTimeout(() => {
        setUploadSuccess(false);
        setIsModalOpen(false);
      }, 1200);
    } catch (err: any) {
      setErrorMessage(err?.message || "Không thể tải ảnh lên. Vui lòng thử lại.");
    }
  };

  const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  return (
    <>
      <div className={`relative group ${className}`}>
        <div
          className={`${sizeClasses} rounded-full overflow-hidden shrink-0 ${
            bordered ? "border-2 sm:border-3 border-amber-300 shadow-md ring-2 ring-emerald-600/20" : ""
          } bg-slate-100 relative`}
        >
          <img
            src={avatarUrl}
            alt="Cô Huỳnh Thị Thuỳ Dương - Chủ nhiệm CLB Hoá học THCS Lý Tự Trọng"
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />

          {allowEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              title="Đổi / Cập nhật ảnh chân dung Cô Dương"
              className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer text-[10px] font-bold gap-1 backdrop-blur-xs"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              <span className="hidden sm:inline font-semibold">Đổi ảnh</span>
            </button>
          )}
        </div>

        {allowEdit && size === "xl" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute -bottom-2 -left-2 bg-emerald-700 hover:bg-emerald-800 text-white p-2 rounded-full shadow-lg border-2 border-white transition-all hover:scale-105 flex items-center gap-1.5 px-3 text-xs font-bold cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5 text-amber-300" />
            <span>Cập nhật ảnh Cô Dương</span>
          </button>
        )}
      </div>

      {/* Upload / Change Avatar Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Chủ nhiệm: Cô Huỳnh Thị Thuỳ Dương
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Ảnh Đại Diện Cô Huỳnh Thị Thuỳ Dương
              </h3>
              <p className="text-xs text-slate-500">
                Hệ thống tự động nén nét cao và lưu vĩnh viễn trên máy chủ & trình duyệt
              </p>
            </div>

            {/* Preview Box */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg bg-slate-100 relative">
                <img
                  src={avatarUrl}
                  alt="Xem trước ảnh cô Dương"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                    <Loader2 className="w-7 h-7 animate-spin text-amber-300" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-700 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Được bảo lưu cố định toàn bộ giao diện</span>
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50 scale-[1.02]"
                  : "border-slate-300 hover:border-emerald-400 bg-slate-50 hover:bg-emerald-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileSelected}
                className="hidden"
              />

              {uploadSuccess ? (
                <div className="flex flex-col items-center gap-2 text-emerald-700 py-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Check className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="font-bold text-sm">Đã lưu ảnh Cô Dương thành công!</span>
                  <span className="text-[11px] text-emerald-600">Ảnh được đồng bộ vĩnh viễn trên toàn hệ thống</span>
                </div>
              ) : isUploading ? (
                <div className="flex flex-col items-center gap-2 text-emerald-700 py-1">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                  <span className="font-bold text-xs">Đang tối ưu & lưu ảnh...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-slate-800">
                      Bấm để chọn file ảnh chụp Cô Dương từ máy
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Hỗ trợ mọi định dạng ảnh (JPG, PNG, WEBP, ảnh iPhone)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs text-rose-600 text-center font-medium bg-rose-50 py-1.5 px-3 rounded-lg">
                {errorMessage}
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={resetAvatar}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-emerald-700 transition-colors py-1.5 px-2.5 rounded-lg hover:bg-slate-100 cursor-pointer font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Chân dung chuẩn mẫu</span>
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
