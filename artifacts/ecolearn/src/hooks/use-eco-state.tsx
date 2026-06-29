import React, { createContext, useContext, useState, useEffect } from 'react';

type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
};

type EcoState = {
  points: number;
  quizCompleted: boolean;
  quizScore: number;
  challenges: Challenge[];
};

type EcoContextType = {
  state: EcoState;
  addPoints: (points: number) => void;
  completeQuiz: (score: number, pointsEarned: number) => void;
  completeChallenge: (challengeId: string) => void;
};

const defaultChallenges: Challenge[] = [
  { id: 'c1', title: 'Reusable Bottle', description: 'Use a reusable water bottle for 5 days.', points: 10, completed: false },
  { id: 'c2', title: 'Separate Waste', description: 'Separate your recycling and compost for 1 week.', points: 10, completed: false },
  { id: 'c3', title: 'Plant a Tree', description: 'Plant a tree or native plant in your community.', points: 15, completed: false },
];

const initialState: EcoState = {
  points: 0,
  quizCompleted: false,
  quizScore: 0,
  challenges: defaultChallenges,
};

const EcoContext = createContext<EcoContextType | undefined>(undefined);

export function EcoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<EcoState>(() => {
    const saved = localStorage.getItem('ecolearn_state');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('ecolearn_state', JSON.stringify(state));
  }, [state]);

  const addPoints = (points: number) => {
    setState((prev) => ({ ...prev, points: prev.points + points }));
  };

  const completeQuiz = (score: number, pointsEarned: number) => {
    setState((prev) => ({
      ...prev,
      quizCompleted: true,
      quizScore: score,
      points: prev.points + pointsEarned,
    }));
  };

  const completeChallenge = (challengeId: string) => {
    setState((prev) => {
      const challenge = prev.challenges.find((c) => c.id === challengeId);
      if (!challenge || challenge.completed) return prev;
      return {
        ...prev,
        points: prev.points + challenge.points,
        challenges: prev.challenges.map((c) =>
          c.id === challengeId ? { ...c, completed: true } : c
        ),
      };
    });
  };

  return (
    <EcoContext.Provider value={{ state, addPoints, completeQuiz, completeChallenge }}>
      {children}
    </EcoContext.Provider>
  );
}

export function useEcoState() {
  const context = useContext(EcoContext);
  if (context === undefined) {
    throw new Error('useEcoState must be used within an EcoProvider');
  }
  return context;
}
