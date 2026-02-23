"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { ImageIcon, ShieldCheck, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import Link from "next/link";

interface ImageUploaderProps {
    onUpload: (files: File[]) => void;
    maxFiles?: number;
    accept?: Record<string, string[]>;
    description?: string;
    className?: string;
    toolType?: 'image' | 'pdf' | 'video' | 'general';
}

const FORMAT_NAV = [
    { label: "JPG", path: "/compress-image", ext: ["jpg", "jpeg"], type: 'image' },
    { label: "PNG", path: "/jpg-to-png", ext: ["png"], type: 'image' },
    { label: "WEBP", path: "/compress-image", ext: ["webp"], type: 'image' },
    { label: "PDF", path: "/pdf-compressor", ext: ["pdf"], type: 'pdf' },
];

export function ImageUploader({
    onUpload,
    maxFiles = 20,
    accept = { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    description,
    className,
    toolType = 'general'
}: ImageUploaderProps) {
    const [error, setError] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (rejectedFiles.length > 0) {
                const errors = rejectedFiles.map((rf) => {
                    if (rf.errors[0]?.code === "too-many-files") {
                        return `Too many files. Max limit is ${maxFiles}.`;
                    }
                    return rf.errors[0]?.message;
                });
                setError(errors.join("\n"));
                return;
            }
            setError(null);
            onUpload(acceptedFiles);
        },
        [onUpload, maxFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles,
        accept,
    });

    const supportedExtensions = Object.values(accept).flat().map(ext => ext.replace(".", "").toLowerCase());

    const filteredNav = FORMAT_NAV.filter(item => {
        if (toolType === 'general') return true;
        return item.type === toolType;
    });

    return (
        <div className={cn("w-full max-w-[500px] mx-auto", className)}>
            {/* Format Quick Bar */}
            {filteredNav.length > 0 && (
                <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar py-1 px-1 justify-center">
                    {filteredNav.map((item) => {
                        const isActive = item.ext.some(e => supportedExtensions.includes(e));
                        return (
                            <Link
                                key={item.label}
                                href={item.path}
                                className={cn(
                                    "flex-shrink-0 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all",
                                    isActive
                                        ? "bg-primary text-primary-foreground shadow-md scale-105"
                                        : "bg-white border text-muted-foreground hover:border-primary/50 hover:text-primary shadow-sm hover:scale-105"
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            )}

            <motion.div
                initial="initial"
                animate="animate"
                variants={fadeIn}
                className="w-full flex flex-col items-center"
            >
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative w-full max-w-[850px] aspect-[16/6] md:aspect-[16/5] bg-blue-50/40 border-2 border-dashed border-blue-200 rounded-[2rem] transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group hover:bg-blue-50/60 hover:border-blue-400",
                        isDragActive ? "scale-[1.02] border-blue-500 bg-blue-100/50" : ""
                    )}
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col items-center gap-4">
                        <button
                            type="button"
                            className={cn(
                                "flex items-center gap-2 px-8 py-3 bg-teal-600 text-white font-bold rounded-full shadow-md hover:bg-teal-700 active:scale-[0.97] transition-all text-base",
                                isDragActive && "bg-teal-700"
                            )}
                        >
                            <Upload className="w-5 h-5" />
                            {toolType === 'pdf' ? 'Select PDF' : toolType === 'video' ? 'Select Video' : 'Select Files'}
                        </button>

                        <p className="text-muted-foreground text-sm">
                            {isDragActive ? "Drop files now" : "or drag and drop here"}
                        </p>

                        <p className="text-[11px] text-muted-foreground/60 font-medium uppercase tracking-widest">
                            {toolType === 'pdf' ? 'PDF ONLY' : `Accepted: ${supportedExtensions.map(e => e.toUpperCase()).join(", ")}`}
                        </p>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-8 p-6 rounded-3xl bg-destructive/5 border border-destructive/20 text-destructive text-sm font-bold text-center flex items-center justify-center gap-3"
                    >
                        <X className="w-5 h-5" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
