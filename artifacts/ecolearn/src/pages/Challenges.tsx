import { CheckCircle2, Droplets, Trash2, TreePine, Award, ShoppingBag, Zap, Bike, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import { useEco } from "@/context/EcoContext";

const challenges = [
  {
    id: 1,
    icon: Droplets,
    title: "Reusable Bottle",
    desc: "Bring a reusable water bottle to school or college for 5 consecutive days instead of buying plastic bottles.",
    points: 10,
    color: "bg-blue-100 text-blue-700",
    impact: "Saves ~5 plastic bottles from landfill",
    difficulty: "Easy",
  },
  {
    id: 2,
    icon: Trash2,
    title: "Waste Separation",
    desc: "Separate wet and dry waste at home for one full week. Teach at least one family member why it matters.",
    points: 10,
    color: "bg-green-100 text-green-700",
    impact: "Diverts organic waste from landfill",
    difficulty: "Easy",
  },
  {
    id: 3,
    icon: TreePine,
    title: "Plant a Tree",
    desc: "Plant one tree or sapling, or actively help plant one in your school, college, or neighbourhood. Document it with a photo.",
    points: 15,
    color: "bg-emerald-100 text-emerald-700",
    impact: "Absorbs ~22 kg CO₂ per year",
    difficulty: "Medium",
  },
  {
    id: 4,
    icon: ShoppingBag,
    title: "No Single-Use Plastic",
    desc: "Go an entire week without using single-use plastic bags, straws, or cutlery. Use cloth bags and reusable alternatives.",
    points: 10,
    color: "bg-purple-100 text-purple-700",
    impact: "Prevents ocean plastic pollution",
    difficulty: "Easy",
  },
  {
    id: 5,
    icon: Zap,
    title: "Energy Saver",
    desc: "Switch off all lights, fans, and chargers in your room when not in use for 5 days. Note how much your family saves.",
    points: 10,
    color: "bg-yellow-100 text-yellow-700",
    impact: "Reduces electricity consumption",
    difficulty: "Easy",
  },
  {
    id: 6,
    icon: Bike,
    title: "Walk or Cycle",
    desc: "Walk or cycle to school, college, or a local destination at least 3 times in one week instead of using a vehicle.",
    points: 10,
    color: "bg-orange-100 text-orange-700",
    impact: "Zero emissions per trip",
    difficulty: "Medium",
  },
  {
    id: 7,
    icon: Sprout,
    title: "Start Composting",
    desc: "Set up a small compost bin or pot at home for food scraps — vegetable peels, fruit skins, coffee grounds. Keep it going for 2 weeks.",
    points: 15,
    color: "bg-lime-100 text-lime-700",
    impact: "Turns waste into rich soil fertiliser",
    difficulty: "Hard",
  },
];

const difficultyColor: Record<string, string> = {
  Easy: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hard: "bg-red-100 text-red-700",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const card = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function Challenges() {
  const { completedChallenges, completeChallenge } = useEco();
  const totalEarned = challenges
    .filter((c) => completedChallenges.has(c.id))
    .reduce((sum, c) => sum + c.points, 0);
  const maxPoints = challenges.reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Eco-Challenges</h2>
          <p className="text-muted-foreground">
            Complete real-world actions and earn points. {completedChallenges.size}/{challenges.length} completed.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 shadow-sm">
          <Award className="w-5 h-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">{totalEarned} / {maxPoints} pts</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8 rounded-xl bg-card border border-border p-4 shadow-sm">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground font-medium">Challenge progress</span>
          <span className="font-bold text-foreground">{completedChallenges.size} / {challenges.length}</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {challenges.map((ch) => {
          const Icon = ch.icon;
          const done = completedChallenges.has(ch.id);
          return (
            <motion.div
              key={ch.id}
              variants={card}
              data-testid={`challenge-card-${ch.id}`}
              className={`relative rounded-2xl border bg-card shadow-sm flex flex-col p-6 transition-all duration-200 ${
                done ? "border-primary/30 bg-primary/5" : "border-border hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {done && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${ch.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${difficultyColor[ch.difficulty]}`}>
                  {ch.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-foreground text-lg mb-1">{ch.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-3">{ch.desc}</p>
              <div className="text-xs text-muted-foreground mb-4 italic">{ch.impact}</div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  +{ch.points} pts
                </span>
                <button
                  data-testid={`complete-challenge-${ch.id}`}
                  onClick={() => completeChallenge(ch.id, ch.points)}
                  disabled={done}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    done
                      ? "bg-primary/15 text-primary cursor-default"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                  }`}
                >
                  {done ? "Completed" : "Complete"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
