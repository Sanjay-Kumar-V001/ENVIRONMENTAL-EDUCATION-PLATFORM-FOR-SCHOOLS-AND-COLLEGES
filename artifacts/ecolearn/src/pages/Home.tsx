import { Link } from "wouter";
import { BookOpen, ClipboardCheck, Flame, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: BookOpen,
    title: "Learn",
    desc: "Study pollution, recycling, climate change, and sustainability through clear, engaging lessons.",
    href: "/lessons",
    color: "bg-emerald-50 text-emerald-700",
    border: "border-emerald-100",
  },
  {
    icon: ClipboardCheck,
    title: "Quiz",
    desc: "Check your understanding with interactive quizzes and earn points for every correct answer.",
    href: "/quiz",
    color: "bg-lime-50 text-lime-700",
    border: "border-lime-100",
  },
  {
    icon: Flame,
    title: "Act",
    desc: "Complete real-world eco-challenges, earn points, and build greener habits starting today.",
    href: "/challenges",
    color: "bg-amber-50 text-amber-700",
    border: "border-amber-100",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(140,40%,14%) 0%, hsl(142,50%,22%) 50%, hsl(95,45%,28%) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJ3aGl0ZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIxIiBjeT0iMSIgcj0iMSIvPjwvZz48L3N2Zz4=')] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10 max-w-3xl"
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/15 text-white/90 text-sm font-medium tracking-wide uppercase">
            Environmental Education Platform
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Learn, Act, and Build a{" "}
            <span className="text-[hsl(78,70%,65%)]">Greener Future</span>
          </h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
            An interactive platform for schools and colleges — study eco topics, test your knowledge, and complete real-world challenges to earn points.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/lessons"
              data-testid="cta-start-learning"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[hsl(142,60%,45%)] hover:bg-[hsl(142,60%,40%)] text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/quiz"
              data-testid="cta-take-quiz"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-base transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              Take the Quiz
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map(({ icon: Icon, title, desc, href, color, border }) => (
            <motion.div key={title} variants={item}>
              <Link
                href={href}
                data-testid={`feature-card-${title.toLowerCase()}`}
                className={`group block rounded-2xl border ${border} bg-white p-8 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="bg-[hsl(140,40%,14%)] text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-8 text-center">
          {[
            { value: "8", label: "Lesson Topics" },
            { value: "10", label: "Quiz Questions" },
            { value: "110", label: "Points to Earn" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-4xl font-bold text-[hsl(78,70%,65%)]">{value}</div>
              <div className="text-sm text-white/70 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
