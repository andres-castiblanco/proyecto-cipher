"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Plus, Edit, Trash2, Eye, EyeOff, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { getCachedUsers, invalidateUserCache, updateLocalUserCache } from "@/lib/user-cache" // Import cache functions
import type { User } from "@/lib/google-sheets" // Import User type

// Definir todos los módulos disponibles
const AVAILABLE_MODULES = [
  { key: "userManagement", label: "Gestión de Usuarios", description: "Administrar usuarios y permisos" },
  { key: "programatico", label: "Programático", description: "Acceso al módulo programático" },
  { key: "electoral", label: "Electoral", description: "Análisis electoral y elecciones" },
  { key: "encuestas", label: "Encuestas", description: "Análisis y visualización de encuestas" },
  { key: "candidatos", label: "Candidatos", description: "Información de candidatos relevantes" },
  { key: "diaD", label: "Día D", description: "Monitoreo en tiempo real" },
  { key: "firmas", label: "Firmas", description: "Gestión y análisis de firmas" },
]

const USERS_PER_PAGE = 10

export default function AdminPage() {
  const [users, setUsers] = useState<Record<string, User>>({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoadingUsers, setIsLoadingUsers] = useState(true) // Set to true initially
  const [currentPage, setCurrentPage] = useState(1)
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    role: "user",
    name: "",
    permissions: {
      userManagement: false,
      programatico: false,
      electoral: false,
      encuestas: false,
      candidatos: false,
      diaD: false,
      firmas: false,
    },
  })
  const router = useRouter()

  const fetchUsers = useCallback(async () => {
    setIsLoadingUsers(true)
    try {
      const fetchedUsers = await getCachedUsers()
      setUsers(fetchedUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
      // Optionally show an error message to the user
    } finally {
      setIsLoadingUsers(false)
    }
  }, [])

  useEffect(() => {
    const userData = localStorage.getItem("cipher_user")
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)

      if (!user.permissions.userManagement) {
        router.push("/dashboard")
        return
      }
    } else {
      // If no user data in localStorage, redirect to login
      router.push("/")
      return
    }

    fetchUsers()
  }, [router, fetchUsers])

  // Calcular usuarios paginados
  const usersList = Object.values(users)
  const totalUsers = usersList.length
  const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE)
  const startIndex = (currentPage - 1) * USERS_PER_PAGE
  const endIndex = startIndex + USERS_PER_PAGE
  const paginatedUsers = usersList.slice(startIndex, endIndex)

  const handleLoadFromGoogleSheets = async () => {
    setIsLoadingUsers(true)
    try {
      invalidateUserCache() // Invalidate cache to force a fresh fetch
      const googleUsers = await getCachedUsers() // This will now fetch from Google Sheets
      setUsers(googleUsers)
      // Resetear a la primera página después de cargar
      setCurrentPage(1)
      alert(
        `Se cargaron ${Object.keys(googleUsers).length - 1} usuarios desde Google Sheets (excluyendo admin por defecto)`,
      )
    } catch (error) {
      console.error("Error cargando usuarios:", error)
      alert("Error al cargar usuarios desde Google Sheets")
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const saveUsersLocally = (newUsers: Record<string, User>) => {
    setUsers(newUsers)
    updateLocalUserCache(newUsers) // Update the in-memory cache
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUsers = { ...users }
    newUsers[formData.username] = { ...formData }

    saveUsersLocally(newUsers)
    setIsDialogOpen(false)
    resetForm()
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({ ...user })
    setIsDialogOpen(true)
  }

  const handleDelete = (username: string) => {
    if (username === "samuel.perez") {
      alert("No se puede eliminar el usuario administrador principal")
      return
    }

    const newUsers = { ...users }
    delete newUsers[username]
    saveUsersLocally(newUsers)

    // Ajustar página actual si es necesario
    const newTotalPages = Math.ceil(Object.keys(newUsers).length / USERS_PER_PAGE)
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages)
    }
  }

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      role: "user",
      name: "",
      permissions: {
        userManagement: false,
        programatico: false,
        electoral: false,
        encuestas: false,
        candidatos: false,
        diaD: false,
        firmas: false,
      },
    })
    setEditingUser(null)
  }

  const handleDialogClose = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const handlePermissionChange = (moduleKey: string, checked: boolean) => {
    setFormData({
      ...formData,
      permissions: {
        ...formData.permissions,
        [moduleKey]: checked,
      },
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  if (isLoadingUsers) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="ml-3 text-muted-foreground">Cargando usuarios...</p>
      </div>
    )
  }

  if (!currentUser?.permissions.userManagement) {
    return (
      <div className="flex items-center justify-center h-64">
        <Alert>
          <AlertDescription>No tienes permisos para acceder a esta sección.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground text-lg">Administra usuarios y sus permisos en el sistema</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={handleLoadFromGoogleSheets} disabled={isLoadingUsers} variant="outline" size="lg">
            {isLoadingUsers ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Cargando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Cargar desde Google Sheets
              </div>
            )}
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsDialogOpen(true)} size="lg">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
                <DialogDescription>
                  {editingUser ? "Modifica los datos del usuario" : "Crea un nuevo usuario en el sistema"}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={!!editingUser}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold">Permisos del Sistema</Label>
                    <p className="text-sm text-muted-foreground">
                      Selecciona los módulos a los que tendrá acceso este usuario
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {AVAILABLE_MODULES.map((module) => (
                      <div key={module.key} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <Switch
                          id={module.key}
                          checked={formData.permissions[module.key as keyof typeof formData.permissions]}
                          onCheckedChange={(checked) => handlePermissionChange(module.key, checked)}
                        />
                        <div className="space-y-1 flex-1">
                          <Label htmlFor={module.key} className="text-sm font-medium cursor-pointer">
                            {module.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">{module.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={handleDialogClose}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingUser ? "Actualizar" : "Crear Usuario"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Usuarios del Sistema</CardTitle>
              <CardDescription>
                Lista de todos los usuarios registrados y sus permisos ({totalUsers} usuarios total)
              </CardDescription>
            </div>
            {totalPages > 1 && (
              <div className="text-sm text-muted-foreground">
                Página {currentPage} de {totalPages}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Permisos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.username}>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" ? "Administrador" : "Usuario"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(user.permissions).map(([key, value]) => {
                        if (value) {
                          const module = AVAILABLE_MODULES.find((m) => m.key === key)
                          return (
                            <Badge key={key} variant="outline" className="text-xs">
                              {module?.label || key}
                            </Badge>
                          )
                        }
                        return null
                      })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      {user.username !== "samuel.perez" && (
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(user.username)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Mostrando {startIndex + 1} a {Math.min(endIndex, totalUsers)} de {totalUsers} usuarios
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
