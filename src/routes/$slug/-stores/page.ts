import { PageSchema } from '@/functions/createPage';
import { Page } from '@/types/page';
import { Store } from '@tanstack/react-store';

type PageStore = Omit<PageSchema, 'draft'>;

const initialPageState: PageStore = {
  slug: '',
  content: '',
};

export const pageStore = new Store<PageStore>(initialPageState);

export function setInitialPage(page: Page) {
  pageStore.setState({ content: page.content, slug: page.slug });
}
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
