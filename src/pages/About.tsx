import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaJava, FaPython, FaNodeJs, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiFlutter, SiDart, SiMysql, SiFigma } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import Typewriter from "../components/Typewriter";

const About = () => {
    const techStack = [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
        { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
        { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
        { name: "React", icon: <FaReact className="text-blue-400" /> },
        { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
        { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
        { name: "Flutter", icon: <SiFlutter className="text-cyan-500" /> },
        { name: "Dart", icon: <SiDart className="text-blue-400" /> },
        { name: "Java", icon: <FaJava className="text-red-500" /> },
        { name: "Python", icon: <FaPython className="text-blue-300" /> },
        { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
        { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
        { name: "Figma", icon: <SiFigma className="text-pink-500" /> },
        { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
        { name: "GitHub", icon: <FaGithub className="text-white" /> },
        { name: "VS Code", icon: <VscVscode className="text-blue-500" /> },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 1.5 } // Delay icon muncul nunggu text agak banyak
        }
    };

    const item = {
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
    };

    // Teks Deskripsi Panjang
    const descriptionText = " Halo! Saya Abdur Rouf. Saya berasal dari Jawa Timur. Saya memiliki ketertarikan mendalam dalam membangun aplikasi web dan mobile yang modern, efisien, dan mudah digunakan. Suka bereksperimen dengan teknologi baru dan mengubah baris kode menjadi solusi nyata.";

    return (
        <div className="p-6 md:p-10 font-sans text-gray-300">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 max-w-3xl"
            >
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    About Me <span className="text-vscode-accent text-sm font-mono animate-pulse">_</span>
                </h2>
                
                {/* ANIMASI TYPEWRITER UNTUK DESKRIPSI */}
                <div className="leading-relaxed text-gray-400 min-h-[100px]">
                    <Typewriter 
                        text={descriptionText} 
                        speed={20}       // Lebih cepat biar gak nunggu lama
                        delay={500}      // Delay dikit pas masuk
                        hideCursorOnComplete 
                    />
                </div>
            </motion.div>

            <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
            
            {/* Grid Tech Stack (Muncul setelah text mulai ngetik) */}
            <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            >
                {techStack.map((tech, idx) => (
                    <motion.div 
                        key={idx} 
                        variants={item}
                        className="flex flex-col items-center justify-center p-4 bg-[#252526] rounded-lg hover:bg-[#2d2d2d] transition-colors border border-transparent hover:border-vscode-accent group"
                    >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                            {tech.icon}
                        </div>
                        <span className="text-xs font-mono text-gray-400">{tech.name}</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default About;