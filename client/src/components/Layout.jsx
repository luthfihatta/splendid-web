import Sidebar from "./Sidebar.jsx";

const Layout = ({children}) => {
    return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-900 overflow-hidden">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
    );
};

export default Layout;