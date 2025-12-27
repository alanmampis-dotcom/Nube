function FileManager({ folders, onAddFolder, onUpdateFolder, onDeleteFolder }) {
    // Files State (Local, for now)
    const [files, setFiles] = React.useState([
        { id: 1, name: 'Reporte_Final.pdf', type: 'doc', size: '2.5 MB' },
        { id: 2, name: 'Canción_Demo.mp3', type: 'audio', size: '4.2 MB' },
        { id: 3, name: 'Vacaciones.mp4', type: 'video', size: '150 MB' },
        { id: 4, name: 'Foto_Perfil.jpg', type: 'image', size: '1.2 MB' },
        { id: 5, name: 'Notas_Reunion.docx', type: 'doc', size: '15 KB' },
    ]);

    const [isCreatingFolder, setIsCreatingFolder] = React.useState(false);
    const [newFolderName, setNewFolderName] = React.useState('');
    const [editingFolder, setEditingFolder] = React.useState(null); // The folder object being edited
    const [activeDropdown, setActiveDropdown] = React.useState(null); // Folder ID

    // Icon Mapping Helper
    const getFileIcon = (type) => {
        switch (type) {
            case 'doc': return 'icon-file-text';
            case 'audio': return 'icon-circle-play';
            case 'video': return 'icon-film';
            case 'image': return 'icon-image';
            default: return 'icon-file';
        }
    };

    const getFileColor = (type) => {
        switch (type) {
            case 'doc': return 'text-blue-600 bg-blue-50';
            case 'audio': return 'text-amber-600 bg-amber-50';
            case 'video': return 'text-red-600 bg-red-50';
            case 'image': return 'text-green-600 bg-green-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;
        onAddFolder(newFolderName);
        setNewFolderName('');
        setIsCreatingFolder(false);
    };

    const handleFileUpload = () => {
        alert("Simulación: Abriendo diálogo de selección de archivos...");
        // Mock upload
        const newFile = {
            id: Date.now(),
            name: `Nuevo_Archivo_${files.length + 1}.txt`,
            type: 'doc',
            size: '0 KB'
        };
        setFiles([newFile, ...files]);
    };

    const handleDeleteFile = (id) => {
        if (confirm('¿Estás seguro de eliminar este archivo?')) {
            setFiles(files.filter(f => f.id !== id));
        }
    };
    
    const handleDownload = (name) => {
        alert(`Descargando: ${name}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500" data-name="file-manager" data-file="components/FileManager.js">
            
            {/* Settings Modal */}
            <FolderSettingsModal 
                folder={editingFolder} 
                isOpen={!!editingFolder} 
                onClose={() => setEditingFolder(null)} 
                onSave={onUpdateFolder}
            />

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <div className="icon-folder-open text-[var(--primary-color)]"></div>
                    Mis Archivos
                </h2>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setIsCreatingFolder(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                        <div className="icon-folder-plus"></div>
                        <span>Nueva Carpeta</span>
                    </button>
                    <button 
                        onClick={handleFileUpload}
                        className="flex items-center gap-2 px-4 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-hover)] text-white rounded-lg font-medium transition-colors shadow-sm"
                    >
                        <div className="icon-upload"></div>
                        <span>Subir Archivo</span>
                    </button>
                </div>
            </div>

            {/* New Folder Input */}
            {isCreatingFolder && (
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-in slide-in-from-top-2">
                    <form onSubmit={handleCreateSubmit} className="flex items-center gap-2">
                        <div className="icon-folder text-gray-400"></div>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Nombre de la carpeta"
                            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                        />
                        <button type="submit" className="text-[var(--primary-color)] font-bold text-sm hover:underline">Crear</button>
                        <button type="button" onClick={() => setIsCreatingFolder(false)} className="text-gray-400 hover:text-gray-600">
                            <div className="icon-x"></div>
                        </button>
                    </form>
                </div>
            )}

            {/* Folders Grid */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex justify-between items-center">
                    <span>Carpetas</span>
                    <span className="text-xs font-normal text-gray-400">{folders.length} carpetas</span>
                </h3>
                
                {folders.length === 0 ? (
                    <div className="p-8 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl">
                        <div className="icon-folder-plus mx-auto text-4xl text-gray-300 mb-2"></div>
                        <p className="text-gray-500">No tienes carpetas. ¡Crea una nueva!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {folders.map(folder => (
                            <div key={folder.id} className="group relative bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                {/* Access Indicators */}
                                <div className="absolute top-2 left-2 flex gap-1">
                                    {folder.security?.readPass && <div className="icon-lock w-3 h-3 text-red-400" title="Protegido con contraseña"></div>}
                                    {folder.sharedWith?.length > 0 && <div className="icon-users w-3 h-3 text-blue-400" title="Compartido"></div>}
                                </div>

                                <div className="flex items-start justify-between mb-2 mt-2">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${folder.bg}`}>
                                        <div className={`icon-folder text-xl ${folder.color}`}></div>
                                    </div>
                                    
                                    {/* Action Menu Trigger */}
                                    <div className="relative">
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                setActiveDropdown(activeDropdown === folder.id ? null : folder.id); 
                                            }}
                                            className={`p-1 rounded-full hover:bg-gray-100 transition-colors ${activeDropdown === folder.id ? 'opacity-100 bg-gray-100' : 'opacity-0 group-hover:opacity-100'}`}
                                        >
                                            <div className="icon-ellipsis-vertical w-4 h-4 text-gray-500"></div>
                                        </button>

                                        {/* Dropdown Menu */}
                                        {activeDropdown === folder.id && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setActiveDropdown(null); }}></div>
                                                <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl border border-gray-100 py-1 z-20 w-40 animate-in fade-in zoom-in-95 duration-100">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setEditingFolder(folder); setActiveDropdown(null); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                    >
                                                        <div className="icon-settings w-4 h-4"></div> Configurar
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); onDeleteFolder(folder.id); setActiveDropdown(null); }}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                                                    >
                                                        <div className="icon-trash-2 w-4 h-4"></div> Eliminar
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <p className="font-medium text-gray-700 truncate text-sm" title={folder.name}>{folder.name}</p>
                                <p className="text-xs text-gray-400">0 archivos</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Files List */}
            <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Archivos Recientes</h3>
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Tamaño</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {files.map(file => {
                                const iconClass = getFileIcon(file.type);
                                const colorClass = getFileColor(file.type);
                                
                                return (
                                    <tr key={file.id} className="group hover:bg-gray-50/80 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass.split(' ')[1]}`}>
                                                    <div className={`${iconClass} text-lg ${colorClass.split(' ')[0]}`}></div>
                                                </div>
                                                <span className="font-medium text-gray-700 group-hover:text-[var(--primary-color)] transition-colors">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                                {file.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{file.size}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button 
                                                onClick={() => handleDownload(file.name)}
                                                className="text-gray-400 hover:text-[var(--primary-color)] p-2 rounded-full hover:bg-gray-100 transition-all"
                                                title="Descargar"
                                            >
                                                <div className="icon-download w-4 h-4"></div>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteFile(file.id)}
                                                className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-all ml-1"
                                                title="Eliminar"
                                            >
                                                <div className="icon-trash-2 w-4 h-4"></div>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}