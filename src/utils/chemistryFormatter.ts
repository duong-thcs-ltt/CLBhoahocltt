/**
 * Utilities for normalizing and formatting Vietnamese Chemistry & Science notation.
 * Converts raw LaTeX, math tokens, units, and raw chemical formulas into standard
 * scientific and KNTT (Kết nối tri thức) typographic standards.
 */

// Mapping ASCII digits to Unicode subscripts
const SUB_MAP: Record<string, string> = {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
  "n": "ₙ",
  "m": "ₘ",
};

// Mapping ASCII digits & charges to Unicode superscripts
const SUP_MAP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};

export function toSubscript(str: string): string {
  return str.split("").map((c) => SUB_MAP[c] || c).join("");
}

export function toSuperscript(str: string): string {
  return str.split("").map((c) => SUP_MAP[c] || c).join("");
}

/**
 * Common chemical formulas to auto-subscript in Vietnamese text
 */
const COMMON_CHEM_FORMULAS = [
  { raw: /\bH2O\b/g, formatted: "H₂O" },
  { raw: /\bCO2\b/g, formatted: "CO₂" },
  { raw: /\bO2\b/g, formatted: "O₂" },
  { raw: /\bN2\b/g, formatted: "N₂" },
  { raw: /\bH2\b/g, formatted: "H₂" },
  { raw: /\bCl2\b/g, formatted: "Cl₂" },
  { raw: /\bSO2\b/g, formatted: "SO₂" },
  { raw: /\bSO3\b/g, formatted: "SO₃" },
  { raw: /\bNO2\b/g, formatted: "NO₂" },
  { raw: /\bN2O\b/g, formatted: "N₂O" },
  { raw: /\bNH3\b/g, formatted: "NH₃" },
  { raw: /\bCH4\b/g, formatted: "CH₄" },
  { raw: /\bC2H4\b/g, formatted: "C₂H₄" },
  { raw: /\bC2H2\b/g, formatted: "C₂H₂" },
  { raw: /\bC2H5OH\b/g, formatted: "C₂H₅OH" },
  { raw: /\bCH3COOH\b/g, formatted: "CH₃COOH" },
  { raw: /\bC6H12O6\b/g, formatted: "C₆H₁₂O₆" },
  { raw: /\b(C6H10O5)n\b/g, formatted: "(C₆H₁₀O₅)ₙ" },
  { raw: /\bH2SO4\b/g, formatted: "H₂SO₄" },
  { raw: /\bHNO3\b/g, formatted: "HNO₃" },
  { raw: /\bH3PO4\b/g, formatted: "H₃PO₄" },
  { raw: /\bH2CO3\b/g, formatted: "H₂CO₃" },
  { raw: /\bCaCO3\b/g, formatted: "CaCO₃" },
  { raw: /\bCa\(OH\)2\b/g, formatted: "Ca(OH)₂" },
  { raw: /\bBa\(OH\)2\b/g, formatted: "Ba(OH)₂" },
  { raw: /\bBaSO4\b/g, formatted: "BaSO₄" },
  { raw: /\bBaCl2\b/g, formatted: "BaCl₂" },
  { raw: /\bFeCl2\b/g, formatted: "FeCl₂" },
  { raw: /\bFeCl3\b/g, formatted: "FeCl₃" },
  { raw: /\bFe2O3\b/g, formatted: "Fe₂O₃" },
  { raw: /\bFe3O4\b/g, formatted: "Fe₃O₄" },
  { raw: /\bFe\(OH\)2\b/g, formatted: "Fe(OH)₂" },
  { raw: /\bFe\(OH\)3\b/g, formatted: "Fe(OH)₃" },
  { raw: /\bFeSO4\b/g, formatted: "FeSO₄" },
  { raw: /\bFe2\(SO4\)3\b/g, formatted: "Fe₂(SO₄)₃" },
  { raw: /\bAl2O3\b/g, formatted: "Al₂O₃" },
  { raw: /\bAlCl3\b/g, formatted: "AlCl₃" },
  { raw: /\bAl\(OH\)3\b/g, formatted: "Al(OH)₃" },
  { raw: /\bAl2\(SO4\)3\b/g, formatted: "Al₂(SO₄)₃" },
  { raw: /\bCuSO4\b/g, formatted: "CuSO₄" },
  { raw: /\bCu\(OH\)2\b/g, formatted: "Cu(OH)₂" },
  { raw: /\bCuCl2\b/g, formatted: "CuCl₂" },
  { raw: /\bNa2CO3\b/g, formatted: "Na₂CO₃" },
  { raw: /\bNaHCO3\b/g, formatted: "NaHCO₃" },
  { raw: /\bNa2SO4\b/g, formatted: "Na₂SO₄" },
  { raw: /\bK2SO4\b/g, formatted: "K₂SO₄" },
  { raw: /\bKMnO4\b/g, formatted: "KMnO₄" },
  { raw: /\bKClO3\b/g, formatted: "KClO₃" },
  { raw: /\bK2CO3\b/g, formatted: "K₂CO₃" },
  { raw: /\bAgNO3\b/g, formatted: "AgNO₃" },
  { raw: /\bZnSO4\b/g, formatted: "ZnSO₄" },
  { raw: /\bZnCl2\b/g, formatted: "ZnCl₂" },
  { raw: /\bMgSO4\b/g, formatted: "MgSO₄" },
  { raw: /\bMgCl2\b/g, formatted: "MgCl₂" },
  { raw: /\bMg\(OH\)2\b/g, formatted: "Mg(OH)₂" },
];

