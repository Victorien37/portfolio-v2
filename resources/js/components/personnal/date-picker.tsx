import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { fr } from 'date-fns/locale';


interface DatePickerProps {
    date:       Date | null;
    setDate:    (value: Date) => void;
    title:      string;
}

const formatDate = (date: Date | null): string => {
    return date ? date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    }) : "";
}

const isValidDate = (date: Date | null): boolean => {
    return date ? !isNaN(date.getTime()) : false;
}

export function DatePicker({ date, setDate, title }: DatePickerProps) {
    const [open, setOpen]   = useState<boolean>(false);
    const [month, setMonth] = useState<Date | null>(date);
    const [value, setValue] = useState<string>(formatDate(date));

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">{ title }</Label>
            <div className="relative flex gap-2">
                <Input
                    id="date"
                    value={value}
                    placeholder="01 septembre 2024"
                    className="bg-background pr-10"
                    onChange={(e) => {
                        const date = new Date(e.target.value)
                        setValue(e.target.value)
                        if (isValidDate(date)) {
                            setDate(date)
                            setMonth(date)
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault()
                            setOpen(true)
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                        >
                            <CalendarIcon className="size-3.5" />
                            <span className="sr-only">Selectionnez une date</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                        forceMount
                    >
                        <Calendar
                            locale={fr}
                            mode="single"
                            selected={date ?? undefined}
                            captionLayout="dropdown"
                            month={month ?? undefined}
                            onMonthChange={setMonth}
                            onSelect={(date) => {
                                if (date) {
                                    setDate(date)
                                    setValue(formatDate(date))
                                    setOpen(false)
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}