import { Trophy, CheckCircle2, Circle, BookOpen, ClipboardCheck, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEco } from "@/context/EcoContext";
import { Link } from "wouter";

const challengeList = [
  { id: 1, label: "Reusable Bottle (5 days)", points: 10 },
  { id: 2, label: "Waste Separation (1 week)", points: 10 },
  { id: 3, label: "Plant a Tree", points: 15 },
  { id: 4, label: "No Single-Use Plastic (1 week)", points: 10 },
  { id: 5, label: "Energy Saver (5 days)", points: 10 },
  { id: 6, label: "Walk or Cycle (3 trips)", points: 10 },
  { id: 7, label: "Start Composting (2 weeks)", points: 15 },
];

const QUIZ_MAX = 10 * 3;   // 10 questions × 3 pts
const CHALLENGE_MAX = 80;  // sum of all challenge points
const MAX_POINTS = QUIZ_MAX + CHALLENGE_MAX; // 110

function tier(pts: number) {
  if (pts >= 80) return { label: "Eco Champion", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200" };
  if (pts >= 40) return { label: "Green Learner", color: "text-green-600", bg: "bg-green-50 border-green-200" };
  if (pts >= 10) return { label: "Eco Starter", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" };
  return { label: "Just Beginning", color: "text-muted-foreground", bg: "bg-muted border-border" };
}

const stat = {
  hidden: { opacity: 0, scale: 0.92 },
  show: (i: number) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.35 } }),
};

export default function Dashboard() {
  const { points, quizScore, quizCompleted, completedChallenges } = useEco();
  const { label, color, bg } = tier(points);
  const pct = Math.min(100, Math.round((points / MAX_POINTS) * 100));
  const challengePts = challengeList
    .filter((c) => completedChallenges.has(c.id))
    .reduce((s, c) => s + c.points, 0);
  const quizPts = (quizScore ?? 0) * 3;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Student Dashboard</h2>
        <p className="text-muted-foreground">Your learning progress and achievements.</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: Trophy,
            label: "Total Points",
            value: points,
            sub: `of ${MAX_POINTS} max`,
            iconClass: "text-yellow-500",
            bg: "bg-yellow-50",
          },
          {
            icon: ClipboardCheck,
            label: "Quiz Points",
            value: quizPts,
            sub: quizCompleted ? `${quizScore}/10 correct` : "Not taken",
            iconClass: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            icon: Flame,
            label: "Challenge Points",
            value: challengePts,
            sub: `${completedChallenges.size}/7 done`,
            iconClass: "text-orange-500",
            bg: "bg-orange-50",
          },
        ].map(({ icon: Icon, label, value, sub, iconClass, bg: ibg }, i) => (
          <motion.div
            key={label}
            custom={i}
            variants={stat}
            initial="hidden"
            animate="show"
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            data-testid={`stat-${label.toLowerCase().replace(/ /g, "-")}`}
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${ibg} mb-3`}>
              <Icon className={`w-5 h-5 ${iconClass}`} />
            </div>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
            <div className="text-xs text-muted-foreground">{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">Overall Progress</span>
          <span className="text-sm font-bold text-primary">{pct}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-primary rounded-full"
          />
        </div>
        <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${bg} ${color}`}>
          <Star className="w-3.5 h-3.5" />
          {label}
        </div>
      </div>

      {/* Quiz status */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Quiz</h3>
          <span className="ml-auto text-xs text-muted-foreground">30 pts max</span>
        </div>
        {quizCompleted ? (
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Completed — {quizScore}/10 correct</p>
              <p className="text-xs text-muted-foreground">You earned {quizPts} points</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">You haven't taken the quiz yet.</p>
            <Link
              href="/quiz"
              data-testid="link-take-quiz"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Take Quiz
            </Link>
          </div>
        )}
      </div>

      {/* Challenges status */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground">Challenges</h3>
          <span className="ml-auto text-xs text-muted-foreground">80 pts max</span>
        </div>
        <div className="space-y-3">
          {challengeList.map((ch) => {
            const done = completedChallenges.has(ch.id);
            return (
              <div key={ch.id} className="flex items-center gap-3" data-testid={`dashboard-challenge-${ch.id}`}>
                {done ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground/40 flex-shrink-0" />
                )}
                <span className={`text-sm flex-1 ${done ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {ch.label}
                </span>
                <span className={`text-sm font-semibold ${done ? "text-primary" : "text-muted-foreground"}`}>
                  +{ch.points} pts
                </span>
              </div>
            );
          })}
        </div>
        {completedChallenges.size < challengeList.length && (
          <div className="mt-4 pt-4 border-t border-border">
            <Link
              href="/challenges"
              data-testid="link-view-challenges"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View challenges
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
