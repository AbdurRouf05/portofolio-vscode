import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear } from "react-icons/vsc";

// Props untuk menerima status apakah sidebar sedang terbuka & fungsi togglenya
interface SidebarProps {
    onToggleExplorer: () => void;
    isExplorerOpen: boolean;
}

const SidebarIcon = ({ icon, label, onClick, isActive }: { icon: any, label: string, onClick?: () => void, isActive?: boolean }) => (
  <div 
    onClick={onClick}
    className={`group relative flex justify-center w-full py-3 cursor-pointer transition-colors ${isActive ? 'text-white' : 'text-[#858585] hover:text-white'}`}
  >
    {icon}
    {/* Tooltip */}
    <span className="absolute left-14 bg-[#252526] text-white text-xs px-2 py-1 rounded border border-[#454545] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-lg">
      {label}
    </span>
    {/* Active Border Indicator (Garis Putih di kiri) */}
    <div className={`absolute left-0 top-0 bottom-0 w-[2px] transition-opacity ${isActive ? 'bg-white opacity-100' : 'bg-vscode-accent opacity-0 group-hover:opacity-100'}`}></div>
  </div>
);

const Sidebar = ({ onToggleExplorer, isExplorerOpen }: SidebarProps) => {
  return (
    <div className="w-12 bg-vscode-activityBar flex flex-col justify-between items-center z-40 shrink-0">
      <div className="w-full flex flex-col">
        {/* Tombol Explorer sekarang punya aksi onClick */}
        <SidebarIcon 
            icon={<VscFiles size={24} />} 
            label="Explorer" 
            onClick={onToggleExplorer} 
            isActive={isExplorerOpen}
        />
        <SidebarIcon icon={<VscSearch size={24} />} label="Search" />
        <SidebarIcon icon={<VscSourceControl size={24} />} label="Source Control" />
        <SidebarIcon icon={<VscDebugAlt size={24} />} label="Run and Debug" />
        <SidebarIcon icon={<VscExtensions size={24} />} label="Extensions" />
      </div>
      <div className="w-full flex flex-col mb-2">
        <SidebarIcon icon={<VscAccount size={24} />} label="Abdur Rouf" />
        <SidebarIcon icon={<VscSettingsGear size={24} />} label="Settings" />
      </div>
    </div>
  );
};

export default Sidebar;