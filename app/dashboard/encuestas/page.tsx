"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, FileText, ArrowRight } from "lucide-react"

export default function EncuestasPage() {
  const router = useRouter()

  const sections = [
    {
      id: "visor",
      title: "Visor de Encuestas",
      description: "Visualización de datos de encuestas",
      icon: Eye,
      color: "bg-purple-500",
      path: "/dashboard/encuestas/visor",
    },
    /*{
      id: "briefs",
      title: "Briefs de Encuestas",
      description: "Informes resumidos de encuestas",
      icon: FileText,
      color: "bg-blue-500",
      path: "/dashboard/encuestas/briefs",
    },*/
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Módulo Encuestas</h1>
          <p className="text-muted-foreground">Análisis y visualización de encuestas</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const IconComponent = section.icon
          return (
            <Card
              key={section.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20"
            >
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl ${section.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{section.description}</p>
                <Button
                  onClick={() => router.push(section.path)}
                  className={`w-full ${section.color} hover:opacity-90 text-white`}
                >
                  Acceder
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
