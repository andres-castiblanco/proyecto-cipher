"use client"

import { useRouter } from "next/navigation"

export default function DiaDVisorPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Día D - Visor</h1>
          <p className="text-muted-foreground">Monitoreo en tiempo real del día de elecciones</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <iframe src="https://es.wikipedia.org/wiki/Guatemala" className="w-full h-full" title="Visor Día D" />
      </div>
    </div>
  )
}
