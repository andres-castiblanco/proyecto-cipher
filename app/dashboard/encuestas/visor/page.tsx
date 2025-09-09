"use client"

import { useRouter } from "next/navigation"

export default function EncuestasVisorPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Encuestas - Visor</h1>
          <p className="text-muted-foreground">Visualización de datos de encuestas</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <iframe src="https://es.wikipedia.org/wiki/Brasil" className="w-full h-full" title="Visor de Encuestas" />
      </div>
    </div>
  )
}
