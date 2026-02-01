import { Store } from '@tanstack/react-store';

const key = 'new-post-markdown';
const savedMarkdown = localStorage.getItem(key) ?? '';

export const markdownStore = new Store<string>(savedMarkdown);
export const setMarkdown = (newMarkdown: string) => {
  markdownStore.setState(newMarkdown);
};

markdownStore.subscribe((md) => {
  localStorage.setItem(key, md.currentVal);
});
