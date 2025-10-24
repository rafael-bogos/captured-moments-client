"use client";

import { GrMapLocation } from "react-icons/gr"
import { MdClose, MdDelete, MdUpdate } from "react-icons/md"
import { formatDate } from "../../utils/helpers"

interface MomentsProps {
    id: string
    imageUrl: string
    isFavorite: boolean
    story: string
    title: string
    userId: string
    visitedDate: string
    visitedLocation: string[]
}

interface ViewTravelMomentProps {
    momentInfo: MomentsProps | null
    onClose: () => void
    onDeleteClick: () => void
    onEditClick: () => void
}

export function ViewTravelMoment({
    momentInfo,
    onClose,
    onDeleteClick,
    onEditClick
}: ViewTravelMomentProps) {
    return (
        <section className="relative">
            <header className="flex items-center justify-end">
                <div className="flex items-center gap-3 bg-violet-50/50 p-2 rounded-l-lg">
                    <button className="flex items-center cursor-pointer gap-1 text-xs font-medium bg-violet-50 text-[#8c52ff] shadow-violet-100/0 border border-violet-100 hover:bg-[#8c52ff] hover:text-white rounded px-3 py-[3px]" onClick={onEditClick}>
                        <MdUpdate className="text-lg" /> UPDATE STORY
                    </button>

                    <button className="flex items-center cursor-pointer gap-1 text-xs font-medium bg-violet-50 text-[#8c52ff] shadow-violet-100/0 border border-violet-100 hover:bg-[#8c52ff] hover:text-white rounded px-3 py-[3px] bg-rose-50 text-rose-500 shadow-rose-100/0 border border-rose-100 hover:bg-rose-500 hover:text-white" onClick={onDeleteClick}>
                        <MdDelete className="text-lg" /> DELETE
                    </button>

                    <button onClick={onClose}>
                        <MdClose className="text-sl text-slate-400 cursor-pointer" />
                    </button>
                </div>
            </header>

            <div>
                <article className="flex-1 flex flex-col gap-2 py-4">
                    <h1 className="text-2xl text-slate-950">
                        {momentInfo && momentInfo.title}
                    </h1>

                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                            {formatDate(momentInfo?.visitedDate || '')}
                        </span>

                        <div className="inline-flex items-center gap-2 text-[13px] text-violet-600 bg-violet-200/40 rounded px-2 py-1">
                            <GrMapLocation className="text-sm" />
                            {momentInfo &&
                                momentInfo.visitedLocation.map((visited, idx) =>
                                    momentInfo.visitedLocation.length == idx + 1
                                        ? `${visited}`
                                        : `${visited}, `
                                )
                            }
                        </div>
                    </div>
                </article>

                <img
                    src={momentInfo?.imageUrl}
                    alt=""
                    className="w-full h-[300px] object-cover rounded-lg"
                />

                <footer className="mt-4">
                    <p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line">
                        {momentInfo?.story}
                    </p>
                </footer>
            </div>
        </section>
    )
}