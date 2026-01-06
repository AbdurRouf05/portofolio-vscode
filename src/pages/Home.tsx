import { motion } from "framer-motion";
import Typewriter from "../components/Typewriter";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-10 font-mono text-sm md:text-base leading-relaxed"
    >
      {/* 1. Komentar Pembuka */}
      <div className="text-gray-500 mb-4 flex">
         <span>{'// '}</span>
         <Typewriter text=" Welcome to my personal creative space." delay={200} speed={30} hideCursorOnComplete />
      </div>

      <div>
        <span className="text-vscode-keyword">const</span> <span className="text-vscode-function">Introduction</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span>
      </div>
      
      {/* Object Properties dengan Animasi Berurutan */}
      <div className="pl-6 md:pl-8 space-y-1">
        <div>
           <span className="text-vscode-keyword">name</span>: 
           <span className="text-vscode-string ml-2">
             <Typewriter text='"Abdur Rouf"' delay={1500} speed={50} hideCursorOnComplete />
           </span>,
        </div>
        <div>
           <span className="text-vscode-keyword">role</span>: 
           <span className="text-vscode-string ml-2">
             <Typewriter text='"Full Stack Developer"' delay={2500} speed={50} hideCursorOnComplete />
           </span>,
        </div>
        <div className="flex flex-wrap">
           <span className="text-vscode-keyword">hobbies</span>: 
           <span className="text-vscode-string ml-2 flex flex-wrap gap-1">
             <span>[</span>
             <Typewriter text='"Anime", "Gaming", "Coding"' delay={4000} speed={50} hideCursorOnComplete />
             <span>]</span>
           </span>,
        </div>
        <div>
           <span className="text-vscode-keyword">isRelationship</span>: 
           <span className="text-vscode-keyword ml-2">
             <Typewriter text=" false" delay={6000} speed={50} hideCursorOnComplete />
           </span>, 
           <span className="text-gray-500 ml-2">
             {'// '} <Typewriter text=" Focusing on code & career 🚀" delay={7000} speed={30} hideCursorOnComplete />
           </span>
        </div>
        <div>
            <span className="text-vscode-keyword">status</span>: 
            <span className="text-vscode-string ml-2">
              <Typewriter text='"Open to work"' delay={9000} speed={50} hideCursorOnComplete />
            </span>,
        </div>
      </div>

      <div className="text-white">{'}'};</div>
      
      <br />
      
      {/* Bagian Fungsi Bawah */}
      <div className="text-gray-500 mb-2 flex">
        <span>{'// '}</span>
        <Typewriter text=" Lets create something amazing together" delay={10500} speed={30} hideCursorOnComplete />
      </div>
      <div>
          <span className="text-vscode-keyword">function</span> <span className="text-vscode-function">letsConnect</span>() {'{'}
      </div>
      <div className="pl-6 md:pl-8 flex flex-wrap">
            <span className="text-vscode-keyword mr-2">return</span> 
            <span className="text-vscode-string">
               <Typewriter text='"Check out my contact info in the sidebar!"' delay={12000} speed={40} />
            </span>;
      </div>
      <div>{'}'}</div>

    </motion.div>
  );
};

export default Home;