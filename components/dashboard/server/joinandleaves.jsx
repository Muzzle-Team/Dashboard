"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/dashboard/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/dashboard/charts"

export const description = "Bar chart showing joins and leaves"

const chartData = [
  { day: "Sun", joins: 12, leaves: 3 },
  { day: "Mon", joins: 18, leaves: 5 },
  { day: "Tue", joins: 9, leaves: 1 },
  { day: "Wed", joins: 22, leaves: 7 },
  { day: "Thu", joins: 17, leaves: 4 },
  { day: "Fri", joins: 14, leaves: 2 },
  { day: "Sat", joins: 20, leaves: 6 },
]

const chartConfig = {
  joins: {
    label: "Joins",
    color: "#22c55e",
  },
  leaves: {
    label: "Leaves",
    color: "#ef4444", 
  },
}

export default function JoinsAndLeaves() {
  return (
    <div className="flex items-center justify-center min-h-screenp-4 flex-1 ">
      <Card className="w-full bg-[#191822]/50 border border-[#2e2b41]">
        <CardHeader>
          <div>
            <CardTitle className="text-xl">Joins & Leaves</CardTitle>
            <p className="text-sm font-mono text-blue-50/80 mb-3">Last Week</p>
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} stroke="#2e2b41" />

              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={true}
                tickMargin={12}
                tick={{ fill: "#d1d5db", fontSize: 14 }}
              />
              <YAxis
                tickLine={false}
                axisLine={true}
                tickMargin={8}
                tick={{ fill: "#d1d5db", fontSize: 14 }}
              />

              <ChartTooltip
                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                content={<ChartTooltipContent />}
              />

              <Bar dataKey="joins" fill="#22c55e" radius={[6, 6, 0, 0]} />
              <Bar dataKey="leaves" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
