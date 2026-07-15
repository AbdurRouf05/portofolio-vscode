import { FaReact, FaJava } from "react-icons/fa";
import { 
    SiTypescript, SiJavascript, SiPython, SiGo, SiRust, SiDart, SiPhp
} from "react-icons/si";
import { VscClose, VscMarkdown, VscGitCommit } from "react-icons/vsc";

interface TabBarProps {
    openTabs: string[];       // Array nama file yang sedang terbuka
    activeTab: string;        // File yang sedang dilihat
    onActivate: (tab: string) => void;
    onClose: (tab: string, e: React.MouseEvent) => void;
}

const TabBar = ({ openTabs, activeTab, onActivate, onClose }: TabBarProps) => {
    
    // Helper icon (sama seperti explorer)
    const getIcon = (name: string) => {
        if (name.endsWith('tsx')) return <FaReact className="text-blue-400" />;
        if (name.endsWith('ts')) return <SiTypescript className="text-blue-400" />;
        if (name.endsWith('jsx')) return <FaReact className="text-yellow-400" />;
        if (name.endsWith('js')) return <SiJavascript className="text-yellow-400" />;
        if (name.endsWith('py')) return <SiPython className="text-yellow-300" />;
        if (name.endsWith('java')) return <FaJava className="text-red-500" />;
        if (name.endsWith('php')) return <SiPhp className="text-blue-500" />;
        if (name.endsWith('dart')) return <SiDart className="text-cyan-400" />;
        if (name.endsWith('go')) return <SiGo className="text-cyan-400" />;
        if (name.endsWith('rs')) return <SiRust className="text-orange-500" />;
        if (name.endsWith('diff')) return <VscGitCommit className="text-vscode-accent" />;
        if (name.endsWith('md')) return <VscMarkdown className="text-blue-200" />;
        return <FaReact className="text-blue-400" />;
    };

    return (
        <div className="flex bg-[#252526] h-9 items-center overflow-x-auto border-b border-black scrollbar-hide">
            {openTabs.map((tab) => (
                <div 
                    key={tab}
                    onClick={() => onActivate(tab)}
                    className={`
                        group flex items-center px-3 py-2 min-w-fit cursor-pointer h-full text-sm border-r border-[#1e1e1e]
                        ${activeTab === tab ? 'bg-[#1e1e1e] text-white border-t-2 border-t-vscode-accent' : 'bg-[#2d2d2d] text-gray-400 hover:bg-[#2d2d2d]/80'}
                    `}
                >
                    <span className="mr-2">{getIcon(tab)}</span>
                    <span className="mr-2">{tab}</span>
                    <span 
                        onClick={(e) => onClose(tab, e)}
                        className={`rounded-md p-0.5 hover:bg-gray-600 ${activeTab === tab ? 'visible' : 'invisible group-hover:visible'}`}
                    >
                        <VscClose size={14} />
                    </span>
                </div>
            ))}
        </div>
    );
};

export default TabBar;