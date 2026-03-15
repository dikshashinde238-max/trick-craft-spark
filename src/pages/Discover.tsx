import { motion } from "framer-motion";
import { FlipCard } from "@/components/FlipCard";
import { SAMPLE_TRICKS } from "@/lib/constants";

const Discover = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mb-10"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-mono">
            Collection
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-foreground mt-1">
            Popular Tricks
          </h1>
          <p className="text-muted-foreground mt-2 max-w-lg">
            Each card holds a secret. Tap to reveal the method behind the mystery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_TRICKS.map((trick, index) => (
            <FlipCard key={trick.title} trick={trick} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
