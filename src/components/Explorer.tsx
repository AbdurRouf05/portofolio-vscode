import { useState } from 'react';
import { 
    VscChevronRight, VscChevronDown, VscFolder, VscFolderOpened, 
    VscMarkdown, VscLock, VscOrganization 
} from "react-icons/vsc";
import { FaReact, FaJava } from "react-icons/fa";
import { 
    SiDart, SiWhatsapp, SiLinkedin, SiGithub, SiGmail, SiLaravel, 
    SiTypescript, SiJavascript, SiPython, SiHtml5, SiCss3, SiGo, SiRust, SiPhp 
} from "react-icons/si";

interface Repository {
    id: number;
    name: string;
    description: string;
    language: string;
    html_url: string;
    homepage: string;
    topics: string[];
    fileName: string;
    isPrivate?: boolean;
    isCollaborator?: boolean;
    role?: string;
}

interface ExplorerProps {
    activeTab: string;
    onOpenFile: (fileName: string) => void;
    isOpen: boolean;
    projects: Repository[];
    loading: boolean;
}

const Explorer = ({ activeTab, onOpenFile, isOpen, projects, loading }: ExplorerProps) => {
    const [isPortfolioOpen, setIsPortfolioOpen] = useState(true);
    const [isSrcOpen, setIsSrcOpen] = useState(true);
    const [isPagesOpen, setIsPagesOpen] = useState(true);
    const [isProjectsOpen, setIsProjectsOpen] = useState(true);
    const [isContactOpen, setIsContactOpen] = useState(true);
    
    // Collapsed state for each programming language folder (expanded by default)
    const [collapsedLanguages, setCollapsedLanguages] = useState<Record<string, boolean>>({});

    const toggleLanguage = (lang: string) => {
        setCollapsedLanguages(prev => ({ ...prev, [lang]: !prev[lang] }));
    };

    const FileItem = ({ name, icon, indent, badge }: { name: string, icon: any, indent: string, badge?: any }) => (
        <div 
            className={`flex items-center justify-between py-1 pr-2 cursor-pointer hover:bg-[#2a2d2e] transition-colors ${activeTab === name ? 'bg-[#37373d] text-white' : ''} ${indent}`}
            onClick={() => onOpenFile(name)}
        >
            <div className="flex items-center min-w-0">
                <span className="mr-2 text-lg shrink-0">{icon}</span>
                <span className="truncate">{name}</span>
            </div>
            {badge}
        </div>
    );

    const getLanguageIcon = (lang: string | null) => {
        if (!lang) return <VscMarkdown className="text-blue-200"/>;
        const l = lang.toLowerCase();
        if (l === 'typescript') return <SiTypescript className="text-blue-400"/>;
        if (l === 'javascript') return <SiJavascript className="text-yellow-400"/>;
        if (l === 'python') return <SiPython className="text-yellow-300"/>;
        if (l === 'java') return <FaJava className="text-red-500"/>;
        if (l === 'php') return <SiPhp className="text-blue-500"/>;
        if (l === 'laravel') return <SiLaravel className="text-red-600"/>;
        if (l === 'html') return <SiHtml5 className="text-orange-500"/>;
        if (l === 'css') return <SiCss3 className="text-blue-500"/>;
        if (l === 'go') return <SiGo className="text-cyan-400"/>;
        if (l === 'rust') return <SiRust className="text-orange-500"/>;
        if (l === 'dart') return <SiDart className="text-cyan-400"/>;
        return <VscMarkdown className="text-blue-200"/>;
    };

    // Group projects by programming language
    const groupedProjects = projects.reduce((acc, project) => {
        const lang = project.language || 'Other';
        if (!acc[lang]) acc[lang] = [];
        acc[lang].push(project);
        return acc;
    }, {} as Record<string, Repository[]>);

    const contactData = [
        { title: "Email", icon: <SiGmail className="text-red-500" />, url: "mailto:arackerman05@gmail.com" },
        { title: "WhatsApp", icon: <SiWhatsapp className="text-green-500" />, url: "https://wa.me/6283132974120" },
        { title: "LinkedIn", icon: <SiLinkedin className="text-blue-500" />, url: "https://www.linkedin.com/in/abdur-rouf-59aa23298/" },
        { title: "GitHub", icon: <SiGithub className="text-white" />, url: "https://github.com/AbdurRouf05" },
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
                                        {loading ? (
                                            <div className="pl-12 py-1 text-xs text-gray-500 font-mono">Loading projects...</div>
                                        ) : projects.length === 0 ? (
                                            <div className="pl-12 py-1 text-xs text-gray-500 font-mono">No projects found.</div>
                                        ) : (
                                            Object.entries(groupedProjects).map(([language, langProjects]) => {
                                                const isCollapsed = collapsedLanguages[language];
                                                return (
                                                    <div key={language} className="flex flex-col">
                                                        {/* Language Folder */}
                                                        <div 
                                                            className="flex items-center py-1 cursor-pointer hover:bg-[#2a2d2e] pl-12 text-gray-400 font-semibold"
                                                            onClick={() => toggleLanguage(language)}
                                                        >
                                                            {isCollapsed ? <VscChevronRight className="mr-1" /> : <VscChevronDown className="mr-1" />}
                                                            {isCollapsed ? <VscFolder className="mr-2 text-yellow-600/80" /> : <VscFolderOpened className="mr-2 text-yellow-600/80" />}
                                                            <span>{language}</span>
                                                        </div>

                                                        {/* Project Files */}
                                                        {!isCollapsed && langProjects.map(project => {
                                                            let badge = null;
                                                            if (project.isPrivate) {
                                                                badge = <VscLock className="text-red-500 ml-1 text-sm shrink-0" title="Private Repository" />;
                                                            } else if (project.isCollaborator) {
                                                                badge = <VscOrganization className="text-green-500 ml-1 text-sm shrink-0" title="Collaborator Project" />;
                                                            }
                                                            return (
                                                                <FileItem 
                                                                    key={project.id}
                                                                    name={project.fileName} 
                                                                    icon={getLanguageIcon(project.language)} 
                                                                    indent="pl-16" 
                                                                    badge={badge}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })
                                        )}
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