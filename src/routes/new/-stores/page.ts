import { PageSchema } from '@/functions/createPage';
import { Store } from '@tanstack/react-store';

const initialPageState: PageSchema = {
  slug: '',
  content: '',
};

export const pageStore = new Store<PageSchema>(initialPageState);

export function setSlug(slug: string) {
  pageStore.setState((prev) => ({
    ...prev,
    slug,
  }));
}
export function setContent(content: string) {
  pageStore.setState((prev) => ({
    ...prev,
    content,
  }));
}

export function resetPageStore() {
  pageStore.setState(initialPageState);
}
