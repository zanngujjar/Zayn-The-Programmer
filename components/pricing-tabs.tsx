"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, ExternalLink } from "lucide-react"

const pricingTiers = {
  basic: {
    name: "Basic",
    description: "Perfect for simple projects and getting started",
    services: [
      {
        title: "Simple Landing Page",
        price: "$299",
        features: ["1-3 Pages", "Responsive Design", "Basic SEO", "3 Revisions", "5 Days Delivery"],
        fiverr: "https://fiverr.com/zayntheprogrammer/basic-website",
      },
      {
        title: "WordPress Website",
        price: "$399",
        features: ["Custom Theme", "Admin Panel", "Plugin Setup", "5 Revisions", "7 Days Delivery"],
        fiverr: "https://fiverr.com/zayntheprogrammer/wordpress-site",
      },
      {
        title: "API Integration",
        price: "$199",
        features: ["Single API", "Basic Documentation", "Error Handling", "2 Revisions", "3 Days Delivery"],
        fiverr: "https://fiverr.com/zayntheprogrammer/api-integration",
      },
    ],
  },
  premium: {
    name: "Premium",
    description: "Advanced solutions for complex requirements",
    popular: true,
    services: [
      {
        title: "Enterprise Application",
        price: "$1,499",
        features: [
          "Custom Architecture",
          "Advanced Features",
          "Third-party Integrations",
          "Performance Optimization",
          "21 Days Delivery",
        ],
        fiverr: "https://fiverr.com/zayntheprogrammer/enterprise-app",
      },
      {
        title: "Mobile App (iOS/Android)",
        price: "$1,299",
        features: [
          "Cross-Platform",
          "Native Performance",
          "App Store Submission",
          "Push Notifications",
          "28 Days Delivery",
        ],
        fiverr: "https://fiverr.com/zayntheprogrammer/mobile-app-premium",
      },
      {
        title: "Full-Stack Solution",
        price: "$1,899",
        features: ["Complete System", "Microservices", "DevOps Setup", "Monitoring & Analytics", "35 Days Delivery"],
        fiverr: "https://fiverr.com/zayntheprogrammer/fullstack-solution",
      },
    ],
  },
}

export function PricingTabs() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 font-playfair">Pricing Packages</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the perfect package for your project needs and budget
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-card rounded-lg p-1 shadow-sm border">
            {Object.entries(pricingTiers).map(([key, tier]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 relative ${
                  activeTab === key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tier.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {Object.entries(pricingTiers).map(([key, tier]) => (
            <div key={key} className={`${activeTab === key ? "block" : "hidden"} space-y-8`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name} Package</h3>
                <p className="text-muted-foreground">{tier.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tier.services.map((service, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl font-semibold mb-2">{service.title}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{service.price}</div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button asChild className="w-full">
                        <a href={service.fiverr} target="_blank" rel="noopener noreferrer">
                          Order Now
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
