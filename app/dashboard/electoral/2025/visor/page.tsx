"use client"

import { useRouter } from "next/navigation"

export default function Electoral2025VisorPage() {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Elecciones 2025 - Visor</h1>
                    <p className="text-muted-foreground">Visualización de datos electorales 2025</p>
                </div>
                <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
                    ← Volver
                </button>
            </div>

            <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
                <iframe src="https://es.wikipedia.org/wiki/Colombia" className="w-full h-full" title="Elecciones 2025 Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe src="https://flo.uri.sh/visualisation/25941310/embed" className="w-full h-full" title="Elecciones 2025 Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe src="https://flo.uri.sh/visualisation/25898504/embed" className="w-full h-full" title="Elecciones 2025 Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe src="https://flo.uri.sh/visualisation/25896671/embed" className="w-full h-full" title="Elecciones 2025 Visor" />
            </div>

        </div>
    )
}
