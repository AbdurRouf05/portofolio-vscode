import React from 'react';
import { VscSplitHorizontal, VscCheck, VscFolder } from 'react-icons/vsc';

interface GitDiffProps {
  sha: string;
  message: string;
  repoName: string;
  date: string;
  url: string;
}

export const GitDiff: React.FC<GitDiffProps> = ({ sha, message, repoName, date, url }) => {
  // Generate code diff lines dynamically based on commit info
  const oldLines = [
    `// Last updated on old build`,
    `import React from 'react';`,
    `import { render } from 'react-dom';`,
    ``,
    `const ProjectStatus = () => {`,
    `  return (`,
    `    <div>`,
    `      <h1>Project: ${repoName}</h1>`,
    `      <p>Status: Initial Setup</p>`,
    `      <p>Last checked: Outdated</p>`,
    `    </div>`,
    `  );`,
    `};`,
    `export default ProjectStatus;`
  ];

  const newLines = [
    `// Last updated on ${date}`,
    `import React from 'react';`,
    `import { render } from 'react-dom';`,
    `// Commit SHA: ${sha}`,
    `const ProjectStatus = () => {`,
    `  return (`,
    `    <div>`,
    `      <h1>Project: ${repoName}</h1>`,
    `      <p>Status: Active and Synchronized</p>`,
    `      <p>Latest Message: ${message}</p>`,
    `      <p>Build status: Success</p>`,
    `    </div>`,
    `  );`,
    `};`,
    `export default ProjectStatus;`
  ];

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-gray-300 font-mono text-xs md:text-sm select-none">
      {/* Diff Header */}
      <div className="flex justify-between items-center bg-[#252526] px-4 py-2 border-b border-[#2b2b2b] shrink-0">
        <div className="flex items-center gap-2">
          <VscFolder className="text-yellow-500" />
          <span className="text-gray-200 font-semibold">{repoName}</span>
          <span className="text-gray-500">›</span>
          <span className="text-gray-400 font-mono">commit_{sha}.diff</span>
          <span className="bg-vscode-accent text-white text-[10px] px-1.5 py-0.5 rounded font-sans">
            git show {sha}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href={url} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1 bg-[#3c3c3c] hover:bg-[#4c4c4c] text-white px-2 py-1 rounded text-xs border border-gray-700 transition-colors cursor-pointer no-underline"
          >
            View on GitHub
          </a>
          <VscSplitHorizontal className="text-gray-400" />
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-[#2d2d2d] px-4 py-1.5 border-b border-[#1e1e1e] flex justify-between text-gray-400 text-[10px] md:text-xs shrink-0">
        <div>Showing changes from commit: <strong className="text-white">{message}</strong></div>
        <div className="text-gray-500">Author: Abdur Rouf | Date: {date}</div>
      </div>

      {/* Side by side diff editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Original Code */}
        <div className="flex-1 flex flex-col border-r border-[#2b2b2b] overflow-y-auto overflow-x-auto scrollbar-hide">
          <div className="bg-[#202020] text-gray-500 px-3 py-1 font-bold text-[10px] border-b border-[#2b2b2b] sticky top-0">
            src/index.tsx (Original)
          </div>
          <div className="flex min-w-max p-2">
            {/* Old Line numbers */}
            <div className="w-8 text-right text-gray-600 select-none pr-2 mr-2 border-r border-gray-800">
              {oldLines.map((_, idx) => (
                <div key={idx} className="h-5">{idx + 1}</div>
              ))}
            </div>
            {/* Old lines content */}
            <div className="flex-1">
              {oldLines.map((line, idx) => {
                // Highlight lines that are changed (lines 8-9 in indices 7-8)
                const isRemoved = idx === 7 || idx === 8 || idx === 9;
                return (
                  <div 
                    key={idx} 
                    className={`h-5 whitespace-pre px-1 ${isRemoved ? 'bg-red-950/60 text-red-300 border-l-2 border-red-500' : ''}`}
                  >
                    {isRemoved ? '-' : ' '} {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: New Code */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-auto scrollbar-hide">
          <div className="bg-[#202020] text-gray-500 px-3 py-1 font-bold text-[10px] border-b border-[#2b2b2b] sticky top-0 flex justify-between items-center">
            <span>src/index.tsx (Modified)</span>
            <span className="text-green-500 flex items-center gap-1 text-[9px] font-sans">
              <VscCheck /> Compiled successfully
            </span>
          </div>
          <div className="flex min-w-max p-2">
            {/* New Line numbers */}
            <div className="w-8 text-right text-gray-600 select-none pr-2 mr-2 border-r border-gray-800">
              {newLines.map((_, idx) => (
                <div key={idx} className="h-5">{idx + 1}</div>
              ))}
            </div>
            {/* New lines content */}
            <div className="flex-1">
              {newLines.map((line, idx) => {
                // Highlight lines that are added (indices 3, 7, 8, 9, 10)
                const isAdded = idx === 3 || idx === 7 || idx === 8 || idx === 9 || idx === 10;
                return (
                  <div 
                    key={idx} 
                    className={`h-5 whitespace-pre px-1 ${isAdded ? 'bg-green-950/60 text-green-300 border-l-2 border-green-500' : ''}`}
                  >
                    {isAdded ? '+' : ' '} {line}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitDiff;
