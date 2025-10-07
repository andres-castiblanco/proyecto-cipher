"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft } from "lucide-react"

const DIAGNOSTICO_PROPUESTAS_DATA = [
  {
    id: 1,
    title: "Agro y desarrollo rural",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/193t6JQqxF1pQ2IQfhxgUCoP4jMClbySG/preview?usp=sharing",
  },
  {
    id: 2,
    title: "Agua, recursos hídricos y residuos sólidos",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1r_6W34RV5U4MYQPVE_H-L4j0oKr5QnmL/preview?usp=sharing",
  },
  {
    id: 3,
    title: "Cultura, patrimonio y deporte",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1oaWnqMX4LbJEeB6fTfMFk95xVgURulGF/preview?usp=sharing",
  },
  {
    id: 4,
    title: "Descentralización económica para el incremento de la productividad",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1pjSsx3BXLTe2bHnvk12v0CYYIIoLRhu2/preview?usp=sharing",
  },
  {
    id: 5,
    title: "Educación",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1NYJ_O0aQ8QTvRPAiTiOC6xv1NNa7C8cS/preview?usp=sharing",
  },
  {
    id: 6,
    title: "Energía",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1NuVN_yjlhF3B_0etV8bki23U6Lgnvg8u/preview?usp=sharing",
  },
  {
    id: 7,
    title: "Finanzas públicas y macroeconomía",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1V0uLaGWXJyNDoR7O5oK4yLtzzhVSXPxf/preview?usp=sharing",
  },
  {
    id: 8,
    title: "Gobierno eficiente, transparencia y lucha contra la corrupción",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1SBZpkACj1zJgr1pg6pTCjEU6QGlQBkyw/preview?usp=sharing",
  },
  {
    id: 9,
    title: "Pobreza, cuidado e inclusión",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1pU_SLpIopmAc8CMx-dQt0y5ujJn6a-VP/preview?usp=sharing",
  },
  {
    id: 10,
    title: "Transporte e infraestructura",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1Vyha9yQBm52ALnvOKt1pTPBlOxvf47p8/preview?usp=sharing",
  },
  {
    id: 11,
    title: "Medioambiente, cambio climático y ordenamiento",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1mFpHQJ8xBPR6WuKjbtcUv4LAMncnom04/preview?usp=sharing",
  },
  {
    id: 12,
    title: "Política exterior",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/12de_l1C8RpjIQAPdpsU3OyaUAb8CgoSp/preview?usp=sharing",
  },
  {
    id: 13,
    title: "Salud",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1JvJwYoNakThmmiTNbim4IAYowv4YHQwq/preview?usp=sharing",
  },
  {
    id: 14,
    title: "Seguridad y defensa",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1HYbpEv7rgCjxeICaCtrP7ygg-CBDIIUX/preview?usp=sharing",
  },
  {
    id: 15,
    title: "TICS - agenda digital",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1f6bHHZQlmTFGt5qdY1yBnPxQ5cNXLBGC/preview?usp=sharing",
  },
  {
    id: 16,
    title: "Turismo",
    description: "Diagnóstico y propuestas",
    url: "https://drive.google.com/file/d/1Fj3X2nU7r92l5cM2JyKklctltIQYt8wT/preview?usp=sharing",
  },
]

export default function DiagnosticoBriefsPage() {
  const router = useRouter()
  const [selectedDocumento, setSelectedDocumento] = useState<(typeof DIAGNOSTICO_PROPUESTAS_DATA)[0] | null>(null)

  const handleCardClick = (documento: (typeof DIAGNOSTICO_PROPUESTAS_DATA)[0]) => {
    setSelectedDocumento(documento)
  }

  const handleBackToList = () => {
    setSelectedDocumento(null)
  }

  if (selectedDocumento) {
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
              
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{selectedDocumento.title}</h1>
              <p className="text-muted-foreground">{selectedDocumento.description}</p>
            </div>
          </div>
          <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
            ← Volver al módulo
          </button>
        </div>

        <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm">
          <iframe
            src={selectedDocumento.url}
            className="w-full h-full"
            title={`Diagnóstico y Propuestas - ${selectedDocumento.title}`}
            allow="autoplay"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Diagnóstico y Propuestas - Briefs</h1>
          <p className="text-muted-foreground">Documentos de diagnóstico y propuestas por sector</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIAGNOSTICO_PROPUESTAS_DATA.map((documento) => (
          <Card
            key={documento.id}
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 group border-2 hover:border-primary/20"
            onClick={() => handleCardClick(documento)}
          >
            <CardHeader className="pb-3">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-sm font-semibold leading-tight">{documento.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{documento.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
