import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
    container?: boolean;
}

export function Section({
    className,
    container = true,
    children,
    ...props
}: SectionProps) {
    return (
        <section
            className={cn(
                "py-6 md:py-8",
                container && "container px-4 md:px-6",
                className
            )}
            {...props}
        >
            {children}
        </section>
    );
}
