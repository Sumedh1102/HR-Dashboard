import React, { useState, useEffect } from 'react';
import { CloudUpload, Box, Package, Clock, Users, User, Settings , ChartLine, LayoutDashboard, List} from 'lucide-react';

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard');
  const [darkMode, setDarkMode] = useState(true); // Since the default is dark theme
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Apply theme based on darkMode state
  useEffect(() => {
    const appElement = document.documentElement;
    if (darkMode) {
      appElement.classList.add('dark-theme');
      appElement.classList.remove('light-theme');
    } else {
      appElement.classList.add('light-theme');
      appElement.classList.remove('dark-theme');
    }
  }, [darkMode]);
  
  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Toggle between dark and light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const renderContent = () => {
    switch(activePage) {
      case 'Dashboard':
        return <DashboardContent darkMode={darkMode} />;
      case 'Resume Upload':
        return <ResumeUploadContent darkMode={darkMode} />;
      case 'Analytics':
        return <AnalyticsContent darkMode={darkMode} />;
      case 'Reports':
        return <ReportsContent darkMode={darkMode} />;
      case 'Candidate List':
        return <CandidateListContent darkMode={darkMode} />;
      case 'Settings':
        return <SettingsContent darkMode={darkMode} />;
      default:
        return <DashboardContent darkMode={darkMode} />;
    }
  };

  // Determine theme-based classes
  const mainBgClass = darkMode ? "bg-gray-950" : "bg-gray-100";
  const textClass = darkMode ? "text-white" : "text-gray-900";
  const sidebarBgClass = darkMode ? "bg-gray-900" : "bg-gray-200";
  const cardBgClass = darkMode ? "bg-gray-900" : "bg-white";
  const inputBgClass = darkMode ? "bg-gray-800" : "bg-gray-200";
  const borderClass = darkMode ? "border-gray-800" : "border-gray-300";

  return (
    <div className={`flex h-screen ${mainBgClass} ${textClass} transition-colors duration-200`}>
      {/* Sidebar */}
      <div className={`${sidebarBgClass} p-4 flex flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-16' : 'w-60'}`}>
        <div className={`flex items-center gap-2 mb-8 p-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
          {!sidebarCollapsed && <h1 className="text-lg font-semibold">RecruitIQ</h1>}
        </div>
        
        {!sidebarCollapsed && <div className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs mb-2 px-2`}>Dashboard</div>}
        
        <SidebarItem 
          icon={<LayoutDashboard />} 
          label="Dashboard" 
          active={activePage === 'Dashboard'} 
          onClick={() => setActivePage('Dashboard')}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
        />
        <SidebarItem 
          icon={<CloudUpload />} 
          label="Resume Upload" 
          active={activePage === 'Resume Upload'} 
          onClick={() => setActivePage('Resume Upload')}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
        />
        <SidebarItem 
          icon={<ChartLine />} 
          label="Analytics" 
          active={activePage === 'Analytics'} 
          onClick={() => setActivePage('Analytics')}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
        />
        <SidebarItem 
          icon={<Clock />} 
          label="Reports" 
          active={activePage === 'Reports'} 
          onClick={() => setActivePage('Reports')}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
        />
        <SidebarItem 
          icon={<List />} 
          label="Candidate List" 
          active={activePage === 'Candidate List'} 
          onClick={() => setActivePage('Candidate List')}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
        />
        <SidebarItem 
          icon={<Settings />} 
          label="Settings" 
          active={activePage === 'Settings'} 
          onClick={() => setActivePage('Settings')}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
        />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className={`p-4 flex justify-between items-center border-b ${borderClass} transition-colors duration-200`}>
          <div className="flex items-center">
            <button 
              className={`p-2 mr-4 rounded-full hover:bg-gray-700 cursor-pointer ${darkMode ? '' : 'hover:bg-gray-300'}`}
              onClick={toggleSidebar}
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </button>
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                className={`${inputBgClass} ${textClass} pl-10 pr-4 py-2 rounded-md w-full focus:outline-none transition-colors duration-200`}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
              onClick={toggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button className="p-2">
              <BellIcon className="h-5 w-5" />
            </button>
            <button className={`w-8 h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full flex items-center justify-center text-sm`}>?</button>
          </div>
        </header>
        
        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">{activePage}</h1>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick, darkMode, collapsed }) => {
  const hoverClass = darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-300';
  
  return (
    <div 
      className={`flex ${collapsed ? 'justify-center' : ''} items-center gap-3 p-2 rounded-md mb-1 cursor-pointer transition-colors duration-200 ${active ? 'bg-blue-600 text-white' : hoverClass}`}
      onClick={onClick}
      title={collapsed ? label : ''}
    >
      <div className={collapsed ? 'mx-auto' : ''}>
        {icon}
      </div>
      {!collapsed && <span>{label}</span>}
    </div>
  );
};

