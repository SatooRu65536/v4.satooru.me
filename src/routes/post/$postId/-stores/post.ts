import { Store } from '@tanstack/react-store';
import { EditPostSchema, PostSchema } from '@/schemas/post';
import { saveToLocalStorage } from '@/utils/localStorate';
import { Category } from '@/consts/categories';
import { IconKey } from '@/components/common/Icon';

const defaultPost: EditPostSchema = {
  title: '',
  content: '',
  category: null,
  thumbnail: '',
  data: {},
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
  if (newCategory === 'product') {
    postStore.setState((old) => ({
      ...old,
      category: 'product',
      data: {
        icons: [],
        tag: '',
      },
    }));
  } else if (newCategory === 'kajilab') {
    postStore.setState((old) => ({
      ...old,
      category: 'kajilab',
      data: {},
    }));
  } else if (newCategory === 'private') {
    postStore.setState((old) => ({
      ...old,
      category: 'private',
      data: {},
    }));
  } else if (newCategory === 'report') {
    postStore.setState((old) => ({
      ...old,
      category: 'report',
      data: {},
    }));
  }
};
export const setThumbnail = (thumbnail: string) => {
  postStore.setState((old) => ({
    ...old,
    thumbnail,
  }));
};
export const setProductIcons = (icons: IconKey[]) => {
  postStore.setState((old) => {
    if (old.category !== 'product') return old;
    return {
      ...old,
      data: {
        tag: old.data?.tag ?? '',
        icons,
      },
    };
  });
};
export const setProductTag = (tag: string) => {
  postStore.setState((old) => {
    if (old.category !== 'product') return old;
    return {
      ...old,
      data: {
        icons: old.data?.icons ?? [],
        tag,
      },
    };
  });
};

export const resetPost = () => {
  postStore.setState(defaultPost);
};
