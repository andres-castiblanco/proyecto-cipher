"use client"

import { useRouter } from "next/navigation"

export default function Electoral2016VisorPage() {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Elecciones 2016 - Visor</h1>
                    <p className="text-muted-foreground">Visualización de datos electorales 2016</p>
                </div>
                <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
                    ← Volver
                </button>
            </div>

            <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm">
                <iframe src="https://johnguerra.co/viz/resultadosPlebiscito/" className="w-full h-full" title="Elecciones 2016 Visor" />
            </div>

        </div>
    )
}
