"use client";

import { Pie, PieChart } from "recharts";
import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

interface CGPA {
    studentId: string;
    cgpa: number;
}

export default function CGPAPieChart() {
    const [cgpaData, setCGPAData] = useState<{ range: string; students: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch CGPA data from the API
        const fetchCGPAData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/cgpa");
                if (!response.ok) {
                    throw new Error("Failed to fetch CGPA data");
                }
                const data: CGPA[] = await response.json();

                // Categorize CGPA data into ranges
                const ranges = [
                    { range: "1:1.5", students: 0, letter: "D" },
                    { range: "1.5:2", students: 0, letter: "C" },
                    { range: "2:2.5", students: 0, letter: "C+" },
                    { range: "2.5:3", students: 0, letter: "B" },
                    { range: "3:3.5", students: 0, letter: "B+" },
                    { range: "3.5:4", students: 0, letter: "A" },
                ];

                data.forEach((cgpa) => {
                    if (cgpa.cgpa >= 0 && cgpa.cgpa < 1.5) {
                        ranges[0].students++;
                    } else if (cgpa.cgpa >= 1.5 && cgpa.cgpa < 2) {
                        ranges[1].students++;
                    } else if (cgpa.cgpa >= 2 && cgpa.cgpa < 2.5) {
                        ranges[2].students++;
                    } else if (cgpa.cgpa >= 2.5 && cgpa.cgpa < 3) {
                        ranges[3].students++;
                    } else if (cgpa.cgpa >= 3 && cgpa.cgpa < 3.5) {
                        ranges[4].students++;
                    } else if (cgpa.cgpa >= 3.5 && cgpa.cgpa <= 4) {
                        ranges[5].students++;
                    }
                });

                setCGPAData(ranges);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCGPAData();
    }, []);

    // Chart configuration for CGPA ranges
    const chartConfig = {
        students: {
            label: "Students",
        },
        "1-1.5 CGPA": {
            label: "1-1.5 CGPA (D)",
            color: "red",
        },
        "1.5-2 CGPA": {
            label: "1.5-2 CGPA (C)",
            color: "hsl(var(--chart-2))",
        },
        "2-2.5 CGPA": {
            label: "2-2.5 CGPA (C+)",
            color: "hsl(var(--chart-3))",
        },
        "2.5-3 CGPA": {
            label: "2.5-3 CGPA (B)",
            color: "hsl(var(--chart-4))",
        },
        "3-3.5 CGPA": {
            label: "3-3.5 CGPA (B+)",
            color: "hsl(var(--chart-5))",
        },
        "3.5-4 CGPA": {
            label: "3.5-4 CGPA (A)",
            color: "hsl(var(--chart-6))",
        },
    } satisfies ChartConfig;

    if (loading) {
        return <p>Loading CGPA data...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <Card className="flex flex-col bg-transparent">
            <CardHeader className="items-center pb-0 text-2xl text-white">
                <CardTitle>CGPA Distribution</CardTitle>
                <CardDescription>Statistics based on student CGPA</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[350px] px-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent nameKey="range" hideLabel />}
                        />
                        <Pie
                            data={cgpaData}
                            dataKey="students"
                            labelLine={false}
                            label={({ range }) => `${range}`}
                            nameKey="range"
                            fill="#8884d8"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing distribution of students across CGPA ranges
                </div>
            </CardFooter>
        </Card>
    );
}