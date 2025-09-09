"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Vote, Settings, ArrowRight, PieChart, Calendar, FileSignature, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface User {
  username: string
  role: string
  name: string
  permissions: {
    userManagement: boolean
    programatico: boolean
    electoral: boolean
    encuestas: boolean
    candidatos: boolean
    diaD: boolean
    firmas: boolean
  }
}

export default function DashboardHome() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadUser = () => {
      try {
        const userData = localStorage.getItem("cipher_user")
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
        } else {
          // Si no hay usuario, redirigir al login
          router.push("/")
          return
        }
      } catch (error) {
        console.error("Error loading user data:", error)
        // En caso de error, redirigir al login
        router.push("/")
        return
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [router, mounted])

  // Mostrar loading mientras se carga
  if (!mounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Si no hay usuario después de cargar, mostrar mensaje
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Settings className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Sesión no válida</h3>
            <p className="text-muted-foreground">Por favor, inicia sesión nuevamente.</p>
            <Button onClick={() => router.push("/")} className="mt-4">
              Ir al Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const modules = [
    {
      id: "programatico",
      title: "Módulo Programático",
      description: "Diagnósticos y propuestas por ministerios",
      icon: BarChart3,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      onClick: () => router.push("/dashboard/programatico"),
      permission: "programatico",
    },
    {
      id: "electoral",
      title: "Módulo Electoral",
      description: "Análisis electoral 2018 y 2022",
      icon: Vote,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      onClick: () => router.push("/dashboard/electoral"),
      permission: "electoral",
    },
    {
      id: "encuestas",
      title: "Módulo Encuestas",
      description: "Análisis y visualización de encuestas",
      icon: PieChart,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      onClick: () => router.push("/dashboard/encuestas"),
      permission: "encuestas",
    },
    {
      id: "candidatos",
      title: "Módulo Candidatos",
      description: "Información de candidatos relevantes",
      icon: Users,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      onClick: () => router.push("/dashboard/candidatos"),
      permission: "candidatos",
    },
    {
      id: "diaD",
      title: "Módulo Día D",
      description: "Monitoreo en tiempo real",
      icon: Calendar,
      color: "bg-orange-500",
      hoverColor: "hover:bg-orange-600",
      onClick: () => router.push("/dashboard/dia-d"),
      permission: "diaD",
    },
    {
      id: "firmas",
      title: "Módulo Firmas",
      description: "Gestión y análisis de firmas",
      icon: FileSignature,
      color: "bg-indigo-500",
      hoverColor: "hover:bg-indigo-600",
      onClick: () => router.push("/dashboard/firmas"),
      permission: "firmas",
    },
    {
      id: "admin",
      title: "Administración",
      description: "Gestión de usuarios y permisos",
      icon: Settings,
      color: "bg-slate-600",
      hoverColor: "hover:bg-slate-700",
      onClick: () => router.push("/dashboard/admin"),
      permission: "userManagement",
    },
  ]

  // Filtrar módulos según permisos del usuario
  const availableModules = modules.filter(
    (module) => user.permissions[module.permission as keyof typeof user.permissions],
  )

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Panel Principal</h1>
        <p className="text-muted-foreground text-lg">
          Bienvenido, <span className="font-medium">{user.name}</span>. Seleccione un módulo para comenzar.
        </p>
      </div>

      {availableModules.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableModules.map((module) => {
            const IconComponent = module.icon
            return (
              <Card
                key={module.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">{module.description}</p>
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      module.onClick()
                    }}
                    className={`w-full ${module.color} ${module.hoverColor} text-white font-medium transition-all duration-200`}
                  >
                    Acceder
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Sin módulos disponibles</h3>
          <p className="text-muted-foreground">
            No tienes permisos para acceder a ningún módulo. Contacta al administrador.
          </p>
        </div>
      )}
    </div>
  )
}
