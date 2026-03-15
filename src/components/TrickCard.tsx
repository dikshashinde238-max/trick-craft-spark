import { motion } from "framer-motion";
import { Copy, Share2, BookmarkPlus, Check } from "lucide-react";
import { useState } from "react";

export interface TrickData {
  name: string;
  items: string[];
  script: string;
  steps: string[];
  secret: string;
  tips: string[];
}

interface TrickCardProps {
  trick: TrickData;
}

export const TrickCard = ({ trick }: TrickCardProps) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    const text = `${trick.name}\n\nItems: ${trick.items.join(", ")}\n\nScript: ${trick.script}\n\nSteps:\n${trick.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nSecret: ${trick.secret}\n\nTips:\n${trick.tips.map((t) => `• ${t}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: trick.name, text: `Check out this magic trick: ${trick.name}` });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-full max-w-2xl mx-auto bg-surface rounded-2xl shadow-magic overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 pt-8 pb-4">
        <span className="text-[10px] uppercase tracking-widest font-bold text-primary font-mono">The Trick</span>
        <h2 className="text-2xl font-display font-bold text-foreground mt-1">{trick.name}</h2>
        <div className="flex gap-2 mt-3 flex-wrap">
          {trick.items.map((item) => (
            <span key={item} className="text-xs font-mono bg-secondary text-muted-foreground px-3 py-1 rounded-full">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Script */}
      <div className="px-8 py-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-gold font-mono mb-2">Performance Script</h3>
        <p className="text-muted-foreground text-sm leading-relaxed italic">"{trick.script}"</p>
      </div>

      {/* Steps */}
      <div className="px-8 py-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-gold font-mono mb-3">Steps</h3>
        <ol className="space-y-2">
          {trick.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span className="font-mono text-primary font-bold shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-foreground/80">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Secret */}
      <div className="px-8 py-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-primary font-mono mb-2">The Secret</h3>
        <p className="text-muted-foreground text-sm leading-relaxed font-mono bg-secondary/50 p-4 rounded-xl">{trick.secret}</p>
      </div>

      {/* Tips */}
      <div className="px-8 py-4">
        <h3 className="text-xs uppercase tracking-widest font-bold text-gold font-mono mb-2">Pro Tips</h3>
        <ul className="space-y-1">
          {trick.tips.map((tip, i) => (
            <li key={i} className="text-sm text-muted-foreground flex gap-2">
              <span className="text-accent">•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="px-8 py-5 flex gap-3 border-t border-border">
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleCopy} className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied" : "Copy"}
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={handleShare} className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          <Share2 className="w-4 h-4" />
          Share
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => setSaved(!saved)} className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors">
          <BookmarkPlus className={`w-4 h-4 ${saved ? "text-accent fill-accent" : ""}`} />
          {saved ? "Saved" : "Save"}
        </motion.button>
      </div>
    </motion.div>
  );
};
