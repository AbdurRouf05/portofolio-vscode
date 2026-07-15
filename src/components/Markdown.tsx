import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ content }) => {
  return (
    <div className="markdown-body p-6 text-gray-300 text-sm md:text-base max-w-4xl mx-auto overflow-y-auto h-full scrollbar-hide">
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
          img: ({node, ...props}) => <img className="max-w-full h-auto rounded my-4 inline-block" {...props} />,
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
  );
};

export default Markdown;
