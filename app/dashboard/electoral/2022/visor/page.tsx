"use client"

import { useRouter } from "next/navigation"

export default function Electoral2022VisorPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Elecciones 2022 - Visor</h1>
          <p className="text-muted-foreground">Visualización de datos electorales 2022</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <iframe src="https://app.powerbi.com/view?r=eyJrIjoiM2Y5YzdmMGEtMmI1NS00NDQ5LTgxZDMtZTM1NTNkMTRjNDE3IiwidCI6IjU3N2ZjMWQ4LTA5MjItNDU4ZS04N2JmLWVjNGY0NTVlYjYwMCIsImMiOjR9" className="w-full h-full" title="Elecciones 2022 Visor" />
      </div>
    </div>
  )
}
