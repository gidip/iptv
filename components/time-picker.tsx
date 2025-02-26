"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { useState } from "react"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
}

export function TimePickerDemo({ value, onChange }: TimePickerProps) {
  const [hours, minutes] = value.split(":").map(Number)
  const [localHours, setLocalHours] = useState(hours.toString().padStart(2, "0"))
  const [localMinutes, setLocalMinutes] = useState(minutes.toString().padStart(2, "0"))

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHours = e.target.value
    if (newHours === "" || /^\d{1,2}$/.test(newHours)) {
      const numericHours = Number.parseInt(newHours || "0", 10)
      if (numericHours >= 0 && numericHours <= 23) {
        setLocalHours(newHours)
        onChange(`${newHours.padStart(2, "0")}:${localMinutes}`)
      }
    }
  }

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMinutes = e.target.value
    if (newMinutes === "" || /^\d{1,2}$/.test(newMinutes)) {
      const numericMinutes = Number.parseInt(newMinutes || "0", 10)
      if (numericMinutes >= 0 && numericMinutes <= 59) {
        setLocalMinutes(newMinutes)
        onChange(`${localHours.padStart(2, "0")}:${newMinutes.padStart(2, "0")}`)
      }
    }
  }

  const handleBlur = () => {
    const formattedHours = Number.parseInt(localHours || "0", 10)
      .toString()
      .padStart(2, "0")
    const formattedMinutes = Number.parseInt(localMinutes || "0", 10)
      .toString()
      .padStart(2, "0")
    setLocalHours(formattedHours)
    setLocalMinutes(formattedMinutes)
    onChange(`${formattedHours}:${formattedMinutes}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <Input
        className="w-12 px-2 text-center"
        value={localHours}
        onChange={handleHoursChange}
        onBlur={handleBlur}
        maxLength={2}
        placeholder="HH"
      />
      <span className="text-sm">:</span>
      <Input
        className="w-12 px-2 text-center"
        value={localMinutes}
        onChange={handleMinutesChange}
        onBlur={handleBlur}
        maxLength={2}
        placeholder="MM"
      />
    </div>
  )
}

