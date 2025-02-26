export type HealthCheckResult = {
  status: "healthy" | "error"
  database: {
    connected: boolean
    error?: string
  }
  environment: {
    valid: boolean
    missing: string[]
  }
}

export async function checkDeployment(): Promise<HealthCheckResult> {
  const requiredEnvVars = [
    "MYSQL_HOST",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_DATABASE",
    "NEXT_PUBLIC_RECAPTCHA_SITE_KEY",
    "RECAPTCHA_SECRET_KEY",
  ]

  const missingEnvVars = requiredEnvVars.filter((env) => !process.env[env])

  try {
    const dbResponse = await fetch("/api/health")
    const dbStatus = await dbResponse.json()

    return {
      status: dbStatus.status === "healthy" && missingEnvVars.length === 0 ? "healthy" : "error",
      database: {
        connected: dbStatus.status === "healthy",
        error: dbStatus.error,
      },
      environment: {
        valid: missingEnvVars.length === 0,
        missing: missingEnvVars,
      },
    }
  } catch (error) {
    return {
      status: "error",
      database: {
        connected: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      environment: {
        valid: missingEnvVars.length === 0,
        missing: missingEnvVars,
      },
    }
  }
}

