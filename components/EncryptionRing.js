function EncryptionRing({ isVisible }) {
    if (!isVisible) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 rounded-xl" data-name="encryption-ring" data-file="components/EncryptionRing.js">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-full h-full ring-spinner border-4"></div>
                
                {/* Middle Ring */}
                <div className="absolute w-32 h-32 ring-spinner-reverse border-4"></div>
                
                {/* Inner Ring */}
                <div className="absolute w-16 h-16 ring-spinner border-4 animation-delay-200"></div>
                
                {/* Center Icon */}
                <div className="relative z-10 flex flex-col items-center animate-pulse">
                    <div className="icon-lock text-3xl text-[var(--primary-color)] mb-2"></div>
                    <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Encrypting</span>
                </div>
            </div>
        </div>
    );
}