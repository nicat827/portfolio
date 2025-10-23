import axios from 'axios';

// API base URL - настройте под ваш бэкенд
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Создаем экземпляр axios с базовой конфигурацией
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Типы данных
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  description?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  grade?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

// API методы для проектов
export const projectsApi = {
  // Получить все проекты
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Получить избранные проекты
  getFeatured: async (): Promise<Project[]> => {
    const response = await api.get('/projects/featured');
    return response.data;
  },

  // Получить проект по ID
  getById: async (id: string): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
};

// API методы для опыта работы
export const experiencesApi = {
  // Получить весь опыт работы
  getAll: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences');
    return response.data;
  },

  // Получить текущие работы
  getCurrent: async (): Promise<Experience[]> => {
    const response = await api.get('/experiences/current');
    return response.data;
  },

  // Получить опыт работы по ID
  getById: async (id: string): Promise<Experience> => {
    const response = await api.get(`/experiences/${id}`);
    return response.data;
  },
};

// API методы для контактов
export const contactsApi = {
  // Создать новый контакт
  create: async (contactData: Omit<Contact, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Contact> => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },

  // Получить все контакты (для админки)
  getAll: async (): Promise<Contact[]> => {
    const response = await api.get('/contacts');
    return response.data;
  },

  // Получить контакт по ID
  getById: async (id: string): Promise<Contact> => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },
};

// API методы для образования
export const educationApi = {
  // Получить все образования
  getAll: async (language: string = 'en'): Promise<Education[]> => {
    const response = await api.get('/education', {
      headers: {
        'Accept-Language': language,
      },
    });
    return response.data;
  },

  // Получить текущие образования
  getCurrent: async (language: string = 'en'): Promise<Education[]> => {
    const response = await api.get('/education/current', {
      headers: {
        'Accept-Language': language,
      },
    });
    return response.data;
  },

  // Получить образование по ID
  getById: async (id: string, language: string = 'en'): Promise<Education> => {
    const response = await api.get(`/education/${id}`, {
      headers: {
        'Accept-Language': language,
      },
    });
    return response.data;
  },
};

export default api;
