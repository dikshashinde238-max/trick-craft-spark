import type { TrickData } from "@/components/TrickCard";

const SYSTEM_PROMPT = `You are a professional stage magician. You create sophisticated magic tricks using only everyday household items.
Your instructions are clear, professional, and emphasize "The Reveal."

Format your response as a JSON object:
{
  "name": "Trick Name",
  "items": ["item 1", "item 2"],
  "script": "The performance narrative...",
  "steps": ["Step 1...", "Step 2..."],
  "secret": "The hidden mechanism...",
  "tips": ["Pro tip 1", "Pro tip 2"]
}

Respond ONLY with the JSON object, no other text.`;

export async function generateTrick(items: string): Promise<TrickData> {
  // Mock AI response for demo — replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const mockTricks: Record<string, TrickData> = {
    default: {
      name: "The Impossible Transfer",
      items: items.split(",").map((s) => s.trim()),
      script:
        "Ladies and gentlemen, what you are about to witness defies the laws of physics. I hold in my hand ordinary objects — yet they are about to do something extraordinary.",
      steps: [
        "Present the items to the audience, allowing them to inspect each one.",
        "Place the primary object in your left hand, closing your fist around it.",
        "Wave your right hand over the left in a slow circular motion.",
        "Execute the classic palm transfer during the gesture.",
        "Open your left hand — the object has vanished.",
        "Reveal the object in an unexpected location for maximum impact.",
      ],
      secret:
        "The transfer happens during the circular wave motion. Your right hand passes over the left at a 45-degree angle, allowing a natural finger-palm pickup. The audience focuses on the waving motion, not the contact point.",
      tips: [
        "Practice the transfer 200 times before performing. Muscle memory is the real magic.",
        "Maintain eye contact with the audience during the transfer — they follow your gaze, not your hands.",
        "Use a verbal cue ('Watch closely...') right before the move to heighten misdirection.",
      ],
    },
  };

  return mockTricks.default;
}

export { SYSTEM_PROMPT };
