"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Calendar, ExternalLink } from "lucide-react"

const BRIEFS_DATA = [
  {
    id: 1,
    title: "Encuesta Nacional de Opinión",
    description: "Análisis de tendencias políticas y sociales",
    date: "2024-01-15",
    status: "Completado",
    icon: TrendingUp,
    color: "bg-blue-500",
    url: "https://es.wikipedia.org/wiki/Paraguay",
  },
  {
    id: 2,
    title: "Encuesta de Satisfacción Ciudadana",
    description: "Evaluación de servicios públicos",
    date: "2024-01-10",
    status: "En proceso",
    icon: Users,
    color: "bg-green-500",
    url: "https://es.wikipedia.org/wiki/Uruguay",
  },
  {
    id: 3,
    title: "Encuesta Electoral Preliminar",
    description: "Intención de voto y preferencias",
    date: "2024-01-05",
    status: "Programado",
    icon: Calendar,
    color: "bg-orange-500",
    url: "https://es.wikipedia.org/wiki/Chile",
  },
]

export default function EncuestasBriefsPage() {
  const router = useRouter()

  const handleCardClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Encuestas - Briefs</h1>
          <p className="text-muted-foreground">Informes resumidos de encuestas</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {BRIEFS_DATA.map((brief) => {
          const IconComponent = brief.icon
          return (
            <Card
              key={brief.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group"
              onClick={() => handleCardClick(brief.url)}
            >
              <CardHeader className="pb-3">
                <div
                  className={`w-12 h-12 rounded-lg ${brief.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-sm font-semibold leading-tight flex items-center gap-2">
                  {brief.title}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground">{brief.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {brief.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{brief.date}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
