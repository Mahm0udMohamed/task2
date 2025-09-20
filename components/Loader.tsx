import React from 'react';

const MoonIcon: React.FC<{className: string}> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);


const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center text-white">
            <MoonIcon className="w-24 h-24 text-yellow-100 animate-gentle-rock mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-black drop-shadow-md mb-2">
                جاري تحضير الأسئلة...
            </h2>
            <p className="text-xl font-bold text-yellow-100/80">
                مغامرة المعرفة على وشك أن تبدأ تحت النجوم!
            </p>
        </div>
    );
};

export default Loader;