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
    { day: "Sep 1", balance: 0 },
    { day: "Sep 3", balance: 0 },
    { day: "Sep 5", balance: 0 },
    { day: "Sep 7", balance: 0 },
    { day: "Sep 9", balance: 20000 },
    { day: "Sep 11", balance: 7 },
    { day: "Sep 13", balance: 0 },
    { day: "Sep 15", balance: 60000 },
    { day: "Sep 17", balance: 0 },
    { day: "Sep 19", balance: 40000 },
    { day: "Sep 21", balance: 0 },
    { day: "Sep 23", balance: 5 },
    { day: "Sep 25", balance: 120000 },
    { day: "Sep 27", balance: 0 },
    { day: "Sep 29", balance: 0 }
]


const chartConfig = {
    balance: {
        label: "balance",
        color: "#4f39f6",
    },
}

export default function ChartAreaDefault() {
    return (
        <div className="flex items-center justify-center min-h-screenp-4 flex-1 ">
            <Card className="w-full   bg-[#191822]/50  border border-[#2e2b41]">
                <CardHeader>
                    <CardTitle className="text-xl"> Corns Balance Statistics</CardTitle>
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
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 leading-none font-medium text-base">
                                Trending up by 5.2% this month <TrendingUp className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}