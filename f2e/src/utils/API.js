/* global fetch, Headers, window, FormData */
/* eslint no-alert: 0 */
// @flow
import { type Tasks, type Task, type Image } from './type.flow';

export async function queryTasks(): Promise<Tasks> {
  try {
    const res = await fetch('/api/tasks');
    const { data }: { data: Tasks } = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTask(content: string): Promise<Task> {
  try {
    const res = await fetch('/api/task', {
      method: 'POST',
      body: JSON.stringify({ content }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    const { data: { taskId } }: { data: { taskId: number } } = await res.json();
    return { taskId, content, images: [], createdAt: new Date() };
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(taskId: number): Promise<any> {
  try {
    if (window.confirm('Do you really want to delete?')) {
      const res = await fetch(`/api/task/${taskId}`, {
        method: 'DELETE',
      });
      return await res.json();
    }

    throw new Error('confirm no');
  } catch (error) {
    throw error;
  }
}

export async function createImage(
  taskId: number,
  file: Object,
): Promise<{ url: string, imageId: number }> {
  try {
    const formData = new FormData();
    formData.append('taskId', `${taskId}`);
    formData.append('image', file);

    const res = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    });
    const { data: { url, imageId } }: { data: Image } = await res.json();

    return { url, imageId };
  } catch (error) {
    throw error;
  }
}

export async function deleteImage(imageId: number): Promise<any> {
  try {
    if (window.confirm('Do you really want to delete?')) {
      const res = await fetch(`/api/image/${imageId}`, {
        method: 'DELETE',
      });
      return await res.json();
    }

    throw new Error('confirm no');
  } catch (error) {
    throw error;
  }
}
