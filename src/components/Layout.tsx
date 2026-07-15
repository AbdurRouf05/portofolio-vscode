import { useState, useEffect, Suspense, lazy, useRef } from 'react';
import Sidebar from './Sidebar';
import Explorer from './Explorer';
import SourceControl from './SourceControl';
import TabBar from './TabBar';
import StatusBar from './StatusBar';
import GitDiff from './GitDiff';
import Markdown from './Markdown';
import { 
    VscLoading, VscPlay, VscMarkdown, VscSplitHorizontal, 
    VscCode, VscTerminal, VscLock, VscOrganization 
} from "react-icons/vsc";

// --- LAZY LOADING STATIC PAGES ---
const Welcome = lazy(() => import('../pages/Welcome'));
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Pendidikan = lazy(() => import('../pages/Pendidikan'));
const Readme = lazy(() => import('../pages/README'));

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

interface Commit {
    sha: string;
    message: string;
    repoName: string;
    date: string;
    url: string;
}

const CACHE_TIME = 60 * 60 * 1000; // 1 hour caching for API stability

const getExtension = (lang: string | null): string => {
    if (!lang) return 'md';
    const l = lang.toLowerCase();
    if (l === 'typescript') return 'tsx';
    if (l === 'javascript') return 'js';
    if (l === 'python') return 'py';
    if (l === 'java') return 'java';
    if (l === 'php') return 'php';
    if (l === 'html') return 'html';
    if (l === 'css') return 'css';
    if (l === 'go') return 'go';
    if (l === 'rust') return 'rs';
    if (l === 'dart') return 'dart';
    return 'md';
};

// Static Private & Collaborator Projects Showcase
const staticEnrichments: Repository[] = [
    {
        id: 9901,
        name: "seagma-presensi",
        description: "Sistem absensi dan presensi digital terintegrasi untuk Sagamuda.",
        language: "TypeScript",
        html_url: "", 
        homepage: "",
        topics: ["nextjs", "react", "attendance-system"],
        fileName: "seagma-presensi.tsx",
        isCollaborator: true,
        role: "Software Engineer (Collaborator)"
    },
    {
        id: 9902,
        name: "kalibra",
        description: "Platform Kalibra untuk Kotchi Center.",
        language: "TypeScript",
        html_url: "",
        homepage: "",
        topics: ["react", "nextjs", "education"],
        fileName: "kalibra.tsx",
        isCollaborator: true,
        role: "Software Engineer (Collaborator)"
    },
    {
        id: 9904,
        name: "berita",
        description: "Portal CMS berita digital kolaborasi dengan Nibras Senna.",
        language: "TypeScript",
        html_url: "",
        homepage: "",
        topics: ["nextjs", "cms", "news-portal"],
        fileName: "berita.tsx",
        isCollaborator: true,
        role: "Full Stack Developer (Collaborator)"
    }
];

const fallbackRepos: Repository[] = [
    {
        id: 1,
        name: "desa-huntap",
        description: "Sistem Informasi Geografis & Manajemen Hunian Tetap Pascabencana Alam.",
        language: "TypeScript",
        html_url: "https://github.com/AbdurRouf05/desa-huntap",
        homepage: "https://desa-huntap.vercel.app",
        topics: ["react", "nextjs", "leaflet", "tailwind-css"],
        fileName: "desa-huntap.tsx"
    },
    {
        id: 2,
        name: "kelontong-sync",
        description: "Aplikasi sinkronisasi inventaris dan kasir toko kelontong offline-to-online.",
        language: "TypeScript",
        html_url: "https://github.com/AbdurRouf05/kelontong-sync",
        homepage: "https://kelontong-sync.vercel.app",
        topics: ["nextjs", "supabase", "indexeddb", "pwa"],
        fileName: "kelontong-sync.tsx"
    },
    {
        id: 4,
        name: "prediksi_harga_rumah",
        description: "Model prediksi harga rumah berbasis machine learning dengan regresi linear.",
        language: "Python",
        html_url: "https://github.com/AbdurRouf05/prediksi_harga_rumah",
        homepage: "",
        topics: ["python", "scikit-learn", "numpy", "pandas"],
        fileName: "prediksi_harga_rumah.py"
    }
];

