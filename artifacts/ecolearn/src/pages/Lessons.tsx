import { useState } from "react";
import {
  ChevronDown, Wind, Recycle, ThermometerSun, Droplets,
  Leaf, Zap, Sprout, Fish,
} from "lucide-react";
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
        body: "Air pollution results from burning fossil fuels, releasing smoke and gases like CO₂ and SO₂. Water pollution comes from industrial waste, agricultural runoff, and improper sewage disposal. Land pollution is caused by littering, chemical spills, and landfill overflow. Noise pollution from traffic and construction affects mental health and wildlife.",
      },
      {
        heading: "Health Impacts",
        body: "Air pollution causes respiratory diseases, heart conditions, and lung cancer. Contaminated water leads to cholera, typhoid, and other waterborne illnesses. Soil pollution enters the food chain and affects human health over time. Children and the elderly are most vulnerable.",
      },
      {
        heading: "What Can You Do?",
        body: "Use public transport or cycle. Avoid single-use plastics. Dispose of waste properly. Support clean energy initiatives. Report illegal dumping to local authorities. Even small actions compound into meaningful change when taken collectively.",
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
        body: "Recycling converts waste into reusable material, reducing the strain on natural resources and cutting greenhouse gas emissions. It conserves energy — recycling aluminium saves 95% of the energy needed to produce it from raw materials. Recycling one tonne of paper saves 17 trees.",
      },
      {
        heading: "How to Sort Your Waste",
        body: "Dry waste: paper, cardboard, plastic bottles, glass, metal cans — these can be recycled. Wet waste: food scraps, organic material — compost this. Hazardous waste: batteries, electronics, medicines — take to designated drop-off points. Never mix categories, as contamination ruins entire batches.",
      },
      {
        heading: "The 3Rs — and 2 More",
        body: "Reduce the amount of waste you produce. Reuse items before discarding them. Recycle what cannot be reused. Newer frameworks add Repair (fix broken items instead of replacing) and Rethink (question whether you need something at all). The hierarchy matters — reducing is always better than recycling.",
      },
      {
        heading: "E-Waste: A Growing Crisis",
        body: "Electronic waste is the fastest-growing waste stream globally. Old phones, computers, and batteries contain toxic materials like lead and mercury. Never throw e-waste in regular bins. Use authorised collection centres and look for electronics buy-back programmes.",
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
        body: "Burning fossil fuels — coal, oil, gas — releases carbon dioxide and other greenhouse gases that trap heat in the atmosphere. This is the primary driver of global warming. Deforestation worsens the problem by removing the trees that absorb CO₂. Livestock farming, rice cultivation, and landfills release methane, a potent greenhouse gas.",
      },
      {
        heading: "The Greenhouse Effect",
        body: "The greenhouse effect itself is natural and necessary — it keeps Earth warm enough to support life. The problem is the enhanced greenhouse effect: human-made emissions thicken this gas layer, trapping more heat than the planet can handle. Since 1880, average global temperatures have risen by about 1.1°C, with most of that increase happening after 1975.",
      },
      {
        heading: "What Are the Effects?",
        body: "Rising sea levels threaten coastal cities. Extreme weather events — floods, droughts, hurricanes — are becoming more frequent and intense. Melting ice caps reduce habitat for Arctic species. Ocean acidification harms coral reefs. Food and water insecurity affects billions. Climate change amplifies existing inequalities.",
      },
      {
        heading: "Taking Action",
        body: "Shift to plant-based foods — food production accounts for 26% of global emissions. Reduce energy consumption at home. Choose renewable energy providers. Support climate-conscious policies and vote accordingly. Individual choices matter, but systemic change at institutional and government level is essential to meet the 1.5°C target.",
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
        body: "Only 2.5% of Earth's water is fresh, and less than 1% is readily accessible. Billions of people lack access to safe drinking water. As populations grow and climate patterns shift, water scarcity is becoming one of the most critical global challenges. By 2025, two-thirds of the world's population may face water shortages.",
      },
      {
        heading: "The Water Footprint",
        body: "Every product we buy has a hidden water cost. Producing 1 kg of beef requires around 15,000 litres of water. A single cotton T-shirt uses roughly 2,700 litres. Being aware of these invisible costs helps us make more responsible consumption choices.",
      },
      {
        heading: "Simple Conservation Habits",
        body: "Turn off taps while brushing your teeth — this alone saves up to 6 litres per minute. Fix leaking taps — a slow drip can waste 20 litres per day. Take shorter showers. Run dishwashers and washing machines only with full loads. Collect rainwater for gardening. Water plants in the early morning or evening to reduce evaporation.",
      },
      {
        heading: "At School and College",
        body: "Report dripping taps or running toilets to maintenance immediately. Use water fountains instead of bottled water — it also reduces plastic waste. Organise awareness campaigns and water audits. Advocate for rainwater harvesting systems on campus. Every institution can dramatically reduce its water footprint with the right policies.",
      },
    ],
  },
  {
    id: 5,
    icon: Leaf,
    title: "Biodiversity",
    color: "bg-lime-100 text-lime-700",
    tag: "Ecosystems",
    tagColor: "bg-lime-100 text-lime-700",
    summary: "Understand why all living species matter and how to protect them.",
    content: [
      {
        heading: "What is Biodiversity?",
        body: "Biodiversity refers to the variety of life on Earth — the millions of species of plants, animals, fungi, and microorganisms, the ecosystems they form, and the genetic diversity within each species. It is the foundation of all life-support systems on our planet.",
      },
      {
        heading: "Why Does It Matter?",
        body: "Healthy ecosystems clean our air and water, pollinate crops, regulate climate, and provide medicines. Over 70% of cancer drugs are derived from natural sources. Bees pollinate one-third of all food we eat. Losing biodiversity is like removing rivets from an aircraft — eventually, the whole system fails.",
      },
      {
        heading: "The Extinction Crisis",
        body: "We are currently experiencing the sixth mass extinction event in Earth's history — the first driven by a single species: humans. Species are going extinct 1,000 times faster than the natural background rate. Key causes include habitat destruction, pollution, invasive species, overexploitation, and climate change.",
      },
      {
        heading: "What You Can Do",
        body: "Plant native species in gardens or pots. Avoid pesticides. Support wildlife corridors by leaving parts of gardens wild. Choose sustainably sourced food and wood products. Never buy products made from endangered species. Volunteer with local conservation groups. Biodiversity begins in your own backyard.",
      },
    ],
  },
  {
    id: 6,
    icon: Zap,
    title: "Renewable Energy",
    color: "bg-yellow-100 text-yellow-700",
    tag: "Energy",
    tagColor: "bg-yellow-100 text-yellow-700",
    summary: "Explore solar, wind, and other clean energy sources replacing fossil fuels.",
    content: [
      {
        heading: "What is Renewable Energy?",
        body: "Renewable energy comes from sources that naturally replenish themselves — sunlight, wind, flowing water, heat from the Earth, and organic matter. Unlike fossil fuels, they produce little to no greenhouse gas emissions and will never run out. Global renewable capacity is now growing faster than at any point in history.",
      },
      {
        heading: "Types of Renewable Energy",
        body: "Solar panels convert sunlight into electricity. Wind turbines harness the kinetic energy of moving air. Hydropower uses flowing or falling water. Geothermal energy taps heat from inside the Earth. Biomass converts organic waste into energy. Each source has unique advantages depending on geography and climate.",
      },
      {
        heading: "Solar Power for Everyone",
        body: "Solar is now the cheapest source of electricity in history in most parts of the world. Rooftop solar panels can power homes and even feed excess electricity back into the grid. Community solar programmes allow people without rooftops — renters, apartment dwellers — to access solar energy. Schools and colleges with solar installations can save significantly on electricity bills.",
      },
      {
        heading: "Saving Energy at Home and School",
        body: "Switch off lights and appliances when not in use. Use LED bulbs — they use 75% less energy than incandescent bulbs. Insulate buildings properly. Use natural light during the day. Unplug chargers — they draw power even when nothing is connected. Energy efficiency is the fastest and cheapest way to reduce emissions.",
      },
    ],
  },
  {
    id: 7,
    icon: Sprout,
    title: "Sustainable Agriculture",
    color: "bg-emerald-100 text-emerald-700",
    tag: "Food Systems",
    tagColor: "bg-emerald-100 text-emerald-700",
    summary: "Learn how food is grown sustainably and what it means for the planet.",
    content: [
      {
        heading: "The Problem with Industrial Farming",
        body: "Modern industrial agriculture feeds billions but at a steep environmental cost. It is responsible for 26% of global greenhouse gas emissions, uses 70% of the world's fresh water, is the leading cause of deforestation, and has degraded about a third of all agricultural land through overuse of chemical fertilisers and monoculture farming.",
      },
      {
        heading: "What is Sustainable Agriculture?",
        body: "Sustainable agriculture produces food in ways that protect the environment, support farmers, and maintain healthy communities — without compromising the ability of future generations to meet their needs. It includes practices like crop rotation, organic farming, agroforestry, integrated pest management, and water-efficient irrigation.",
      },
      {
        heading: "The Power of What You Eat",
        body: "The food on your plate is one of the most significant environmental decisions you make. Plant-based foods generally have a much lower carbon footprint than animal products. Locally grown, seasonal produce reduces transport emissions. Reducing food waste is also critical — roughly one-third of all food produced globally is lost or wasted.",
      },
      {
        heading: "Urban Farming and School Gardens",
        body: "Rooftop gardens, balcony planters, vertical farms, and school kitchen gardens bring food production closer to communities. They reduce transport emissions, teach students where food comes from, improve nutrition, and reconnect people to the land. Even small urban growing spaces make a difference to biodiversity and mental wellbeing.",
      },
    ],
  },
  {
    id: 8,
    icon: Fish,
    title: "Ocean Health",
    color: "bg-cyan-100 text-cyan-700",
    tag: "Marine Environment",
    tagColor: "bg-cyan-100 text-cyan-700",
    summary: "Explore threats to ocean ecosystems and how to protect marine life.",
    content: [
      {
        heading: "Why Oceans Matter",
        body: "Oceans cover 71% of Earth's surface and contain 97% of all water. They produce over half the oxygen we breathe, absorb about 30% of CO₂ emissions, and regulate global temperature and weather patterns. They support over 2 billion people's protein needs and are home to the majority of Earth's species — most of which we haven't even discovered.",
      },
      {
        heading: "Plastic Pollution in the Ocean",
        body: "Around 8 million tonnes of plastic enter the ocean every year. It breaks down into microplastics — tiny fragments that enter the food chain, accumulating in fish, seabirds, and ultimately humans. There are now five giant garbage patches in the world's oceans. Microplastics have been found in human blood, lungs, and breast milk.",
      },
      {
        heading: "Ocean Acidification and Warming",
        body: "As oceans absorb excess CO₂, they become more acidic — a process that dissolves the shells and skeletons of corals, molluscs, and plankton. Warmer oceans cause coral bleaching: when stressed by heat, corals expel the algae that give them colour and food, turning white. Half of the world's coral reefs have already been lost since 1950.",
      },
      {
        heading: "What You Can Do",
        body: "Refuse single-use plastics — straws, cutlery, bags. Participate in beach or river clean-ups. Choose sustainably certified seafood. Reduce your carbon footprint to slow ocean warming. Support marine protected areas. Avoid buying coral jewellery, shells, or products made from threatened marine species. Every river leads to the sea.",
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06, ease: "easeOut" },
  }),
};

export default function Lessons() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-2">Lessons</h2>
        <p className="text-muted-foreground">
          {lessons.length} topics — click any card to expand and start learning.
        </p>
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
                    <div className="px-6 pb-6 border-t border-border pt-5 grid sm:grid-cols-2 gap-5">
                      {lesson.content.map((section) => (
                        <div key={section.heading} className="space-y-1.5">
                          <h4 className="font-semibold text-foreground text-sm">{section.heading}</h4>
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
