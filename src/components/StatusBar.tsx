import { VscSourceControl, VscBell, VscError, VscWarning } from "react-icons/vsc";

const StatusBar = () => {
    return (
        // Mengurangi padding horizontal di mobile (px-2) dan standar di desktop (md:px-4)
        <div className="h-6 bg-vscode-accent text-white flex justify-between items-center px-2 md:px-4 text-xs select-none overflow-hidden whitespace-nowrap">
            
            {/* Bagian Kiri: Penting (Selalu Tampil) */}
            <div className="flex items-center gap-1 md:gap-3">
                <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 md:px-2 py-0.5 rounded-sm transition-colors">
                    <VscSourceControl className="text-[10px] md:text-xs" /> 
                    <span className="font-medium text-[10px] md:text-xs">main*</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:bg-white/20 px-1 md:px-2 py-0.5 rounded-sm transition-colors">
                    <VscError className="text-[10px] md:text-xs" /> 0 
                    <VscWarning className="text-[10px] md:text-xs" /> 0
                </div>
            </div>

            {/* Bagian Kanan */}
            <div className="flex items-center gap-2 md:gap-4">
                
                {/* Informasi ini DISEMBUYIKAN di Mobile (hidden) dan MUNCUL di Desktop (md:flex) */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="cursor-pointer hover:bg-white/20 px-1 py-0.5 rounded-sm transition-colors">Ln 12, Col 42</div>
                    <div className="cursor-pointer hover:bg-white/20 px-1 py-0.5 rounded-sm transition-colors">UTF-8</div>
                    <div className="cursor-pointer hover:bg-white/20 px-1 py-0.5 rounded-sm transition-colors">{'{'} TypeScript JSX {'}'}</div>
                </div>

                {/* Lonceng notifikasi tetap ada tapi ukurannya menyesuaikan */}
                <div className="cursor-pointer hover:bg-white/20 px-1 py-0.5 rounded-sm flex items-center transition-colors">
                    <VscBell className="text-[10px] md:text-xs" />
                </div>
            </div>
        </div>
    );
};

export default StatusBar;