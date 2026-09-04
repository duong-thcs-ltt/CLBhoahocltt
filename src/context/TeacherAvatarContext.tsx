import React, { createContext, useContext, useState, useEffect } from "react";

interface TeacherAvatarContextType {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  resetAvatar: () => void;
  handleFileUpload: (file: File) => Promise<string>;
  isUploading?: boolean;
}

// Chân dung vector chuẩn nhận diện Cô Huỳnh Thị Thuỳ Dương trong tà áo dài màu xanh ngọc truyền thống, chuỗi vòng ngọc trai quý phái, mái tóc đen dịu dàng và nụ cười đôn hậu
const DEFAULT_TURQUOISE_AODAI_AVATAR = "data:image/svg+xml;utf8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4"/>
      <stop offset="50%" stop-color="#ecfdf5"/>
      <stop offset="100%" stop-color="#e0f2fe"/>
    </linearGradient>

    <!-- Turquoise Ao Dai (Áo dài xanh ngọc bích của Cô Dương) -->
    <linearGradient id="aodaiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#14b8a6"/>
      <stop offset="40%" stop-color="#0d9488"/>
      <stop offset="80%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#115e59"/>
    </linearGradient>

    <linearGradient id="collarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>

    <!-- Skin Tone -->
    <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fff1eb"/>
      <stop offset="50%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fbcfe8"/>
    </linearGradient>

    <!-- Hair Tone (Mái tóc đen mượt) -->
    <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#27272a"/>
      <stop offset="50%" stop-color="#18181b"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>

    <!-- Pearl Shader -->
    <radialGradient id="pearlShine" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </radialGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="400" height="500" fill="url(#bgGrad)"/>
  
  <!-- Subtle Bokeh Circles -->
  <circle cx="80" cy="90" r="50" fill="#a7f3d0" opacity="0.25"/>
  <circle cx="330" cy="110" r="60" fill="#bae6fd" opacity="0.3"/>
  <circle cx="50" cy="300" r="40" fill="#99f6e4" opacity="0.2"/>

  <!-- Back Hair (Tóc xõa dài qua vai) -->
  <path d="M 115 190 C 100 250, 105 370, 140 440 C 150 430, 135 340, 135 270 Z" fill="url(#hairGrad)"/>
  <path d="M 285 190 C 300 250, 295 370, 260 440 C 250 430, 265 340, 265 270 Z" fill="url(#hairGrad)"/>

  <!-- Turquoise Ao Dai Body -->
  <path d="M 120 330 C 95 375, 45 440, 15 500 L 385 500 C 355 440, 305 375, 280 330 Z" fill="url(#aodaiGrad)"/>
  <path d="M 140 330 Q 200 365 260 330 L 290 500 L 110 500 Z" fill="url(#aodaiGrad)"/>

  <!-- Ao Dai Front Seam / Tà xẻ -->
  <path d="M 199 335 L 199 500" stroke="#047857" stroke-width="2" opacity="0.6"/>

  <!-- Neck -->
  <rect x="178" y="235" width="44" height="65" rx="10" fill="url(#skinGrad)"/>

  <!-- Traditional Ao Dai High Collar (Cổ áo dài truyền thống) -->
  <path d="M 174 285 L 174 322 C 174 336, 226 336, 226 322 L 226 285 Z" fill="url(#collarGrad)"/>
  <path d="M 174 300 Q 200 310 226 300" stroke="#5eead4" stroke-width="2.5" fill="none"/>

  <!-- Pearl Necklace (Chuỗi vòng ngọc trai quý phái của Cô Dương) -->
  <g id="pearlNecklace">
    <circle cx="160" cy="335" r="5" fill="url(#pearlShine)"/>
    <circle cx="170" cy="342" r="5" fill="url(#pearlShine)"/>
    <circle cx="182" cy="347" r="5.5" fill="url(#pearlShine)"/>
    <circle cx="195" cy="349" r="6" fill="url(#pearlShine)"/>
    <circle cx="205" cy="349" r="6" fill="url(#pearlShine)"/>
    <circle cx="218" cy="347" r="5.5" fill="url(#pearlShine)"/>
    <circle cx="230" cy="342" r="5" fill="url(#pearlShine)"/>
    <circle cx="240" cy="335" r="5" fill="url(#pearlShine)"/>
  </g>

  <!-- Pearl Brooch / Hoa cài áo nhỏ bên ngực trái -->
  <circle cx="165" cy="365" r="7" fill="#ffffff" stroke="#fef08a" stroke-width="1.5"/>
  <circle cx="165" cy="365" r="3.5" fill="#f59e0b"/>

  <!-- Face / Head -->
  <ellipse cx="200" cy="188" rx="66" ry="78" fill="url(#skinGrad)"/>

  <!-- Gentle Blush Cheeks -->
  <circle cx="156" cy="204" r="11" fill="#f43f5e" opacity="0.16"/>
  <circle cx="244" cy="204" r="11" fill="#f43f5e" opacity="0.16"/>

  <!-- Hair Crown & Soft Bangs (Mái tóc thưa tự nhiên ôm trán) -->
  <path d="M 132 185 C 132 110, 160 85, 200 85 C 240 85, 268 110, 268 185 C 268 135, 240 115, 200 115 C 160 115, 132 135, 132 185 Z" fill="url(#hairGrad)"/>
  <path d="M 135 150 C 160 176, 185 174, 215 155 C 235 176, 255 172, 265 150 C 255 128, 230 112, 200 112 C 170 112, 145 128, 135 150 Z" fill="#18181b"/>
  <!-- Wispy bangs strands -->
  <path d="M 180 145 Q 185 165 188 172" stroke="#27272a" stroke-width="2" fill="none"/>
  <path d="M 212 145 Q 215 165 212 172" stroke="#27272a" stroke-width="2" fill="none"/>

  <!-- Eyebrows (Chân mày thanh tú dịu hiền) -->
  <path d="M 160 168 Q 174 163 188 167" stroke="#27272a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M 212 167 Q 226 163 240 168" stroke="#27272a" stroke-width="2.5" fill="none" stroke-linecap="round"/>

  <!-- Warm Kind Eyes (Ánh mắt dịu dàng của cô giáo) -->
  <path d="M 162 176 Q 174 171 186 176" stroke="#09090b" stroke-width="2.2" fill="none"/>
  <path d="M 214 176 Q 226 171 238 176" stroke="#09090b" stroke-width="2.2" fill="none"/>
  <ellipse cx="174" cy="181" rx="6.5" ry="5.5" fill="#18181b"/>
  <ellipse cx="226" cy="181" rx="6.5" ry="5.5" fill="#18181b"/>
  <circle cx="172" cy="179" r="2" fill="#ffffff"/>
  <circle cx="224" cy="179" r="2" fill="#ffffff"/>
  <!-- Gentle eyeliner & lashes -->
  <path d="M 185 175 L 189 174" stroke="#09090b" stroke-width="1.5"/>
  <path d="M 237 175 L 241 174" stroke="#09090b" stroke-width="1.5"/>

  <!-- Nose -->
  <path d="M 200 188 Q 202 203 197 207 Q 203 209 205 207" stroke="#f59e0b" stroke-width="1.8" fill="none" stroke-linecap="round"/>

  <!-- Gentle Warm Smile (Nụ cười tươi tắn, hiền hậu) -->
  <path d="M 182 226 Q 200 240 218 226" stroke="#e11d48" stroke-width="2.8" fill="#fda4af" stroke-linecap="round"/>
  <path d="M 188 227 Q 200 234 212 227" fill="#ffffff" opacity="0.85"/>
