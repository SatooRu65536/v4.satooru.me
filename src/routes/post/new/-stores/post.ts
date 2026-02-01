import { Store } from '@tanstack/react-store';
import { editPostSchema, EditPostSchema } from '../../../../schemas/post';
import { loadFromLocalStorage, saveToLocalStorage } from '@/utils/localStorate';
import { IconKey } from '@/components/common/Icon';
import { Category } from '@/consts/categories';

const defaultPost: Omit<EditPostSchema, 'draft'> = {
  title: '',
  content: '',
  category: null,
  icons: [],
};

const key = 'new-post';

export const postStore = new Store<EditPostSchema>(defaultPost);
postStore.subscribe((post) => {
  saveToLocalStorage(key, post.currentVal);
});

export const setInitialPost = () => {
  const savedPost = editPostSchema.safeParse(loadFromLocalStorage(key));
  if (savedPost.success) postStore.setState(savedPost.data);
};
export const setContent = (newContent: string) => {
  postStore.setState((old) => ({
    ...old,
    content: newContent,
  }));
};
export const setTitle = (newTitle: string) => {
  postStore.setState((old) => ({
    ...old,
    title: newTitle,
  }));
};
export const setCategory = (newCategory: Category | null) => {
  postStore.setState((old) => ({
    ...old,
    category: newCategory,
  }));
};
export const setIcons = (newIcons: IconKey[]) => {
  postStore.setState((old) => ({
    ...old,
    icons: newIcons,
  }));
};
export const addIcon = (icon: IconKey) => {
  postStore.setState((old) => ({
    ...old,
    icons: [...old.icons, icon],
  }));
};
export const setThumbnail = (thumbnail: string) => {
  postStore.setState((old) => ({
    ...old,
    thumbnail,
  }));
};
export const removeIcon = (icon: IconKey) => {
  postStore.setState((old) => ({
    ...old,
    icons: old.icons.filter((i) => i !== icon),
  }));
};

export const resetPost = () => {
  postStore.setState(defaultPost);
};
