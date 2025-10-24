import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2 } from 'lucide-react';
import type { Experience } from '../../services/api';
import { experiencesApi } from '../../services/api';
import api from '../../services/api';
import CreateExperienceForm from './CreateExperienceForm';

interface AdminExperiencesProps {
  token: string;
}

const AdminExperiences: React.FC<AdminExperiencesProps> = ({ token }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const data = await experiencesApi.getAll('en');
      setExperiences(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch experiences');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;

    try {
      await api.delete(`/experiences/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExperiences(experiences.filter(e => e.id !== id));
    } catch (err) {
      setError('Failed to delete experience');
      console.error(err);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingExp(null);
  };

  const handleFormSuccess = () => {
    fetchExperiences();
    handleFormClose();
  };

  const handleEditClick = async (experience: Experience) => {
    try {
      // Fetch the experience with all translations for editing
      const fullExperience = await experiencesApi.getByIdForAdmin(experience.id, token);
      setEditingExp(fullExperience);
      setShowForm(true);
    } catch (err) {
      setError('Failed to load experience for editing');
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
        <CreateExperienceForm
          token={token}
          experience={editingExp}
          onSuccess={handleFormSuccess}
          onCancel={handleFormClose}
        />
      ) : (
        <>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Manage Experiences</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
            >
              <Plus className="w-4 h-4" />
              New Experience
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary-400" />
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-4">No experiences yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition"
              >
                <Plus className="w-4 h-4" />
                Add First Experience
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="glass-effect p-6 rounded-lg flex items-center justify-between hover:bg-white/10 transition"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-gray-400 text-sm mb-1">
                      {exp.company} • {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate!)}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">
                      {exp.description.substring(0, 100)}...
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {exp.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary-500/20 text-primary-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 3 && (
                        <span className="px-2 py-1 text-gray-400 text-xs">
                          +{exp.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    {exp.current && (
                      <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                        🔴 Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEditClick(exp)}
                      className="p-2 hover:bg-blue-500/20 text-blue-300 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id)}
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

export default AdminExperiences;