/**
 * Normalizes raw text containing LaTeX, units, or chemistry notations into
 * clean, readable Vietnamese scientific typography.
 */
export function normalizeChemistryText(content: string): string {
  if (!content) return "";

  let text = content;

  // 1. Temperature formats
  // $100^\circ\text{C}$ or $100^\circ\text{ C}$ or $100^\circ C$ or 100^\circ\text{C}
  text = text.replace(/\$([0-9.]+)\s*\^\\circ\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\{\\circ\}\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\\^\\circ\s*\\text\{\s*([A-Za-z]+)\s*\}\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\\circ\s*([A-Za-z]+)\$/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\{\\circ\}\s*([A-Za-z]+)\$/g, "$1 °$2");
  text = text.replace(/([0-9.]+)\s*\^\\circ\s*\\text\{\s*([A-Za-z]+)\s*\}/g, "$1 °$2");
  text = text.replace(/([0-9.]+)\s*\^\\circ\s*([A-Za-z]+)\b/g, "$1 °$2");
  text = text.replace(/\$([0-9.]+)\s*\^\\circ\$/g, "$1°");
  text = text.replace(/\$([0-9.]+)\s*\\circ\s*C\$/g, "$1 °C");

  // 2. Units in LaTeX \text{...} or \mathrm{...}
  // e.g. $1\text{ atm}$, $101.3\text{ kPa}$, $2\text{ mol/L}$, $250\text{ mL}$
  text = text.replace(/\$([0-9.,]+)\s*\\text\{\s*([^}]+)\s*\}\$/g, "$1 $2");
  text = text.replace(/\$([0-9.,]+)\s*\\mathrm\{\s*([^}]+)\s*\}\$/g, "$1 $2");
  text = text.replace(/\$([0-9.,]+)\s*(atm|kPa|bar|mmHg|mol\/L|mol\/l|g\/mL|g\/ml|mL|ml|L|mol|M|mM|ppm|kg|gam|g|mg)\$/gi, "$1 $2");

  // 3. Chemical formulas in LaTeX
  // e.g. $\text{H}_2\text{O}$ or $\text{Fe}^{3+}$
  text = text.replace(/\$\\text\{([^}]+)\}\$/g, "$1");
  text = text.replace(/\\text\{([^}]+)\}/g, "$1");

  // LaTeX subscripts: e.g. H_2O, CO_2, H_{2}SO_{4}
  text = text.replace(/_\{([0-9+-\s]+)\}/g, (_, sub) => toSubscript(sub.trim()));
  text = text.replace(/_([0-9])/g, (_, sub) => toSubscript(sub));

  // LaTeX superscripts: e.g. Fe^{3+}, SO_4^{2-}, H^+
  text = text.replace(/\^\{([0-9+-\s]+)\}/g, (_, sup) => toSuperscript(sup.trim()));
  text = text.replace(/\^([0-9+\-])/g, (_, sup) => toSuperscript(sup));

  // 4. Reaction arrows and symbols
  text = text.replace(/\\rightarrow/g, "→");
  text = text.replace(/\\longrightarrow/g, "→");
  text = text.replace(/\\to\b/g, "→");
  text = text.replace(/\\rightleftharpoons/g, "⇌");
  text = text.replace(/\\leftrightarrow/g, "⇌");
  text = text.replace(/\\uparrow/g, "↑");
  text = text.replace(/\\downarrow/g, "↓");
  text = text.replace(/\\times/g, "×");
  text = text.replace(/\\pm/g, "±");
  text = text.replace(/\\circ/g, "°");

  // Reaction conditions: --t°--> or --t0--> or --t^o--> -> —(t°)→
  text = text.replace(/--\s*t\^?o\s*-->/gi, " —(t°)→ ");
  text = text.replace(/--\s*t°\s*-->/gi, " —(t°)→ ");
  text = text.replace(/--\s*xt\s*-->/gi, " —(xt)→ ");
  text = text.replace(/-->/g, " → ");

  // 5. Clean up any remaining $ wrapping simple numbers, chemical formulas, or single words
  // e.g. $100$, $1$, $H₂O$, $CO₂$
  text = text.replace(/\$([0-9.,]+)\$/g, "$1");
  text = text.replace(/\$([A-Za-z0-9₀-₉⁰-⁹⁺⁻()→⇌]+)\$/g, "$1");

  // 6. Format common raw chemical formulas in text (e.g. H2O -> H₂O, CO2 -> CO₂)
  COMMON_CHEM_FORMULAS.forEach(({ raw, formatted }) => {
    text = text.replace(raw, formatted);
  });

  return text;
}
