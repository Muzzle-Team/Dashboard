"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/dashboard/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/dashboard/charts"

export const description = "A simple area chart"
const chartData = [
    { day: "Sun", balance: 5000 },
    { day: "Mon", balance: 0 },
    { day: "Tue", balance: 0 },
    { day: "Wed", balance: 0 },
    { day: "Thu", balance: 20000 },
    { day: "Fri", balance: 7 },
    { day: "Sat", balance: 0 },
]


const chartConfig = {
    balance: {
        label: "balance",
        color: "#4f39f6",
    },
}

export default function Messages() {
    return (
        <div className="flex items-center justify-center min-h-screenp-4 flex-1 ">
            <Card className="w-full rounded-xl  bg-[#191822]/50  border border-[#2e2b41]">
                <CardHeader>
                    <div>
                        <CardTitle className="text-xl">Messages</CardTitle>
                        <p className="text-sm sm:text-sm font-mono  text-blue-50/80 mb-3">
                            Last Week
                        </p>
                    </div>

                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-[400px] w-full">
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                                top: 12,
                                bottom: 12,
                            }}
                        >
                            <defs>
                                <linearGradient id="colorbalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f39f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4f39f67e" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>

                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={true}
                                tickMargin={12}
                                tickFormatter={(value) => value.slice(0, 12)}
                                style={{ fontSize: '14px' }}
                                tick={{ fill: '#d1d5db', fontSize: 14 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={true}
                                tickMargin={8}
                                style={{ fontSize: '14px' }}
                                tick={{ fill: '#d1d5db', fontSize: 14 }}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />

                            <Area
                                dataKey="balance"
                                type="monotone"
                                fill="url(#colorbalance)"
                                stroke="#4f39f6"
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>

            </Card>
        </div>
    )
}