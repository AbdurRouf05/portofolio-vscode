import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Pendidikan = () => {
  const educationData = [
    {
        name: "Institut Teknologi dan Bisnis Widya Gama Lumajang",
        degree: "S1 Teknologi Informasi",
        period: "2022 - Sekarang",
        status: "Semester 5",
        isActive: true,
        details: "Fokus pada pengembangan aplikasi dan sistem informasi",
        color: "border-green-500"
    },
    {
        name: "MA Raudhlatul Ulum",
        degree: "Madrasah Aliyah",
        period: "2019 - 2022",
        status: "Lulus",
        isActive: false,
        details: "Pendidikan menengah atas dengan fokus akademik",
        color: "border-blue-500"
    },
    {
        name: "MTs Raudhlatul Ulum",
        degree: "Madrasah Tsanawiyah",
        period: "2016 - 2019",
        status: "Lulus",
        isActive: false,
        details: "Pendidikan menengah pertama dengan dasar akademik yang kuat",
        color: "border-yellow-500"
    },
    {
        name: "MI Bustanul Ulum",
        degree: "Madrasah Ibtidaiyah",
        period: "2010 - 2016",
        status: "Lulus",
        isActive: false,
        details: "Fondasi pendidikan dasar dan pembentukan karakter",
        color: "border-red-500"
    },
  ];

  return (
    <div className="p-6 md:p-10 font-sans">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
        <FaGraduationCap className="text-yellow-400" /> Riwayat Pendidikan
      </h2>

      <div className="space-y-6 relative border-l border-gray-700 ml-3 md:ml-6">
        {educationData.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="ml-8 relative group"
          >
            {/* Dot Timeline */}
            <span className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full ${edu.isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'} border-2 border-[#1e1e1e]`}></span>

            <div className={`bg-[#252526] p-4 rounded-md shadow-md hover:bg-[#2d2d2d] transition-all border-l-4 ${edu.color}`}>
              <div className="flex flex-col md:flex-row justify-between mb-1">
                <h3 className="text-lg font-semibold text-gray-100">{edu.name}</h3>
                <span className="text-sm font-mono text-gray-400">{edu.period}</span>
              </div>
              <div className="text-vscode-accent font-medium mb-2">{edu.degree}</div>
              <p className="text-sm text-gray-400">{edu.details}</p>
              <div className="mt-3">
                 <span className={`text-xs px-2 py-1 rounded ${edu.isActive ? 'bg-green-900/50 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                    {edu.status}
                 </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pendidikan;