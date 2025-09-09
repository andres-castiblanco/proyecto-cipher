"use client"

import { Home, LogOut, Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface DashboardHeaderProps {
  user: {
    username: string
    role: string
    name: string
    permissions: any
  }
  onLogout: () => void
  onToggleSidebar: () => void
  sidebarOpen: boolean
}

export function DashboardHeader({ user, onLogout, onToggleSidebar, sidebarOpen }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleHomeClick = () => {
    try {
      router.push("/dashboard")
    } catch (error) {
      console.error("Error navigating to dashboard:", error)
    }
  }

  const handleThemeToggle = () => {
    try {
      setTheme(theme === "dark" ? "light" : "dark")
    } catch (error) {
      console.error("Error toggling theme:", error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
      {/* Hamburger Menu */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="h-9 w-9 p-0 hover:bg-accent transition-all duration-200 rounded-md"
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            <Menu
              className={`h-4 w-4 transition-all duration-300 ${sidebarOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
            />
            <X
              className={`h-4 w-4 absolute transition-all duration-300 ${sidebarOpen ? "rotate-0 opacity-100" : "rotate-90 opacity-0"}`}
            />
          </div>
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        <Separator orientation="vertical" className="h-6" />
      </div>

      {/* Logo and Title */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <div className="hidden sm:block min-w-0">
            <h1 className="text-lg font-semibold text-foreground truncate">Proyecto Cipher</h1>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHomeClick}
          className="hidden md:flex hover:bg-accent transition-colors"
        >
          <Home className="w-4 h-4" />
          <span className="ml-2">Home</span>
        </Button>

        <Button variant="ghost" size="sm" onClick={handleThemeToggle} className="hover:bg-accent transition-colors">
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50 border">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs font-medium bg-primary text-primary-foreground">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block text-sm min-w-0">
            <p className="font-medium text-foreground truncate">{user.username}</p>
            <Badge variant="secondary" className="text-xs">
              {user.role === "admin" ? "Admin" : "Usuario"}
            </Badge>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onLogout}
          className="text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden lg:inline ml-2">Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  )
}
