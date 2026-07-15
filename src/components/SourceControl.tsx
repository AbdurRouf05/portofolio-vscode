import { useState } from 'react';
import { VscChevronDown, VscChevronRight, VscGitCommit, VscRefresh } from "react-icons/vsc";

interface Commit {
    sha: string;
    message: string;
    repoName: string;
    date: string;
    url: string;
}

interface SourceControlProps {
    commits: Commit[];
    loading: boolean;
    activeTab: string;
    onOpenCommit: (commit: Commit) => void;
    isOpen: boolean;
    onRefresh: () => void;
}

const SourceControl = ({ commits, loading, activeTab, onOpenCommit, isOpen, onRefresh }: SourceControlProps) => {
    const [isCommitsOpen, setIsCommitsOpen] = useState(true);

    if (!isOpen) return null;

    return (
        <div className="w-full md:w-60 bg-vscode-sidebar text-vscode-text flex flex-col text-sm border-r border-black select-none h-full shrink-0">
            {/* Panel Title */}
            <div className="p-2 text-xs font-bold tracking-wider flex justify-between items-center text-gray-400">
                <span>SOURCE CONTROL</span>
                <div className="flex items-center gap-1.5">
                    <button 
                        onClick={onRefresh} 
                        className="hover:bg-gray-700 rounded p-1 cursor-pointer transition-colors"
                        title="Refresh Commits"
                    >
                        <VscRefresh className={loading ? "animate-spin text-vscode-accent" : ""} />
                    </button>
                    <span className="hover:bg-gray-700 rounded px-1 cursor-pointer">...</span>
                </div>
            </div>

            {/* Commit List Container */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div 
                    className="flex items-center cursor-pointer py-1 font-bold hover:bg-[#37373d] text-white border-b border-[#2b2b2b]"
                    onClick={() => setIsCommitsOpen(!isCommitsOpen)}
                >
                    {isCommitsOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
                    <span>COMMITS ({commits.length})</span>
                </div>

                {isCommitsOpen && (
                    <div className="flex flex-col py-1">
                        {loading ? (
                            <div className="px-4 py-3 text-xs text-gray-500 font-mono">Loading commits from GitHub...</div>
                        ) : commits.length === 0 ? (
                            <div className="px-4 py-3 text-xs text-gray-500 font-mono">No commits found.</div>
                        ) : (
                            commits.map((commit) => {
                                const tabName = `commit-${commit.sha}.diff`;
                                const isActive = activeTab === tabName;
                                return (
                                    <div 
                                        key={commit.sha}
                                        className={`flex flex-col py-1.5 px-3 cursor-pointer hover:bg-[#2a2d2e] transition-colors border-l-2 ${isActive ? 'bg-[#37373d] text-white border-vscode-accent' : 'border-transparent text-gray-400'}`}
                                        onClick={() => onOpenCommit(commit)}
                                    >
                                        <div className="flex items-center gap-1.5 font-medium text-xs text-gray-200">
                                            <VscGitCommit className="text-vscode-accent text-sm shrink-0" />
                                            <span className="truncate max-w-[140px]">{commit.message}</span>
                                            <span className="text-[10px] font-mono text-gray-500 bg-[#2d2d2d] px-1 rounded ml-auto">{commit.sha}</span>
                                        </div>
                                        <div className="pl-5 text-[10px] text-gray-500 flex justify-between items-center mt-0.5">
                                            <span className="truncate max-w-[110px]">{commit.repoName}</span>
                                            <span>{commit.date}</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SourceControl;
