import { motion } from "framer-motion";
import { VscFiles, VscSearch, VscSourceControl } from "react-icons/vsc";
import Typewriter from "../components/Typewriter"; // Import komponen baru

const Welcome = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-[#1f1f1f] text-gray-300 select-none overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center z-10"
      >
        <div 
            className="mx-auto w-32 h-32 bg-no-repeat bg-contain bg-center drop-shadow-2xl" 
            style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg)' }}
        ></div>
        <h1 className="text-5xl font-bold mt-6 text-gray-100 tracking-tight">Abdur Rouf</h1>
        
        {/* ANIMASI TYPEWRITER DISINI */}
        <div className="text-xl mt-3 text-gray-500 font-mono h-8">
            <Typewriter text= " <FullStackDeveloper />" delay={900} speed={100} />
        </div>
      </motion.div>

      {/* Sisa kode sama seperti sebelumnya... */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.5 }} // Delay ditambah biar nunggu ngetik selesai
        className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-2xl px-8 z-10"
      >
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-200 mb-2">Start</h3>
          <div className="flex items-center gap-3 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
            <VscFiles size={20} /> <span>Explore Portfolio...</span>
          </div>
          <div className="flex items-center gap-3 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
             <VscSearch size={20} /> <span>Search Projects...</span>
          </div>
          <div className="flex items-center gap-3 text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
             <VscSourceControl size={20} /> <span>View Github...</span>
          </div>
        </div>

        <div className="space-y-3">
           <h3 className="text-lg font-medium text-gray-200 mb-2">Shortcuts</h3>
           <div className="flex justify-between text-sm group cursor-pointer hover:bg-white/5 p-1 rounded">
              <span className="text-gray-400 group-hover:text-blue-400 transition-colors">Show All Commands</span>
              <span className="text-gray-600">Ctrl+Shift+P</span>
           </div>
           <div className="flex justify-between text-sm group cursor-pointer hover:bg-white/5 p-1 rounded">
              <span className="text-gray-400 group-hover:text-blue-400 transition-colors">Go to File</span>
              <span className="text-gray-600">Ctrl+P</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;