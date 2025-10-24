import { DateRange, DayPicker } from "react-day-picker"

interface DateFilterProps {
    dateRage: DateRange | undefined
    onHandleDaySelected: (newSelected: DateRange | undefined) => void
}

export function DateFilter({ dateRage, onHandleDaySelected }: DateFilterProps) {
    console.log("dateRage: ", dateRage)
    return (
        <aside className="w-[320px]">
            <div className="flex flex-col bg-white border border-slate-200 shadow-lg shadow-slate-200/60 rounded-lg p-3">
                <DayPicker
                    required
                    captionLayout="dropdown-years"
                    mode="range"
                    selected={dateRage}
                    onSelect={onHandleDaySelected}
                    pagedNavigation
                />
                <p onClick={() => onHandleDaySelected(undefined)} className="text-end p-2 text-[#8c52ff] cursor-pointer">Clear</p>
            </div>
        </aside>
    )
}