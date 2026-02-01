import { Store } from '@tanstack/react-store';
import { EditPostSchema, PostSchema } from '../../-schemas/post';
import { saveToLocalStorage } from '@/utils/localStorate';
import { IconKey } from '@/components/common/Icon';
import { Category } from '@/consts/categories';

const defaultPost: Omit<EditPostSchema, 'draft'> = {
  title: '',
  content: '',
  category: null,
  icons: [],
};

const key = 'edit-post';

export const postStore = new Store<EditPostSchema>(defaultPost);
postStore.subscribe((post) => {
  saveToLocalStorage(key, post.currentVal);
});

export const setInitialPost = (post: PostSchema) => {
  postStore.setState(post);
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
export const removeIcon = (icon: IconKey) => {
  postStore.setState((old) => ({
    ...old,
    icons: old.icons.filter((i) => i !== icon),
  }));
};

export const resetPost = () => {
  postStore.setState(defaultPost);
};
