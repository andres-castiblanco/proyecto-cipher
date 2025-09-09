"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"

interface User {
  username: string
  role: string
  name: string
  permissions: {
    userManagement: boolean
    programatico: boolean
    electoral: boolean
    diagnostico: boolean
    propuestas: boolean
    encuestas: boolean
    diaD: boolean
    firmas: boolean
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const loadUserData = async () => {
      try {
        // Pequeño delay para asegurar que el DOM esté listo
        await new Promise((resolve) => setTimeout(resolve, 100))

        const currentUser = localStorage.getItem("cipher_user")
        if (!currentUser) {
          router.push("/")
          return
        }

        const userData = JSON.parse(currentUser)
        if (!userData || !userData.username) {
          localStorage.removeItem("cipher_user")
          router.push("/")
          return
        }

        setUser(userData)
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("cipher_user")
        router.push("/")
        return
      } finally {
        setIsLoading(false)
      }
    }

    loadUserData()
  }, [router, mounted])

  const handleLogout = () => {
    try {
      localStorage.removeItem("cipher_user")
    } catch (error) {
      console.log("Error removing user data:", error)
    }
    router.push("/")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Mostrar loading mientras se monta o carga
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario válido, no renderizar nada (el useEffect se encargará de redirigir)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header fijo en la parte superior */}
      <DashboardHeader user={user} onLogout={handleLogout} onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      {/* Contenedor principal debajo del header */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar fijo a la izquierda */}
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-sidebar border-r transition-all duration-300 ease-in-out z-30 ${
            sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full"
          } lg:${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <AppSidebar user={user} />
        </div>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Contenido principal */}
        <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
          <div className="container mx-auto p-4 lg:p-6 max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
