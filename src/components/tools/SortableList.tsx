"use client";

import React, { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X, GripVertical } from "lucide-react";

export type ID = string | number;

export interface SortableItemType {
    id: ID;
    file: File;
}

interface SortableItemProps extends SortableItemType {
    onRemove: (id: ID) => void;
}

function SortableItem({ id, file, onRemove }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const preview = URL.createObjectURL(file);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative group bg-white border border-border rounded-xl p-4 flex items-center gap-4 select-none touch-none hover:border-primary/30 hover:shadow-md transition-all"
        >
            <div {...attributes} {...listeners} className="cursor-grab hover:text-primary transition-colors">
                <GripVertical className="w-5 h-5 text-muted-foreground" />
            </div>

            <div className="w-12 h-12 relative overflow-hidden rounded-md bg-muted">
                {file.type.startsWith('image/') ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={preview} alt="thumb" className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-xs text-muted-foreground">PDF</div>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-foreground truncate">{file.name}</p>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB</p>
            </div>

            <button
                onClick={() => onRemove(id)}
                className="p-1 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

interface SortableListProps {
    items: SortableItemType[];
    setItems: (items: SortableItemType[]) => void;
    onRemove: (id: ID) => void;
}

export function SortableList({ items, setItems, onRemove }: SortableListProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = items.findIndex((item) => item.id === active.id);
            const newIndex = items.findIndex((item) => item.id === over.id);
            setItems(arrayMove(items, oldIndex, newIndex));
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {items.map((item) => (
                        <SortableItem key={item.id} id={item.id} file={item.file} onRemove={onRemove} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
