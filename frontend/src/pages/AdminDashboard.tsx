import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import AdminProjects from '../components/Admin/AdminProjects';
import AdminExperiences from '../components/Admin/AdminExperiences';
import AdminEducation from '../components/Admin/AdminEducation';

interface AdminDashboardProps {
  token: string;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'education'>('projects');

  const tabs = [
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'experiences', label: 'Experiences', icon: '💼' },
    { id: 'education', label: 'Education', icon: '🎓' },
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-dark-800/50 border-b border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium transition border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'projects' && <AdminProjects token={token} />}
        {activeTab === 'experiences' && <AdminExperiences token={token} />}
        {activeTab === 'education' && <AdminEducation token={token} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
