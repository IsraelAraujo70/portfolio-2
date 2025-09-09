import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { StackIcon } from 'tech-stack-icons'

type Tech = { key: string; label: string }

// Normaliza os nomes para o pacote `tech-stack-icons`
const TECHNOLOGIES: Tech[] = [
  { key: 'react', label: 'React' },
  { key: 'nextjs2', label: 'Next.js' },
  { key: 'typescript', label: 'TypeScript' },
  { key: 'zod', label: 'Zod' },
  { key: 'tailwindcss', label: 'Tailwind' },
  { key: 'fastapi', label: 'FastAPI' },
  { key: 'postgresql', label: 'PostgreSQL' },
  { key: 'redis', label: 'Redis' },
  { key: 'nodejs', label: 'Node.js' },
  { key: 'php', label: 'PHP' },
  { key: 'laravel', label: 'Laravel' },
  { key: 'golang', label: 'Go' },
  { key: 'python', label: 'Python' },
  { key: 'docker', label: 'Docker' },
  { key: 'linux', label: 'Linux' },
  { key: 'angularjs', label: 'AngularJS' },
  { key: 'css3', label: 'CSS' },
  { key: 'html5', label: 'HTML' },
  { key: 'jquery', label: 'jQuery' },
]

export default function TechCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  )

  const items = [...TECHNOLOGIES, ...TECHNOLOGIES]

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {items.map((tech, index) => (
          <div key={`${tech.key}-${index}`} className="flex-none mr-4">
            <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-lg border border-foreground-tertiary/15 bg-white/5/5 glass-hover">
              <StackIcon name={tech.key as any} className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div className="text-center mt-2">
              <span className="text-xs text-foreground-secondary font-medium">{tech.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
