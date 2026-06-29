import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEco } from "@/context/EcoContext";

const questions = [
  {
    id: "q1",
    text: "Which of these is recyclable?",
    options: [
      { label: "Banana peel", correct: false },
      { label: "Plastic bottle", correct: true },
      { label: "Food waste", correct: false },
    ],
  },
  {
    id: "q2",
    text: "What helps save water?",
    options: [
      { label: "Turning off the tap while brushing teeth", correct: true },
      { label: "Leaving the tap open", correct: false },
      { label: "Washing one item at a time", correct: false },
    ],
  },
  {
    id: "q3",
    text: "Which gas is most linked to climate change?",
    options: [
      { label: "Carbon dioxide", correct: true },
      { label: "Oxygen", correct: false },
      { label: "Helium", correct: false },
    ],
  },
];

export default function Quiz() {
  const { quizCompleted, quizScore, submitQuiz } = useEco();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(quizCompleted);
  const [score, setScore] = useState<number | null>(quizScore);

  function handleSubmit() {
    let correct = 0;
    questions.forEach((q, qi) => {
      const idx = selected[q.id];
      if (idx !== undefined && q.options[idx].correct) correct++;
    });
    setScore(correct);
    setSubmitted(true);
    if (!quizCompleted) submitQuiz(correct);
  }

  function handleRetry() {
    setSelected({});
    setSubmitted(false);
    setScore(null);
  }

  const allAnswered = questions.every((q) => selected[q.id] !== undefined);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Quick Quiz</h2>
        <p className="text-muted-foreground">Answer all 3 questions and earn up to 15 points.</p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {questions.map((q, qi) => (
              <div key={q.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <p className="font-semibold text-foreground mb-4">
                  <span className="inline-block w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm text-center leading-7 mr-2 font-bold">
                    {qi + 1}
                  </span>
                  {q.text}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = selected[q.id] === oi;
                    return (
                      <button
                        key={oi}
                        data-testid={`option-${q.id}-${oi}`}
                        onClick={() => setSelected((s) => ({ ...s, [q.id]: oi }))}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-medium transition-all duration-150 ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background hover:border-primary/40 hover:bg-secondary/40"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                            isSelected ? "border-primary bg-primary" : "border-muted-foreground"
                          }`}
                        />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <button
              data-testid="submit-quiz"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all duration-200 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              Submit Quiz
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Score card */}
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 mb-4">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-1">
                {score}/{questions.length}
              </h3>
              <p className="text-muted-foreground mb-1">
                You earned <span className="font-semibold text-primary">{(score ?? 0) * 5} points</span>
              </p>
              {quizCompleted && quizScore !== null && quizScore !== score && (
                <p className="text-sm text-muted-foreground">(Previous best: {quizScore * 5} pts — already counted)</p>
              )}
            </div>

            {/* Per-question breakdown */}
            <div className="space-y-3 mb-6">
              {questions.map((q, qi) => {
                const selectedIdx = selected[q.id];
                const isCorrect = selectedIdx !== undefined && q.options[selectedIdx].correct;
                const correctOpt = q.options.find((o) => o.correct);
                return (
                  <div key={q.id} className="rounded-xl border border-border bg-card p-4 flex gap-3 items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" data-testid={`result-correct-${qi}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" data-testid={`result-wrong-${qi}`} />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-0.5">{q.text}</p>
                      {!isCorrect && (
                        <p className="text-xs text-muted-foreground">
                          Correct answer: <span className="font-semibold text-foreground">{correctOpt?.label}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              data-testid="retry-quiz"
              onClick={handleRetry}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card hover:bg-secondary/50 text-foreground font-medium text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
