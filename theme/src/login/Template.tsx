import { useState, useRef, useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import type { KcContext } from "./KcContext";
import type { I18n } from "./i18n";
import {
    Moon,
    Sun,
    ChevronDown,
    AlertCircle,
    CheckCircle2,
    Info
} from "lucide-react";

import logoWefgis from "../assets/logo.jpeg";
import logoUndiksha from "../assets/logoUndiksha.png";
import logoKmutt from "../assets/logoKmutt.png";
import logoKgeo from "../assets/logoKgeo.png";
import logoTrpl from "../assets/logoTrpl.png";
import logoIlkom from "../assets/logoIlkom.png";
import logoFlowgis from "../assets/logoFlowgis.png";
import logoVoxagis from "../assets/logoVoxagis.png";
import logoGrovia from "../assets/logoGrovia.png";
import logoSiPetani from "../assets/logoSiPetani.jpeg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayMessage = true,
        headerNode,
        socialProvidersNode = null,
        infoNode = null,
        kcContext,
        i18n,
        children
    } = props;

    const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
    const { message } = kcContext;

    // Dark Mode State
    const [isDark, setIsDark] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("wefgis-theme");
            if (saved) return saved === "dark";
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("wefgis-theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("wefgis-theme", "light");
        }
    }, [isDark]);

    // Language Dropdown State
    const [langOpen, setLangOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // 3 Bahasa: English, Bahasa Indonesia, Thai
    const supportedLanguages = [
        { label: "English", languageTag: "en", flag: "EN" },
        { label: "Bahasa Indonesia", languageTag: "id", flag: "ID" },
        { label: "ไทย (Thai)", languageTag: "th", flag: "TH" }
    ];

    const languagesList = supportedLanguages.map(l => {
        const found = enabledLanguages?.find(el => el.languageTag === l.languageTag);
        return {
            label: l.label,
            languageTag: l.languageTag,
            href: found?.href || `?kc_locale=${l.languageTag}`,
            flag: l.flag
        };
    });

    const currentTag = currentLanguage?.languageTag || "en";
    const currentLang = languagesList.find(l => l.languageTag === currentTag) || languagesList[0];

    const handleSelectLanguage = (tag: string) => {
        setLangOpen(false);
        const target = languagesList.find(l => l.languageTag === tag);
        if (target?.href) {
            window.location.href = target.href;
            return;
        }
        const url = new URL(window.location.href);
        url.searchParams.set("kc_locale", tag);
        window.location.href = url.toString();
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-50/60 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
            {/* Kartu Utama: 2 Kolom di Desktop (Gaya SSO Undiksha) */}
            <div className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col lg:flex-row transition-all min-h-[640px]">
                
                {/* SISI KIRI: Informasi, Visi, Misi, Collaborators (Tanpa Scrollbar, Bersih & Pas) */}
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8] to-[#1e429f] text-white flex-col justify-between p-8 relative overflow-hidden select-none">
                    {/* Background Glow Effect */}
                    <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                    {/* Bagian Atas: Logo Undiksha & KMUTT Besar Tanpa Background */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-center justify-center gap-8 py-2 w-full">
                            <img
                                src={logoUndiksha}
                                alt="Universitas Pendidikan Ganesha"
                                className="h-20 sm:h-24 w-auto max-w-[145px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
                            />
                            <div className="h-16 w-px bg-white/25" />
                            <img
                                src={logoKmutt}
                                alt="KMUTT"
                                className="h-20 sm:h-24 w-auto max-w-[145px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
                            />
                        </div>
                    </div>

                    {/* Konten Tengah: Our Vision & Our Mission (Center, Tanpa Bullet, Tanpa Scrollbar) */}
                    <div className="relative z-10 my-auto py-4 space-y-6 text-center flex flex-col items-center w-full">
                        {/* Our Vision */}
                        <div className="w-full">
                            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-200 mb-2 text-center">
                                {msg("ourVisionTitle")}
                            </h2>
                            <p className="text-blue-100 text-xs sm:text-[13px] leading-relaxed max-w-md mx-auto">
                                {msg("ourVisionContent")}
                            </p>
                        </div>

                        {/* Our Mission */}
                        <div className="w-full">
                            <h2 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-blue-200 mb-2 text-center">
                                {msg("ourMissionTitle")}
                            </h2>
                            <p className="text-blue-100 text-xs sm:text-[13px] leading-relaxed max-w-md mx-auto">
                                {msg("ourMissionContent")}
                            </p>
                        </div>
                    </div>

                    {/* Bagian Bawah: Collaborators Center */}
                    <div className="relative z-10 pt-4 border-t border-white/20 flex flex-col items-center text-center">
                        <p className="text-[11px] font-bold tracking-wider uppercase text-blue-200 mb-2.5">
                            {msg("collaboratorsTitle")}
                        </p>
                        <div className="flex items-center justify-center gap-2.5 flex-wrap">
                            {[
                                { name: "Undiksha", logo: logoUndiksha },
                                { name: "KMUTT", logo: logoKmutt },
                                { name: "KGEO", logo: logoKgeo },
                                { name: "TRPL", logo: logoTrpl },
                                { name: "ILKOM", logo: logoIlkom }
                            ].map(collab => (
                                <div
                                    key={collab.name}
                                    title={collab.name}
                                    className="bg-white rounded-lg p-1.5 shadow-sm flex items-center justify-center h-9 w-14 hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={collab.logo}
                                        alt={collab.name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SISI KANAN: Form & Kontrol Bahasa / Tema (Tampil di Semua Ukuran Layar) */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative">
                    {/* Header Utilitas: Bahasa (EN/ID/TH) & Toggle Tema di Pojok Kanan Atas */}
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                        {/* Dropdown 3 Bahasa */}
                        <div className="relative" ref={langRef}>
                            <button
                                type="button"
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                                aria-label={msgStr("language")}
                                aria-expanded={langOpen}
                            >
                                <span className="uppercase font-semibold">{currentLang.flag}</span>
                                <ChevronDown className="w-3 h-3 opacity-60" aria-hidden="true" />
                            </button>

                            {langOpen && (
                                <div className="absolute right-0 mt-1.5 w-44 rounded-lg py-1 z-50 shadow-xl border bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-700">
                                    {languagesList.map(l => (
                                        <button
                                            key={l.languageTag}
                                            type="button"
                                            onClick={() => handleSelectLanguage(l.languageTag)}
                                            className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                                                l.languageTag === currentTag
                                                    ? "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-semibold"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
                                            }`}
                                        >
                                            <span>{l.label}</span>
                                            <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500">{l.flag}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Toggle Tema Gelap / Terang */}
                        <button
                            type="button"
                            onClick={() => setIsDark(!isDark)}
                            className="p-1 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                            title={msgStr("toggleTheme")}
                            aria-label={msgStr("toggleTheme")}
                        >
                            {isDark ? (
                                <Sun className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                            ) : (
                                <Moon className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                            )}
                        </button>
                    </div>

                    {/* Area Form Tengah */}
                    <div className="w-full max-w-sm mx-auto mt-4 sm:mt-2">
                        {/* Brand Logo & Header Form */}
                        <div className="flex flex-col items-center text-center mb-5">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 dark:border-slate-700 p-1.5 flex items-center justify-center mb-2.5 transition-transform hover:scale-105">
                                <img
                                    src={logoWefgis}
                                    alt="WEFGIS"
                                    className="w-full h-full object-contain rounded-xl"
                                />
                            </div>
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                {headerNode ?? msg("loginCardTitle")}
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {msg("wefgisSubtitle")}
                            </p>

                            {/* Logo Masing-Masing Aplikasi: Terlihat Terang & Jelas di Mode Gelap */}
                            <div className="mt-3.5 w-full flex flex-col items-center">
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                    {[
                                        { name: "FlowGIS", logo: logoFlowgis },
                                        { name: "VoxaGIS", logo: logoVoxagis },
                                        { name: "Grovia", logo: logoGrovia },
                                        { name: "SiPetani", logo: logoSiPetani }
                                    ].map(app => (
                                        <div
                                            key={app.name}
                                            title={app.name}
                                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:shadow-xs transition-all"
                                        >
                                            {/* Container Putih Khusus agar Logo Transparan Terlihat Terang di Mode Gelap */}
                                            <div className="h-5 w-5 rounded bg-white p-0.5 flex items-center justify-center shadow-2xs shrink-0 dark:ring-1 dark:ring-white/20">
                                                <img
                                                    src={app.logo}
                                                    alt={app.name}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>
                                            <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                                                {app.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Alert Notifikasi Global */}
                        {displayMessage && message !== undefined && (message.type !== "warning" || !kcContext.isAppInitiatedAction) && (
                            <div
                                className={`p-3 rounded-lg text-xs flex items-start gap-2.5 mb-4 border ${
                                    message.type === "error"
                                        ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300"
                                        : message.type === "success"
                                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/60 text-emerald-700 dark:text-emerald-300"
                                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                                }`}
                                role="alert"
                            >
                                {message.type === "error" && <AlertCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />}
                                {message.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 mt-0.5" />}
                                {message.type !== "error" && message.type !== "success" && <Info className="w-4 h-4 shrink-0 text-slate-500 mt-0.5" />}
                                <div
                                    className="leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: message.summary }}
                                />
                            </div>
                        )}

                        {/* Isi Form Input */}
                        {children}

                        {/* Social Login (Google dsb.) */}
                        {socialProvidersNode}

                        {/* Link Registrasi / Navigasi Tambahan */}
                        {infoNode}
                    </div>

                    {/* Footer Hak Cipta */}
                    <div className="w-full text-center mt-6 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            {msg("copyrightText")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
