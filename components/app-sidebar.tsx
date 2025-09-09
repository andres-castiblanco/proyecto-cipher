"use client"

import { useState } from "react"
import {
  ChevronRight,
  Home,
  Users,
  BarChart3,
  Vote,
  LogOut,
  FileSignature,
  PieChart,
  Calendar,
  Eye,
  FileText,
  User,
} from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  user: {
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
}

export function AppSidebar({ user }: AppSidebarProps) {
  const [programaticoOpen, setProgramaticoOpen] = useState(false)
  const [diagnosticoOpen, setDiagnosticoOpen] = useState(false)
  const [propuestasOpen, setPropuestasOpen] = useState(false)
  const [electoralOpen, setElectoralOpen] = useState(false)
  const [elecciones2018Open, setElecciones2018Open] = useState(false)
  const [elecciones2022Open, setElecciones2022Open] = useState(false)
  const [encuestasOpen, setEncuestasOpen] = useState(false)
  const [candidatosOpen, setCandidatosOpen] = useState(false)
  const [diaDOpen, setDiaDOpen] = useState(false)
  const [firmasOpen, setFirmasOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("cipher_user")
    router.push("/")
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="flex flex-col h-full bg-sidebar">
      {/* Contenido del Sidebar */}
      <ScrollArea className="flex-1">
        <div>
          {/* Administrador */}
          {user.permissions.userManagement && (
            <div className="space-y-2">
              <div className="px-2 py-1">
                <h3 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">
                  Administración
                </h3>
              </div>
              <Button
                variant="ghost"
                onClick={() => handleNavigation("/dashboard/admin")}
                className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
              >
                <Users className="w-4 h-4 mr-1" />
                <span>Gestión de Usuarios</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  Admin
                </Badge>
              </Button>
            </div>
          )}

          {/* Navegación Principal */}
          <div className="space-y-2">
            <div className="px-2 py-1">
              <h3 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">Navegación</h3>
            </div>
            <Button
              variant="ghost"
              onClick={() => handleNavigation("/dashboard")}
              className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              <span>Panel Principal</span>
            </Button>
          </div>

          {/* Módulos */}
          <div className="space-y-2">
            <div className="px-2 py-1">
              <h3 className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wider">Módulos</h3>
            </div>

            {/* Programático */}
            {user.permissions.programatico && (
              <Collapsible open={programaticoOpen} onOpenChange={setProgramaticoOpen}>
                <Button
                  variant="ghost"
                  onClick={() => setProgramaticoOpen(!programaticoOpen)}
                  className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span>Programático</span>
                  <ChevronRight
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                      programaticoOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
                <CollapsibleContent className="transition-all duration-200">
                  <div className="ml-6 space-y-1 mt-1">
                    {/* Diagnóstico */}
                    <Collapsible open={diagnosticoOpen} onOpenChange={setDiagnosticoOpen}>
                      <Button
                        variant="ghost"
                        onClick={() => setDiagnosticoOpen(!diagnosticoOpen)}
                        className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                      >
                        <span>Diagnóstico</span>
                        <ChevronRight
                          className={`ml-auto w-3 h-3 transition-transform duration-200 ${
                            diagnosticoOpen ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </Button>
                      <CollapsibleContent className="transition-all duration-200">
                        <div className="ml-4 space-y-1 mt-1">
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/programatico/diagnostico/visor")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            Visor
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/programatico/diagnostico/briefs")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            Briefs
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Propuestas */}
                    <Collapsible open={propuestasOpen} onOpenChange={setPropuestasOpen}>
                      <Button
                        variant="ghost"
                        onClick={() => setPropuestasOpen(!propuestasOpen)}
                        className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                      >
                        <span>Propuestas</span>
                        <ChevronRight
                          className={`ml-auto w-3 h-3 transition-transform duration-200 ${
                            propuestasOpen ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </Button>
                      <CollapsibleContent className="transition-all duration-200">
                        <div className="ml-4 space-y-1 mt-1">
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/programatico/propuestas/visor")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            Visor
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/programatico/propuestas/briefs")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            Briefs
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Electoral */}
            {user.permissions.electoral && (
              <Collapsible open={electoralOpen} onOpenChange={setElectoralOpen}>
                <Button
                  variant="ghost"
                  onClick={() => setElectoralOpen(!electoralOpen)}
                  className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
                >
                  <Vote className="w-4 h-4 mr-1" />
                  <span>Electoral</span>
                  <ChevronRight
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                      electoralOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
                <CollapsibleContent className="transition-all duration-200">
                  <div className="ml-6 space-y-1 mt-1">
                    {/* Elecciones 2018 */}
                    <Collapsible open={elecciones2018Open} onOpenChange={setElecciones2018Open}>
                      <Button
                        variant="ghost"
                        onClick={() => setElecciones2018Open(!elecciones2018Open)}
                        className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                      >
                        <span>Elecciones 2018</span>
                        <ChevronRight
                          className={`ml-auto w-3 h-3 transition-transform duration-200 ${
                            elecciones2018Open ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </Button>
                      <CollapsibleContent className="transition-all duration-200">
                        <div className="ml-4 space-y-1 mt-1">
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/electoral/2018/visor")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            Visor
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/electoral/2018/briefs")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            Briefs
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Elecciones 2022 */}
                    <Collapsible open={elecciones2022Open} onOpenChange={setElecciones2022Open}>
                      <Button
                        variant="ghost"
                        onClick={() => setElecciones2022Open(!elecciones2022Open)}
                        className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                      >
                        <span>Elecciones 2022</span>
                        <ChevronRight
                          className={`ml-auto w-3 h-3 transition-transform duration-200 ${
                            elecciones2022Open ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      </Button>
                      <CollapsibleContent className="transition-all duration-200">
                        <div className="ml-4 space-y-1 mt-1">
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/electoral/2022/visor")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <Eye className="w-3 h-3 mr-2" />
                            Visor
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => handleNavigation("/dashboard/electoral/2022/briefs")}
                            className="w-full justify-start h-7 text-xs hover:bg-sidebar-accent/30 transition-colors"
                          >
                            <FileText className="w-3 h-3 mr-2" />
                            Briefs
                          </Button>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Encuestas */}
            {user.permissions.encuestas && (
              <Collapsible open={encuestasOpen} onOpenChange={setEncuestasOpen}>
                <Button
                  variant="ghost"
                  onClick={() => setEncuestasOpen(!encuestasOpen)}
                  className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
                >
                  <PieChart className="w-4 h-4 mr-1" />
                  <span>Encuestas</span>
                  <ChevronRight
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                      encuestasOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
                <CollapsibleContent className="transition-all duration-200">
                  <div className="ml-6 space-y-1 mt-1">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation("/dashboard/encuestas/visor")}
                      className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Visor
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation("/dashboard/encuestas/briefs")}
                      className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <FileText className="w-3 h-3 mr-2" />
                      Briefs
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Candidatos */}
            {user.permissions.candidatos && (
              <Collapsible open={candidatosOpen} onOpenChange={setCandidatosOpen}>
                <Button
                  variant="ghost"
                  onClick={() => setCandidatosOpen(!candidatosOpen)}
                  className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
                >
                  <User className="w-4 h-4 mr-1" />
                  <span>Candidatos</span>
                  <ChevronRight
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                      candidatosOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
                <CollapsibleContent className="transition-all duration-200">
                  <div className="ml-6 space-y-1 mt-1">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation("/dashboard/candidatos/relevantes")}
                      className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <Users className="w-3 h-3 mr-2" />
                      Candidatos Relevantes
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Día D */}
            {user.permissions.diaD && (
              <Collapsible open={diaDOpen} onOpenChange={setDiaDOpen}>
                <Button
                  variant="ghost"
                  onClick={() => setDiaDOpen(!diaDOpen)}
                  className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Día D</span>
                  <ChevronRight
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                      diaDOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
                <CollapsibleContent className="transition-all duration-200">
                  <div className="ml-6 space-y-1 mt-1">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation("/dashboard/dia-d/visor")}
                      className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Visor
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Firmas */}
            {user.permissions.firmas && (
              <Collapsible open={firmasOpen} onOpenChange={setFirmasOpen}>
                <Button
                  variant="ghost"
                  onClick={() => setFirmasOpen(!firmasOpen)}
                  className="w-full justify-start h-9 hover:bg-sidebar-accent transition-colors"
                >
                  <FileSignature className="w-4 h-4 mr-1" />
                  <span>Firmas</span>
                  <ChevronRight
                    className={`ml-auto w-4 h-4 transition-transform duration-200 ${
                      firmasOpen ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </Button>
                <CollapsibleContent className="transition-all duration-200">
                  <div className="ml-6 space-y-1 mt-1">
                    <Button
                      variant="ghost"
                      onClick={() => handleNavigation("/dashboard/firmas/visor")}
                      className="w-full justify-start h-8 text-sm hover:bg-sidebar-accent/50 transition-colors"
                    >
                      <Eye className="w-3 h-3 mr-2" />
                      Visor
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Footer del Sidebar */}
      <div className="border-t bg-sidebar-accent/50 p-2">
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full justify-start h-9 text-destructive hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-1" />
          <span>Cerrar Sesión</span>
        </Button>
      </div>
    </div>
  )
}
