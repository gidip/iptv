"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    users: 400,
    views: 24000,
  },
  {
    name: "Feb",
    users: 500,
    views: 35000,
  },
  {
    name: "Mar",
    users: 600,
    views: 42000,
  },
  {
    name: "Apr",
    users: 780,
    views: 50000,
  },
  {
    name: "May",
    users: 890,
    views: 94000,
  },
  {
    name: "Jun",
    users: 968,
    views: 122000,
  },
  {
    name: "Jul",
    users: 1100,
    views: 156000,
  },
  {
    name: "Aug",
    users: 1200,
    views: 190000,
  },
  {
    name: "Sep",
    users: 1380,
    views: 230000,
  },
  {
    name: "Oct",
    users: 1480,
    views: 270000,
  },
  {
    name: "Nov",
    users: 1520,
    views: 300000,
  },
  {
    name: "Dec",
    users: 1700,
    views: 340000,
  },
]

export function AdminOverviewChart() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading chart...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <Tooltip />
        <Bar dataKey="users" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

