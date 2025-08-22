export default function Contact() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 glass glass-hover rounded-2xl p-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-[#13E7AB] mb-6">
          Contato
        </h2>
        <p className="text-[#a7b8c6] text-lg mb-8">
          Vamos conversar sobre seu próximo projeto!
        </p>
        <div className="space-y-4">
          <a 
            href="mailto:contato@exemplo.com"
            className="block glass-button rounded-xl px-6 py-3 text-[#e6eef6] hover:scale-105 transition-transform"
          >
            Email
          </a>
          <a 
            href="https://linkedin.com"
            className="block glass-button rounded-xl px-6 py-3 text-[#e6eef6] hover:scale-105 transition-transform"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com"
            className="block glass-button rounded-xl px-6 py-3 text-[#e6eef6] hover:scale-105 transition-transform"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}