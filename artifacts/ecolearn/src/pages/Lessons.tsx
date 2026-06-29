import { useState } from "react";
import { ChevronDown, Wind, Recycle, ThermometerSun, Droplets } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const lessons = [
  {
    id: 1,
    icon: Wind,
    title: "Pollution",
    color: "bg-slate-100 text-slate-600",
    tag: "Environment",
    tagColor: "bg-slate-100 text-slate-600",
    summary: "Learn about air, water, and land pollution and how to reduce them.",
    content: [
      {
        heading: "What is Pollution?",
        body: "Pollution is the introduction of harmful substances or contaminants into the natural environment. It occurs in many forms — air, water, soil, light, and noise — and is primarily caused by human activities such as industrialisation, transportation, and waste disposal.",
      },
      {
        heading: "Types of Pollution",
        body: "Air pollution results from burning fossil fuels, releasing smoke and gases like CO₂ and SO₂. Water pollution comes from industrial waste, agricultural runoff, and improper sewage disposal. Land pollution is caused by littering, chemical spills, and landfill overflow.",
      },
      {
        heading: "What Can You Do?",
        body: "Use public transport or cycle. Avoid single-use plastics. Dispose of waste properly. Support clean energy initiatives. Even small actions compound into meaningful change when taken collectively.",
      },
    ],
  },
  {
    id: 2,
    icon: Recycle,
    title: "Recycling",
    color: "bg-green-100 text-green-700",
    tag: "Waste Management",
    tagColor: "bg-green-100 text-green-700",
    summary: "Understand how to separate waste and reuse materials effectively.",
    content: [
      {
        heading: "Why Recycle?",
        body: "Recycling converts waste into reusable material, reducing the strain on natural resources and cutting greenhouse gas emissions. It conserves energy — recycling aluminium saves 95% of the energy needed to produce it from raw materials.",
      },
      {
        heading: "How to Sort Your Waste",
        body: "Dry waste: paper, cardboard, plastic bottles, glass, metal cans — these can be recycled. Wet waste: food scraps, organic material — compost this. Hazardous waste: batteries, electronics — take to designated drop-off points. Never mix them.",
      },
      {
        heading: "The 3Rs",
        body: "Reduce the amount of waste you produce. Reuse items before discarding them. Recycle what cannot be reused. The hierarchy matters — reducing is always better than recycling.",
      },
    ],
  },
  {
    id: 3,
    icon: ThermometerSun,
    title: "Climate Change",
    color: "bg-orange-100 text-orange-700",
    tag: "Global Issue",
    tagColor: "bg-orange-100 text-orange-700",
    summary: "Discover how human actions affect the climate and environment.",
    content: [
      {
        heading: "What Causes Climate Change?",
        body: "Burning fossil fuels — coal, oil, gas — releases carbon dioxide and other greenhouse gases that trap heat in the atmosphere. This is the primary driver of global warming. Deforestation worsens the problem by removing the trees that absorb CO₂.",
      },
      {
        heading: "What Are the Effects?",
        body: "Rising sea levels, extreme weather events, melting ice caps, disrupted ecosystems, food and water insecurity, and increased health risks. Climate change affects every country and every living system on Earth.",
      },
      {
        heading: "Taking Action",
        body: "Shift to plant-based foods, reduce energy consumption at home, support renewable energy policies, and vote for leaders who prioritise climate action. Individual choices matter, but systemic change is essential.",
      },
    ],
  },
  {
    id: 4,
    icon: Droplets,
    title: "Water Conservation",
    color: "bg-blue-100 text-blue-700",
    tag: "Resources",
    tagColor: "bg-blue-100 text-blue-700",
    summary: "Save water at home, school, and college using simple methods.",
    content: [
      {
        heading: "Why Water is Precious",
        body: "Only 2.5% of Earth's water is fresh, and less than 1% is readily accessible. Billions of people lack access to safe drinking water. As populations grow and climate patterns shift, water scarcity is becoming one of the most critical global challenges.",
      },
      {
        heading: "Simple Conservation Habits",
        body: "Turn off taps while brushing your teeth. Fix leaking taps — a slow drip can waste 20 litres per day. Take shorter showers. Run dishwashers and washing machines only with full loads. Collect rainwater for gardening.",
      },
      {
        heading: "At School and College",
        body: "Report dripping taps or running toilets to maintenance. Use water fountains instead of bottled water. Organise awareness campaigns. Set up rainwater harvesting systems. Every institution can become more water-responsible.",
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Lessons() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Lessons</h2>
        <p className="text-muted-foreground">Select a topic to expand and start learning.</p>
      </div>

      <div className="space-y-4">
        {lessons.map((lesson, i) => {
          const Icon = lesson.icon;
          const isOpen = openId === lesson.id;
          return (
            <motion.div
              key={lesson.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
            >
              <button
                data-testid={`lesson-toggle-${lesson.id}`}
                onClick={() => setOpenId(isOpen ? null : lesson.id)}
                className="w-full flex items-center gap-4 p-6 text-left hover:bg-secondary/40 transition-colors"
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${lesson.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-foreground">{lesson.title}</h3>
                    <span className={`hidden sm:inline text-xs font-medium px-2 py-0.5 rounded-full ${lesson.tagColor}`}>
                      {lesson.tag}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{lesson.summary}</p>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 ml-2"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                    data-testid={`lesson-content-${lesson.id}`}
                  >
                    <div className="px-6 pb-6 border-t border-border pt-5 space-y-5">
                      {lesson.content.map((section) => (
                        <div key={section.heading}>
                          <h4 className="font-semibold text-foreground mb-1.5">{section.heading}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
