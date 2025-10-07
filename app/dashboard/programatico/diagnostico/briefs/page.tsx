"use client"

import { useRouter } from "next/navigation"

export default function DiagnosticoBriefsPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Diagnóstico - Briefs</h1>
          <p className="text-muted-foreground">Informes resumidos de diagnóstico</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

     {/* <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <iframe src="https://es.wikipedia.org/wiki/Venezuela" className="w-full h-full" title="Diagnóstico Briefs" />
      </div> */}

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Agua, recursos hídricos y residuos sólidos</h1>
        <iframe src="https://drive.google.com/file/d/1r_6W34RV5U4MYQPVE_H-L4j0oKr5QnmL/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Agro y desarrollo rural</h1>
        <iframe src="https://drive.google.com/file/d/193t6JQqxF1pQ2IQfhxgUCoP4jMClbySG/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Cultura, patrimonio y deporte</h1>
        <iframe src="https://drive.google.com/file/d/1oaWnqMX4LbJEeB6fTfMFk95xVgURulGF/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div> 

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Descentralización económica para el incremento de la productividad</h1>
        <iframe src="https://drive.google.com/file/d/1pjSsx3BXLTe2bHnvk12v0CYYIIoLRhu2/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div> 

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Educación</h1>
        <iframe src="https://drive.google.com/file/d/1NYJ_O0aQ8QTvRPAiTiOC6xv1NNa7C8cS/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Energía</h1>
        <iframe src="https://drive.google.com/file/d/1NuVN_yjlhF3B_0etV8bki23U6Lgnvg8u/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Finanzas públicas y macroeconomía</h1>
        <iframe src="https://drive.google.com/file/d/1V0uLaGWXJyNDoR7O5oK4yLtzzhVSXPxf/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Gobierno eficiente, transparencia y lucha contra la corrupción</h1>
        <iframe src="https://drive.google.com/file/d/1SBZpkACj1zJgr1pg6pTCjEU6QGlQBkyw/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Pobreza, cuidado e inclusión</h1>
        <iframe src="https://drive.google.com/file/d/1pU_SLpIopmAc8CMx-dQt0y5ujJn6a-VP/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Transporte e infraestructura</h1>
        <iframe src="https://drive.google.com/file/d/1Vyha9yQBm52ALnvOKt1pTPBlOxvf47p8/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Medioambiente, cambio climático y ordenamiento</h1>
        <iframe src="https://drive.google.com/file/d/1mFpHQJ8xBPR6WuKjbtcUv4LAMncnom04/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Política exterior</h1>
        <iframe src="https://drive.google.com/file/d/12de_l1C8RpjIQAPdpsU3OyaUAb8CgoSp/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Salud</h1>
        <iframe src="https://drive.google.com/file/d/1JvJwYoNakThmmiTNbim4IAYowv4YHQwq/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Seguridad y defensa</h1>
        <iframe src="https://drive.google.com/file/d/1HYbpEv7rgCjxeICaCtrP7ygg-CBDIIUX/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">TICS - agenda digital</h1>
        <iframe src="https://drive.google.com/file/d/1f6bHHZQlmTFGt5qdY1yBnPxQ5cNXLBGC/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

      <div className="w-full h-[600px] border rounded-lg overflow-hidden">
        <h1 className="text-3xl font-bold text-center p-4">Turismo</h1>
        <iframe src="https://drive.google.com/file/d/1Fj3X2nU7r92l5cM2JyKklctltIQYt8wT/preview?usp=sharing" className="w-full h-full" title="Diagnóstico Briefs" />
      </div>

    </div>
  )
}
