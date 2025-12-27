function LoginForm({ onSuccess }) {
    const [step, setStep] = React.useState('login'); // login | 2fa
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isEncrypting, setIsEncrypting] = React.useState(false);
    const [error, setError] = React.useState('');

    // Validation state
    const passwordValidation = validatePassword(password);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!passwordValidation.isValid) {
            setError('La contraseña no cumple con los requisitos de seguridad.');
            return;
        }

        // Simulate "Ring Encryption" process
        setIsEncrypting(true);
        
        // Fake delay for encryption animation
        setTimeout(() => {
            setIsEncrypting(false);
            setStep('2fa');
        }, 3000);
    };

    const handle2FASubmit = (code) => {
        if (code === '123456') {
            onSuccess();
        } else {
            alert('Código incorrecto. Intente con 123456');
        }
    };

    if (step === '2fa') {
        return (
            <div className="text-white">
                 <TwoFactorAuth onVerify={handle2FASubmit} onCancel={() => setStep('login')} />
            </div>
        );
    }

    return (
        <div className="relative" data-name="login-form" data-file="components/LoginForm.js">
            <EncryptionRing isVisible={isEncrypting} />
            
            <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-2 mb-2">
                    <div className="icon-cloud text-5xl text-white drop-shadow-lg"></div>
                    <span className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md">SecureCloud</span>
                </div>
                <p className="text-white/80 font-bold text-lg">Gestión segura de archivos en la nube</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-white mb-2 shadow-black drop-shadow-sm">Correo Electrónico</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-white transition-colors">
                            <div className="icon-mail text-lg"></div>
                        </div>
                        <input 
                            type="email" 
                            name="email"
                            id="email"
                            autoComplete="username"
                            required
                            className="w-full px-4 py-3 pl-10 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all duration-200 font-bold backdrop-blur-sm"
                            placeholder="usuario@securecloud.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-bold text-white mb-2 drop-shadow-sm">Contraseña</label>
                    <div className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 group-focus-within:text-white transition-colors">
                            <div className="icon-lock text-lg"></div>
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            required
                            className="w-full px-4 py-3 pl-10 pr-10 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:bg-white/20 focus:ring-2 focus:ring-white/50 focus:border-white/50 outline-none transition-all duration-200 font-bold backdrop-blur-sm"
                            placeholder="••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                        >
                            <div className={showPassword ? "icon-eye-off text-lg" : "icon-eye text-lg"}></div>
                        </button>
                    </div>
                    
                    {/* Password Requirements Checklist */}
                    <div className="mt-4 bg-black/20 p-4 rounded-lg border border-white/10 backdrop-blur-sm">
                        <p className="text-xs font-bold text-white/90 mb-2 uppercase tracking-wide">Requisitos de seguridad:</p>
                        <ul className="text-xs space-y-2 font-semibold">
                            <li className={`flex items-center gap-2 ${passwordValidation.errors.length ? 'text-green-400' : 'text-white/40'}`}>
                                <div className={passwordValidation.errors.length ? "icon-check w-3 h-3" : "icon-circle w-3 h-3"}></div>
                                <span>Mínimo 10 caracteres</span>
                            </li>
                            <li className={`flex items-center gap-2 ${passwordValidation.errors.upper ? 'text-green-400' : 'text-white/40'}`}>
                                <div className={passwordValidation.errors.upper ? "icon-check w-3 h-3" : "icon-circle w-3 h-3"}></div>
                                <span>Mayúscula</span>
                            </li>
                            <li className={`flex items-center gap-2 ${passwordValidation.errors.lower ? 'text-green-400' : 'text-white/40'}`}>
                                <div className={passwordValidation.errors.lower ? "icon-check w-3 h-3" : "icon-circle w-3 h-3"}></div>
                                <span>Minúscula</span>
                            </li>
                            <li className={`flex items-center gap-2 ${passwordValidation.errors.number ? 'text-green-400' : 'text-white/40'}`}>
                                <div className={passwordValidation.errors.number ? "icon-check w-3 h-3" : "icon-circle w-3 h-3"}></div>
                                <span>Número</span>
                            </li>
                            <li className={`flex items-center gap-2 ${passwordValidation.errors.special ? 'text-green-400' : 'text-white/40'}`}>
                                <div className={passwordValidation.errors.special ? "icon-check w-3 h-3" : "icon-circle w-3 h-3"}></div>
                                <span>Carácter especial (!@#$...)</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 backdrop-blur-sm text-red-200 text-sm font-bold rounded-lg flex items-center gap-2">
                        <div className="icon-circle-alert"></div>
                        {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={!passwordValidation.isValid}
                    className="w-full py-3 px-4 bg-gradient-to-r from-[var(--primary-color)] to-red-700 hover:from-red-500 hover:to-red-800 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transform hover:-translate-y-0.5"
                >
                    <div className="icon-log-in"></div>
                    INICIAR SESIÓN SEGURO
                </button>
            </form>
            
            {/* Social Footer */}
            <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-white/80 text-sm font-bold">Contáctanos</p>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all mb-1">
                                <div className="icon-mail text-white"></div>
                            </div>
                            <span className="text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">alanmampis@gmail.com</span>
                        </div>
                        <div className="flex flex-col items-center group cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all mb-1">
                                <div className="icon-twitter text-white"></div>
                            </div>
                            <span className="text-[10px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 whitespace-nowrap">@alanhernandez62</span>
                        </div>
                    </div>
                    
                    {/* Always visible text version for accessibility/clarity as requested */}
                    <div className="text-center mt-2 space-y-1">
                        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors">
                            <div className="icon-mail w-3 h-3"></div>
                            <span className="text-xs font-bold">alanmampis@gmail.com</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-white/70 hover:text-white transition-colors">
                            <div className="icon-at-sign w-3 h-3"></div>
                            <span className="text-xs font-bold">@alanhernandez62</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <p className="text-center mt-8 text-xs text-white/40 font-bold">
                &copy; 2025 SecureCloud Inc.
            </p>
        </div>
    );
}