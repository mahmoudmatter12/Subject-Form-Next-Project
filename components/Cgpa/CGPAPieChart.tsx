"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Info } from "lucide-react";
import PieChartSkeleton from "./PieChartSkeleton";

interface CGPA {
    studentId: string;
    cgpa: number;
}

const COLORS = [
    '#FF6B6B', // Red for lowest range
    '#FFA07A', // Light salmon
    '#FFD166', // Yellow
    '#06D6A0', // Green
    '#118AB2', // Blue
    '#8EC6C5'  // Light teal for highest range
];

const GRADE_LABELS = [
    { range: "0-1.5", label: "D Range", description: "Needs Improvement" },
    { range: "1.5-2.0", label: "C Range", description: "Below Average" },
    { range: "2.0-2.5", label: "C+ Range", description: "Average" },
    { range: "2.5-3.0", label: "B Range", description: "Good" },
    { range: "3.0-3.5", label: "B+ Range", description: "Very Good" },
    { range: "3.5-4.0", label: "A Range", description: "Excellent" }
];

interface CustomTooltipProps {
    active?: boolean;
    payload?: { payload: { label: string; range: string; students: number; description: string } }[];
}

export default function CGPAPieChart() {
    const [data, setData] = useState<{ range: string; students: number; label: string; description: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchCGPAData = async () => {
            try {
                const response = await fetch("/api/cgpa");
                if (!response.ok) throw new Error("Failed to fetch CGPA data");
                const cgpas: CGPA[] = await response.json();

                const ranges = GRADE_LABELS.map((grade, index) => {
                    const [min, max] = grade.range.split('-').map(Number);
                    return {
                        ...grade,
                        students: cgpas.filter(cgpa => cgpa.cgpa >= min && cgpa.cgpa < (index === 5 ? 4.1 : max)).length
                    };
                });

                setData(ranges);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchCGPAData();
    }, []);

    const onPieEnter = (_: unknown, index: number) => {
        setActiveIndex(index);
    };

    const onPieLeave = () => {
        setActiveIndex(null);
    };

    const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-gray-800 p-4 border border-gray-700 rounded-lg shadow-lg">
                    <p className="font-bold">{data.label}</p>
                    <p>Range: {data.range}</p>
                    <p>Students: {data.students}</p>
                    <p className="text-gray-400">{data.description}</p>
                </div>
            );
        }
        return null;
    };

    if (error) {
        return (
            <Card className="bg-red-500/10 border-red-500/30">
                <CardHeader>
                    <CardTitle className="text-red-500">Error</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-red-400">{error}</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm text-white">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-white">CGPA Distribution</CardTitle>
                        <CardDescription className="text-gray-400">
                            Visual breakdown of student performance
                        </CardDescription>
                    </div>
                    <div className="text-gray-400 hover:text-white cursor-pointer" title="CGPA ranges and their grade equivalents">
                        <Info size={18} />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="h-[300px]">
                {loading ? (
                    <PieChartSkeleton />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                innerRadius={60}
                                fill="#8884d8"
                                dataKey="students"
                                nameKey="label"
                                onMouseEnter={onPieEnter}
                                onMouseLeave={onPieLeave}
                                animationBegin={0}
                                animationDuration={1000}
                                label={({ name, percent }) =>
                                    `${name}: ${(percent * 100).toFixed(0)}%`
                                }
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke="#1f2937"
                                        strokeWidth={2}
                                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.5}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                formatter={(value, entry: unknown, index) => (
                                    <span className="text-gray-300">
                                        {GRADE_LABELS[index].range}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                )}
            </CardContent>

            <CardFooter className="flex flex-wrap gap-2 justify-center">
                {GRADE_LABELS.map((grade, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 rounded-full text-xs"
                        style={{
                            backgroundColor: `${COLORS[index]}20`,
                            border: `1px solid ${COLORS[index]}`,
                            color: COLORS[index]
                        }}
                    >
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS[index] }}
                        />
                        {grade.range} ({grade.label})
                    </div>
                ))}
            </CardFooter>
        </Card>
    );
}