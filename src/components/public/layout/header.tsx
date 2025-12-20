"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";

import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { SiInstagram, SiFacebook } from "@icons-pack/react-simple-icons";

import { NAVIGATION } from "@/config/navbar";

interface HeaderProps {
    socialUrls: {
        instagram: string;
        facebook: string;
    };
}

export default function Header({ socialUrls }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(
        null
    );

    // Fallback URLs if config is empty
    const instagramLink =
        socialUrls.instagram || "https://www.instagram.com/rsudeli/";
    const facebookLink =
        socialUrls.facebook || "https://www.facebook.com/rsu.deli.9";

    const toggleMobileSubmenu = (label: string) => {
        setOpenMobileSubmenu(openMobileSubmenu === label ? null : label);
    };

    return (
        <header className="w-full sticky lg:relative z-50 bg-white shadow-sm top-0">
            {/* --- Top Bar (Logo & Burger) --- */}
            <div className="container mx-auto px-4 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src={Logo}
                            alt="RSU Deli Logo"
                            width={120}
                            height={120}
                            className="h-10 w-auto md:h-14 lg:h-16"
                        />
                    </Link>

                    {/* Desktop Right Side (Socials & Phone) */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex items-center gap-3 text-gray-600">
                            <a
                                href={instagramLink}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#32c69a] transition-colors"
                                aria-label="Instagram"
                            >
                                <SiInstagram className="h-5 w-5" />
                            </a>
                            <a
                                href={facebookLink}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:text-[#32c69a] transition-colors"
                                aria-label="Facebook"
                            >
                                <SiFacebook className="h-5 w-5" />
                            </a>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                            <div className="bg-[#32c69a]/10 p-2 rounded-full">
                                <Phone className="h-4 w-4 text-[#32c69a]" />
                            </div>
                            <span>+62 61 4565 229</span>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-gray-600 hover:text-[#32c69a]"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-8 w-8" />
                    </button>
                </div>
            </div>

            {/* --- Mobile Hotline Bar --- */}
            <div className="lg:hidden bg-[#32c69a] text-white border-t border-white/20">
                <a
                    href="tel:+62614565229"
                    className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                >
                    <Phone className="h-4 w-4 fill-white" />
                    <span className="text-sm font-bold tracking-wide">
                        IGD / Info: +62 61 4565 229
                    </span>
                </a>
            </div>

            {/* --- Main Navigation (Desktop Only) --- */}
            <div className="hidden lg:block bg-gray-50 border-t border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <nav className="flex justify-between items-center h-14">
                        <ul className="flex flex-wrap items-center justify-between w-full gap-4 xl:gap-6">
                            {NAVIGATION.map((item) => (
                                <li
                                    key={item.label}
                                    className="relative group h-14 flex items-center"
                                >
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-[#32c69a] transition-colors py-4 px-1"
                                    >
                                        {item.label}
                                        {item.children && (
                                            <ChevronDown className="h-3 w-3 mt-0.5" />
                                        )}
                                    </Link>

                                    {/* Desktop Dropdown */}
                                    {item.children && (
                                        <div className="absolute top-full left-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 pt-2">
                                            <div className="bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden">
                                                {item.children.map(
                                                    (subItem) => (
                                                        <Link
                                                            key={subItem.label}
                                                            href={subItem.href}
                                                            className="block px-4 py-3 text-sm text-gray-600 hover:bg-[#32c69a] hover:text-white transition-colors"
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* --- Mobile Menu Overlay --- */}
            <div
                className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 lg:hidden ${
                    isMobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#32c69a] z-70 shadow-2xl transform transition-transform duration-300 lg:hidden overflow-y-auto ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col min-h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/20">
                        <span className="text-white text-xl font-bold">
                            Menu
                        </span>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-white hover:bg-white/20 p-1 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Mobile Links */}
                    <div className="flex-1 py-6 px-4">
                        <ul className="space-y-2">
                            {NAVIGATION.map((item) => (
                                <li
                                    key={item.label}
                                    className="border-b border-white/10 last:border-0"
                                >
                                    {item.children ? (
                                        <div>
                                            <button
                                                onClick={() =>
                                                    toggleMobileSubmenu(
                                                        item.label
                                                    )
                                                }
                                                className="w-full flex items-center justify-between py-3 text-white font-medium text-left"
                                            >
                                                {item.label}
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-200 ${
                                                        openMobileSubmenu ===
                                                        item.label
                                                            ? "rotate-180"
                                                            : ""
                                                    }`}
                                                />
                                            </button>

                                            {/* Mobile Submenu */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ${
                                                    openMobileSubmenu ===
                                                    item.label
                                                        ? "max-h-64 opacity-100"
                                                        : "max-h-0 opacity-0"
                                                }`}
                                            >
                                                <ul className="bg-black/10 rounded-lg mb-3">
                                                    {item.children.map(
                                                        (subItem) => (
                                                            <li
                                                                key={
                                                                    subItem.label
                                                                }
                                                            >
                                                                <Link
                                                                    href={
                                                                        subItem.href
                                                                    }
                                                                    onClick={() =>
                                                                        setIsMobileMenuOpen(
                                                                            false
                                                                        )
                                                                    }
                                                                    className="block px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-white/10"
                                                                >
                                                                    {
                                                                        subItem.label
                                                                    }
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            onClick={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                            className="block py-3 text-white font-medium hover:pl-2 transition-all"
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Socials */}
                    <div className="p-6 bg-black/10">
                        <div className="flex justify-center space-x-6">
                            <a
                                href={instagramLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white hover:text-gray-200"
                            >
                                <SiInstagram className="h-6 w-6" />
                            </a>
                            <a
                                href={facebookLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-white hover:text-gray-200"
                            >
                                <SiFacebook className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
