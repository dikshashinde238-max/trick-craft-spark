import { useState } from "react";
import { motion } from "framer-motion";
import { MagicInput } from "@/components/MagicInput";
import { TrickCard, type TrickData } from "@/components/TrickCard";
import { generateTrick } from "@/lib/magic-ai";

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
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-display font-bold text-foreground mb-4">
            Master the Unseen.
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Enter everyday objects. Receive a professional magic trick with step-by-step instructions.
          </p>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        >
          <MagicInput onGenerate={handleGenerate} isLoading={isLoading} />
        </motion.div>

        {/* Loading shimmer */}
        {isLoading && (
          <div className="mt-10 w-full max-w-2xl mx-auto h-64 bg-surface rounded-2xl shimmer shadow-magic" />
        )}

        {/* Result */}
        {trick && !isLoading && (
          <div className="mt-10">
            <TrickCard trick={trick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
