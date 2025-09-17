"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Clock, Star, Users } from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const services = [
  {
    title: "Custom Desktop App Development",
    description:
      "Professional, responsive static Desktop App built with modern technologies. Perfect for internal businesses opperations, Personal use, and more.",
    image: "/AmazonS1.png",
    price: "Starting at $40",
    duration: "3-5 days",
    rating: "5.0",
    orders: "15+",
    features: ["Responsive Design", "Fast Loading", "Desktop-First"],
    fiverr: "https://www.fiverr.com/zayn_programmer/create-a-custom-desktop-application-cross-compatible-with-windows-macos-linux?context_referrer=seller_page&ref_ctx_id=e05b77b6982a440b9a7ca7bd47844ff9&pckg_id=1&pos=1&seller_online=true&imp_id=7e8179d6-2435-478f-9457-c9f34e0ad82f",
    popular: true,
  },
  {
    title: "Custom Full-Stack Desktop App Development",
    description:
      "Professional, responsive full-stack Desktop App built with modern technologies. Perfect for User based applications, Business applications, and more.",
    image: "/tradingterminal1.png",
    price: "Starting at $80",
    duration: "7-10 days",
    rating: "5.0",
    orders: "5+",
    features: ["Responsive Design", "Fast Loading", "Desktop-First", "Full-Stack", "Database Management"],
    fiverr: "https://www.fiverr.com/zayn_programmer/create-a-custom-desktop-application-cross-compatible-with-windows-macos-linux?context_referrer=seller_page&ref_ctx_id=e05b77b6982a440b9a7ca7bd47844ff9&pckg_id=2&pos=1&seller_online=true&imp_id=7e8179d6-2435-478f-9457-c9f34e0ad82f ",
    popular: false,
  },
  {
    title: "Custom Full-Stack Desktop App Development(Paymment Intergration)",
    description:
      "Professional, responsive full-stack Desktop App built with modern technologies and payment intergration. Perfect for Production ready applications, Business applications, and more.",
    image: "/tradingterminal2.png",
    price: "Starting at $100",
    duration: "10-14 days",
    rating: "5.0",
    orders: "2+",
    features: ["Responsive Design", "Fast Loading", "Desktop-First", "Full-Stack", "Database Management", "Payment Intergration", "Production Ready"],
    fiverr: "https://www.fiverr.com/zayn_programmer/create-a-custom-desktop-application-cross-compatible-with-windows-macos-linux?context_referrer=seller_page&ref_ctx_id=e05b77b6982a440b9a7ca7bd47844ff9&pckg_id=3&pos=1&seller_online=true&imp_id=7e8179d6-2435-478f-9457-c9f34e0ad82f",
    popular: true,
  },
 
]

export function ServicesList() {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <section id="services-list" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-playfair">Available Services</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Professional development services with transparent pricing and guaranteed quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={ref}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`transform transition-all duration-700 ease-out ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden relative h-full">
                {service.popular && (
                  <Badge className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground">Popular</Badge>
                )}

                <div className="relative overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold text-foreground mb-2">{service.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{service.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{service.orders} orders</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>

                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded text-center"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-primary">{service.price}</span>
                  </div>

                  <Button asChild className="w-full">
                    <a href={service.fiverr} target="_blank" rel="noopener noreferrer">
                      Order on Fiverr
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
