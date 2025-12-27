function TwoFactorAuth({ onVerify, onCancel }) {
    const [code, setCode] = React.useState(['', '', '', '', '', '']);
    const inputs = React.useRef([]);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto focus next input
        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }
        
        // Check if complete
        if (newCode.every(digit => digit !== '') && index === 5) {
            setTimeout(() => onVerify(newCode.join('')), 300);
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    return (
        <div className="text-center animate-in fade-in zoom-in duration-300" data-name="two-factor-auth" data-file="components/TwoFactorAuth.js">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="icon-shield-check text-3xl text-[var(--primary-color)]"></div>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Verificación en Dos Pasos</h2>
            <p className="text-gray-500 mb-8 text-sm">
                Hemos enviado un código de 6 dígitos a su dispositivo seguro. <br/>
                (Para demo use: 123456)
            </p>

            <div className="flex justify-center gap-2 mb-8">
                {code.map((digit, idx) => (
                    <input
                        key={idx}
                        ref={el => inputs.current[idx] = el}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-12 h-14 border-2 border-gray-200 rounded-lg text-center text-2xl font-bold focus:border-[var(--primary-color)] focus:ring-0 outline-none transition-colors"
                    />
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={() => onVerify(code.join(''))}
                    className="btn-primary w-full py-3"
                >
                    Verificar Acceso
                </button>
                <button 
                    onClick={onCancel}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Volver al inicio de sesión
                </button>
            </div>
        </div>
    );
}