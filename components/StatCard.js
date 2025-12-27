function StatCard({ title, count, icon, color, bgColor }) {
    return (
        <div className="card hover:shadow-md transition-shadow cursor-pointer group" data-name="stat-card" data-file="components/StatCard.js">
            <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bgColor}`}>
                    <div className={`${icon} text-xl ${color}`}></div>
                </div>
                <div className="icon-ellipsis text-gray-400 group-hover:text-gray-600"></div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
        </div>
    );
}