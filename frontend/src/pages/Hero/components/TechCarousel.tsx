import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const technologies = [
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000000" },
  { name: "Python", color: "#3776AB" },
  { name: "PHP", color: "#777BB4" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Angular", color: "#DD0031" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Node.js", color: "#339933" },
  { name: "Docker", color: "#2496ED" },
];

export default function TechCarousel() {
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {[...technologies, ...technologies].map((tech, index) => (
          <div key={index} className="flex-none mr-4">
            <div 
              className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              style={{ borderColor: `${tech.color}20` }}
            >
              <div 
                className="w-6 h-6 md:w-7 md:h-7 rounded flex items-center justify-center font-bold text-xs"
                style={{ 
                  backgroundColor: `${tech.color}15`,
                  color: tech.color,
                  border: `1px solid ${tech.color}30`
                }}
              >
                {tech.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-foreground-secondary font-medium">
                {tech.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}