const fallbackCommits: Commit[] = [
    {
        sha: "7a2b9fd",
        message: "feat: add nextjs frontend and vercel integration",
        repoName: "desa-huntap",
        date: "7/6/2026",
        url: "https://github.com/AbdurRouf05/desa-huntap"
    },
    {
        sha: "3d9c2ea",
        message: "fix: update db syncing and concurrency limits",
        repoName: "kelontong-sync",
        date: "6/25/2026",
        url: "https://github.com/AbdurRouf05/kelontong-sync"
    }
];

const getPrivateProjectReadme = (project: Repository): string => {
    return `# [PRIVATE REPOSITORY] ${project.name}

**Role:** ${project.role || 'Software Engineer'}
**Tech Stack:** ${project.topics.map(t => `\`#${t}\``).join(' ')}

## Project Overview
${project.description}

## Key Technical Contributions & Architecture
- **System Architecture**: Designed and implemented scalable service components, improving overall system latency.
- **Security & Authorization**: Integrated secure Authentication mechanisms and Role-Based Access Control (RBAC).
- **CI/CD & Cloud Deployment**: Set up automatic testing and deployment pipelines to ensure high reliability.
- **Database Optimization**: Developed optimized schemas and indexed relational data for high-throughput query performance.

> [!NOTE]
> The source code for this project is private and hosted within a secure enterprise organization. It cannot be shared publicly due to Non-Disclosure Agreements (NDA) and intellectual property regulations.
`;
};

const Layout = () => {
    // Layout and Sidebar views
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [sidebarView, setSidebarView] = useState<'explorer' | 'git'>('explorer');
    const [openTabs, setOpenTabs] = useState<string[]>(['Welcome.tsx']); 
    const [activeTab, setActiveTab] = useState('Welcome.tsx');

    // Dynamic GitHub Data States
    const [projects, setProjects] = useState<Repository[]>([]);
    const [commits, setCommits] = useState<Commit[]>([]);
    const [loadingProjects, setLoadingProjects] = useState(true);
    const [loadingCommits, setLoadingCommits] = useState(true);

    // Dynamic README states
    const [readmeContent, setReadmeContent] = useState<Record<string, string>>({});
    const [loadingReadme, setLoadingReadme] = useState<Record<string, boolean>>({});

    // Dynamic Commits states
    const [openCommits, setOpenCommits] = useState<Record<string, Commit>>({});

    // Interactive View States (Play, Diff, MD Preview, Terminal)
    const [showMarkdownPreview, setMarkdownPreview] = useState<Record<string, boolean>>({});
    const [isSplitView, setSplitView] = useState<Record<string, boolean>>({});
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const [isRunningProject, setIsRunningProject] = useState(false);

    const terminalEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll terminal logs
    useEffect(() => {
        if (terminalEndRef.current) {
            terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [terminalLogs]);

    // Handle Resize Window
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Load GitHub Data
    useEffect(() => {
        fetchGitHubData();
    }, []);

    const fetchGitHubData = async (forceRefresh = false) => {
        setLoadingProjects(true);
        setLoadingCommits(true);

        const cachedRepos = localStorage.getItem('portfolio_repos_v8');
        const cachedCommits = localStorage.getItem('portfolio_commits_v8');
        const cachedTime = localStorage.getItem('portfolio_cache_time_v8');

        const isCacheValid = cachedTime && (Date.now() - parseInt(cachedTime)) < CACHE_TIME;

        if (!forceRefresh && isCacheValid && cachedRepos && cachedCommits) {
            const apiRepos = JSON.parse(cachedRepos);
            setProjects([...apiRepos, ...staticEnrichments]);
            setCommits(JSON.parse(cachedCommits));
            setLoadingProjects(false);
            setLoadingCommits(false);
            return;
        }

        let repoData: Repository[] = [];
        let commitData: Commit[] = [];

        try {
            const excludedProjects = [
                'pkm', 'pppl', 'presentasi', 'pitchdeck', 'portofolio', 
                'portofolio-vscode', 'portfolio-vscode', 'slide-seagma', 
                'slideseagma', 'arackerman05', 'appjirlah', '-appjirlah', 'uts', 'tik'
            ];
            const reposRes = await fetch('https://api.github.com/users/AbdurRouf05/repos?sort=updated&per_page=100');
            if (reposRes.ok) {
                const rawRepos = await reposRes.json();
                repoData = rawRepos
                    .filter((repo: any) => !excludedProjects.includes(repo.name.toLowerCase()))
                    .map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    description: repo.description,
                    language: repo.name === 'wa-bot-stiker' ? 'JavaScript' : repo.language,
                    html_url: repo.html_url,
                    homepage: repo.homepage,
                    topics: repo.topics || [],
                    fileName: `${repo.name}.${getExtension(repo.language)}`
                }));
            } else {
                throw new Error('Repos failed');
            }
        } catch (err) {
            console.error('Error fetching repos, using fallback:', err);
            repoData = fallbackRepos;
        }

        try {
            const eventsRes = await fetch('https://api.github.com/users/AbdurRouf05/events');
            if (eventsRes.ok) {
                const events = await eventsRes.json();
                const pushEvents = events.filter((e: any) => e.type === 'PushEvent');
                commitData = pushEvents.flatMap((e: any) => 
                    (e.payload.commits || []).map((c: any) => ({
                        sha: c.sha.substring(0, 7),
                        message: c.message,
                        repoName: e.repo.name.replace('AbdurRouf05/', ''),
                        date: new Date(e.created_at).toLocaleDateString(),
                        url: `https://github.com/${e.repo.name}/commit/${c.sha}`
                    }))
                ).slice(0, 10);
            } else {
                throw new Error('Events failed');
            }
        } catch (err) {
            console.error('Error fetching commits, using fallback:', err);
            commitData = fallbackCommits;
        }

        if (repoData.length === 0) repoData = fallbackRepos;
        if (commitData.length === 0) commitData = fallbackCommits;

        setProjects([...repoData, ...staticEnrichments]);
        setCommits(commitData);
        setLoadingProjects(false);
        setLoadingCommits(false);

        localStorage.setItem('portfolio_repos_v8', JSON.stringify(repoData));
        localStorage.setItem('portfolio_commits_v8', JSON.stringify(commitData));
        localStorage.setItem('portfolio_cache_time_v8', Date.now().toString());
    };

    const fetchReadme = async (repoName: string) => {
        if (readmeContent[repoName]) return;

        // Bypassing for Private repositories
        const project = projects.find(p => p.name === repoName) || staticEnrichments.find(p => p.name === repoName);
        if (project?.isPrivate) {
            setReadmeContent(prev => ({ ...prev, [repoName]: getPrivateProjectReadme(project) }));
            return;
        }

        setLoadingReadme(prev => ({ ...prev, [repoName]: true }));

        let content = '';
        try {
            let readmeRes = await fetch(`https://raw.githubusercontent.com/AbdurRouf05/${repoName}/main/README.md`);
            if (!readmeRes.ok) {
                readmeRes = await fetch(`https://raw.githubusercontent.com/AbdurRouf05/${repoName}/master/README.md`);
            }

            if (readmeRes.ok) {
                content = await readmeRes.text();
            } else {
                throw new Error('README fetch failed');
            }
        } catch (err) {
            console.error('Error fetching readme, using fallback content:', err);
            const repo = projects.find(p => p.name === repoName) || fallbackRepos.find(p => p.name === repoName);
            content = `# ${repoName}\n\n${repo?.description || 'No description provided.'}\n\n## Tech Stack\n${repo?.language ? `- ${repo.language}\n` : ''}${repo?.topics.map(t => `- ${t}`).join('\n') || ''}\n\n## Repository Link\n[View GitHub Repository](${repo?.html_url || 'https://github.com/AbdurRouf05/' + repoName})`;
        }

        setReadmeContent(prev => ({ ...prev, [repoName]: content }));
        setLoadingReadme(prev => ({ ...prev, [repoName]: false }));
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenFile = (fileName: string) => {
        if (!openTabs.includes(fileName)) {
            setOpenTabs([...openTabs, fileName]);
        }
        setActiveTab(fileName);
        
        const project = projects.find(p => p.fileName === fileName);
        if (project) {
            fetchReadme(project.name);
            if (!showMarkdownPreview.hasOwnProperty(fileName)) {
                setMarkdownPreview(prev => ({ ...prev, [fileName]: true }));
            }
        }

        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleOpenCommit = (commit: Commit) => {
        const tabName = `commit-${commit.sha}.diff`;
        if (!openTabs.includes(tabName)) {
            setOpenTabs([...openTabs, tabName]);
        }
        setOpenCommits(prev => ({ ...prev, [tabName]: commit }));
        setActiveTab(tabName);

        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleCloseTab = (fileName: string, e: React.MouseEvent) => {
        e.stopPropagation(); 
        const newTabs = openTabs.filter(tab => tab !== fileName);
        setOpenTabs(newTabs);
        if (activeTab === fileName) {
            if (newTabs.length > 0) {
                setActiveTab(newTabs[newTabs.length - 1]);
            } else {
                setActiveTab('');
            }
        }
    };

    const toggleMarkdownPreview = (fileName: string) => {
        setMarkdownPreview(prev => ({ ...prev, [fileName]: !prev[fileName] }));
    };

    const toggleSplitView = (fileName: string) => {
        setSplitView(prev => ({ ...prev, [fileName]: !prev[fileName] }));
    };

    const runProject = (fileName: string) => {
        const project = projects.find(p => p.fileName === fileName);
        if (!project) return;

        setIsRunningProject(true);
        setIsTerminalOpen(true);
        setTerminalLogs([]);

        const logs = [
            `arack@antigravity-pc:~/projects/${project.name}$ npm run dev`,
            `> ${project.name}@0.1.0 dev`,
            `> next dev -p 3000`,
            `▲ Next.js 14.2.3`,
            `- Local: http://localhost:3000`,
            `○ Ready in 1.4s (compiling client-side modules...)`,
            `✓ Compiled successfully! Dev server running on http://localhost:3000`
        ];

        let index = 0;
        setTerminalLogs([logs[0]]);

        const interval = setInterval(() => {
            index++;
            if (index < logs.length) {
                setTerminalLogs(prev => [...prev, logs[index]]);
            } else {
                clearInterval(interval);
                setIsRunningProject(false);
                setSplitView(prev => ({ ...prev, [fileName]: true }));
            }
        }, 300);
    };

    const renderCodeView = (project: Repository) => {
        const code = `import React from 'react';
import { ProjectShowcase } from '@/components/ProjectShowcase';

/**
 * Source code representation for ${project.name}
 * Mapped dynamically from GitHub
 */
export default function ${project.name.replace(/[-_]/g, '')}() {
  return (
    <ProjectShowcase
      name="${project.name}"
      language="${project.language || 'Markdown'}"
      description="${project.description || 'No description'}"
      githubUrl="${project.html_url || 'Private'}"
      homepageUrl="${project.homepage || 'None'}"
      topics={${JSON.stringify(project.topics)}}
      status="${project.isPrivate ? 'Private' : 'Synchronized'}"
    />
  );
}`;

        const lines = code.split('\n');

        return (
            <div className="flex min-h-full font-mono text-xs md:text-sm bg-[#1e1e1e] text-[#d4d4d4] select-text">
                <div className="w-12 text-gray-600 text-right pr-4 pt-4 select-none border-r border-[#2b2b2b] shrink-0">
                    {lines.map((_, i) => <div key={i}>{i + 1}</div>)}
                </div>
                <div className="flex-1 p-4 overflow-x-auto whitespace-pre scrollbar-hide">
                    {lines.map((line, i) => {
                        let highlighted = line;
                        if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
                            highlighted = `<span class="text-[#6a9955]">${line}</span>`;
                        } else {
                            highlighted = highlighted
                                .replace(/\b(import|export|default|function|const|return|from)\b/g, '<span class="text-[#c586c0]">$1</span>')
                                .replace(/("[^"]*")/g, '<span class="text-[#ce9178]">$1</span>')
                                .replace(/(<[^>]+>)/g, '<span class="text-[#569cd6]">$1</span>')
                                .replace(/\b(ProjectShowcase)\b/g, '<span class="text-[#4ec9b0]">$1</span>');
                        }
                        return (
                            <div 
                                key={i} 
                                className="h-5 hover:bg-white/5 transition-colors"
                                dangerouslySetInnerHTML={{ __html: highlighted || ' ' }}
                            />
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderMainEditorContent = () => {
        const project = projects.find(p => p.fileName === activeTab);
        if (project) {
            if (showMarkdownPreview[activeTab]) {
                if (loadingReadme[project.name]) {
                    return (
                        <div className="h-full flex flex-col items-center justify-center text-vscode-text bg-[#1e1e1e]">
                            <VscLoading className="animate-spin text-4xl mb-4 text-vscode-accent" />
                            <span className="font-mono text-sm text-gray-400">Fetching README from GitHub...</span>
                        </div>
                    );
                }
                return <Markdown content={readmeContent[project.name] || ''} project={project} />;
            }
            return renderCodeView(project);
        }

        if (activeTab.startsWith('commit-') && activeTab.endsWith('.diff')) {
            const commit = openCommits[activeTab];
            if (commit) {
                return (
                    <GitDiff 
                        sha={commit.sha} 
                        message={commit.message} 
                        repoName={commit.repoName} 
                        date={commit.date}
                        url={commit.url}
                    />
                );
            }
        }

        switch(activeTab) {
            case 'Welcome.tsx': return <Welcome />;
            case 'Home.tsx': return <Home />;
            case 'About.tsx': return <About />;
            case 'Pendidikan.tsx': return <Pendidikan />;
            case 'README.md': return <Readme />;
            case '': return <div className="h-full flex items-center justify-center text-gray-500 opacity-50 text-xl font-mono">Select a file to start coding...</div>;
            default: return <div className="p-10 text-white font-mono">404 - File Not Found: {activeTab}</div>;
        }
    };

    const renderEditorArea = () => {
        const isSplit = isSplitView[activeTab];
        const project = projects.find(p => p.fileName === activeTab);

        if (isSplit && project) {
            return (
                <div className="flex h-full w-full divide-x divide-[#2b2b2b]">
                    {/* Left Editor */}
                    <div className="flex-1 overflow-y-auto bg-[#1e1e1e]">
                        {renderMainEditorContent()}
                    </div>
                    {/* Right Editor: Simple Browser */}
                    <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden">
                        <div className="flex items-center gap-2 bg-[#252526] px-3 py-1.5 border-b border-[#2b2b2b] text-gray-400 text-xs shrink-0 select-none">
                            <span>Simple Browser</span>
                            <span className="text-gray-500 bg-[#2d2d2d] px-1.5 py-0.5 rounded ml-auto text-[10px]">localhost:3000</span>
                        </div>
                        {/* Browser Address Bar */}
                        <div className="bg-[#202020] p-1.5 flex items-center gap-2 border-b border-[#2b2b2b] text-xs text-gray-400 shrink-0 select-none">
                            <button className="hover:text-white p-0.5 rounded">←</button>
                            <button className="hover:text-white p-0.5 rounded">→</button>
                            <button className="hover:text-white p-0.5 rounded">↻</button>
                            <div className="flex-1 bg-[#2d2d2d] rounded px-3 py-0.5 text-gray-300 truncate font-mono text-[11px] flex items-center justify-between border border-gray-700/50">
                                <span>{project.isPrivate ? 'http://localhost:3000/private-reconciliation' : project.homepage || `https://github.com/AbdurRouf05/${project.name}`}</span>
                                <span className="text-[10px] text-green-500 font-sans flex items-center gap-1">
                                    {project.isPrivate ? <VscLock className="text-red-500 text-[10px]" /> : null}
                                    {project.isPrivate ? 'Encrypted' : 'Localhost'}
                                </span>
                            </div>
                            {project.homepage && (
                                <a 
                                    href={project.homepage} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="bg-vscode-accent text-white px-2 py-0.5 rounded text-[11px] hover:bg-blue-600 no-underline"
                                >
                                    Open External
                                </a>
                            )}
                        </div>
                        {/* Browser Viewport */}
                        <div className="flex-1 bg-[#181818] relative overflow-hidden">
                            {!project.isPrivate && project.homepage ? (
                                <iframe 
                                    src={project.homepage} 
                                    title={project.name} 
                                    className="w-full h-full border-0 bg-white"
                                />
                            ) : (
                                <div className="w-full h-full text-gray-300 p-6 flex flex-col overflow-y-auto font-sans scrollbar-hide">
                                    <div className="border border-blue-500/20 bg-blue-500/5 rounded-lg p-5 mb-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h2 className="text-2xl font-bold text-white">{project.name}</h2>
                                            {project.isPrivate ? (
                                                <span className="flex items-center gap-1.5 text-xs text-red-500 bg-red-500/10 px-2.5 py-1 rounded border border-red-500/25 font-sans font-medium">
                                                    <VscLock /> Private Repository
                                                </span>
                                            ) : project.isCollaborator ? (
                                                <span className="flex items-center gap-1.5 text-xs text-green-500 bg-green-500/10 px-2.5 py-1 rounded border border-green-500/25 font-sans font-medium">
                                                    <VscOrganization /> Collaborator Project
                                                </span>
                                            ) : null}
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.description || 'No description available for this repository.'}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.topics.map(t => (
                                                <span key={t} className="bg-vscode-accent/10 border border-vscode-accent/20 text-vscode-accent px-2 py-0.5 rounded text-xs">#{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-[#202020] border border-gray-800 p-4 rounded-lg">
                                            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Technical Details</h4>
                                            <div className="space-y-1.5 text-sm">
                                                <div className="flex justify-between"><span className="text-gray-500">Primary Lang:</span> <span className="font-mono text-blue-400">{project.language || 'N/A'}</span></div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Access Role:</span> 
                                                    <span className="text-gray-300 text-xs font-sans truncate max-w-[150px]" title={project.role}>
                                                        {project.role || 'Owner'}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between"><span className="text-gray-500">Port:</span> <span className="font-mono">3000</span></div>
                                            </div>
                                        </div>
                                        <div className="bg-[#202020] border border-gray-800 p-4 rounded-lg flex flex-col justify-between">
                                            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">Mock Preview Dashboard</h4>
                                            <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                                {project.isPrivate 
                                                    ? 'This repository is private. Source code access and live staging are restricted due to company credentials.'
                                                    : 'This project has no public homepage URL. You can check the code and commits directly on the repository.'
                                                }
                                            </p>
                                            {!project.isPrivate && (
                                                <a href={project.html_url} target="_blank" rel="noreferrer" className="w-full text-center py-1.5 bg-[#2d2d2d] hover:bg-[#3d3d3d] text-white text-xs border border-gray-700 rounded transition-colors no-underline">
                                                    View Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Social OpenGraph Preview Card (only for non-private) */}
                                    {!project.isPrivate && (
                                        <div className="mt-6 border border-gray-800 rounded-lg overflow-hidden shrink-0">
                                            <div className="bg-[#202020] px-4 py-2 border-b border-gray-850 text-xs font-semibold text-gray-400">GitHub Preview Card</div>
                                            <div className="p-4 bg-[#141414] flex justify-center">
                                                <img 
                                                    src={`https://opengraph.githubassets.com/1/AbdurRouf05/${project.name}`} 
                                                    alt={`${project.name} preview`} 
                                                    className="max-w-full h-auto rounded border border-gray-800 shadow-lg"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000";
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex-1 overflow-y-auto bg-[#1e1e1e]">
                {renderMainEditorContent()}
            </div>
        );
    };

    const LoadingScreen = () => (
        <div className="h-full flex flex-col items-center justify-center text-vscode-text bg-[#1e1e1e]">
            <VscLoading className="animate-spin text-4xl mb-4 text-vscode-accent" />
            <span className="font-mono text-sm text-gray-400">Loading module...</span>
        </div>
    );

    return (
        <div className="flex flex-col h-screen w-full bg-vscode-bg text-vscode-text overflow-hidden font-sans select-none">
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* 1. Sidebar */}
                <Sidebar 
                    activeView={sidebarView} 
                    onChangeView={setSidebarView} 
                    isExplorerOpen={isSidebarOpen} 
                    onToggleExplorer={toggleSidebar} 
                />
                
                {/* 2. Sidebar Explorer or Source Control View */}
                {isSidebarOpen && (
                    sidebarView === 'explorer' ? (
                        <Explorer 
                            activeTab={activeTab} 
                            onOpenFile={handleOpenFile} 
                            isOpen={isSidebarOpen} 
                            projects={projects}
                            loading={loadingProjects}
                        />
                    ) : (
                        <SourceControl 
                            commits={commits} 
                            loading={loadingCommits} 
                            activeTab={activeTab} 
                            onOpenCommit={handleOpenCommit} 
                            isOpen={isSidebarOpen}
                            onRefresh={() => fetchGitHubData(true)}
                        />
                    )
                )}
                
                {/* 3. Main Content Area */}
                <div 
                    className={`flex flex-col flex-1 bg-[#1e1e1e] min-w-0 ${isSidebarOpen ? 'hidden md:flex' : 'flex'}`}
                >
                    {openTabs.length > 0 && (
                        <TabBar 
                            openTabs={openTabs} 
                            activeTab={activeTab} 
                            onActivate={setActiveTab} 
                            onClose={handleCloseTab} 
                        />
                    )}
                    
                    {/* Breadcrumbs Path Bar & Editor Actions */}
                    {activeTab && (
                        <div className="h-7 bg-[#1e1e1e] border-b border-[#252526] px-4 flex items-center justify-between text-gray-500 text-xs shrink-0 select-none">
                            <div className="flex items-center gap-1.5 font-mono text-[11px] text-gray-400">
                                <span>src</span>
                                <span>›</span>
                                <span>{activeTab.startsWith('commit-') ? 'commits' : activeTab.includes('.') && !['Welcome.tsx', 'Home.tsx', 'About.tsx', 'Pendidikan.tsx', 'README.md'].includes(activeTab) ? 'projects' : 'pages'}</span>
                                <span>›</span>
                                <span className="text-gray-300 font-semibold">{activeTab}</span>
                            </div>
                            
                            {/* Editor Actions in Top Right */}
                            {activeTab.includes('.') && !['Welcome.tsx', 'Home.tsx', 'About.tsx', 'Pendidikan.tsx', 'README.md'].includes(activeTab) && !activeTab.endsWith('.diff') && (
                                <div className="flex items-center gap-3 select-none">
                                    {/* 1. Run/Play Button */}
                                    <div className="relative flex items-center group/run">
                                        <button 
                                            onClick={() => runProject(activeTab)}
                                            disabled={isRunningProject}
                                            className="hover:text-green-500 transition-colors flex items-center gap-1 cursor-pointer"
                                            title="Run Project in Terminal"
                                        >
                                            <VscPlay className={isRunningProject ? "animate-pulse text-green-500" : "text-gray-400"} />
                                            <span className="text-[10px] hidden md:inline">Run</span>
                                        </button>
                                        
                                        {/* Sticky note tooltip */}
                                        <div className="absolute top-full mt-2.5 right-0 bg-yellow-100 text-yellow-900 border border-yellow-300 text-[11px] px-2.5 py-1.5 rounded shadow-lg shadow-black/50 whitespace-nowrap opacity-90 hover:opacity-100 transition-opacity flex items-center gap-1.5 font-sans z-50">
                                            💡 <span>Klik <strong>Run</strong> untuk melihat preview project!</span>
                                            <div className="absolute bottom-full right-4 border-[5px] border-transparent border-b-yellow-100"></div>
                                        </div>
                                    </div>

                                    {/* 2. Markdown Preview Toggle */}
                                    <button 
                                        onClick={() => toggleMarkdownPreview(activeTab)}
                                        className="hover:text-blue-400 transition-colors flex items-center gap-1 cursor-pointer"
                                        title={showMarkdownPreview[activeTab] ? "Show Source Code" : "Show Markdown Preview"}
                                    >
                                        {showMarkdownPreview[activeTab] ? (
                                            <>
                                                <VscCode className="text-vscode-accent" />
                                                <span className="text-[10px] hidden md:inline">Code</span>
                                            </>
                                        ) : (
                                            <>
                                                <VscMarkdown className="text-vscode-accent" />
                                                <span className="text-[10px] hidden md:inline">Preview</span>
                                            </>
                                        )}
                                    </button>

                                    {/* 3. Split Browser Toggle */}
                                    <button 
                                        onClick={() => toggleSplitView(activeTab)}
                                        className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                        title={isSplitView[activeTab] ? "Close Split Browser" : "Split Browser View"}
                                    >
                                        <VscSplitHorizontal className={isSplitView[activeTab] ? "text-vscode-accent" : "text-gray-400"} />
                                        <span className="text-[10px] hidden md:inline">Split</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    
                    {/* Viewport content */}
                    <div className="flex-1 overflow-hidden relative flex flex-col bg-[#1e1e1e]">
                        <Suspense fallback={<LoadingScreen />}>
                            {renderEditorArea()}
                        </Suspense>
                    </div>

                    {/* 4. Terminal Panel at Bottom */}
                    {isTerminalOpen && (
                        <div className="h-48 bg-[#181818] border-t border-[#2b2b2b] flex flex-col font-mono text-[11px] text-gray-300 shrink-0">
                            {/* Terminal Tab Header */}
                            <div className="bg-[#202020] px-4 py-1.5 flex justify-between items-center text-gray-400 border-b border-[#2b2b2b] select-none shrink-0">
                                <div className="flex items-center gap-4">
                                    <span className="text-white border-b border-vscode-accent pb-0.5 font-sans font-semibold flex items-center gap-1">
                                        <VscTerminal /> Terminal
                                    </span>
                                    <span className="hover:text-white cursor-pointer font-sans">Problems</span>
                                    <span className="hover:text-white cursor-pointer font-sans">Output</span>
                                    <span className="hover:text-white cursor-pointer font-sans">Debug Console</span>
                                </div>
                                <button 
                                    onClick={() => setIsTerminalOpen(false)}
                                    className="hover:text-white hover:bg-gray-700 px-1.5 py-0.5 rounded text-sm transition-colors"
                                >
                                    ×
                                </button>
                            </div>
                            {/* Terminal Output Logs */}
                            <div className="flex-1 p-3 overflow-y-auto space-y-1 select-text scrollbar-hide">
                                {terminalLogs.map((log, idx) => (
                                    <div 
                                        key={idx} 
                                        className={log.startsWith('✓') ? 'text-green-400 font-bold' : log.startsWith('▲') ? 'text-blue-400 font-bold' : log.startsWith('>') ? 'text-yellow-500' : ''}
                                    >
                                        {log}
                                    </div>
                                ))}
                                <div ref={terminalEndRef} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {/* 5. Footer Status Bar */}
            <StatusBar />
        </div>
    );
};

export default Layout;