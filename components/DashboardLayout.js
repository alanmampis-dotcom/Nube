function DashboardLayout() {
    const [currentView, setCurrentView] = React.useState('dashboard'); // dashboard | files
    
    // Centralized Folder State
    const [folders, setFolders] = React.useState([
        { id: 1, name: 'Proyectos 2025', color: 'text-blue-500', bg: 'bg-blue-100', security: {}, sharedWith: [] },
        { id: 2, name: 'Música Favorita', color: 'text-pink-500', bg: 'bg-pink-100', security: {}, sharedWith: [] },
        { id: 3, name: 'Películas', color: 'text-purple-500', bg: 'bg-purple-100', security: {}, sharedWith: [] },
    ]);

    const handleLogout = () => {
        if (confirm("¿Cerrar sesión de SecureCloud?")) {
            window.location.href = 'index.html';
        }
    };

    const handleAddFolder = (name) => {
        const newFolder = {
            id: Date.now(),
            name: name,
            color: 'text-gray-500',
            bg: 'bg-gray-100',
            security: {},
            sharedWith: []
        };
        setFolders([...folders, newFolder]);
    };

    const handleUpdateFolder = (updatedFolder) => {
        setFolders(folders.map(f => f.id === updatedFolder.id ? updatedFolder : f));
    };

    const handleDeleteFolder = (id) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta carpeta permanentemente?")) {
            setFolders(folders.filter(f => f.id !== id));
        }
    };
    
    // Mock handlers for header buttons
    const handleSearch = (e) => {
        console.log("Searching for:", e.target.value);
    };

    const handleNotificationClick = () => {
        alert("No tienes nuevas notificaciones.");
    };

    return (
        <div className="flex w-full h-full" data-name="dashboard-layout" data-file="components/DashboardLayout.js">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:flex flex-col transition-all duration-300">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary-color)] flex items-center justify-center shadow-lg shadow-red-900/50">
                        <div className="icon-cloud text-white"></div>
                    </div>
                    <span className="text-lg font-bold tracking-tight">SecureCloud</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <button 
                        onClick={() => setCurrentView('dashboard')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentView === 'dashboard' ? 'bg-[var(--primary-color)] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <div className="icon-layout-dashboard"></div>
                        <span className="font-medium">Panel General</span>
                    </button>
                    
                    <button 
                        onClick={() => setCurrentView('files')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${currentView === 'files' ? 'bg-[var(--primary-color)] text-white shadow-md' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                    >
                        <div className="icon-folder"></div>
                        <span className="font-medium">Mis Archivos</span>
                    </button>
                    
                    {/* Dynamic Sidebar Folders Section */}
                    <div className="pt-6 mt-2">
                        <div className="px-4 flex items-center justify-between mb-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Carpetas</p>
                            <span className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">{folders.length}</span>
                        </div>
                        
                        <div className="space-y-0.5">
                            {folders.map((folder) => (
                                <button 
                                    key={folder.id} 
                                    onClick={() => setCurrentView('files')} 
                                    className="w-full flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors text-sm group"
                                >
                                    <div className={`icon-folder ${folder.color} group-hover:scale-110 transition-transform duration-200`}></div>
                                    <span className="truncate flex-1 text-left">{folder.name}</span>
                                    {folder.security?.readPass && <div className="icon-lock w-3 h-3 text-gray-600"></div>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 mt-2 border-t border-gray-800/50">
                        <button onClick={() => alert("Funcionalidad de 'Compartidos' en desarrollo")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="icon-users"></div>
                            <span>Compartidos</span>
                        </button>
                        <button onClick={() => alert("Funcionalidad de 'Recientes' en desarrollo")} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="icon-clock"></div>
                            <span>Recientes</span>
                        </button>
                    </div>
                </nav>

                <div className="p-4 border-t border-gray-800 bg-gray-900 z-10">
                    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">Almacenamiento</span>
                            <span className="text-xs text-white font-medium">75%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5 mb-3 overflow-hidden">
                            <div className="bg-[var(--primary-color)] h-1.5 rounded-full" style={{width: '75%'}}></div>
                        </div>
                        <button 
                            onClick={() => alert("Redirigiendo a pasarela de pago...")}
                            className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs text-white transition-colors hover:border-white/30"
                        >
                            Mejorar Plan
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-gray-50">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-20">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                            <div className="icon-menu"></div>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800">
                            {currentView === 'dashboard' ? 'Vista General' : 'Gestor de Archivos'}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <input 
                                type="text" 
                                placeholder="Buscar archivos..." 
                                onChange={handleSearch}
                                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-[var(--primary-color)] w-64 transition-all"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <div className="icon-search w-4 h-4"></div>
                            </div>
                        </div>
                        
                        <button onClick={handleNotificationClick} className="btn-icon relative hover:bg-gray-100 p-2 rounded-full transition-colors">
                            <div className="icon-bell w-5 h-5"></div>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        </button>
                        
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-gray-900">Usuario Demo</p>
                                <p className="text-xs text-gray-500">Pro Plan</p>
                            </div>
                            <div className="relative group">
                                <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm hover:ring-2 hover:ring-gray-200 transition-all">
                                    <div className="icon-user text-gray-500"></div>
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                                        <p className="text-sm font-medium text-gray-900">Usuario Demo</p>
                                        <p className="text-xs text-gray-500">user@demo.com</p>
                                    </div>
                                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Perfil de usuario"); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <div className="icon-user w-4 h-4"></div> Perfil
                                    </a>
                                    <a href="#" onClick={(e) => { e.preventDefault(); alert("Configuración general"); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                        <div className="icon-settings w-4 h-4"></div> Configuración
                                    </a>
                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                        <div className="icon-log-out w-4 h-4"></div> Cerrar Sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Scrollable Area */}
                <div className="flex-1 overflow-auto p-6 md:p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        
                        {currentView === 'dashboard' ? (
                            <React.Fragment>
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <StatCard 
                                        title="Fotos" 
                                        count="2,450" 
                                        icon="icon-image" 
                                        color="text-blue-600" 
                                        bgColor="bg-blue-50" 
                                    />
                                    <StatCard 
                                        title="Documentos" 
                                        count="432" 
                                        icon="icon-file-text" 
                                        color="text-yellow-600" 
                                        bgColor="bg-yellow-50" 
                                    />
                                    <StatCard 
                                        title="Compartidos" 
                                        count="89" 
                                        icon="icon-share-2" 
                                        color="text-purple-600" 
                                        bgColor="bg-purple-50" 
                                    />
                                    <StatCard 
                                        title="Eliminados" 
                                        count="12" 
                                        icon="icon-trash-2" 
                                        color="text-red-600" 
                                        bgColor="bg-red-50" 
                                    />
                                </div>

                                {/* Storage Chart Section */}
                                <div className="card">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Análisis de Almacenamiento</h2>
                                            <p className="text-sm text-gray-500">Uso de datos en los últimos 7 días</p>
                                        </div>
                                        <select className="bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-1 outline-none focus:border-[var(--primary-color)] cursor-pointer">
                                            <option>Última Semana</option>
                                            <option>Último Mes</option>
                                            <option>Último Año</option>
                                        </select>
                                    </div>
                                    <StorageChart />
                                </div>
                            </React.Fragment>
                        ) : (
                            <FileManager 
                                folders={folders} 
                                onAddFolder={handleAddFolder} 
                                onUpdateFolder={handleUpdateFolder}
                                onDeleteFolder={handleDeleteFolder}
                            />
                        )}

                    </div>
                </div>
            </main>
        </div>
    );
}