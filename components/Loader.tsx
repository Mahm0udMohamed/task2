import React from 'react';

const SunIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 7.758a.75.75 0 00-1.06-1.06L3.515 8.29a.75.75 0 001.06 1.061l1.591-1.59z" />
    </svg>
);


const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-white">
            <SunIcon className="w-24 h-24 text-yellow-300 animate-spin-slow mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-black drop-shadow-md mb-2 text-sky-900" style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}>
                جاري تحضير الأسئلة...
            </h2>
            <p className="text-xl font-bold text-sky-800/80">
                مغامرة معرفية مشرقة على وشك أن تبدأ!
            </p>
        </div>
    );
};

export default Loader;