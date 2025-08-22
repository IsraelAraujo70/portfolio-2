export default function Skills() {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", 
    "PostgreSQL", "Docker", "AWS", "Tailwind CSS"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative z-10 glass glass-hover rounded-2xl p-12 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-[#13E7AB] mb-8">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div 
              key={skill}
              className="glass rounded-lg p-4 hover:scale-105 transition-transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="text-[#e6eef6] font-medium">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}