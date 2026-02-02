import { baseServerGetFn } from './baseServerFn';
import { Project } from '@/types/project';
import { ofetch } from 'ofetch';
import { env } from 'cloudflare:workers';

export const getProjects = baseServerGetFn.handler(async () => {
  try {
    const url = new URL('/projects', import.meta.env.VITE_API_URL ?? env.VITE_API_URL);
    return await ofetch<Project[]>(url.toString(), { parseResponse: JSON.parse });
  } catch (e) {
    console.error(e);
    return [];
  }
});
