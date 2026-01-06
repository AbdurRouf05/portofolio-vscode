import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscChevronLeft, VscChevronRight, VscGithubInverted, VscGlobe } from "react-icons/vsc";

interface ProjectDetailProps {
    title: string;
    description: string;
    images: string[]; // Sekarang menerima Array gambar
    techStack: string[];
    features?: string[];
    demoUrl?: string;
    repoUrl?: string;
}

const ProjectDetail = ({ title, description, images, techStack, features, demoUrl, repoUrl }: ProjectDetailProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto Scroll Logic
    useEffect(() => {
        if (isHovered) return; // Pause kalau mouse sedang di atas gambar
        
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Ganti gambar setiap 3 detik

        return () => clearInterval(timer);
    }, [images.length, isHovered]);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 md:p-10 font-sans text-gray-300 max-w-6xl mx-auto pb-20"
        >
            {/* Header: Title & Tech Stack */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">{title}</h1>
                <div className="flex flex-wrap gap-2">
                    {techStack.map((tech, index) => (
                        <span key={index} className="px-3 py-1 text-xs font-mono rounded bg-[#2d2d2d] text-blue-300 border border-blue-500/20">
                            #{tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Layout Grid: Gallery (Kiri/Atas) & Info (Kanan/Bawah) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                
                {/* 1. Image Carousel Section (Lebar 2 Kolom) */}
                <div className="lg:col-span-2 space-y-4">
                    <div 
                        className="relative aspect-video bg-[#1e1e1e] rounded-xl overflow-hidden border border-gray-700 shadow-2xl group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={currentIndex}
                                src={images[currentIndex]} 
                                alt={`Project Screenshot ${currentIndex + 1}`} 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Navigation Arrows (Muncul saat hover) */}
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-vscode-accent"
                        >
                            <VscChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-vscode-accent"
                        >
                            <VscChevronRight size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-vscode-accent w-6' : 'bg-gray-500/50 hover:bg-white'}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Small Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-20 h-14 md:w-24 md:h-16 shrink-0 rounded cursor-pointer overflow-hidden border-2 transition-all ${idx === currentIndex ? 'border-vscode-accent opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                            >
                                <img src={img} alt="thumb" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Info Section (Lebar 1 Kolom) */}
                <div className="space-y-8">
                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {demoUrl && (
                            <a href={demoUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-vscode-accent text-white rounded-lg hover:bg-blue-600 transition-all font-medium shadow-lg hover:shadow-blue-500/20">
                                <VscGlobe /> Live Demo
                            </a>
                        )}
                        {repoUrl && (
                            <a href={repoUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#3c3c3c] text-white rounded-lg hover:bg-[#4c4c4c] transition-all font-medium border border-gray-600">
                                <VscGithubInverted /> Repository
                            </a>
                        )}
                    </div>

                    <div className="bg-[#252526] p-6 rounded-lg border border-gray-700/50">
                        <h3 className="text-lg font-bold text-white mb-3 border-b border-gray-700 pb-2">About Project</h3>
                        <p className="leading-relaxed text-gray-400 text-sm">
                            {description}
                        </p>
                    </div>

                    {features && (
                        <div>
                            <h3 className="text-lg font-bold text-white mb-3">Key Features</h3>
                            <ul className="space-y-2">
                                {features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-400">
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-vscode-accent shrink-0"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectDetail;