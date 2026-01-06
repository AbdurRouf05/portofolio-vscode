import { useState, useEffect, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import Explorer from './Explorer';
import TabBar from './TabBar';
import StatusBar from './StatusBar';
import ProjectDetail from './ProjectDetail'; 
import { VscLoading } from "react-icons/vsc";

// --- LAZY LOADING COMPONENTS ---
// Halaman dimuat hanya saat dibutuhkan untuk performa maksimal
const Welcome = lazy(() => import('../pages/Welcome'));
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Pendidikan = lazy(() => import('../pages/Pendidikan'));
const Readme = lazy(() => import('../pages/README'));

const Layout = () => {
    // State Layout
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
    const [openTabs, setOpenTabs] = useState<string[]>(['Welcome.tsx']); 
    const [activeTab, setActiveTab] = useState('Welcome.tsx');

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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleOpenFile = (fileName: string) => {
        if (!openTabs.includes(fileName)) {
            setOpenTabs([...openTabs, fileName]);
        }
        setActiveTab(fileName);
        
        // Mobile UX: Tutup sidebar otomatis setelah pilih file
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

    // --- KONTEN PROJECT & HALAMAN ---
    const renderContent = () => {
        switch(activeTab) {
            case 'Welcome.tsx': return <Welcome />;
            case 'Home.tsx': return <Home />;
            case 'About.tsx': return <About />;
            case 'Pendidikan.tsx': return <Pendidikan />;
            case 'README.md': return <Readme />;
            
            // --- PROJECT KASIR KOPI (Flutter) ---
            case 'KasirKopi.dart': 
                return <ProjectDetail 
                    title="Aplikasi Kasir Kopi (Mobile)"
                    description="Aplikasi Point of Sales (POS) berbasis mobile yang dirancang khusus untuk manajemen kedai kopi. Memudahkan barista dalam mencatat pesanan, menghitung total bayar, dan mengelola stok bahan baku secara realtime menggunakan Firebase."
                    images={[
                        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000"
                    ]}
                    techStack={["Flutter", "Dart", "Firebase Auth", "Cloud Firestore"]}
                    features={[
                        "Manajemen Menu & Stok Kopi Realtime",
                        "Sistem Keranjang & Checkout Cepat",
                        "Laporan Penjualan Harian/Bulanan",
                        "Struk Digital (Export PDF)"
                    ]}
                />;

            // --- PROJECT ANTRIAN KLINIK (Java Swing) ---
            case 'AntrianKlinik.java': 
                return <ProjectDetail 
                    title="Sistem Antrian Klinik (Desktop)"
                    description="Aplikasi desktop untuk manajemen antrian pasien di klinik kesehatan. Memisahkan antrian poli umum dan gigi, serta dilengkapi dengan fitur pemanggilan suara otomatis dan display antrian di layar TV ruang tunggu."
                    images={[
                        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=1000"
                    ]}
                    techStack={["Java SE", "Java Swing", "MySQL", "JDBC"]}
                    features={[
                        "Ambil Nomor Antrian Mandiri (Kiosk)",
                        "Dashboard Admin & Dokter",
                        "Pemanggilan Suara (Text-to-Speech)",
                        "Cetak Karcis Antrian Termal"
                    ]}
                />;

            // --- PROJECT SPK SAW (Java) ---
            case 'SPK_SAW.java': 
                return <ProjectDetail 
                    title="SPK Metode SAW (Decision Support)"
                    description="Sistem Pendukung Keputusan (SPK) menggunakan metode Simple Additive Weighting (SAW). Studi kasus untuk menentukan kelayakan penerima bantuan sosial atau pemilihan karyawan terbaik berdasarkan bobot kriteria yang dinamis."
                    images={[
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", 
                        "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1543286386-713df548e9cc?auto=format&fit=crop&q=80&w=1000"
                    ]}
                    techStack={["Java", "Swing GUI", "MySQL", "JFreeChart"]}
                    features={[
                        "Manajemen Kriteria & Bobot Dinamis",
                        "Perhitungan Matriks Normalisasi Otomatis",
                        "Peranking Hasil Keputusan",
                        "Export Laporan Hasil Seleksi"
                    ]}
                />;

            // --- PROJECT PERPUSTAKAAN (Laravel) ---
            case 'WebPerpustakaan.php': 
                return <ProjectDetail 
                    title="Sistem Informasi Perpustakaan (Laravel)"
                    description="Platform web modern untuk pengelolaan sirkulasi buku di perpustakaan sekolah. Dibangun menggunakan Framework Laravel untuk performa tinggi, memudahkan anggota mencari buku dan petugas dalam mengelola data peminjaman."
                    images={[
                        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1000",
                        "https://images.unsplash.com/photo-1507842217121-ca19186884c2?auto=format&fit=crop&q=80&w=1000"
                    ]}
                    techStack={["Laravel 10", "PHP 8", "MySQL", "Bootstrap 5", "Blade Engine"]}
                    features={[
                        "Katalog Buku Online (OPAC)",
                        "Manajemen Peminjaman & Pengembalian",
                        "Hitung Denda Keterlambatan Otomatis",
                        "Generate Kartu Anggota (PDF)"
                    ]}
                />;

            case '': return <div className="h-full flex items-center justify-center text-gray-500 opacity-50 text-xl font-mono">Select a file to start coding...</div>;
            default: return <div className="p-10 text-white font-mono">404 - File Not Found: {activeTab}</div>;
        }
    };

    // Komponen Loading Screen
    const LoadingScreen = () => (
        <div className="h-full flex flex-col items-center justify-center text-vscode-text">
            <VscLoading className="animate-spin text-4xl mb-4 text-vscode-accent" />
            <span className="font-mono text-sm text-gray-400">Loading module...</span>
        </div>
    );

    return (
        <div className="flex flex-col h-screen w-full bg-vscode-bg text-vscode-text overflow-hidden font-sans">
            <div className="flex flex-1 overflow-hidden relative">
                
                {/* 1. Sidebar */}
                <Sidebar onToggleExplorer={toggleSidebar} isExplorerOpen={isSidebarOpen} />
                
                {/* 2. Explorer */}
                <Explorer activeTab={activeTab} onOpenFile={handleOpenFile} isOpen={isSidebarOpen} />
                
                {/* 3. Main Content Area */}
                <div 
                    className={`flex flex-col flex-1 bg-vscode-bg min-w-0 ${isSidebarOpen ? 'hidden md:flex' : 'flex'}`}
                >
                    {openTabs.length > 0 && (
                        <TabBar 
                            openTabs={openTabs} 
                            activeTab={activeTab} 
                            onActivate={setActiveTab} 
                            onClose={handleCloseTab} 
                        />
                    )}
                    
                    <div className="flex-1 overflow-y-auto bg-[#1e1e1e] relative">
                        {/* SUSPENSE WRAPPER untuk Lazy Loading */}
                        <Suspense fallback={<LoadingScreen />}>
                            {['Welcome.tsx', '', 'Pendidikan.tsx', 'About.tsx', 'README.md'].includes(activeTab) || activeTab.includes('Kasir') || activeTab.includes('Antrian') || activeTab.includes('SPK') || activeTab.includes('Perpustakaan') ? (
                                renderContent()
                            ) : (
                                // Tampilan Coding (dengan Line Numbers)
                                <div className="flex min-h-full">
                                    <div className="w-12 text-gray-600 text-right pr-4 pt-4 select-none font-mono text-sm border-r border-[#2b2b2b]">
                                        {Array.from({length: 30}, (_, i) => <div key={i}>{i + 1}</div>)}
                                    </div>
                                    <div className="flex-1">
                                        {renderContent()}
                                    </div>
                                </div>
                            )}
                        </Suspense>
                    </div>
                </div>
            </div>
            
            {/* 4. Footer Status Bar */}
            <StatusBar />
        </div>
    );
};

export default Layout;