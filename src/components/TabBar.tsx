import { FaReact, FaMarkdown } from "react-icons/fa";
import { SiTypescript, SiJavascript } from "react-icons/si";
import { VscClose } from "react-icons/vsc";

interface TabBarProps {
    openTabs: string[];       // Array nama file yang sedang terbuka
    activeTab: string;        // File yang sedang dilihat
    onActivate: (tab: string) => void;
    onClose: (tab: string, e: React.MouseEvent) => void;
}

const TabBar = ({ openTabs, activeTab, onActivate, onClose }: TabBarProps) => {
    
    // Helper icon (sama seperti explorer, idealnya dipisah ke utils)
    const getIcon = (name: string) => {
        if (name.endsWith('tsx')) return <FaReact className="text-blue-400" />;
        if (name.endsWith('ts')) return <SiTypescript className="text-blue-500" />;
        if (name.endsWith('js')) return <SiJavascript className="text-yellow-400" />;
        if (name.endsWith('cpp')) return <span className="text-blue-700 font-bold text-xs">C++</span>;
        if (name.endsWith('md')) return <FaMarkdown className="text-blue-200" />;
        return <FaReact />;
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