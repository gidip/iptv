"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<boolean>
  signInWithGoogle: () => Promise<boolean>
  signUp: (name: string, email: string, password: string) => Promise<boolean>
  signOut: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        // In a real app, you would check session/token validity here
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      // Mock authentication - replace with real API call
      if (email && password) {
        // Simulate successful login
        const mockUser = {
          id: "user-1",
          name: "Test User",
          email,
          isAdmin: email.includes("admin"),
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Sign in error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      // Mock Google authentication - replace with real implementation
      const mockUser = {
        id: "google-user-1",
        name: "Google User",
        email: "google@example.com",
        isAdmin: false,
      }
      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
      return true
    } catch (error) {
      console.error("Google sign in error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      // Mock sign up - replace with real API call
      if (name && email && password) {
        // Simulate successful registration
        const mockUser = {
          id: "new-user-1",
          name,
          email,
          isAdmin: false,
        }
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Sign up error:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signInWithGoogle,
        signUp,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

