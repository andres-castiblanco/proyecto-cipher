"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, ArrowRight } from "lucide-react"

export default function DiaDPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Módulo Día D</h1>
          <p className="text-muted-foreground">Monitoreo en tiempo real del día de elecciones</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20">
          <CardHeader className="pb-4">
            <div className="w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-xl font-bold">Visor Día D</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Monitoreo y seguimiento en tiempo real del día de elecciones
            </p>
            <Button
              onClick={() => router.push("/dashboard/dia-d/visor")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              Acceder al Visor
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
