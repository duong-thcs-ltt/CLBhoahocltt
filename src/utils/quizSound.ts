// Web Audio API sound effects for Chemistry Arena Quiz
class QuizSoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    try {
      const saved = localStorage.getItem("clb_quiz_muted");
      this.isMuted = saved === "true";
    } catch {
      this.isMuted = false;
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem("clb_quiz_muted", muted ? "true" : "false");
    } catch {}
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // 1. Nhấp chọn đáp án / tương tác
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  // 2. Trả lời đúng (Âm vang hân hoan theo chuỗi điểm)
  public playCorrect(streak: number = 1) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Base chord notes
      // If streak is high, play higher octave and more notes
      const notes = streak >= 5 
        ? [523.25, 659.25, 783.99, 1046.5, 1318.5] // C5, E5, G5, C6, E6
        : streak >= 3 
        ? [440, 554.37, 659.25, 880] // A4, C#5, E5, A5
        : [523.25, 659.25, 783.99]; // C5, E5, G5

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = i === notes.length - 1 ? "triangle" : "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        const startTime = now + i * 0.08;
        const duration = 0.28;

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });

      // Extra glitter sparkle for streaks >= 3
      if (streak >= 3) {
        const sparkleTime = now + notes.length * 0.08;
        const sOsc = ctx.createOscillator();
        const sGain = ctx.createGain();
        sOsc.type = "sine";
        sOsc.frequency.setValueAtTime(1567.98, sparkleTime); // G6
        sOsc.frequency.exponentialRampToValueAtTime(2093.00, sparkleTime + 0.15); // C7

        sGain.gain.setValueAtTime(0.12, sparkleTime);
        sGain.gain.exponentialRampToValueAtTime(0.001, sparkleTime + 0.15);

        sOsc.connect(sGain);
        sGain.connect(ctx.destination);
        sOsc.start(sparkleTime);
        sOsc.stop(sparkleTime + 0.15);
      }
    } catch {}
  }

  // 3. Trả lời sai (Âm trầm ấm nhắc nhở, nhẹ nhàng khích lệ)
  public playWrong() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      
      // Two-step gentle descend
      const notes = [
        { freq: 330, time: now },       // E4
        { freq: 246.94, time: now + 0.12 } // B3
      ];

      notes.forEach(({ freq, time }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.9, time + 0.18);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(time);
        osc.stop(time + 0.22);
      });
    } catch {}
  }

  // 4. Đồng hồ đếm ngược tick
  public playTick(urgent: boolean = false) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = urgent ? "triangle" : "sine";
      const freq = urgent ? 880 : 587.33; // A5 if urgent, D5 normal
      osc.frequency.setValueAtTime(freq, now);

      const vol = urgent ? 0.18 : 0.08;
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {}
  }

  // 5. Khúc nhạc vinh danh Chiến Thắng (Victory Fanfare)
  public playVictory() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // Trumpet fanfare notes: G4, C5, E5, G5, hold C6
      const fanfare = [
        { freq: 392.00, dur: 0.12, delay: 0 },       // G4
        { freq: 523.25, dur: 0.12, delay: 0.14 },    // C5
        { freq: 659.25, dur: 0.14, delay: 0.28 },    // E5
        { freq: 783.99, dur: 0.25, delay: 0.44 },    // G5
        { freq: 1046.50, dur: 0.60, delay: 0.72 }    // C6
      ];

      fanfare.forEach(({ freq, dur, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "triangle";
        const startTime = now + delay;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.25, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch {}
  }
}

export const quizSound = new QuizSoundManager();
