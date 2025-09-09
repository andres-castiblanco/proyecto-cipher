import { loadUsersFromGoogleSheets, type User } from "./google-sheets"

let userCache: Record<string, User> | null = null
let lastFetchTime = 0
const CACHE_DURATION_MS = 5000 // Cache for 5 seconds

// Default admin user, always available
const DEFAULT_ADMIN_USER: Record<string, User> = {
  "samuel.perez": {
    username: "samuel.perez",
    password: "Anarion293.", // This password should ideally be hashed in a real system
    role: "admin",
    name: "Samuel Pérez",
    permissions: {
      userManagement: true,
      programatico: true,
      electoral: true,
      encuestas: true,
      candidatos: true,
      diaD: true,
      firmas: true,
    },
  },
}

export async function getCachedUsers(): Promise<Record<string, User>> {
  const now = Date.now()
  if (userCache && now - lastFetchTime < CACHE_DURATION_MS) {
    // console.log("Returning users from cache")
    return userCache
  }

  // console.log("Fetching users from Google Sheets")
  const googleUsers = await loadUsersFromGoogleSheets()

  // Combine default admin user with users from Google Sheets
  userCache = { ...DEFAULT_ADMIN_USER, ...googleUsers }
  lastFetchTime = now
  return userCache
}

export function invalidateUserCache() {
  userCache = null
  lastFetchTime = 0
}

export function updateLocalUserCache(updatedUsers: Record<string, User>) {
  userCache = updatedUsers
  lastFetchTime = Date.now() // Treat local update as fresh data
}
