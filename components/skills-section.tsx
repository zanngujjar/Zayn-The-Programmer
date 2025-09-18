"use client"


import { Card, CardContent } from "@/components/ui/card"
import { Code2, Database, Globe, Smartphone, Server, Palette, GitBranch, Shield } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, Next.js, Vue.js, TypeScript, Tailwind CSS",
    color: "text-blue-600",
  },
  {
    icon: Server,
    title: "Backend Development",
    description: "Node.js, Python, Express, FastAPI, REST APIs",
    color: "text-green-600",
  },
  {
    icon: Database,
    title: "Database Design",
    description: "PostgreSQL, MongoDB, Supabase, Prisma ORM",
    color: "text-purple-600",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native, Flutter, iOS & Android apps",
    color: "text-orange-600",
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Full-stack web apps, PWAs, E-commerce sites",
    color: "text-cyan-600",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Adobe XD, Responsive design, User experience",
    color: "text-pink-600",
  },
  {
    icon: GitBranch,
    title: "DevOps & Deployment",
    description: "Vercel, AWS, Docker, CI/CD, Git workflows",
    color: "text-yellow-600",
  },
  {
    icon: Shield,
    title: "Security & Testing",
    description: "Authentication, Testing frameworks, Code security",
    color: "text-red-600",
  },
]

export function SkillsSection() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const { ref, isVisible } = useScrollAnimation(isMobile ? 0.3 : 0.1)

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-playfair">Technical Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Comprehensive skills across the full development stack to bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                ref={ref}
                className={`transform transition-all duration-700 ease-out ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-3 sm:mb-4">
                      <skill.icon
                        className={`h-8 w-8 sm:h-12 sm:w-12 mx-auto ${skill.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2 text-foreground">{skill.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
