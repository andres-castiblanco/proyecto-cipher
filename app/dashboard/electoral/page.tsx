"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Vote, Calendar, ArrowRight, Eye, FileText } from "lucide-react"

export default function ElectoralPage() {
  const router = useRouter()

  const elections = [
    {
      id: "2018",
      title: "Elecciones 2018",
      description: "Análisis electoral y resultados 2018",
      icon: Vote,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      subsections: [
        { name: "Visor", path: "/dashboard/electoral/2018/visor", icon: Eye },
        { name: "Briefs", path: "/dashboard/electoral/2018/briefs", icon: FileText },
      ],
    },
    {
      id: "2022",
      title: "Elecciones 2022",
      description: "Análisis electoral y resultados 2022",
      icon: Calendar,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      subsections: [
        { name: "Visor", path: "/dashboard/electoral/2022/visor", icon: Eye },
        { name: "Briefs", path: "/dashboard/electoral/2022/briefs", icon: FileText },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Módulo Electoral</h1>
          <p className="text-muted-foreground">Análisis electoral 2018 y 2022</p>
        </div>
        <button onClick={() => router.back()} className="text-sm text-muted-foreground hover:text-foreground">
          ← Volver
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {elections.map((election) => {
          const IconComponent = election.icon
          return (
            <Card key={election.id} className="border-2 hover:border-primary/20 transition-all duration-200">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-xl ${election.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{election.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{election.description}</p>
                <div className="space-y-2">
                  {election.subsections.map((subsection) => {
                    const SubIcon = subsection.icon
                    return (
                      <Button
                        key={subsection.name}
                        onClick={() => router.push(subsection.path)}
                        variant="outline"
                        className="w-full justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <SubIcon className="w-4 h-4" />
                          {subsection.name}
                        </div>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
