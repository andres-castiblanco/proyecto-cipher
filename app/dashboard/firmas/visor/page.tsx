"use client"

import { useRouter } from "next/navigation"

export default function FirmasVisorPage() {
  const router = useRouter()

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Firmas - Visor</h1>
          <p className="text-muted-foreground text-lg">Gestión y análisis de firmas digitales</p>
        </div>
        <button
          onClick={() => router.back()}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Volver
        </button>
      </div>

      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
        <iframe src="https://es.wikipedia.org/wiki/México" className="w-full h-full" title="Visor de Firmas" />
      </div> 

      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
      <iframe src="https://app.powerbi.com/view?r=eyJrIjoiNzE3YWNlY2ItZjY4Zi00NzFiLThjODQtNDc1NDk4NDNjOGI1IiwidCI6ImVkNDlmZTlhLTZlZWEtNDdlNi1iZjUyLWVlOWVjYjVkYTgwNyJ9&pageName=ReportSection7d46bd06776984c3f9f2&disablecdnExpiration=1750965030" className="w-full h-full" title="Visor de Firmas" />
      </div>

      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
      <iframe src="https://andres-castiblanco.github.io/SF-2022/" className="w-full h-full" title="Visor de Firmas" />
      </div>

      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
      <iframe src="https://andres-castiblanco.github.io/Mapa_JRS_Movilizacion/" className="w-full h-full" title="Visor de Firmas" />
      </div>
      
      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
      <iframe src="https://lookerstudio.google.com/embed/reporting/357d3449-ff70-409e-ae38-7eef4a65a4d7" className="w-full h-full" title="Visor de Firmas" />
      </div>
      
      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm">
      <iframe src="https://lookerstudio.google.com/embed/reporting/6e56f3b1-4a55-4e1c-b7ea-3c00c735f0f9" className="w-full h-full" title="Visor de Firmas" />
      </div>
      
    </div>
  )
}