</svg>
`);

const STORAGE_KEY = "clb_hoa_hoc_teacher_avatar_v2";
const IDB_NAME = "clb_hoa_hoc_db";
const IDB_STORE = "settings";

// IndexedDB Helper for bulletproof client-side persistence
function saveToIndexedDB(key: string, value: string): Promise<void> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(IDB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(IDB_STORE, "readwrite");
        const store = tx.objectStore(IDB_STORE);
        store.put(value, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      };
      request.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

function loadFromIndexedDB(key: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(IDB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      request.onsuccess = () => {
        const db = request.result;
        const tx = db.transaction(IDB_STORE, "readonly");
        const store = tx.objectStore(IDB_STORE);
        const getReq = store.get(key);
        getReq.onsuccess = () => resolve(getReq.result || null);
        getReq.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

// Canvas-based image optimizer to prevent quota errors
function compressImage(file: File, maxWidth = 500, quality = 0.88): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxWidth) {
            width = Math.round((width * maxWidth) / height);
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error("Không thể xử lý định dạng ảnh này"));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

const TeacherAvatarContext = createContext<TeacherAvatarContextType>({
  avatarUrl: DEFAULT_TURQUOISE_AODAI_AVATAR,
  setAvatarUrl: () => {},
  resetAvatar: () => {},
  handleFileUpload: async () => "",
  isUploading: false,
});

export const TeacherAvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatarUrl, setAvatarUrlState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && saved.trim().length > 0) return saved;
    } catch {
      // ignore
    }
    return DEFAULT_TURQUOISE_AODAI_AVATAR;
  });

  const [isUploading, setIsUploading] = useState(false);

  // Sync avatar with IndexedDB and Server on startup
  useEffect(() => {
    let isMounted = true;

    async function initializeAvatar() {
      // 1. Check IndexedDB if localStorage was empty
      try {
        const idbVal = await loadFromIndexedDB(STORAGE_KEY);
        if (idbVal && isMounted) {
          setAvatarUrlState(idbVal);
          try {
            localStorage.setItem(STORAGE_KEY, idbVal);
          } catch {
            // ignore
          }
          return;
        }
      } catch {
        // ignore
      }

      // 2. Check Server API endpoint /api/teacher-avatar
      try {
        const res = await fetch("/api/teacher-avatar");
        if (res.ok) {
          const data = await res.json();
          if (data && data.avatarUrl && isMounted) {
            setAvatarUrlState(data.avatarUrl);
            try {
              localStorage.setItem(STORAGE_KEY, data.avatarUrl);
            } catch {
              // ignore
            }
            return;
          }
        }
      } catch {
        // ignore network errors
      }

      // 3. Fallback check for static /teacher_duong.png or /IMG_1634.jpeg
      const candidatePaths = ["/teacher_duong.png", "/IMG_1634.jpeg", "/teacher_duong.jpg"];
      for (const p of candidatePaths) {
        const testImg = new Image();
        testImg.onload = () => {
          if (isMounted) {
            setAvatarUrlState(p);
            try {
              localStorage.setItem(STORAGE_KEY, p);
            } catch {
              // ignore
            }
          }
        };
        testImg.src = p;
      }
    }

    initializeAvatar();

    return () => {
      isMounted = false;
    };
  }, []);

  const setAvatarUrl = (url: string) => {
    setAvatarUrlState(url);
    try {
      localStorage.setItem(STORAGE_KEY, url);
    } catch {
      // ignore quota
    }
    saveToIndexedDB(STORAGE_KEY, url);

    // Also push to server for permanent disk persistence
    fetch("/api/teacher-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarUrl: url }),
    }).catch(() => {
      // ignore network errors
    });
  };

  const resetAvatar = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    saveToIndexedDB(STORAGE_KEY, "");
    setAvatarUrlState(DEFAULT_TURQUOISE_AODAI_AVATAR);

    fetch("/api/teacher-avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ avatarUrl: DEFAULT_TURQUOISE_AODAI_AVATAR }),
    }).catch(() => {});
  };

  const handleFileUpload = async (file: File): Promise<string> => {
    setIsUploading(true);
    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("Vui lòng chọn file hình ảnh (JPEG, PNG, WEBP)");
      }

      // High quality canvas downscale (max 500px, 0.88 quality)
      const compressedData = await compressImage(file, 500, 0.88);
      setAvatarUrl(compressedData);
      return compressedData;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <TeacherAvatarContext.Provider
      value={{
        avatarUrl,
        setAvatarUrl,
        resetAvatar,
        handleFileUpload,
        isUploading,
      }}
    >
      {children}
    </TeacherAvatarContext.Provider>
  );
};

export const useTeacherAvatar = () => useContext(TeacherAvatarContext);
