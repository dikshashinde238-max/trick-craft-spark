import { useState } from "react";
import { motion } from "framer-motion";

interface FlipCardTrick {
  title: string;
  items: string;
  description: string;
  steps: string[];
  tip: string;
}

interface FlipCardProps {
  trick: FlipCardTrick;
  index: number;
}

export const FlipCard = ({ trick, index }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="relative h-[420px] w-full cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full transform-style-3d"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-surface rounded-2xl p-8 flex flex-col justify-end shadow-magic overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-primary/15 to-transparent" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-mono relative z-10 mb-2">
            Mystery #{String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl font-display font-bold text-foreground relative z-10">{trick.title}</h3>
          <p className="text-muted-foreground text-sm relative z-10 mt-2">Tap to reveal the secret</p>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden bg-foreground rounded-2xl p-8 flex flex-col rotateY-180 shadow-magic overflow-y-auto">
          <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-mono mb-2">The Secret</span>
          <h3 className="text-xl font-display font-bold text-background mb-4">{trick.title}</h3>
          <div className="space-y-4 text-sm leading-relaxed text-background/70">
            <p><strong className="text-background">Items:</strong> {trick.items}</p>
            <p>{trick.description}</p>
            <div className="space-y-1">
              <strong className="text-background text-xs uppercase tracking-widest font-mono">Steps:</strong>
              <ol className="space-y-1 ml-1">
                {trick.steps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-mono text-primary font-bold shrink-0">{i + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="bg-background/10 p-4 rounded-xl italic text-background/60">
              "Pro Tip: {trick.tip}"
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
