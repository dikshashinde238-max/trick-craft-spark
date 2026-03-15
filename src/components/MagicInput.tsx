import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Loader2 } from "lucide-react";

interface MagicInputProps {
  onGenerate: (items: string) => void;
  isLoading: boolean;
}

export const MagicInput = ({ onGenerate, isLoading }: MagicInputProps) => {
  const [items, setItems] = useState("");

  const handleSubmit = () => {
    if (items.trim()) onGenerate(items.trim());
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div className="relative group">
        <input
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="e.g. coin, pen, rubber band"
          className="w-full bg-surface/50 ring-1 ring-border focus:ring-2 focus:ring-primary rounded-2xl px-6 py-4 text-foreground placeholder:text-muted-foreground transition-all outline-none border-none font-body"
        />
        <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={isLoading || !items.trim()}
        className="w-full bg-foreground text-background font-display font-semibold py-4 rounded-2xl hover:opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Consulting the Spirits...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5" />
            Generate Magic Trick
          </>
        )}
      </motion.button>
    </div>
  );
};
