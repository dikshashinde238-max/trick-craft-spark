import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Wand2, Loader2, Sparkles, BookOpen, ArrowRight, Eye, Clock, Users } from "lucide-react";
import { MagicInput } from "@/components/MagicInput";
import { TrickCard, type TrickData } from "@/components/TrickCard";
import { generateTrick } from "@/lib/magic-ai";
import { SAMPLE_TRICKS } from "@/lib/constants";
import heroImage from "@/assets/hero-magic.jpg";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
};

const STATS = [
  { icon: Wand2, value: "500+", label: "Tricks Generated" },
  { icon: Users, value: "2.4K", label: "Aspiring Magicians" },
  { icon: Clock, value: "~15 min", label: "Avg. Practice Time" },
];

const Home = () => {
  const [trick, setTrick] = useState<TrickData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (items: string) => {
    setIsLoading(true);
    setTrick(null);
    try {
      const result = await generateTrick(items);
      setTrick(result);
    } catch (error) {
      console.error("Failed to generate trick:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero image with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Magician performing a card trick on stage"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/5" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-mono font-bold text-primary bg-primary/10 px-4 py-2 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Magic Tutor
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold text-foreground leading-[0.95] mb-6"
          >
            Master the
            <br />
            <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
              Unseen.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          >
            Enter everyday objects. Receive a professional magic trick
            with step-by-step instructions and performance secrets.
          </motion.p>

          <motion.div variants={fadeUp}>
            <MagicInput onGenerate={handleGenerate} isLoading={isLoading} />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full ring-1 ring-muted-foreground/30 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Generated Trick Result ── */}
      {(isLoading || trick) && (
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto">
            {isLoading && (
              <div className="h-72 bg-surface rounded-2xl shimmer shadow-magic flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
              </div>
            )}
            {trick && !isLoading && <TrickCard trick={trick} />}
          </div>
        </section>
      )}

      {/* ── Stats Bar ── */}
      <section className="py-16 px-6 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto grid grid-cols-3 gap-6"
        >
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="w-5 h-5 text-accent mx-auto mb-3" />
              <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">{value}</div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Featured Tricks Preview ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-mono">
                Collection
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mt-1">
                Popular Tricks
              </h2>
            </div>
            <Link
              to="/discover"
              className="hidden sm:flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SAMPLE_TRICKS.slice(0, 3).map((trick, index) => (
              <motion.div
                key={trick.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link to="/discover" className="block group">
                  <div className="relative bg-surface rounded-2xl p-6 shadow-magic overflow-hidden h-56 flex flex-col justify-end transition-all hover:ring-1 hover:ring-primary/30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/10 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-primary/70 font-mono">
                        Mystery #{String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-display font-bold text-foreground mt-1">{trick.title}</h3>
                      <div className="flex items-center gap-2 mt-3 text-xs font-mono text-muted-foreground">
                        <Eye className="w-3.5 h-3.5" />
                        Tap to reveal
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <Link
            to="/discover"
            className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            View all tricks
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center bg-surface rounded-2xl p-12 sm:p-16 shadow-magic relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 blur-[80px] rounded-full" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Perform?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Every great magician started with a single trick. Enter your items above and let the AI craft your first illusion.
            </p>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-foreground text-background font-display font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-colors"
            >
              <Wand2 className="w-5 h-5" />
              Create Your First Trick
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-foreground">MagicMind</span>
          <span className="text-xs font-mono text-muted-foreground">
            The following sequence creates the illusion of possibility.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
