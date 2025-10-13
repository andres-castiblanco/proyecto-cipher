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

      <div className="w-full h-[600px] border rounded-xl overflow-hidden shadow-sm">
        <iframe src="/aprobacion_desaprobacion_petro.html" className="w-full h-full" title="Visor de Encuestas" />
      </div>

      <p className="text-muted-foreground"><b>Metodología de Cálculo: </b>El análisis de las tendencias de aprobación y desaprobación del Presidente Gustavo Petro se basó en datos de encuestas recopiladas a lo largo del tiempo. Se calculó el número de días transcurridos desde la primera encuesta para establecer una base temporal para el modelado. Para analizar las tendencias a largo plazo, se ajustaron modelos de regresión polinómica de grado 4 tanto para la aprobación como para la desaprobación. Estos modelos capturan la forma general de la curva a lo largo del tiempo. Adicionalmente, se emplearon modelos ARIMA (AutoRegressive Integrated Moving Average) con un orden (3,3,3) para generar pronósticos a corto plazo (los próximos 3 meses) basados en la serie temporal de los datos de aprobación y desaprobación. Los resultados de estos modelos (tendencias polinómicas y pronósticos ARIMA) se visualizaron junto con los datos de encuestas reales en un gráfico interactivo para una comprensión completa.</p>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <iframe src="/escandalos_petro.html" className="w-full h-full" title="Visor de Encuestas" />
      </div>

      
      
    </div>
  )
}
