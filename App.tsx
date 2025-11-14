import React, { useState } from 'react';
import Layout from './components/Layout.tsx';
import ContactDirectoryTool from './components/ContactDirectoryTool.tsx';
import SeoArticle from './utils/SeoArticle.tsx';

const App: React.FC = () => {
    const [isArticleVisible, setIsArticleVisible] = useState(false);

    return (
        <Layout>
            <ContactDirectoryTool />
            <div className="bg-slate-900/60 backdrop-blur-sm border-y border-slate-700 my-16 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative">
                        <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${isArticleVisible ? 'max-h-[10000px]' : 'max-h-48'}`}>
                            <SeoArticle />
                        </div>
                        {!isArticleVisible && (
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0d1323] via-[#0d1323]/80 to-transparent pointer-events-none"></div>
                        )}
                        <div className="text-center mt-8">
                            <button
                                onClick={() => setIsArticleVisible(!isArticleVisible)}
                                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
                                aria-expanded={isArticleVisible}
                            >
                                {isArticleVisible ? 'Show Less' : 'Read Full Guide & SEO Insights'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default App;
