interface GoogleSheetsUser {
  username: string
  password: string
  role: string
  name: string
  userManagement: boolean
  programatico: boolean
  electoral: boolean
  encuestas: boolean
  candidatos: boolean
  diaD: boolean
  firmas: boolean
}

export interface User {
  username: string
  password: string
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

const GOOGLE_SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1zddFYFC7b2uyLqCdZa20yujUpsxnDE9-J_18Pu5nBVU/export?format=csv"

export async function loadUsersFromGoogleSheets(): Promise<Record<string, User>> {
  try {
    //console.log("Cargando usuarios")

    const response = await fetch(GOOGLE_SHEETS_CSV_URL, {
      method: "GET",
      headers: {
        Accept: "text/csv",
      },
    })

    if (!response.ok) {
      throw new Error(`Error al cargar: ${response.status}`)
    }

    const csvText = await response.text()
    //console.log("Back cargado:", csvText.substring(0, 200) + "...")

    const users = parseCSVToUsers(csvText)
    //console.log("Usuarios procesados:", Object.keys(users).length)

    return users
  } catch (error) {
    console.error("Error cargando usuarios:", error)
    return {}
  }
}

function parseCSVToUsers(csvText: string): Record<string, User> {
  const lines = csvText.trim().split("\n")
  const users: Record<string, User> = {}

  if (lines.length < 2) {
    console.warn("Back vacío o sin datos")
    return users
  }

  // Saltar la primera línea (headers)
  for (let i = 1; i < lines.length; i++) {
    try {
      const line = lines[i].trim()
      if (!line) continue

      // Parsear CSV considerando comillas
      const values = parseCSVLine(line)

      if (values.length < 11) {
        console.warn(`Línea ${i + 1} tiene datos insuficientes:`, values)
        continue
      }

      const [
        username,
        password,
        role,
        name,
        userManagement,
        programatico,
        electoral,
        encuestas,
        candidatos,
        diaD,
        firmas,
      ] = values

      if (!username || !password || !name) {
        console.warn(`Línea ${i + 1} falta datos requeridos:`, { username, password, name })
        continue
      }

      users[username] = {
        username: username.trim(),
        password: password.trim(),
        role: role.trim() || "user",
        name: name.trim(),
        permissions: {
          userManagement: parseBooleanValue(userManagement),
          programatico: parseBooleanValue(programatico),
          electoral: parseBooleanValue(electoral),
          encuestas: parseBooleanValue(encuestas),
          candidatos: parseBooleanValue(candidatos),
          diaD: parseBooleanValue(diaD),
          firmas: parseBooleanValue(firmas),
        },
      }
    } catch (error) {
      console.error(`Error procesando línea ${i + 1}:`, error)
    }
  }

  return users
}

function parseCSVLine(line: string): string[] {
  const values: string[] = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      values.push(current.trim())
      current = ""
    } else {
      current += char
    }
  }

  values.push(current.trim())
  return values
}

function parseBooleanValue(value: string): boolean {
  if (!value) return false
  const cleanValue = value.trim().toLowerCase()
  return cleanValue === "true" || cleanValue === "1" || cleanValue === "yes" || cleanValue === "sí"
}
