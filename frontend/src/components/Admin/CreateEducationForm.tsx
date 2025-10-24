import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import api from '../../services/api';

interface EducationData {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  grade?: string;
  website?: string;
}

interface CreateEducationFormProps {
  token: string;
  education?: EducationData | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface EducationTranslation {
  language: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
}

const CreateEducationForm: React.FC<CreateEducationFormProps> = ({
  token,
  education,
  onSuccess,
  onCancel,
}) => {
  const [startDate, setStartDate] = useState(
    education?.startDate?.split('T')[0] || ''
  );
  const [endDate, setEndDate] = useState(
    education?.endDate?.split('T')[0] || ''
  );
  const [current, setCurrent] = useState(education?.current || false);
  const [grade, setGrade] = useState(education?.grade || '');
  const [website, setWebsite] = useState(education?.website || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Initialize translations with current education data if available
  const initializeTranslations = (): EducationTranslation[] => {
    if (education) {
      return [
        {
          language: 'en',
          institution: education.institution || '',
          degree: education.degree || '',
          field: education.field || '',
        },
        { language: 'ru', institution: '', degree: '', field: '' },
        { language: 'az', institution: '', degree: '', field: '' },
      ];
    }
    return [
      { language: 'en', institution: '', degree: '', field: '' },
      { language: 'ru', institution: '', degree: '', field: '' },
      { language: 'az', institution: '', degree: '', field: '' },
    ];
  };

  const [translations, setTranslations] = useState<EducationTranslation[]>(
    initializeTranslations()
  );

  const handleTranslationChange = (
    index: number,
    field: keyof EducationTranslation,
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
        grade: grade || undefined,
        website: website || undefined,
        translations,
      };

      if (education?.id) {
        await api.patch(`/education/${education.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post('/education', payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save education');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-effect rounded-lg p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {education ? 'Edit Education' : 'Add New Education'}
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

        {/* Current & Grade & Website */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              Currently Studying
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Grade/GPA
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="e.g., 3.8 or A+"
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Website
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Institution website"
              className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
            />
          </div>
        </div>

        {/* Translations */}
        <div className="space-y-6 pt-4 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-white">Translations</h3>
          {translations.map((translation, index) => (
            <div key={translation.language} className="space-y-4">
              <h4 className="font-medium text-gray-300 capitalize">
                {translation.language === 'az' ? 'Azerbaijani' : translation.language.charAt(0).toUpperCase() + translation.language.slice(1)}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Institution
                  </label>
                  <input
                    type="text"
                    value={translation.institution}
                    onChange={(e) =>
                      handleTranslationChange(index, 'institution', e.target.value)
                    }
                    placeholder="University name"
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Degree
                  </label>
                  <input
                    type="text"
                    value={translation.degree}
                    onChange={(e) =>
                      handleTranslationChange(index, 'degree', e.target.value)
                    }
                    placeholder="Bachelor, Master, etc."
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Field
                  </label>
                  <input
                    type="text"
                    value={translation.field}
                    onChange={(e) =>
                      handleTranslationChange(index, 'field', e.target.value)
                    }
                    placeholder="Computer Science"
                    className="w-full px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                    required
                  />
                </div>
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
            {loading ? 'Saving...' : education ? 'Update Education' : 'Create Education'}
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

export default CreateEducationForm;
