function FolderSettingsModal({ folder, isOpen, onClose, onSave }) {
    if (!isOpen || !folder) return null;

    const [activeTab, setActiveTab] = React.useState('general'); // general | security | share
    const [name, setName] = React.useState(folder.name);
    const [color, setColor] = React.useState({ text: folder.color, bg: folder.bg });
    
    // Security State
    const [readPassword, setReadPassword] = React.useState(folder.security?.readPass || '');
    const [editPassword, setEditPassword] = React.useState(folder.security?.editPass || '');
    
    // Share State
    const [shareEmail, setShareEmail] = React.useState('');
    const [sharedUsers, setSharedUsers] = React.useState(folder.sharedWith || []);

    const availableColors = [
        { name: 'Blue', text: 'text-blue-500', bg: 'bg-blue-100' },
        { name: 'Red', text: 'text-red-500', bg: 'bg-red-100' },
        { name: 'Green', text: 'text-green-500', bg: 'bg-green-100' },
        { name: 'Yellow', text: 'text-yellow-500', bg: 'bg-yellow-100' },
        { name: 'Purple', text: 'text-purple-500', bg: 'bg-purple-100' },
        { name: 'Pink', text: 'text-pink-500', bg: 'bg-pink-100' },
        { name: 'Gray', text: 'text-gray-500', bg: 'bg-gray-100' },
    ];

    const handleSave = () => {
        onSave({
            ...folder,
            name,
            color: color.text,
            bg: color.bg,
            security: {
                readPass: readPassword,
                editPass: editPassword
            },
            sharedWith: sharedUsers
        });
        onClose();
    };

    const handleInvite = (e) => {
        e.preventDefault();
        if (shareEmail) {
            setSharedUsers([...sharedUsers, { email: shareEmail, role: 'viewer' }]);
            setShareEmail('');
        }
    };

    const removeUser = (email) => {
        setSharedUsers(sharedUsers.filter(u => u.email !== email));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <div className="icon-settings text-gray-500"></div>
                        Configuración de Carpeta
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <div className="icon-x"></div>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button 
                        onClick={() => setActiveTab('general')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'general' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        General
                    </button>
                    <button 
                        onClick={() => setActiveTab('security')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'security' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Seguridad
                    </button>
                    <button 
                        onClick={() => setActiveTab('share')}
                        className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'share' ? 'border-[var(--primary-color)] text-[var(--primary-color)]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        Compartir
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Carpeta</label>
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Color de Etiqueta</label>
                                <div className="flex gap-3 flex-wrap">
                                    {availableColors.map((c, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setColor(c)}
                                            className={`w-8 h-8 rounded-full ${c.bg} border-2 transition-all ${color.text === c.text ? 'border-gray-600 scale-110' : 'border-transparent hover:border-gray-300'}`}
                                            title={c.name}
                                        >
                                            {color.text === c.text && <div className={`icon-check w-4 h-4 mx-auto ${c.text}`}></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="space-y-6">
                            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex gap-3">
                                <div className="icon-shield-alert text-yellow-600 flex-shrink-0 mt-0.5"></div>
                                <p className="text-sm text-yellow-700">
                                    Las contraseñas restringirán el acceso a esta carpeta para otros usuarios que compartan este dispositivo.
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña de Lectura (Solo ver)</label>
                                <div className="relative">
                                    <div className="icon-eye absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"></div>
                                    <input 
                                        type="text" 
                                        value={readPassword}
                                        onChange={(e) => setReadPassword(e.target.value)}
                                        placeholder="Sin contraseña"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña de Edición (Modificar/Borrar)</label>
                                <div className="relative">
                                    <div className="icon-lock absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"></div>
                                    <input 
                                        type="text" 
                                        value={editPassword}
                                        onChange={(e) => setEditPassword(e.target.value)}
                                        placeholder="Sin contraseña"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'share' && (
                        <div className="space-y-6">
                            <form onSubmit={handleInvite} className="flex gap-2">
                                <input 
                                    type="email" 
                                    value={shareEmail}
                                    onChange={(e) => setShareEmail(e.target.value)}
                                    placeholder="correo@ejemplo.com"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] outline-none"
                                />
                                <button type="submit" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                                    Invitar
                                </button>
                            </form>

                            <div className="space-y-3">
                                <h4 className="text-xs font-bold text-gray-500 uppercase">Personas con acceso</h4>
                                {sharedUsers.length === 0 ? (
                                    <p className="text-sm text-gray-400 italic">Esta carpeta es privada</p>
                                ) : (
                                    <div className="space-y-2">
                                        {sharedUsers.map((user, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                                                        {user.email[0].toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-700">{user.email}</span>
                                                        <span className="text-xs text-gray-500 capitalize">{user.role || 'viewer'}</span>
                                                    </div>
                                                </div>
                                                <button onClick={() => removeUser(user.email)} className="text-red-400 hover:text-red-600 p-1">
                                                    <div className="icon-trash-2 w-4 h-4"></div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="pt-4 border-t border-gray-100">
                                <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium text-sm">
                                    <div className="icon-link w-4 h-4"></div>
                                    Copiar enlace de acceso
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors font-medium">
                        Cancelar
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors font-medium shadow-sm">
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}