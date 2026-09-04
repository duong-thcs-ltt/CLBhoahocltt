export interface MonthRoadmap {
  id: string;
  monthNumber: number; // 9, 10, 11, 12, 1, 2, 3, 4, 5
  monthLabel: string; // "Tháng 9/2026", "Tháng 10/2026", etc.
  year: number;
  theme: string;
  gradeAlignment: string; // "Làm quen & Khối 7", "Bám SGK lớp 7", "Bám SGK lớp 8", "Bám SGK lớp 9", etc.
  gradeBadge: "Lớp 7" | "Lớp 8" | "Lớp 9" | "Chung";
  mainActivities: string[];
  expectedProducts: string;
  experimentPreview: string;
  keyConcepts: string[];
  safetyTips: string;
  quote?: string;
  simulationType?: "volcano" | "atom" | "reaction" | "ph" | "lemon_battery" | "bioplastic";
}

export interface LabJournalEntry {
  id: string;
  title: string;
  date: string;
  authorName: string;
  grade: string;
  materialsUsed: string[];
  procedureNotes: string;
  observedPhenomena: string;
  chemicalExplanation: string;
  equation?: string;
  safetyScore: number; // 1 to 5
  teacherFeedback?: string;
  tags: string[];
  photoUrl?: string;
}

export interface QuizQuestion {
  id: string;
  grade: "Lớp 7" | "Lớp 8" | "Lớp 9" | "Chung";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  funFact?: string;
  knttReference?: string;
  topic?: string;
  difficulty?: "Dễ" | "Trung bình" | "Thử thách";
}

export interface KHKTIdea {
  id: string;
  title: string;
  category: string;
  gradeSuitability: string;
  realWorldProblem: string;
  hypothesis: string;
  localMaterials: string[];
  methodology: string[];
  expectedOutcome: string;
  description?: string;
  localContext?: string;
  materials?: string[];
  targetGrade?: string;
  feasibility?: string;
  keyHypothesis?: string;
}

export interface FestivalBoothItem {
  id: string;
  boothNumber: number;
  name: string;
  description: string;
  showcasedItems: string[];
  interactiveChallenge: string;
  teamLead?: string;
}

export interface ExhibitionBooth {
  id: string;
  teamName: string;
  boothTitle: string;
  productName: string;
  monthReference: string;
  description: string;
  members: string[];
  highlightBadge: string;
  likes: number;
}

