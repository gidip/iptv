export const dynamic = "force-dynamic"

import { ContactForm } from "./contact-form"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions or need assistance? Fill out the form below and our team will get back to you as soon as
          possible.
        </p>
        <ContactForm />
      </div>
    </div>
  )
}

