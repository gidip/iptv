export const dynamic = "force-dynamic"

import { SignInForm } from "./signin-form"

export default function SignInPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>
        <SignInForm />
      </div>
    </div>
  )
}

