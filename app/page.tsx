import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to /auth/login if you want to keep your existing flow
  // Or you can create a landing page here
  redirect("/auth/login")
}

