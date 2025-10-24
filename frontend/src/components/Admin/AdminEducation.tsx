import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2 } from 'lucide-react';
import api from '../../services/api';
import CreateEducationForm from './CreateEducationForm';

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  grade?: string;
  website?: string;
  technologies?: string[];
  createdAt: string;
  updatedAt: string;
}

interface AdminEducationProps {
  token: string;
}

const AdminEducation: React.FC<AdminEducationProps> = ({ token }) => {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/education', {
        headers: { 'Accept-Language': 'en' },
      });
      setEducations(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch education records');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education record?')) return;

    try {
      await api.delete(`/education/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducations(educations.filter(e => e.id !== id));
    } catch (err) {
      setError('Failed to delete education record');
      console.error(err);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingEdu(null);
  };

  const handleFormSuccess = () => {
    fetchEducations();
    handleFormClose();
  };

  const handleEditClick = async (education: any) => {
    try {
      // Fetch the education with all translations for editing
      const fullEducation = await api.get(`/education/${education.id}/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingEdu(fullEducation.data);
      setShowForm(true);
    } catch (err) {
      setError('Failed to load education for editing');
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  return (
    <div>
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {showForm ? (
        <CreateEducationForm
          token={token}
          education={editingEdu}
          onSuccess={handleFormSuccess}
          onCancel={handleFormClose}
        />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Manage Education</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              New Education
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            </div>
          ) : educations.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No education records yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Add First Education
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {educations.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-effect p-6 rounded-lg flex items-center justify-between hover:bg-white/10 transition"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-gray-400 text-sm mb-1">
                      {edu.institution} • {formatDate(edu.startDate)} - {edu.current ? 'Present' : edu.endDate ? formatDate(edu.endDate) : 'N/A'}
                    </p>
                    {edu.grade && (
                      <p className="text-gray-300 text-sm">Grade: {edu.grade}</p>
                    )}
                    {edu.current && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                        🎓 Currently Studying
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditClick(edu)}
                      className="p-2 hover:bg-blue-500/20 text-blue-300 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(edu.id)}
                      className="p-2 hover:bg-red-500/20 text-red-300 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminEducation;
