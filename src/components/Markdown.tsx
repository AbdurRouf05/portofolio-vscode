import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface MarkdownProps {
  content: string;
  project?: any;
}

const PROJECT_DETAILS: Record<string, any> = {
  'desa-huntap': {
    fungsi: 'Sistem Informasi Desa (SID) untuk memetakan dan mengelola data penduduk.',
    platform: 'Web Application',
    extraTech: ['Next.js', 'PocketBase', 'Leaflet.js']
  },
  'kelontong-sync': {
    fungsi: 'Aplikasi Enterprise Resource Planning (ERP) berkonsep Software as a Service (SaaS).',
    platform: 'Progressive Web App (PWA)',
    extraTech: ['Next.js', 'Supabase', 'IndexedDB']
  },
  'sid-desa': {
    fungsi: 'Sistem Informasi Desa (SID) yang dirancang khusus untuk memfasilitasi administrasi Desa Sumberanyar.',
    platform: 'Web Application',
    extraTech: ['Next.js', 'PocketBase']
  },
  'seagma-presensi': {
    fungsi: 'Aplikasi manajemen absensi terpadu untuk internal perusahaan Seagma (Semeru Agung Mandiri).',
    platform: 'Web Application',
    extraTech: ['Next.js', 'PocketBase']
  },
  'kalibra': {
    fungsi: 'Sistem ERP berkonsep SaaS tingkat lanjut (Advanced) untuk manajemen operasional Kotchi Center.',
    platform: 'Web Platform',
    extraTech: ['Next.js', 'PostgreSQL', 'Node.js']
  },
  'berita': {
    fungsi: 'Portal web berita digital kolaboratif dari Satu Detik.',
    platform: 'Web CMS',
    extraTech: ['Next.js', 'PocketBase']
  },
  'prediksi_harga_rumah': {
    fungsi: 'Proyek Tugas Akhir (UAS). Model Machine Learning menggunakan metode regresi linear untuk memprediksi fluktuasi harga properti.',
    platform: 'Machine Learning Model',
    extraTech: ['Python', 'Scikit-Learn', 'Pandas']
  },
  'sinergo-absensi': {
    fungsi: 'Aplikasi pencatatan absensi karyawan secara real-time.',
    platform: 'Mobile App',
    extraTech: ['Flutter (Dart)', 'Firebase']
  },
  'wa-bot-stiker': {
    fungsi: 'Bot WhatsApp otomatis yang melayani pembuatan stiker instan langsung dari chat pengguna.',
    platform: 'Bot Script',
    extraTech: ['Node.js', 'Baileys (WA Socket)']
  },
  'SistemAntrianKlinikJava': {
    fungsi: 'Proyek Tugas Akhir (UAS). Sistem manajemen antrian pasien klinik yang efisien.',
    platform: 'Desktop Application',
    extraTech: ['Java', 'MySQL']
  }
};

export const Markdown: React.FC<MarkdownProps> = ({ content, project }) => {
  const repoName = project?.name;
  const details = repoName ? PROJECT_DETAILS[repoName] : null;
  const allTech = [...(project?.topics || []), ...(details?.extraTech || [])];
  // Remove duplicates just in case
  const uniqueTech = Array.from(new Set(allTech));

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] overflow-y-auto scrollbar-hide">
      
      {/* Aesthetic Project Explanation Header */}
      {project && (
        <div className="w-full bg-[#1e1e1e] border-b border-[#333] px-6 py-8 shrink-0 font-sans">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center gap-8">
            
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{project.name}</h1>
                <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide">
                  {details?.platform || 'Software Project'}
                </span>
                {project.isPrivate && (
                  <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">Private</span>
                )}
              </div>
              
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {details?.fungsi || project.description || 'Proyek pengembangan perangkat lunak yang berfokus pada efisiensi dan skalabilitas tinggi.'}
              </p>
            </div>

            {/* Right Content: Tech Stack */}
            <div className="w-full md:w-auto bg-[#252526] border border-[#3c3c3c] p-4 rounded-xl shrink-0 shadow-sm flex flex-col justify-center">
              <h3 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">
                Tech Stack
              </h3>
              <div className="flex flex-wrap md:max-w-[200px] gap-1.5">
                {uniqueTech.length > 0 ? (
                  uniqueTech.map((t: string) => (
                    <span key={t} className="bg-[#333] text-gray-300 border border-gray-600 px-2 py-0.5 rounded text-[11px] font-mono">
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 text-xs italic">Tidak dirinci</span>
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
