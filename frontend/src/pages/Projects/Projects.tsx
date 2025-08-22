export default function Projects() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 glass glass-hover rounded-2xl p-12 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-[#13E7AB] mb-6">
          Projetos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#e6eef6] mb-3">
              Projeto 1
            </h3>
            <p className="text-[#a7b8c6]">
              Descrição do projeto incrível que foi desenvolvido.
            </p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#e6eef6] mb-3">
              Projeto 2
            </h3>
            <p className="text-[#a7b8c6]">
              Outro projeto fantástico com tecnologias modernas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}