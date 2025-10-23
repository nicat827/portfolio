import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { projectsApi, experiencesApi, contactsApi, educationApi } from '../services/api';
import type { Project, Experience, Education } from '../services/api';

// Хук для работы с проектами
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        if (!abortController.signal.aborted) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch projects');
          console.error('Error fetching projects:', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();
    
    return () => {
      abortController.abort();
    };
  }, []);

  return { projects, loading, error };
};

// Хук для работы с избранными проектами
export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getFeatured();
        if (!abortController.signal.aborted) {
          setProjects(data);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch featured projects');
          console.error('Error fetching featured projects:', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchFeaturedProjects();
    
    return () => {
      abortController.abort();
    };
  }, []);

  return { projects, loading, error };
};

// Хук для работы с опытом работы
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experiencesApi.getAll();
        if (!abortController.signal.aborted) {
          setExperiences(data);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch experiences');
          console.error('Error fetching experiences:', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchExperiences();
    
    return () => {
      abortController.abort();
    };
  }, []);

  return { experiences, loading, error };
};

// Хук для работы с текущими работами
export const useCurrentExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchCurrentExperiences = async () => {
      try {
        setLoading(true);
        const data = await experiencesApi.getCurrent();
        if (!abortController.signal.aborted) {
          setExperiences(data);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch current experiences');
          console.error('Error fetching current experiences:', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCurrentExperiences();
    
    return () => {
      abortController.abort();
    };
  }, []);

  return { experiences, loading, error };
};

// Хук для отправки контактной формы
export const useContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitContact = async (contactData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      await contactsApi.create(contactData);
      setSuccess(true);
    } catch (err) {
      setError('Failed to send message');
      console.error('Error sending contact form:', err);
    } finally {
      setLoading(false);
    }
  };

  return { submitContact, loading, error, success };
};

// Хук для работы с образованием
export const useEducation = () => {
  const { i18n } = useTranslation();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await educationApi.getAll(i18n.language);
        if (!abortController.signal.aborted) {
          setEducation(data);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch education');
          console.error('Error fetching education:', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEducation();
    
    return () => {
      abortController.abort();
    };
  }, [i18n.language]);

  return { education, loading, error };
};

// Хук для работы с текущим образованием
export const useCurrentEducation = () => {
  const { i18n } = useTranslation();
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchCurrentEducation = async () => {
      try {
        setLoading(true);
        const data = await educationApi.getCurrent(i18n.language);
        if (!abortController.signal.aborted) {
          setEducation(data);
          setError(null);
        }
      } catch (err) {
        if (!abortController.signal.aborted) {
          setError('Failed to fetch current education');
          console.error('Error fetching current education:', err);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCurrentEducation();
    
    return () => {
      abortController.abort();
    };
  }, [i18n.language]);

  return { education, loading, error };
};
