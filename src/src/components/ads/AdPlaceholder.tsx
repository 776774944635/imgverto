import React from 'react';

interface AdPlaceholderProps {
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    className?: string;
    style?: React.CSSProperties;
}

export function AdPlaceholder({ slotId, format = 'auto', className, style }: AdPlaceholderProps) {
    // In a real app, you would include the AdSense script in layout or via a Script component.
    // This component acts as the placement container.
    return (
        <div className={`ad-container my-4 text-center overflow-hidden min-h-[90px] bg-muted/20 flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed border-muted rounded-md ${className || ''}`} style={style}>
            {/* Placeholder for development */}
            <span className="sr-only">Advertisement</span>
            {process.env.NODE_ENV === 'development' ? (
                <div className="p-4">AdSense Slot: {slotId} ({format})</div>
            ) : (
                <ins
                    className="adsbygoogle block"
                    data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                    data-ad-slot={slotId}
                    data-ad-format={format}
                    data-full-width-responsive="true"
                ></ins>
            )}
        </div>
    );
}
