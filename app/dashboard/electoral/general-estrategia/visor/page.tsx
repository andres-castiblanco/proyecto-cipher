"use client"

import { useRouter } from "next/navigation"

export default function GeneralEstrategiaVisorPage() {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">General y Estrategia - Visor</h1>
                    <p className="text-muted-foreground">Visualización de datos generales y estratégicos</p>
                </div>
                <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
                    ← Volver
                </button>
            </div>

            <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
                <iframe src="https://es.wikipedia.org/wiki/Colombia" className="w-full h-full" title="General y Estrategia Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-lg overflow-hidden hidden">
                <iframe src="https://observablehq.com/embed/aa52c58ca438f421?cells=viewof+chart" className="w-full h-full" title="Elecciones 2022 Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm hidden">
                <iframe src="https://estadisticaselectorales.registraduria.gov.co/unit?str_opc=Elecciones%20Presidenciales%20Primera%20Vuelta&idFilter=1&filter=PRESIDENCIALES&t=&y1=2016&i1=5&y2=&i2=-" className="w-full h-full" title="Elecciones 2018 Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-lg overflow-hidden hidden">
                <iframe src="https://andres-castiblanco.github.io/Elecciones/#11/4.5485/-74.1327" className="w-full h-full" title="Elecciones 2018 Visor" />
            </div>

            <div className="w-full h-[600px] border rounded-lg overflow-hidden">
                <iframe src="https://app.powerbi.com/view?r=eyJrIjoiMDFmY2I3YTctZTMyNC00YTZlLWIzMzQtZjYwZGExYzc4Mzk5IiwidCI6IjU3N2ZjMWQ4LTA5MjItNDU4ZS04N2JmLWVjNGY0NTVlYjYwMCIsImMiOjR9&pageName=23935a387055b72e3270" className="w-full h-full" title="General y Estrategia Visor" />
            </div>

        </div>
    )
}
