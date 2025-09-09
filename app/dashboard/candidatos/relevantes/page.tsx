"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, ExternalLink, ArrowLeft } from "lucide-react"

const CANDIDATOS_DATA = [
  {
    id: 1,
    title: "Candidato 1",
    description: "Información detallada del candidato 1",
    url: "https://es.wikipedia.org/wiki/Argentina",
  },
  {
    id: 2,
    title: "Candidato 2",
    description: "Información detallada del candidato 2",
    url: "https://es.wikipedia.org/wiki/Costa_Rica",
  },
  {
    id: 3,
    title: "Candidato 3",
    description: "Información detallada del candidato 3",
    url: "https://es.wikipedia.org/wiki/Nicaragua",
  },
  {
    id: 4,
    title: "Candidato 4",
    description: "Información detallada del candidato 4",
    url: "https://es.wikipedia.org/wiki/Honduras",
  },
  {
    id: 5,
    title: "Candidato 5",
    description: "Información detallada del candidato 5",
    url: "https://es.wikipedia.org/wiki/El_Salvador",
  },
]

export default function CandidatosRelevantesPage() {
  const router = useRouter()
  const [selectedCandidato, setSelectedCandidato] = useState<(typeof CANDIDATOS_DATA)[0] | null>(null)

  const handleCardClick = (candidato: (typeof CANDIDATOS_DATA)[0]) => {
    setSelectedCandidato(candidato)
  }

  const handleBackToList = () => {
    setSelectedCandidato(null)
  }

  if (selectedCandidato) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToList}
              className="flex items-center gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a la lista
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{selectedCandidato.title}</h1>
              <p className="text-muted-foreground">{selectedCandidato.description}</p>
            </div>
          </div>
          <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
            ← Volver al módulo
          </button>
        </div>

        <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm">
          <iframe
            src={selectedCandidato.url}
            className="w-full h-full"
            title={`Información de ${selectedCandidato.title}`}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Candidatos Relevantes</h1>
          <p className="text-muted-foreground">Información de candidatos destacados</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CANDIDATOS_DATA.map((candidato) => (
          <Card
            key={candidato.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group border-2 hover:border-primary/20"
            onClick={() => handleCardClick(candidato)}
          >
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold leading-tight flex items-center gap-2">
                {candidato.title}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{candidato.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
