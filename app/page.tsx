"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Lock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { getCachedUsers } from "@/lib/user-cache" // Import the new cache function

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Verificar si ya está autenticado
    try {
      const currentUser = localStorage.getItem("cipher_user")
      if (currentUser) {
        router.push("/dashboard")
      }
    } catch (error) {
      console.log("localStorage not available or error reading item:", error)
    }
  }, [router, mounted])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simular delay de autenticación
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Cargar usuarios del sistema usando el cache (que fetch de Google Sheets si es necesario)
      const authUsers = await getCachedUsers()

      const user = authUsers[username as keyof typeof authUsers]

      if (!user || user.password !== password) {
        setError("Usuario no autorizado. Contacte al administrador.")
        setIsLoading(false)
        return
      }

      // Guardar usuario en localStorage (solo datos de sesión, no contraseña)
      if (mounted) {
        try {
          localStorage.setItem(
            "cipher_user",
            JSON.stringify({
              username,
              role: user.role,
              name: user.name,
              permissions: user.permissions,
            }),
          )
        } catch (error) {
          console.log("Error saving user to localStorage:", error)
        }
      }

      setIsLoading(false)
      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setError("Error durante el inicio de sesión. Intente nuevamente.")
      setIsLoading(false)
    }
  }

  // Mostrar loading mientras se monta el componente
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Proyecto Cipher</CardTitle>
            <CardDescription className="text-base">Ingrese sus credenciales para acceder al sistema</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Usuario
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="animate-fade-in">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full h-11 font-medium" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </div>
              ) : (
                "Ingresar"
              )}
            </Button>
          </form>

          <div className="text-center pt-6 border-t">
            <p className="text-sm font-medium text-muted-foreground">
              Sistema seguro de autenticación • Proyecto Cipher v1.0
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
