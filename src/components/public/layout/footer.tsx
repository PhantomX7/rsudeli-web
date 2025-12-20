// components/layout/footer.tsx
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png"; // Ensure this png works on white/light bg
import { Phone, Mail, MapPin, Clock, Facebook, Instagram } from "lucide-react";
import { ContactForm } from "./contact-form";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-gray-50 text-gray-600 mt-auto border-t border-gray-200 relative overflow-hidden">
            {/* Top Wave Decoration */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-50 via-[#32c69a] to-gray-50" />

            <div className="container mx-auto px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    {/* LEFT COLUMN: Info (5 cols) */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Brand */}
                        <div className="space-y-4">
                            <Link href="/" className="inline-block">
                                <Image
                                    src={Logo}
                                    alt="RSU Deli Logo"
                                    width={140}
                                    height={50}
                                    className="h-12 w-auto"
                                />
                            </Link>
                            <p className="text-gray-500 leading-relaxed text-sm max-w-md">
                                Rumah Sakit Umum Deli Medan berkomitmen memberikan pelayanan kesehatan terbaik 
                                dengan fasilitas modern dan tenaga medis profesional yang melayani dengan hati.
                            </p>
                        </div>

                        {/* Contact Details - High Contrast */}
                        <div className="space-y-5">
                            <h4 className="text-gray-900 font-bold text-lg">Hubungi Kami</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4 group">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm text-[#32c69a] border border-gray-100 group-hover:border-[#32c69a] transition-colors">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm pt-2 text-gray-700 font-medium">
                                        Jl. Merbabu No.18 - 20A,<br /> 
                                        Medan, Sumatera Utara 20212
                                    </span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm text-[#32c69a] border border-gray-100 group-hover:border-[#32c69a] transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <a href="tel:+62614565229" className="text-sm font-semibold text-gray-700 hover:text-[#32c69a] transition-colors">
                                        (+62) 61 4565 229
                                    </a>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm text-[#32c69a] border border-gray-100 group-hover:border-[#32c69a] transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <a href="mailto:rumahsakitdeli@gmail.com" className="text-sm font-semibold text-gray-700 hover:text-[#32c69a] transition-colors">
                                        rumahsakitdeli@gmail.com
                                    </a>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="bg-white p-2.5 rounded-xl shadow-sm text-[#32c69a] border border-gray-100 group-hover:border-[#32c69a] transition-colors">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">IGD 24 Jam Setiap Hari</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Form (6 cols) */}
                    <div className="lg:col-span-7 relative">
                        {/* Decorative Blur blob behind the form */}
                        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#32c69a]/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                        {/* The Form Component */}
                        <div className="relative">
                            <ContactForm />
                            
                            {/* Social Links under the form */}
                            {/* <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <span className="text-sm font-medium text-gray-500">Ikuti kami di sosial media</span>
                                <div className="flex gap-3">
                                    <SocialLink href="https://facebook.com" icon={Facebook} />
                                    <SocialLink href="https://instagram.com" icon={Instagram} />
                                </div>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#32c69a] text-white border-t border-[#28a580]">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-md font-medium text-center md:text-left opacity-95">
                        &copy; {currentYear} RSU Deli Medan. All rights reserved.
                    </p>
                    {/* <div className="flex gap-6 text-xs font-medium opacity-90">
                        <Link href="#" className="hover:opacity-100 hover:underline">Privacy Policy</Link>
                    </div> */}
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: any }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noreferrer"
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#32c69a] hover:text-white hover:border-[#32c69a] transition-all duration-300 shadow-sm"
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}