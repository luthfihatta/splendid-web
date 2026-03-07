import {Link, useLocation} from "react";

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50";

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col hidden md:flex">
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="text-2xl font-black text-blue-600 tracking-tighter">Aggregator.</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link to="/" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/')}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Browse Jobs
                </Link>
                
                <Link to="/saved-jobs" className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/saved-jobs')}`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                Saved Jobs
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-100">
                <Link to="/login" className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors">
                Login / Register
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;