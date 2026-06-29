import { useState } from "react";
import { CheckCircle2, XCircle, Trophy, RotateCcw, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEco } from "@/context/EcoContext";

const POINTS_PER_QUESTION = 3;

const questions = [
  {
    id: "q1",
    topic: "Recycling",
    text: "Which of these materials is recyclable in most kerbside bins?",
    options: [
      { label: "Banana peel", correct: false },
      { label: "Plastic bottle", correct: true },
      { label: "Greasy pizza box", correct: false },
      { label: "Broken crockery", correct: false },
    ],
    explanation: "Clean plastic bottles are recyclable. Greasy food-contaminated cardboard and food waste go to organic/compost bins.",
  },
  {
    id: "q2",
    topic: "Water Conservation",
    text: "Which action saves the most water at home?",
    options: [
      { label: "Turning off the tap while brushing teeth", correct: true },
      { label: "Using a smaller glass", correct: false },
      { label: "Buying bottled water", correct: false },
      { label: "Watering plants at noon", correct: false },
    ],
    explanation: "Turning off the tap while brushing saves up to 6 litres per minute — one of the simplest and highest-impact habits.",
  },
  {
    id: "q3",
    topic: "Climate Change",
    text: "Which gas is the primary driver of human-caused climate change?",
    options: [
      { label: "Oxygen", correct: false },
      { label: "Helium", correct: false },
      { label: "Carbon dioxide (CO₂)", correct: true },
      { label: "Nitrogen", correct: false },
    ],
    explanation: "CO₂ from burning fossil fuels is the main greenhouse gas. Methane is more potent but released in smaller quantities.",
  },
  {
    id: "q4",
    topic: "Biodiversity",
    text: "What is the leading cause of biodiversity loss globally?",
    options: [
      { label: "Volcanic eruptions", correct: false },
      { label: "Habitat destruction", correct: true },
      { label: "Invasive species", correct: false },
      { label: "Noise pollution", correct: false },
    ],
    explanation: "Habitat destruction — mainly deforestation and land conversion for agriculture — is the single biggest driver of species extinction.",
  },
  {
    id: "q5",
    topic: "Renewable Energy",
    text: "Which renewable energy source is currently the cheapest to generate electricity from in most of the world?",
    options: [
      { label: "Wind", correct: false },
      { label: "Hydropower", correct: false },
      { label: "Solar (photovoltaic)", correct: true },
      { label: "Geothermal", correct: false },
    ],
    explanation: "Solar PV is now the cheapest source of electricity in history across most of the world, according to the International Energy Agency.",
  },
  {
    id: "q6",
    topic: "Ocean Health",
    text: "Approximately how much plastic enters the oceans every year?",
    options: [
      { label: "800,000 tonnes", correct: false },
      { label: "8 million tonnes", correct: true },
      { label: "80 million tonnes", correct: false },
      { label: "800 million tonnes", correct: false },
    ],
    explanation: "Around 8 million tonnes of plastic enter the ocean annually — equivalent to a rubbish truck's worth every minute.",
  },
  {
    id: "q7",
    topic: "Pollution",
    text: "Which of the following is an example of non-point source water pollution?",
    options: [
      { label: "A factory discharge pipe", correct: false },
      { label: "Agricultural runoff from fields", correct: true },
      { label: "A broken sewage pipe", correct: false },
      { label: "An oil spill from a tanker", correct: false },
    ],
    explanation: "Non-point source pollution comes from many diffuse sources — like rain washing fertilisers and pesticides from fields into waterways.",
  },
  {
    id: "q8",
    topic: "Sustainable Agriculture",
    text: "Roughly what percentage of global greenhouse gas emissions comes from food production?",
    options: [
      { label: "5%", correct: false },
      { label: "13%", correct: false },
      { label: "26%", correct: true },
      { label: "45%", correct: false },
    ],
    explanation: "Food systems — farming, land use, transport, and processing — account for about 26% of global greenhouse gas emissions.",
  },
  {
    id: "q9",
    topic: "Recycling",
    text: "How much energy does recycling aluminium save compared to producing it from raw ore?",
    options: [
      { label: "About 25%", correct: false },
      { label: "About 50%", correct: false },
      { label: "About 75%", correct: false },
      { label: "About 95%", correct: true },
    ],
    explanation: "Recycling aluminium saves around 95% of the energy needed to produce it from bauxite ore — making it one of the most valuable materials to recycle.",
  },
  {
    id: "q10",
    topic: "Climate Change",
    text: "By approximately how much has the average global temperature risen since pre-industrial times (1880)?",
    options: [
      { label: "0.2°C", correct: false },
      { label: "1.1°C", correct: true },
      { label: "2.5°C", correct: false },
      { label: "4.0°C", correct: false },
    ],
    explanation: "Global average temperatures have risen by approximately 1.1°C since 1880, with the majority of that increase occurring after 1975.",
  },
];

