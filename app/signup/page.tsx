export const dynamic = "force-dynamic"

import { SignUpForm } from "./signup-form"

export default function SignUpPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
        <SignUpForm />
      </div>
    </div>
  )
}

