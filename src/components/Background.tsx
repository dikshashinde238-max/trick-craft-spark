export const Background = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full animate-pulse-glow" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse-glow" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
  </div>
);
