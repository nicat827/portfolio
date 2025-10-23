import { useState, useEffect } from 'react';
import { projectsApi, experiencesApi, contactsApi } from '../services/api';
import type { Project, Experience } from '../services/api';

// Хук для работы с проектами
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

// Хук для работы с избранными проектами
export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getFeatured();
        setProjects(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch featured projects');
        console.error('Error fetching featured projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading, error };
};

// Хук для работы с опытом работы
export const useExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await experiencesApi.getAll();
        setExperiences(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch experiences');
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  return { experiences, loading, error };
};

// Хук для работы с текущими работами
export const useCurrentExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrentExperiences = async () => {
      try {
        setLoading(true);
        const data = await experiencesApi.getCurrent();
        setExperiences(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch current experiences');
        console.error('Error fetching current experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentExperiences();
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
