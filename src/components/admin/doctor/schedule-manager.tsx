// @/components/admin/doctor/schedule-manager.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export interface ScheduleItem {
    day: string;
    start_time: string;
    end_time: string;
}

interface ScheduleManagerProps {
    value: ScheduleItem[];
    onChange: (value: ScheduleItem[]) => void;
    error?: string;
}

const DAYS = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
];

export function ScheduleManager({ value = [], onChange, error }: ScheduleManagerProps) {
    const addSchedule = () => {
        onChange([
            ...value,
            { day: "Senin", start_time: "09:00", end_time: "17:00" },
        ]);
    };

    const removeSchedule = (index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange(newValue);
    };

    const updateSchedule = (index: number, field: keyof ScheduleItem, val: string) => {
        const newValue = [...value];
        newValue[index] = { ...newValue[index], [field]: val };
        onChange(newValue);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Practice Schedule</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSchedule}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Day
                </Button>
            </div>

            {value.length === 0 && (
                <div className="text-sm text-muted-foreground italic border border-dashed rounded-md p-4 text-center">
                    No schedules added yet. Click &quot;Add Day&quot; to set availability.
                </div>
            )}

            <div className="space-y-3">
                {value.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col sm:flex-row gap-3 items-end sm:items-center bg-gray-50 p-3 rounded-md border"
                    >
                        {/* Day Select - Fixed proportional width */}
                        <div className="w-full sm:w-[140px] sm:min-w-[140px]">
                            <Label className="text-xs mb-1.5 block sm:hidden">Day</Label>
                            <Select
                                value={item.day}
                                onValueChange={(val) => updateSchedule(index, "day", val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select day" />
                                </SelectTrigger>
                                <SelectContent className="min-w-[--radix-select-trigger-width]">
                                    {DAYS.map((day) => (
                                        <SelectItem key={day} value={day}>
                                            {day}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Time inputs */}
                        <div className="flex items-center gap-2 flex-1 w-full sm:w-auto">
                            <div className="flex-1">
                                <Label className="text-xs mb-1.5 block sm:hidden">Start</Label>
                                <Input
                                    type="time"
                                    value={item.start_time}
                                    onChange={(e) => updateSchedule(index, "start_time", e.target.value)}
                                    className="w-full"
                                />
                            </div>
                            <span className="text-muted-foreground pt-4 sm:pt-0">-</span>
                            <div className="flex-1">
                                <Label className="text-xs mb-1.5 block sm:hidden">End</Label>
                                <Input
                                    type="time"
                                    value={item.end_time}
                                    onChange={(e) => updateSchedule(index, "end_time", e.target.value)}
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Delete button */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                            onClick={() => removeSchedule(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        </div>
    );
}