import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import type { Project } from '../../services/api';
import api from '../../services/api';

interface CreateProjectFormProps {
  token: string;
  project?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface ProjectTranslation {
  language: string;
  title: string;
  description: string;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  token,
  project,
  onSuccess,
  onCancel,
}) => {
  const [featured, setFeatured] = useState(project?.featured || false);
  const [imageUrl, setImageUrl] = useState(project?.imageUrl || '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || '');
  const [technologiesInput, setTechnologiesInput] = useState(
    project?.technologies.join(', ') || ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize translations with current project data if available
  const initializeTranslations = (): ProjectTranslation[] => {
    if (project?.translations && project.translations.length > 0) {
      return project.translations.map(t => ({
        language: t.language,
        title: t.title,
        description: t.description,
      }));
    }
    return [
      { language: 'en', title: '', description: '' },
      { language: 'ru', title: '', description: '' },
      { language: 'az', title: '', description: '' },
    ];
  };

  const [translations, setTranslations] = useState<ProjectTranslation[]>(
    initializeTranslations()
  );

  const handleTranslationChange = (
    index: number,
    field: keyof ProjectTranslation,
    value: string
  ) => {
    const newTranslations = [...translations];
    newTranslations[index] = { ...newTranslations[index], [field]: value };
    setTranslations(newTranslations);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        imageUrl,
        liveUrl: liveUrl || undefined,
        githubUrl: githubUrl || undefined,
        featured,
        technologies: technologiesInput.split(',').map(t => t.trim()).filter(Boolean),
        translations,
      };

      if (project?.id) {
        await api.patch(`/projects/${project.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post('/projects', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save project');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect rounded-lg p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {project ? 'Edit Project' : 'Create New Project'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image & URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Live URL
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              value={technologiesInput}
              onChange={(e) => setTechnologiesInput(e.target.value)}
              placeholder="React, TypeScript, Tailwind"
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-300">
            Mark as Featured ⭐
          </label>
        </div>

        {/* Translations */}
        <div className="space-y-6 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white">Translations</h3>
          {translations.map((translation, index) => (
            <div key={translation.language} className="space-y-4">
              <h4 className="font-medium text-gray-300 capitalize">
                {translation.language === 'az' ? 'Azerbaijani' : translation.language.charAt(0).toUpperCase() + translation.language.slice(1)}
              </h4>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={translation.title}
                  onChange={(e) =>
                    handleTranslationChange(index, 'title', e.target.value)
                  }
                  placeholder="Project title"
                  className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={translation.description}
                  onChange={(e) =>
                    handleTranslationChange(index, 'description', e.target.value)
                  }
                  placeholder="Project description"
                  rows={4}
                  className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition resize-none"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-700">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
