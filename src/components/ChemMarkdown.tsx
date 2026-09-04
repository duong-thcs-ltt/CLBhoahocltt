import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { normalizeChemistryText } from "../utils/chemistryFormatter";
import { 
  FlaskConical, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  Compass, 
  AlertCircle 
} from "lucide-react";

interface ChemMarkdownProps {
  content: string;
  className?: string;
}

export const ChemMarkdown: React.FC<ChemMarkdownProps> = ({ content, className = "" }) => {
  // Pre-normalize LaTeX, units, and chemical formulas into standard scientific typography
  const normalized = normalizeChemistryText(content);

  return (
    <div className={`chem-markdown leading-relaxed text-slate-800 text-xs sm:text-sm space-y-2.5 ${className}`}>
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // H1
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-black text-emerald-950 border-b border-emerald-200 pb-1.5 mt-3 mb-2 flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{children}</span>
            </h1>
          ),

          // H2
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-emerald-900 mt-3 mb-1.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{children}</span>
            </h2>
          ),

          // H3: Specially styled for structured teacher answers (1. Hiện tượng..., 2. Bản chất..., 3. Ứng dụng...)
          h3: ({ children }) => {
            const text = String(children);
            let Icon = Sparkles;
            let badgeColor = "bg-emerald-100 text-emerald-900 border-emerald-200";

            if (text.includes("Hiện tượng") || text.includes("Câu trả lời")) {
              Icon = Lightbulb;
              badgeColor = "bg-amber-100 text-amber-900 border-amber-300";
            } else if (text.includes("Bản chất") || text.includes("Phương trình")) {
              Icon = FlaskConical;
              badgeColor = "bg-teal-100 text-teal-900 border-teal-300";
            } else if (text.includes("Ứng dụng") || text.includes("Đời sống")) {
              Icon = Compass;
              badgeColor = "bg-blue-100 text-blue-900 border-blue-300";
            } else if (text.includes("Thử thách") || text.includes("An toàn")) {
              Icon = AlertCircle;
              badgeColor = "bg-rose-100 text-rose-900 border-rose-300";
            }

            return (
              <div className="pt-2 pb-1 border-b border-slate-200/80 mb-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className={`p-1 rounded-md border shrink-0 ${badgeColor}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-emerald-950 font-black tracking-tight">{children}</span>
                </h3>
              </div>
            );
          },

          // Paragraph
          p: ({ children }) => (
            <p className="my-1.5 leading-relaxed text-slate-800">
              {children}
            </p>
          ),

          // Unordered List
          ul: ({ children }) => (
            <ul className="my-2 space-y-1.5 pl-4 list-disc marker:text-emerald-600">
              {children}
            </ul>
          ),

          // Ordered List
          ol: ({ children }) => (
            <ol className="my-2 space-y-1.5 pl-4 list-decimal marker:text-emerald-700 marker:font-bold">
              {children}
            </ol>
          ),

          // List item
          li: ({ children }) => (
            <li className="leading-relaxed pl-1">
              {children}
            </li>
          ),

          // Bold / Strong
          strong: ({ children }) => (
            <strong className="font-bold text-slate-900 bg-amber-50/80 px-1 py-0.5 rounded text-[13px] sm:text-sm">
              {children}
            </strong>
          ),

          // Emphasis / Italic
          em: ({ children }) => (
            <em className="italic text-slate-700">{children}</em>
          ),

          // Horizontal rule
          hr: () => (
            <hr className="my-3 border-t border-slate-200" />
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote className="my-2.5 border-l-4 border-emerald-600 bg-emerald-50/60 p-3 rounded-r-xl text-slate-700 italic space-y-1">
              {children}
            </blockquote>
          ),

          // Inline Code & Code blocks (used for chemical equations or formulas)
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <div className="my-2.5 bg-slate-900 text-emerald-300 p-3.5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
                  <code>{children}</code>
                </div>
              );
            }
            return (
              <code className="bg-emerald-50 text-emerald-800 font-semibold px-1.5 py-0.5 rounded border border-emerald-200/80 text-[12px] sm:text-[13px] font-mono">
                {children}
              </code>
            );
          },

          // Tables (if any)
          table: ({ children }) => (
            <div className="overflow-x-auto my-3 rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-emerald-50 text-emerald-950 font-bold border-b border-slate-200">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-100 bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50/80 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="p-2.5 font-bold text-slate-900 border-r last:border-r-0 border-slate-200">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-2.5 text-slate-700 border-r last:border-r-0 border-slate-100">
              {children}
            </td>
          ),
        }}
      >
        {normalized}
      </Markdown>
    </div>
  );
};
