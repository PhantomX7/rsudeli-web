// components/public/doctor/doctor-page-header.tsx
interface DoctorPageHeaderProps {
    title: string;
    description: string;
    backgroundImage?: string;
}

export function DoctorPageHeader({
    title,
    description,
    backgroundImage = "https://res.cloudinary.com/rsudeli/image/upload/c_scale,h_1080,q_auto/v1530936899/Image/LRM_EXPORT_20180704_103030.jpg",
}: DoctorPageHeaderProps) {
    return (
        <section className="relative flex h-[450px] items-center justify-center overflow-hidden">
            <div
                className="absolute inset-0 z-0 bg-teal-900"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-[#32c69a]/90 mix-blend-multiply" />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 max-w-3xl px-4 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {title}
                </h1>
                <p className="text-lg text-white/90">{description}</p>
            </div>
        </section>
    );
}
