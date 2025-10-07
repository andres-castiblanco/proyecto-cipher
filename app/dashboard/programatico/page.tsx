"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, ArrowRight, Eye } from "lucide-react"

export default function ProgramaticoPage() {
  const router = useRouter()

  const sections = [
    {
      id: "diagnostico",
      title: "Diagnóstico",
      description: "Análisis y diagnóstico general",
      icon: BarChart3,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      subsections: [
        //{ name: "Visor", path: "/dashboard/programatico/diagnostico/visor", icon: Eye },
        { name: "Briefs", path: "/dashboard/programatico/diagnostico/briefs", icon: FileText },
      ],
    },
    {
      id: "propuestas",
      title: "Propuestas",
      description: "Propuestas y recomendaciones",
      icon: FileText,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      subsections: [
        { name: "Visor", path: "/dashboard/programatico/propuestas/visor", icon: Eye },
        { name: "Briefs", path: "/dashboard/programatico/propuestas/briefs", icon: FileText },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Módulo Programático</h1>
          <p className="text-muted-foreground">Diagnósticos y propuestas por ministerios</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const IconComponent = section.icon
          return (
            <Card key={section.id} className="border-2 hover:border-primary/20 transition-all duration-200">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl ${section.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{section.description}</p>
                <div className="space-y-2">
                  {section.subsections.map((subsection) => {
                    const SubIcon = subsection.icon
                    return (
                      <Button
                        key={subsection.name}
                        onClick={() => router.push(subsection.path)}
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <SubIcon className="w-4 h-4" />
                          {subsection.name}
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
