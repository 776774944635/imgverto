"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { UploadCloud, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "@/lib/motion";

interface ImageUploaderProps {
    onUpload: (files: File[]) => void;
    maxFiles?: number;
    accept?: Record<string, string[]>;
    description?: string;
    className?: string;
}

export function ImageUploader({
    onUpload,
    maxFiles = 20,
    accept = { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    description,
    className
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

    return (
        <div className={cn("w-full", className)}>
            <motion.div
                initial="initial"
                animate="animate"
                variants={fadeIn}
                className="w-full"
            >
                <div
                    {...getRootProps()}
                    className={cn(
                        "relative group cursor-pointer transition-all duration-300",
                        "premium-card rounded-[2.5rem] bg-white border-2",
                        isDragActive ? "border-primary bg-primary/5 ring-8 ring-primary/5" : "border-border hover:border-primary/20",
                    )}
                >
                    <input {...getInputProps()} />

                    <div className="relative z-10 p-12 md:p-24 flex flex-col items-center text-center">
                        <div className={cn(
                            "w-24 h-24 rounded-3xl flex items-center justify-center mb-10 transition-all duration-500",
                            isDragActive ? "bg-primary text-white scale-110 shadow-2xl" : "bg-primary/5 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary/20"
                        )}>
                            <UploadCloud className="w-12 h-12" />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-outfit text-4xl font-black text-foreground tracking-tight">
                                {isDragActive ? "Drop files now" : "Select Your Files"}
                            </h3>
                            <p className="text-muted-foreground font-medium text-xl max-w-sm mx-auto">
                                {description || "Drag and drop or click to upload your documents securely."}
                            </p>
                        </div>

                        <div className="mt-12 flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 border text-muted-foreground text-xs font-black uppercase tracking-widest">
                            <ShieldCheck className="w-5 h-5 text-primary" /> 100% Client-Side & Secure
                        </div>
                    </div>

                    {/* Subtle Pattern */}
                    <div className="absolute inset-0 bg-checkers opacity-[0.03] pointer-events-none rounded-[2.5rem]" />
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
