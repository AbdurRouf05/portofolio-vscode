import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
  project?: any;
}

export const Markdown: React.FC<MarkdownProps> = ({ content, project }) => {
  const repoName = project?.name;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] overflow-y-auto scrollbar-hide">
      
      {/* Aesthetic Project Explanation Header */}
      {project && (
        <div className="w-full bg-gradient-to-b from-[#2a2a2b] to-[#1e1e1e] border-b border-[#333] px-6 py-10 shrink-0 font-sans shadow-lg shadow-black/20">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-start gap-8">
            
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl font-bold text-white tracking-tight">{project.name}</h1>
                {project.isPrivate && (
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Private</span>
                )}
              </div>
              
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                {project.description || 'Sebuah solusi digital modern yang dikembangkan untuk memecahkan masalah kompleks dengan antarmuka yang intuitif dan arsitektur yang kuat.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded-xl shadow-inner">
                  <h3 className="text-xs text-vscode-accent uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5">
                    🎯 Apa Fungsinya?
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Aplikasi ini dirancang untuk menyederhanakan alur kerja pengguna, memberikan otomatisasi, serta menyajikan data secara interaktif dan efisien.
                  </p>
                </div>
                <div className="bg-[#252526] border border-[#3c3c3c] p-4 rounded-xl shadow-inner">
                  <h3 className="text-xs text-vscode-accent uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5">
                    👨‍💻 Peran Saya
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.role || 'Merancang arsitektur dasar, mengembangkan fitur inti, dan memastikan performa sistem berjalan optimal.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content: Tech Stack */}
            <div className="w-full md:w-72 bg-[#252526] border border-[#3c3c3c] p-5 rounded-xl shrink-0 shadow-xl">
              <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-4 font-bold border-b border-[#3c3c3c] pb-2">
                Teknologi & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.language && (
                  <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-md text-xs font-mono font-medium shadow-sm">
                    {project.language}
                  </span>
                )}
                {project.topics && project.topics.length > 0 ? (
                  project.topics.map((t: string) => (
                    <span key={t} className="bg-[#333] text-gray-300 border border-gray-600 px-2.5 py-1 rounded-md text-xs font-mono shadow-sm">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs italic">Tech stack tidak dirinci</span>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Markdown Body */}
      <div className="markdown-body p-6 md:p-10 text-gray-300 text-sm md:text-base max-w-4xl mx-auto w-full">
        <ReactMarkdown 
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold border-b border-gray-700 pb-2 mt-6 mb-4 text-white" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-semibold border-b border-gray-800 pb-1 mt-5 mb-3 text-gray-100" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-medium mt-4 mb-2 text-gray-200" {...props} />,
          p: ({node, ...props}) => <p className="my-2 text-gray-300 leading-relaxed" {...props} />,
          a: ({node, ...props}) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({node, ...props}) => <ul className="ml-6 list-disc text-gray-300 my-1" {...props} />,
          ol: ({node, ...props}) => <ol className="ml-6 list-decimal text-gray-300 my-1" {...props} />,
          li: ({node, ...props}) => <li className="my-1" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold text-white" {...props} />,
          img: ({node, src, ...props}: any) => {
            let finalSrc = src;
            if (repoName && src && !src.startsWith('http') && !src.startsWith('data:')) {
              const cleanPath = src.replace(/^\/+/, '');
              finalSrc = `https://raw.githubusercontent.com/AbdurRouf05/${repoName}/main/${cleanPath}`;
            }
            return <img src={finalSrc} className="max-w-full h-auto rounded my-4 inline-block" {...props} />;
          },
          pre: ({node, ...props}) => <pre className="bg-[#1e1e1e] p-4 rounded-lg my-4 overflow-x-auto text-sm border border-gray-700 font-mono text-gray-300" {...props} />,
          code: ({node, className, children, ...props}: any) => {
            // Check if it's block code (usually has a language class) or inline
            const isBlock = className && className.includes('language-');
            return isBlock ? (
              <code className={className} {...props}>
                {children}
              </code>
            ) : (
              <code className="bg-[#2d2d2d] px-1.5 py-0.5 rounded text-blue-300 font-mono text-sm" {...props}>
                {children}
              </code>
            );
          },
          // Common HTML elements in markdown
          div: ({node, ...props}) => <div className="my-2" {...props} />,
          span: ({node, ...props}) => <span {...props} />,
          br: ({node, ...props}) => <br {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-600 pl-4 py-1 my-4 italic text-gray-400 bg-gray-800/30" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
      </div>
    </div>
  );
};

export default Markdown;
