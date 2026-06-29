import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface EcoState {
  points: number;
  quizScore: number | null;
  quizCompleted: boolean;
  completedChallenges: Set<number>;
  addPoints: (value: number) => void;
  completeChallenge: (id: number, pts: number) => void;
  submitQuiz: (score: number) => void;
}

const EcoContext = createContext<EcoState | null>(null);

function loadState() {
  try {
    const raw = localStorage.getItem("ecolearn_state");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        points: parsed.points ?? 0,
        quizScore: parsed.quizScore ?? null,
        quizCompleted: parsed.quizCompleted ?? false,
        completedChallenges: new Set<number>(parsed.completedChallenges ?? []),
      };
    }
  } catch {}
  return {
    points: 0,
    quizScore: null,
    quizCompleted: false,
    completedChallenges: new Set<number>(),
  };
}

export function EcoProvider({ children }: { children: ReactNode }) {
  const saved = loadState();
  const [points, setPoints] = useState(saved.points);
  const [quizScore, setQuizScore] = useState<number | null>(saved.quizScore);
  const [quizCompleted, setQuizCompleted] = useState(saved.quizCompleted);
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(saved.completedChallenges);

  useEffect(() => {
    localStorage.setItem(
      "ecolearn_state",
      JSON.stringify({
        points,
        quizScore,
        quizCompleted,
        completedChallenges: Array.from(completedChallenges),
      })
    );
  }, [points, quizScore, quizCompleted, completedChallenges]);

  function addPoints(value: number) {
    setPoints((p) => p + value);
  }

  function completeChallenge(id: number, pts: number) {
    if (completedChallenges.has(id)) return;
    setCompletedChallenges((prev) => new Set([...prev, id]));
    addPoints(pts);
  }

  function submitQuiz(score: number) {
    if (quizCompleted) return;
    setQuizScore(score);
    setQuizCompleted(true);
    addPoints(score * 3);
  }

  return (
    <EcoContext.Provider
      value={{ points, quizScore, quizCompleted, completedChallenges, addPoints, completeChallenge, submitQuiz }}
    >
      {children}
    </EcoContext.Provider>
  );
}

export function useEco() {
  const ctx = useContext(EcoContext);
  if (!ctx) throw new Error("useEco must be used within EcoProvider");
  return ctx;
}
