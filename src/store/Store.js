import { useMemo } from 'react';
import { types, applySnapshot } from 'mobx-state-tree';

let store;

const User = types.model({
  id: types.string,
  email: types.string,
  firstName: types.string,
  lastName: types.string,
  jwt: types.string
});

const Store = types
  .model({
    user: User
  })
  .actions(self => ({
    setUser(user) {
      self.user = user;
    }
  }))
  .views(self => ({
    get userName() {
      return self.user ? self.user.firstName : 'user';
    }
  }));

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      user: {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        jwt: ''
      }
    });

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.js` and `pages/ssr.js` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
