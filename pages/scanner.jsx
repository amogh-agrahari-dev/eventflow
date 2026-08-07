import React, { useEffect, useState, useRef, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera,
    Scan,
    CheckCircle2,
    AlertCircle,
    RefreshCw,
    QrCode,
    ArrowRight,
    ShieldCheck,
    Zap,
    Sparkles,
    X,
    Copy,
    Check,
    Wifi,
    ChevronRight,
    UserCheck,
    Calendar,
    Layers,
    History
} from "lucide-react";
import clsx from "clsx";
import VolunteerLayout from "@/components/dashboard/volunteer/VolunteerLayout";

export default function QRScannerPage() {
    const [scannedText, setScannedText] = useState("");
    const [isScanning, setIsScanning] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [apiStatus, setApiStatus] = useState(null); // { type: 'loading' | 'success' | 'error', message: string, data?: any }
    const [manualUid, setManualUid] = useState("");
    const [scanHistory, setScanHistory] = useState([]);
    const [copiedUid, setCopiedUid] = useState(false);
    const scannerRef = useRef(null);

    // Load existing saved QR value & history on mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedValue = localStorage.getItem("savedQRCode");
            if (savedValue) setScannedText(savedValue);

            const savedHistory = localStorage.getItem("scannerHistory");
            if (savedHistory) {
                try {
                    setScanHistory(JSON.parse(savedHistory));
                } catch {
                    // Ignore parse errors
                }
            }
        }
    }, []);

    // Save history to localStorage
    const addHistoryItem = (item) => {
        setScanHistory((prev) => {
            const updated = [item, ...prev.slice(0, 9)];
            if (typeof window !== "undefined") {
                localStorage.setItem("scannerHistory", JSON.stringify(updated));
            }
            return updated;
        });
    };

    /**
     * Update Pass status to 'Active' via backend PUT endpoint
     * @param {string} passUid 
     */
    const updatePassStatus = async (passUid) => {
        if (!passUid || !passUid.trim()) return;
        const trimmedUid = passUid.trim();

        setIsUpdating(true);
        setApiStatus({
            type: "loading",
            message: `Activating pass "${trimmedUid}" on server...`,
        });

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

            // PUT /passes/{pass_uid} with body { status: "Active" }
            const response = await fetch(
                `${apiUrl}/passes/${encodeURIComponent(trimmedUid)}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: "Active",
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();

                // Haptic feedback if supported
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                    navigator.vibrate([100, 50, 100]);
                }

                setApiStatus({
                    type: "success",
                    message: `Pass "${trimmedUid}" successfully activated!`,
                    data,
                });

                addHistoryItem({
                    uid: trimmedUid,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    status: "Active",
                    success: true,
                    eventTitle: data?.event?.title || data?.event_title || null,
                });
            } else {
                const errData = await response.json().catch(() => ({}));
                const errorDetail = errData.detail || response.statusText || "Pass update failed";

                setApiStatus({
                    type: "error",
                    message:
                        response.status === 404
                            ? `Pass with UID "${trimmedUid}" was not found in the database.`
                            : `Server Error (${response.status}): ${errorDetail}`,
                });

                addHistoryItem({
                    uid: trimmedUid,
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                    status: "Failed",
                    success: false,
                    error: errorDetail,
                });
            }
        } catch (err) {
            console.error("API update error:", err);
            setApiStatus({
                type: "error",
                message: `Network error: Could not reach backend server at ${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
                    }.`,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    /**
     * Start html5-qrcode camera scanner
     */
    const startScanner = async () => {
        setErrorMessage("");
        setApiStatus(null);

        try {
            // Dynamic import for Next.js SSR compatibility
            const { Html5Qrcode, Html5QrcodeSupportedFormats } = await import("html5-qrcode");

            if (scannerRef.current) {
                await stopScanner();
            }

            const html5QrCode = new Html5Qrcode("reader", {
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                verbose: false,
            });

            scannerRef.current = html5QrCode;
            setIsScanning(true);

            const config = {
                fps: 15,
                qrbox: (viewfinderWidth, viewfinderHeight) => {
                    const minEdgePercentage = 0.72;
                    const minDimension = Math.min(viewfinderWidth, viewfinderHeight);
                    return {
                        width: Math.floor(minDimension * minEdgePercentage),
                        height: Math.floor(minDimension * minEdgePercentage),
                    };
                },
                aspectRatio: 1.0,
            };

            await html5QrCode.start(
                { facingMode: "environment" },
                config,
                async (decodedText) => {
                    const cleanText = decodedText.trim();
                    setScannedText(cleanText);
                    localStorage.setItem("savedQRCode", cleanText);

                    // Stop scanner after detection
                    await stopScanner();

                    // Immediately send PUT request to backend with the scanned pass_uid in the URL
                    updatePassStatus(cleanText);
                },
                () => { } // Frame-by-frame silent callback
            );
        } catch (err) {
            console.error("Scanner startup failure:", err);
            setIsScanning(false);
            setErrorMessage(
                err?.message || "Failed to access camera. Please ensure camera permissions are granted."
            );
        }
    };

    /**
     * Stop and clear html5-qrcode camera instance
     */
    const stopScanner = async () => {
        if (scannerRef.current) {
            try {
                if (scannerRef.current.isScanning) {
                    await scannerRef.current.stop();
                }
                scannerRef.current.clear();
            } catch (err) {
                console.error("Error stopping scanner:", err);
            } finally {
                scannerRef.current = null;
                setIsScanning(false);
            }
        }
    };

    // Ensure camera is safely released on unmount
    useEffect(() => {
        return () => {
            stopScanner();
        };
    }, []);

    const handleManualSubmit = (e) => {
        e.preventDefault();
        if (!manualUid.trim()) return;
        const cleanUid = manualUid.trim();
        setScannedText(cleanUid);
        localStorage.setItem("savedQRCode", cleanUid);
        updatePassStatus(cleanUid);
        setManualUid("");
    };

    const handleCopyUid = (uid) => {
        if (!uid) return;
        navigator.clipboard.writeText(uid);
        setCopiedUid(true);
        setTimeout(() => setCopiedUid(false), 2000);
    };

    return (
        <>
            <Head>
                <title>QR Pass Scanner & Entry Desk | EventFlow</title>
                <meta name="description" content="Scan attendee QR passes in real-time and instantly activate digital event entry." />
            </Head>

            <VolunteerLayout title="QR Pass Scanner & Check-in">
                <div className="space-y-6">

                    {/* Top Breadcrumbs / Station Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-vol-card border border-vol-border/60 shadow-lg">
                        <div className="flex items-center gap-3.5">
                            <div className="w-11 h-11 rounded-xl bg-vol-accent/15 border border-vol-accent/30 flex items-center justify-center text-vol-accent2 shrink-0 shadow-inner">
                                <Scan size={22} />
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                                        Attendee Check-in & Scanner Desk
                                    </h1>
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-vol-accent/20 text-vol-accent2 border border-vol-accent/30">
                                        Live Station
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Scan QR passes in real-time to verify credentials and update status to Active.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 self-start sm:self-auto">
                            <Link
                                href="/volunteer-dashboard"
                                className="px-3.5 py-2 rounded-xl bg-vol-bg hover:bg-vol-border/30 border border-vol-border text-xs font-medium text-gray-300 hover:text-white transition-colors cursor-pointer"
                            >
                                ← Dashboard
                            </Link>
                            <Link
                                href="/passes"
                                className="px-3.5 py-2 rounded-xl bg-vol-accent hover:bg-vol-accent2 text-xs font-medium text-white transition-colors shadow-glow-sm cursor-pointer"
                            >
                                Pass Wallet
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Left Column: Camera Viewfinder & Scanner Controls */}
                        <div className="lg:col-span-7 space-y-5">
                            <div className="rounded-2xl p-5 sm:p-6 bg-vol-card border border-vol-border relative overflow-hidden shadow-xl">
                                {/* Station Status Strip */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                        <Camera size={15} className="text-vol-accent2" />
                                        <span>Camera Viewport</span>
                                    </span>

                                    <span className={clsx(
                                        "px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition-all",
                                        isScanning
                                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse"
                                            : isUpdating
                                                ? "bg-vol-accent/20 text-vol-accent2 border-vol-accent/30"
                                                : "bg-vol-bg text-gray-400 border-vol-border"
                                    )}>
                                        <span className={clsx(
                                            "w-2 h-2 rounded-full",
                                            isScanning ? "bg-emerald-400" : isUpdating ? "bg-vol-accent2 animate-ping" : "bg-gray-500"
                                        )} />
                                        {isScanning ? "Scanning Active" : isUpdating ? "Activating..." : "Standby"}
                                    </span>
                                </div>

                                {/* Viewfinder Container */}
                                <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-vol-border min-h-[300px] sm:min-h-[340px] flex items-center justify-center">

                                    {/* html5-qrcode target element */}
                                    <div
                                        id="reader"
                                        className="w-full h-full min-h-[300px] flex items-center justify-center [&_video]:rounded-2xl [&_video]:object-cover"
                                    />

                                    {/* Laser Scan Animation Overlay when scanning */}
                                    {isScanning && (
                                        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
                                            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse" />
                                            <div className="text-center">
                                                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono text-cyan-300 border border-cyan-500/30">
                                                    Align QR Pass inside frame
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Placeholder when not scanning */}
                                    {!isScanning && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-vol-card/90 to-vol-bg z-10">
                                            <div className="w-16 h-16 rounded-2xl bg-vol-accent/15 border border-vol-accent/30 flex items-center justify-center text-vol-accent2 mb-3 shadow-inner">
                                                <QrCode size={32} />
                                            </div>
                                            <h3 className="text-base font-bold text-white mb-1">
                                                Camera is Idle
                                            </h3>
                                            <p className="text-xs text-gray-400 max-w-xs mb-5">
                                                Start the camera scanner to verify attendee passes and update status to <strong className="text-emerald-400">Active</strong> automatically.
                                            </p>
                                            <button
                                                onClick={startScanner}
                                                disabled={isUpdating}
                                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-vol-accent to-vol-accent2 hover:brightness-110 text-white font-bold text-xs flex items-center gap-2 shadow-glow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
                                            >
                                                <Camera size={16} />
                                                <span>Start Camera Scanner</span>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Scanner Controls / Errors */}
                                {errorMessage && (
                                    <div className="mt-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2.5">
                                        <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                                        <span className="leading-relaxed">{errorMessage}</span>
                                    </div>
                                )}

                                {/* Button bar when scanning */}
                                {isScanning && (
                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <button
                                            onClick={stopScanner}
                                            className="w-full py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-2"
                                        >
                                            <X size={15} />
                                            <span>Stop Scanner</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Manual Pass UID Input fallback */}
                            <div className="rounded-2xl p-5 bg-vol-card border border-vol-border space-y-3 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                        <Zap size={14} className="text-amber-400" />
                                        <span>Manual Pass UID Check-in</span>
                                    </span>
                                    <span className="text-[10px] text-gray-500">Backup Option</span>
                                </div>

                                <form onSubmit={handleManualSubmit} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={manualUid}
                                        onChange={(e) => setManualUid(e.target.value)}
                                        placeholder="Enter 12-char Pass UID (e.g. L8ODD7nLyn3x)"
                                        className="flex-1 bg-vol-bg border border-vol-border rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-vol-accent2 transition-colors font-mono"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isUpdating || !manualUid.trim()}
                                        className="px-4 py-2.5 rounded-xl bg-vol-accent hover:bg-vol-accent2 text-white text-xs font-bold transition-all shadow-glow-sm disabled:opacity-40 cursor-pointer whitespace-nowrap"
                                    >
                                        Activate Pass
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Column: Scan Result, Server Response & History */}
                        <div className="lg:col-span-5 space-y-5">

                            {/* Latest Result Card */}
                            <div className="rounded-2xl p-5 sm:p-6 bg-vol-card border border-vol-border space-y-4 shadow-xl">
                                <div className="flex items-center justify-between border-b border-vol-border/60 pb-3">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                        <ShieldCheck size={15} className="text-emerald-400" />
                                        <span>Scan Result & Status</span>
                                    </span>

                                    {scannedText && (
                                        <button
                                            onClick={() => handleCopyUid(scannedText)}
                                            className="text-[11px] text-gray-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                                        >
                                            {copiedUid ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                                            <span>{copiedUid ? "Copied" : "Copy UID"}</span>
                                        </button>
                                    )}
                                </div>

                                {/* Scanned UID Display */}
                                <div className="p-3.5 rounded-xl bg-vol-bg border border-vol-border">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                                        Detected Pass UID
                                    </span>
                                    <div className="font-mono text-base font-extrabold text-cyan-300 tracking-wider break-all">
                                        {scannedText || <span className="text-gray-600 font-sans font-normal text-xs">Waiting for scan...</span>}
                                    </div>
                                </div>

                                {/* API Status Feedback Banner */}
                                {apiStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={clsx(
                                            "p-4 rounded-xl border text-xs space-y-2",
                                            apiStatus.type === "loading" && "bg-indigo-500/10 border-indigo-500/30 text-indigo-300",
                                            apiStatus.type === "success" && "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
                                            apiStatus.type === "error" && "bg-rose-500/10 border-rose-500/30 text-rose-300"
                                        )}
                                    >
                                        <div className="flex items-start gap-2 font-bold">
                                            {apiStatus.type === "loading" && <RefreshCw size={15} className="animate-spin text-vol-accent2 shrink-0 mt-0.5" />}
                                            {apiStatus.type === "success" && <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />}
                                            {apiStatus.type === "error" && <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />}
                                            <span>{apiStatus.message}</span>
                                        </div>

                                        {/* Updated Pass Details Card */}
                                        {apiStatus.data && (
                                            <div className="mt-3 pt-3 border-t border-emerald-500/20 grid grid-cols-2 gap-2 text-[11px] text-gray-300">
                                                <div>
                                                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Status</span>
                                                    <span className="font-bold text-emerald-400 capitalize">{apiStatus.data.status || 'Active'}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-400 block text-[9px] uppercase font-bold">Pass ID</span>
                                                    <span className="font-mono text-white">#{apiStatus.data.id}</span>
                                                </div>
                                                {apiStatus.data.event && (
                                                    <div className="col-span-2">
                                                        <span className="text-gray-400 block text-[9px] uppercase font-bold">Event</span>
                                                        <span className="text-white font-medium truncate block">{apiStatus.data.event.title}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Scan Next Pass Action */}
                                <div className="pt-2">
                                    <button
                                        onClick={() => {
                                            setScannedText("");
                                            setApiStatus(null);
                                            startScanner();
                                        }}
                                        disabled={isScanning || isUpdating}
                                        className="w-full py-3 rounded-xl bg-vol-accent hover:bg-vol-accent2 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-glow-md cursor-pointer disabled:opacity-40"
                                    >
                                        <RefreshCw size={14} className={clsx(isScanning && "animate-spin")} />
                                        <span>Scan Next Pass</span>
                                    </button>
                                </div>
                            </div>

                            {/* Recent Scan History */}
                            <div className="rounded-2xl p-5 bg-vol-card border border-vol-border space-y-3 shadow-lg">
                                <div className="flex items-center justify-between border-b border-vol-border/60 pb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
                                        <History size={14} className="text-vol-accent2" />
                                        <span>Check-in History</span>
                                    </span>
                                    <span className="text-[10px] text-gray-500 font-mono">
                                        {scanHistory.length} Recorded
                                    </span>
                                </div>

                                {scanHistory.length === 0 ? (
                                    <p className="text-xs text-gray-500 italic py-2 text-center">
                                        No scans recorded in this session.
                                    </p>
                                ) : (
                                    <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                                        {scanHistory.map((item, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-between p-2.5 rounded-xl bg-vol-bg border border-vol-border text-xs"
                                            >
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={clsx(
                                                            "w-1.5 h-1.5 rounded-full shrink-0",
                                                            item.success ? "bg-emerald-400" : "bg-rose-400"
                                                        )} />
                                                        <span className="font-mono font-bold text-white truncate">
                                                            {item.uid}
                                                        </span>
                                                    </div>
                                                    {item.eventTitle && (
                                                        <span className="text-[10px] text-gray-400 truncate block mt-0.5">
                                                            {item.eventTitle}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="text-right shrink-0 ml-2">
                                                    <span className={clsx(
                                                        "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                                        item.success
                                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                    )}>
                                                        {item.status}
                                                    </span>
                                                    <span className="text-[9px] text-gray-500 block font-mono mt-0.5">
                                                        {item.time}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>

                </div>
            </VolunteerLayout>
        </>
    );
}