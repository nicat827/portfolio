import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import type { Experience } from '../../services/api';
import api from '../../services/api';

interface CreateExperienceFormProps {
  token: string;
  experience?: Experience | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface ExperienceTranslation {
  language: string;
  company: string;
  position: string;
  description: string;
}

const CreateExperienceForm: React.FC<CreateExperienceFormProps> = ({
  token,
  experience,
  onSuccess,
  onCancel,
}) => {
  const [startDate, setStartDate] = useState(
    experience?.startDate?.split('T')[0] || ''
  );
  const [endDate, setEndDate] = useState(
    experience?.endDate?.split('T')[0] || ''
  );
  const [current, setCurrent] = useState(experience?.current || false);
  const [technologiesInput, setTechnologiesInput] = useState(
    experience?.technologies.join(', ') || ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize translations with current experience data if available
  const initializeTranslations = (): ExperienceTranslation[] => {
    if (experience?.translations && experience.translations.length > 0) {
      return experience.translations.map(t => ({
        language: t.language,
        company: t.company,
        position: t.position,
        description: t.description,
      }));
    }
    return [
      { language: 'en', company: '', position: '', description: '' },
      { language: 'ru', company: '', position: '', description: '' },
      { language: 'az', company: '', position: '', description: '' },
    ];
  };

  const [translations, setTranslations] = useState<ExperienceTranslation[]>(
    initializeTranslations()
  );

  const handleTranslationChange = (
    index: number,
    field: keyof ExperienceTranslation,
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
        startDate,
        endDate: current ? null : endDate,
        current,
        technologies: technologiesInput.split(',').map(t => t.trim()).filter(Boolean),
        translations,
      };

      if (experience?.id) {
        await api.patch(`/experiences/${experience.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post('/experiences', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save experience');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect rounded-lg p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {experience ? 'Edit Experience' : 'Add New Experience'}
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
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={current}
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition disabled:opacity-50"
            />
          </div>
        </div>

        {/* Current */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="current"
            checked={current}
            onChange={(e) => {
              setCurrent(e.target.checked);
              if (e.target.checked) setEndDate('');
            }}
            className="w-4 h-4 rounded"
          />
          <label htmlFor="current" className="text-sm font-medium text-gray-300">
            I currently work here
          </label>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={technologiesInput}
            onChange={(e) => setTechnologiesInput(e.target.value)}
            placeholder="React, TypeScript, Node.js"
            className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            required
          />
        </div>

        {/* Translations */}
        <div className="space-y-6 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white">Translations</h3>
          {translations.map((translation, index) => (
            <div key={translation.language} className="space-y-4">
              <h4 className="font-medium text-gray-300 capitalize">
                {translation.language === 'az' ? 'Azerbaijani' : translation.language.charAt(0).toUpperCase() + translation.language.slice(1)}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={translation.company}
                    onChange={(e) =>
                      handleTranslationChange(index, 'company', e.target.value)
                    }
                    placeholder="Company name"
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    value={translation.position}
                    onChange={(e) =>
                      handleTranslationChange(index, 'position', e.target.value)
                    }
                    placeholder="Job title"
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                    required
                  />
                </div>
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
                  placeholder="What did you do in this role?"
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
            {loading ? 'Saving...' : experience ? 'Update Experience' : 'Create Experience'}
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

export default CreateExperienceForm;
