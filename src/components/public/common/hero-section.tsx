// components/common/hero-section.tsx
import { cn } from "@/lib/utils";

interface HeroSectionProps {
    title: string;
    description?: string;
    badge?: string;
    backgroundImage?: string;
    overlayColor?: string;
    height?: "sm" | "md" | "lg" | "xl";
    className?: string;
    children?: React.ReactNode;
}

const heightClasses = {
    sm: "h-[250px]",
    md: "h-[350px]",
    lg: "h-[400px]",
    xl: "h-[500px]",
};

export function HeroSection({
    title,
    description,
    badge,
    backgroundImage = "",
    overlayColor = "#32c69a",
    height = "lg",
    className,
    children,
}: HeroSectionProps) {
    return (
        <section
            className={cn(
                "relative flex items-center justify-center overflow-hidden",
                heightClasses[height],
                className
            )}
        >
            {/* Background */}
            <div
                className="absolute inset-0 z-0 bg-teal-900"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div
                    className="absolute inset-0 mix-blend-multiply"
                    style={{ backgroundColor: `${overlayColor}b6` }} // e6 = 90% opacity
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                {badge && (
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-4 tracking-wide">
                        {badge}
                    </span>
                )}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                    {title}
                </h1>
                {description && (
                    <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
                {children}
            </div>
        </section>
    );
}