const topicColors: Record<string, string> = {
  "Recycling": "bg-green-100 text-green-700",
  "Water Conservation": "bg-blue-100 text-blue-700",
  "Climate Change": "bg-orange-100 text-orange-700",
  "Biodiversity": "bg-lime-100 text-lime-700",
  "Renewable Energy": "bg-yellow-100 text-yellow-700",
  "Ocean Health": "bg-cyan-100 text-cyan-700",
  "Pollution": "bg-slate-100 text-slate-600",
  "Sustainable Agriculture": "bg-emerald-100 text-emerald-700",
};

export default function Quiz() {
  const { quizCompleted, quizScore, submitQuiz } = useEco();
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(quizCompleted);
  const [score, setScore] = useState<number | null>(quizScore);
  const [showAll, setShowAll] = useState(false);

  function handleSubmit() {
    let correct = 0;
    questions.forEach((q) => {
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
    setShowAll(false);
  }

  const answeredCount = Object.keys(selected).length;
  const allAnswered = answeredCount === questions.length;
  const pct = Math.round((answeredCount / questions.length) * 100);

  const displayQuestions = showAll ? questions : questions.slice(0, 5);

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Eco Quiz</h2>
        <p className="text-muted-foreground">
          {questions.length} questions across 8 topics — earn {POINTS_PER_QUESTION} points per correct answer (
          {questions.length * POINTS_PER_QUESTION} max).
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {/* Progress bar */}
            <div className="rounded-xl bg-card border border-border p-4 shadow-sm">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">Progress</span>
                <span className="font-bold text-foreground">{answeredCount} / {questions.length} answered</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>
            </div>

            {displayQuestions.map((q, qi) => (
              <div key={q.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex-shrink-0">
                    {qi + 1}
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${topicColors[q.topic] ?? "bg-muted text-muted-foreground"}`}>
                    {q.topic}
                  </span>
                </div>
                <p className="font-semibold text-foreground mb-4 leading-snug">{q.text}</p>
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

            {!showAll && (
              <button
                data-testid="show-more-questions"
                onClick={() => setShowAll(true)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-border bg-card hover:bg-secondary/40 text-muted-foreground hover:text-foreground font-medium text-sm transition-all"
              >
                Show remaining {questions.length - 5} questions
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            <button
              data-testid="submit-quiz"
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition-all duration-200 hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              {allAnswered ? "Submit Quiz" : `Answer all questions to submit (${questions.length - answeredCount} remaining)`}
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
              <h3 className="text-3xl font-bold text-foreground mb-1">
                {score} / {questions.length}
              </h3>
              <p className="text-muted-foreground mb-1">
                You earned{" "}
                <span className="font-semibold text-primary">{(score ?? 0) * POINTS_PER_QUESTION} points</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {score === questions.length
                  ? "Perfect score! You are an eco expert."
                  : score! >= 7
                  ? "Great work — strong eco knowledge!"
                  : score! >= 5
                  ? "Good effort — keep exploring the lessons."
                  : "Keep learning — the lessons will help you score higher."}
              </p>
              {quizCompleted && quizScore !== null && quizScore !== score && (
                <p className="text-xs text-muted-foreground mt-2">
                  Previous score: {quizScore}/{questions.length} — points already counted
                </p>
              )}
            </div>

            {/* Per-question breakdown */}
            <div className="space-y-3 mb-6">
              {questions.map((q, qi) => {
                const selectedIdx = selected[q.id];
                const isCorrect = selectedIdx !== undefined && q.options[selectedIdx].correct;
                const correctOpt = q.options.find((o) => o.correct);
                const selectedOpt = selectedIdx !== undefined ? q.options[selectedIdx] : null;
                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border bg-card p-4 flex gap-3 items-start ${
                      isCorrect ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"
                    }`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" data-testid={`result-correct-${qi}`} />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" data-testid={`result-wrong-${qi}`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Q{qi + 1}</span>
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${topicColors[q.topic] ?? ""}`}>
                          {q.topic}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground mb-1">{q.text}</p>
                      {!isCorrect && (
                        <>
                          {selectedOpt && (
                            <p className="text-xs text-red-600 mb-0.5">
                              Your answer: {selectedOpt.label}
                            </p>
                          )}
                          <p className="text-xs text-green-700 mb-1">
                            Correct: <span className="font-semibold">{correctOpt?.label}</span>
                          </p>
                        </>
                      )}
                      <p className="text-xs text-muted-foreground italic leading-relaxed">{q.explanation}</p>
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
