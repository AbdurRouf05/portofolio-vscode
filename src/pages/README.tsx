import { motion } from "framer-motion";
import { FaReact } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiFramer } from "react-icons/si";

const Readme = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 md:p-10 max-w-4xl mx-auto"
        >
            <div className="border-b border-gray-700 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Portfolio VS Code Theme</h1>
                <p className="text-gray-400">Project ini dibangun untuk mensimulasikan pengalaman coding environment yang nyata.</p>
            </div>

            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-200 mb-4 border-b border-gray-700 pb-2">Core Technology</h2>
                <div className="flex items-center gap-6 bg-[#252526] p-6 rounded-xl border border-blue-500/30">
                    <FaReact className="text-7xl text-blue-400 animate-spin-slow" />
                    <div>
                        <h3 className="text-2xl font-bold text-white">React + Vite</h3>
                        <p className="text-gray-400 mt-1">Library UI utama dengan build tool super cepat.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#252526] p-4 rounded-lg border border-transparent hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <SiTypescript className="text-blue-600 text-2xl" />
                        <h3 className="font-bold text-gray-200">TypeScript</h3>
                    </div>
                    <p className="text-sm text-gray-400">Keamanan tipe data dan struktur kode yang solid.</p>
                </div>

                <div className="bg-[#252526] p-4 rounded-lg border border-transparent hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <SiTailwindcss className="text-cyan-400 text-2xl" />
                        <h3 className="font-bold text-gray-200">Tailwind CSS</h3>
                    </div>
                    <p className="text-sm text-gray-400">Styling utility-first yang cepat.</p>
                </div>

                <div className="bg-[#252526] p-4 rounded-lg border border-transparent hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                        <SiFramer className="text-white text-2xl" />
                        <h3 className="font-bold text-gray-200">Framer Motion</h3>
                    </div>
                    <p className="text-sm text-gray-400">Animasi layout yang halus.</p>
                </div>
            </div>
        </motion.div>
    );
};

export default Readme;