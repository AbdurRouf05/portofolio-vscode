import { useState } from 'react';
import { VscChevronRight, VscChevronDown, VscFolder, VscFolderOpened, VscMarkdown } from "react-icons/vsc";
import { FaReact, FaJava } from "react-icons/fa";
import { SiDart, SiWhatsapp, SiLinkedin, SiGithub, SiGmail, SiLaravel } from "react-icons/si";

interface ExplorerProps {
    activeTab: string;
    onOpenFile: (fileName: string) => void;
    isOpen: boolean;
}

const Explorer = ({ activeTab, onOpenFile, isOpen }: ExplorerProps) => {
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [isSrcOpen, setIsSrcOpen] = useState(true);
    const [isPagesOpen, setIsPagesOpen] = useState(true);
    const [isProjectsOpen, setIsProjectsOpen] = useState(true);
    const [isContactOpen, setIsContactOpen] = useState(true);

    const FileItem = ({ name, icon, indent }: { name: string, icon: any, indent: string }) => (
        <div 
            className={`flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] transition-colors ${activeTab === name ? 'bg-[#37373d] text-white' : ''} ${indent}`}
            onClick={() => onOpenFile(name)}
        >
            <span className="mr-2 text-lg">{icon}</span>
            {name}
        </div>
    );

    const contactData = [
        { title: "Email", icon: <SiGmail className="text-red-500" />, url: "mailto:arackerman05@gmail.com" },
        { title: "WhatsApp", icon: <SiWhatsapp className="text-green-500" />, url: "https://wa.me/6283132974120" },
        { title: "LinkedIn", icon: <SiLinkedin className="text-blue-500" />, url: "https://www.linkedin.com/in/abdur-rouf-59aa23298/" },
        { title: "GitHub", icon: <SiGithub className="text-white" />, url: "https://github.com/Arackerman05" },
    ];

    if (!isOpen) return null;

    return (
        <div className="w-full md:w-60 bg-vscode-sidebar text-vscode-text flex flex-col text-sm border-r border-black select-none h-full shrink-0">
            <div className="p-2 text-xs font-bold tracking-wider flex justify-between items-center text-gray-400">
                <span>EXPLORER</span>
                <span className="hover:bg-gray-700 rounded px-1 cursor-pointer">...</span>
            </div>
            
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div 
                    className="flex items-center cursor-pointer py-1 font-bold hover:bg-[#37373d] text-white"
                    onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                >
                    {isPortfolioOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
                    <span>PORTFOLIO</span>
                </div>
                
                {isPortfolioOpen && (
                    <div className="flex flex-col">
                        <div className="flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] pl-4" onClick={() => setIsSrcOpen(!isSrcOpen)}>
                            {isSrcOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
                            {isSrcOpen ? <VscFolderOpened className="mr-2 text-blue-400" /> : <VscFolder className="mr-2 text-blue-400" />}
                            src
                        </div>

                        {isSrcOpen && (
                            <>
                                <div className="flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] pl-8" onClick={() => setIsPagesOpen(!isPagesOpen)}>
                                    {isPagesOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
                                    {isPagesOpen ? <VscFolderOpened className="mr-2 text-green-500" /> : <VscFolder className="mr-2 text-green-500" />}
                                    pages
                                </div>
                                {isPagesOpen && (
                                    <>
                                        <FileItem name="Home.tsx" icon={<FaReact className="text-blue-400"/>} indent="pl-12" />
                                        <FileItem name="About.tsx" icon={<FaReact className="text-blue-400"/>} indent="pl-12" />
                                        <FileItem name="Pendidikan.tsx" icon={<FaReact className="text-blue-400"/>} indent="pl-12" />
                                    </>
                                )}

                                <div className="flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] pl-8" onClick={() => setIsProjectsOpen(!isProjectsOpen)}>
                                    {isProjectsOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
                                    {isProjectsOpen ? <VscFolderOpened className="mr-2 text-orange-500" /> : <VscFolder className="mr-2 text-orange-500" />}
                                    projects
                                </div>
                                {isProjectsOpen && (
                                    <>
                                        <FileItem 
                                            name="KasirKopi.dart" 
                                            icon={<SiDart className="text-cyan-400"/>} 
                                            indent="pl-12" 
                                        />
                                        <FileItem 
                                            name="AntrianKlinik.java" 
                                            icon={<FaJava className="text-red-500"/>} 
                                            indent="pl-12" 
                                        />
                                        <FileItem 
                                            name="SPK_SAW.java" 
                                            icon={<FaJava className="text-red-500"/>} 
                                            indent="pl-12" 
                                        />
                                        {/* Menggunakan ekstensi .php dan icon Laravel */}
                                        <FileItem 
                                            name="WebPerpustakaan.php" 
                                            icon={<SiLaravel className="text-red-600"/>} 
                                            indent="pl-12" 
                                        />
                                    </>
                                )}
                            </>
                        )}
                        <FileItem name="README.md" icon={<VscMarkdown className="text-blue-200"/>} indent="pl-4" />
                    </div>
                )}

                <div 
                    className="flex items-center cursor-pointer py-1 font-bold hover:bg-[#37373d] text-white mt-2 border-t border-[#3e3e3e]"
                    onClick={() => setIsContactOpen(!isContactOpen)}
                >
                    {isContactOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
                    <span>CONTACT ME</span>
                </div>
                {isContactOpen && (
                    <div className="flex flex-col pb-4">
                         {contactData.map((item, index) => (
                             <a 
                                key={index} 
                                href={item.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex items-center py-1 pl-4 cursor-pointer hover:bg-[#2a2d2e] hover:text-white transition-colors text-gray-400 no-underline"
                             >
                                 <span className="mr-2 text-lg">{item.icon}</span>
                                 {item.title}
                             </a>
                         ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explorer;