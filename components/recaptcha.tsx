"use client"

import { useEffect } from "react"
import Script from "next/script"

interface ReCAPTCHAProps {
  onVerify: (token: string) => void
  onError?: () => void
  onExpire?: () => void
}

declare global {
  interface Window {
    grecaptcha: any
    onReCAPTCHALoad: () => void
    onReCAPTCHAVerify: (token: string) => void
    onReCAPTCHAError: () => void
    onReCAPTCHAExpire: () => void
  }
}

export function ReCAPTCHA({ onVerify, onError, onExpire }: ReCAPTCHAProps) {
  useEffect(() => {
    // Setup callback functions
    window.onReCAPTCHALoad = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.render("recaptcha-container", {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          callback: window.onReCAPTCHAVerify,
          "error-callback": window.onReCAPTCHAError,
          "expired-callback": window.onReCAPTCHAExpire,
        })
      })
    }

    window.onReCAPTCHAVerify = (token: string) => {
      onVerify(token)
    }

    window.onReCAPTCHAError = () => {
      onError?.()
    }

    window.onReCAPTCHAExpire = () => {
      onExpire?.()
    }

    return () => {
      // Cleanup
      delete window.onReCAPTCHALoad
      delete window.onReCAPTCHAVerify
      delete window.onReCAPTCHAError
      delete window.onReCAPTCHAExpire
    }
  }, [onVerify, onError, onExpire])

  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?onload=onReCAPTCHALoad&render=explicit`} async defer />
      <div id="recaptcha-container" />
    </>
  )
}