const StatCard = ({ icon, title, value, change, color, darkMode }) => {
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const iconBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const borderColor = `border-${color}-${darkMode ? '800' : '200'}`;
  const textColor = `text-${color}-${darkMode ? '500' : '600'}`;
  
  return (
    <div className={`${cardBg} rounded-lg overflow-hidden shadow transition-colors duration-200`}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <div className={`p-2 ${iconBg} rounded-lg`}>
            {icon}
          </div>
          <div className="text-base">{title}</div>
        </div>
        
        <div className="text-3xl font-bold mb-3">{value}</div>
        
        <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border ${borderColor} ${textColor}`}>
          <TrendingUpIcon className="h-4 w-4" />
          <span>{change}%</span>
        </div>
      </div>
    </div>
  );
};

// Page Components
const DashboardContent = ({ darkMode }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <StatCard 
        icon={<Box className="text-blue-500" />} 
        title="Total Resume" 
        value="25,154" 
        change={25} 
        color="blue"
        darkMode={darkMode}
      />
      <StatCard 
        icon={<Clock className="text-blue-500" />} 
        title="Total Pending" 
        value="16,000" 
        change={12} 
        color="blue"
        darkMode={darkMode}
      />
      <StatCard 
        icon={<Users className="text-blue-500" />} 
        title="Total Candidates" 
        value="15,400k" 
        change={15} 
        color="blue"
        darkMode={darkMode}
      />
      <StatCard 
        icon={<Box className="text-blue-500" />} 
        title="Sales" 
        value="12,340" 
        change={19} 
        color="blue"
        darkMode={darkMode}
      />
    </div>
  );
};

// Other content components similar to above with darkMode prop
const AnalyticsContent = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const chartBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textColor = darkMode ? "text-gray-300" : "text-gray-600";
  
  return (
    <div className={`${cardBg} p-6 rounded-lg shadow transition-colors duration-200`}>
      <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
      <p className={textColor}>View detailed analytics and performance metrics for your recruitment operations.</p>
      <div className={`h-64 w-full mt-6 ${chartBg} rounded-lg flex items-center justify-center transition-colors duration-200`}>
        <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Analytics charts and graphs will appear here</p>
      </div>
    </div>
  );
};

const ReportsContent = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const itemBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textColor = darkMode ? "text-gray-300" : "text-gray-600";
  
  return (
    <div className={`${cardBg} p-6 rounded-lg shadow transition-colors duration-200`}>
      <h2 className="text-xl font-semibold mb-4">Reports</h2>
      <p className={textColor}>View and generate reports on recruitment activities and outcomes.</p>
      <div className="mt-4 grid gap-4">
        <div className={`p-4 ${itemBg} rounded-lg transition-colors duration-200`}>Weekly Hiring Report</div>
        <div className={`p-4 ${itemBg} rounded-lg transition-colors duration-200`}>Monthly Performance Summary</div>
        <div className={`p-4 ${itemBg} rounded-lg transition-colors duration-200`}>Candidate Source Analysis</div>
      </div>
    </div>
  );
};

const CandidateListContent = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const borderColor = darkMode ? "border-gray-800" : "border-gray-200";
  
  return (
    <div className={`${cardBg} p-6 rounded-lg shadow transition-colors duration-200`}>
      <h2 className="text-xl font-semibold mb-4">Candidate List</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`border-b ${borderColor}`}>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Position</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={`border-b ${borderColor}`}>
              <td className="p-3">John Doe</td>
              <td className="p-3">Frontend Developer</td>
              <td className="p-3"><span className="px-2 py-1 bg-yellow-800 text-yellow-300 rounded-full text-xs">Interview</span></td>
              <td className="p-3">View</td>
            </tr>
            <tr className={`border-b ${borderColor}`}>
              <td className="p-3">Jane Smith</td>
              <td className="p-3">UX Designer</td>
              <td className="p-3"><span className="px-2 py-1 bg-green-800 text-green-300 rounded-full text-xs">Hired</span></td>
              <td className="p-3">View</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ResumeUploadContent = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const borderColor = darkMode ? "border-gray-700" : "border-gray-300";
  const textColor = darkMode ? "text-gray-300" : "text-gray-600";
  const placeholderColor = darkMode ? "text-gray-400" : "text-gray-500";
  
  return (
    <div className={`${cardBg} p-6 rounded-lg shadow transition-colors duration-200`}>
      <h2 className="text-xl font-semibold mb-4">Resume Upload</h2>
      <p className={`${textColor} mb-4`}>Upload candidate resumes for automatic parsing and processing.</p>
      <div className={`border-2 border-dashed ${borderColor} rounded-lg p-10 text-center transition-colors duration-200`}>
        <p className={`${placeholderColor} mb-2`}>Drag and drop resume files here or click to browse</p>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2">Browse Files</button>
      </div>
    </div>
  );
};

const SettingsContent = ({ darkMode }) => {
  const cardBg = darkMode ? "bg-gray-900" : "bg-white";
  const itemBg = darkMode ? "bg-gray-800" : "bg-gray-100";
  const textColor = darkMode ? "text-gray-400" : "text-gray-500";
  
  return (
    <div className={`${cardBg} p-6 rounded-lg shadow transition-colors duration-200`}>
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div className={`p-4 ${itemBg} rounded-lg transition-colors duration-200`}>
          <h3 className="font-medium mb-2">Account Settings</h3>
          <p className={textColor}>Manage your account details and preferences</p>
        </div>
        <div className={`p-4 ${itemBg} rounded-lg transition-colors duration-200`}>
          <h3 className="font-medium mb-2">Notification Settings</h3>
          <p className={textColor}>Configure how and when you receive notifications</p>
        </div>
        <div className={`p-4 ${itemBg} rounded-lg transition-colors duration-200`}>
          <h3 className="font-medium mb-2">Team Management</h3>
          <p className={textColor}>Manage team members and permissions</p>
        </div>
      </div>
    </div>
  );
};

// Icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default Dashboard;