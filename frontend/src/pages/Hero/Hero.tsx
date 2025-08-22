export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Glass Card */}
      <div className="relative z-10 glass glass-hover rounded-2xl p-12 max-w-md text-center">
        <h1 className="text-4xl font-bold text-[#e6eef6] mb-4">
          Oi! 👋
        </h1>
        <p className="text-[#a7b8c6]">
          Bem-vindo ao meu portfólio com glassmorphism
        </p>
        
        {/* Decorative floating elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/10 rounded-lg backdrop-blur-sm border border-blue-500/20 animate-float" />
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500/10 rounded-lg backdrop-blur-sm border border-blue-500/20 animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}