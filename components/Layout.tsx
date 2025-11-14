import React, { useState, ReactNode } from 'react';

type ModalType = 'About' | 'Contact' | 'Guide' | 'Privacy Policy' | 'Terms of Service' | 'DMCA' | null;

const Modal: React.FC<{ title: string; onClose: () => void; children: ReactNode }> = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-900 border border-slate-700 rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b border-slate-700 sticky top-0 bg-slate-900 z-10">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <div className="p-6 text-gray-300 prose prose-invert">
                    {children}
                </div>
            </div>
        </div>
    );
};


const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);

    const openModal = (modal: ModalType) => setActiveModal(modal);
    const closeModal = () => setActiveModal(null);

    const modalLinks: Exclude<ModalType, null>[] = ['About', 'Contact', 'Guide', 'Privacy Policy', 'Terms of Service', 'DMCA'];
    
    const getModalContent = (modal: ModalType) => {
        switch (modal) {
            case 'About': return <p>This application provides a centralized, searchable directory of US public offices to simplify finding important civic contact information. It's built with modern web technologies for a fast, comfortable, and user-friendly experience.</p>;
            case 'Contact': return <p>For inquiries, please reach out to us at hsini.web@gmail.com or visit our website at doodax.com.</p>;
            case 'Guide': return <p>Use the search bar to find an office by name or county. Use the dropdown menus to filter the results by state or office type. Click 'Visit Website' to go to the official page for an office. The directory is designed for easy navigation and quick access to information.</p>;
            case 'Privacy Policy': return <p>We respect your privacy. This application does not collect, store, or share any personal data from its users. All data presented is publicly available information and is provided for informational purposes only. No cookies or trackers are used.</p>;
            case 'Terms of Service': return <p>The information provided by this tool is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site. We encourage users to verify information with the official office websites.</p>;
            case 'DMCA': return <p>If you believe that any content on this site infringes upon your copyright, please contact us at hsini.web@gmail.com with a valid DMCA notice, and we will address the issue promptly.</p>;
            default: return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative">
            <div className="galaxy-bg">
                <div className="stars"></div>
                <div className="nebula"></div>
                <div className="nebula two"></div>
                <div className="nebula three"></div>
            </div>
            
            <header className="bg-black/30 backdrop-blur-md sticky top-0 z-20 border-b border-slate-800">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="font-bold text-xl text-white">Public Directory</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {modalLinks.map(link => (
                                    <button key={link} onClick={() => openModal(link)} className="text-gray-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{link}</button>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-black/30 backdrop-blur-md border-t border-slate-800 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p className="mb-2">
                        <a href="https://github.com/hsinidev" target="_blank" rel="noopener noreferrer" className="font-bold text-lg" style={{color: '#FFD700'}}>
                            Powered by HSINI MOHAMED
                        </a>
                    </p>
                    <p className="text-sm">
                        <a href="mailto:hsini.web@gmail.com" className="hover:underline">hsini.web@gmail.com</a>
                        <span className="mx-2">|</span>
                        <span>doodax.com</span>
                    </p>
                </div>
            </footer>
            
            {activeModal && (
                <Modal title={activeModal} onClose={closeModal}>
                    {getModalContent(activeModal)}
                </Modal>
            )}
        </div>
    );
};

export default Layout;
