"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

const signinSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Please enter your password.",
  }),
})

type SignupFormValues = z.infer<typeof signupSchema>
type SigninFormValues = z.infer<typeof signinSchema>

interface AuthFormProps {
  type: "signin" | "signup"
}

export function AuthForm({ type }: AuthFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<SignupFormValues | SigninFormValues>({
    resolver: zodResolver(type === "signup" ? signupSchema : signinSchema),
    defaultValues: type === "signup" ? { name: "", email: "", password: "" } : { email: "", password: "" },
  })

  async function onSubmit(values: SignupFormValues | SigninFormValues) {
    try {
      setIsSubmitting(true)

      const response = await fetch("/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: type,
          data: values,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${type}`)
      }

      toast({
        title: type === "signup" ? "Account created" : "Signed in",
        description:
          type === "signup" ? "Your account has been created successfully." : "You have been signed in successfully.",
      })

      // In a real application, you would redirect the user or update the UI
      // window.location.href = type === "signup" ? "/dashboard" : "/account"
    } catch (error) {
      console.error(`Error during ${type}:`, error)
      toast({
        title: "Error",
        description: `There was a problem during ${type}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {type === "signup" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {type === "signup" ? "Creating account..." : "Signing in..."}
            </>
          ) : type === "signup" ? (
            "Create Account"
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </Form>
  )
}

