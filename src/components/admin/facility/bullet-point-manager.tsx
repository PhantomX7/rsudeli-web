// components/admin/facility/bullet-point-manager.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Label } from "@/components/ui/label";

interface BulletPointManagerProps {
    value: string[];
    onChange: (value: string[]) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
}

export function BulletPointManager({ 
    value = [], 
    onChange, 
    label = "Description Points",
    placeholder = "Enter description point",
    error,
    disabled = false,
}: BulletPointManagerProps) {
    const addPoint = () => {
        onChange([...value, ""]);
    };

    const removePoint = (index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);
        onChange(newValue);
    };

    const updatePoint = (index: number, val: string) => {
        const newValue = [...value];
        newValue[index] = val;
        onChange(newValue);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">{label}</Label>
                <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={addPoint}
                    disabled={disabled}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Point
                </Button>
            </div>

            {value.length === 0 && (
                <div className="text-sm text-muted-foreground italic border border-dashed rounded-md p-4 text-center">
                    No description points added yet. Click &quot;Add Point&quot; to add one.
                </div>
            )}

            <div className="space-y-3">
                {value.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex items-center gap-3 bg-gray-50 p-3 rounded-md border group"
                    >
                        {/* Drag Handle / Index Indicator */}
                        <div className="flex items-center justify-center w-6 h-6 rounded bg-gray-200 text-gray-500 text-xs font-medium shrink-0">
                            {index + 1}
                        </div>

                        {/* Bullet Point Input */}
                        <div className="flex-1">
                            <Input
                                value={item}
                                onChange={(e) => updatePoint(index, e.target.value)}
                                placeholder={placeholder}
                                disabled={disabled}
                                className="w-full"
                            />
                        </div>

                        {/* Delete button */}
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removePoint(index)}
                            disabled={disabled}
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