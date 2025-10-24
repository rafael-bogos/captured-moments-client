"use client"

import Image from "next/image"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import { FaRegFileImage } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"

interface ImageSelectorProps {
    image: string | File | null
    setImage: Dispatch<SetStateAction<File | string | null>>
    onHandleDeleteMomentImg: () => void
}

export function ImageSelector({ image, setImage, onHandleDeleteMomentImg }: ImageSelectorProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files
        if (file) setImage(file[0])
    }

    const onChangeFile = () => {
        inputRef.current?.click()
    }

    const handleRemoveImage = () => {
        setImage(null)
        onHandleDeleteMomentImg()
    }

    useEffect(() => {
        if (typeof image === "string") {
            setPreviewUrl(image)
        } else if (image) {
            const url = URL.createObjectURL(image)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        } else {
            setPreviewUrl(null)
        }
    }, [image])

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <button
                    className="w-full h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded border border-slate-200/50"
                    onClick={onChangeFile}
                >
                    <FaRegFileImage className="text-xl text-violet-500" />
                    <p className="text-sm text-slate-500">Browse image files to upload</p>
                </button>
            ) : (
                previewUrl && (
                    <div className="w-full relative">
                        <Image
                            src={previewUrl}
                            alt="Selected"
                            width={500}
                            height={300}
                            className="w-full h-[300px] object-cover rounded-lg"
                        />

                        <button
                            onClick={handleRemoveImage}
                            className="
                                flex items-center justify-center
                                text-white text-xs font-medium
                                bg-rose-600 hover:bg-rose-700 active:bg-rose-800
                                border border-rose-500 rounded-md
                                px-3 py-[3px]
                                absolute top-2 right-2
                                cursor-pointer shadow-sm
                                transition-all duration-200 ease-in-out
                                hover:scale-105
                                focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-1
                            "
                        >
                            <MdDeleteOutline className="text-lg transition-transform duration-200 group-hover:scale-110" />
                        </button>


                    </div>
                )
            )}
        </div>
    )
}
