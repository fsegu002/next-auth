import { useMemo } from 'react';
import { types, applySnapshot } from 'mobx-state-tree';

let store;

const Store = types
  .model({
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    jwt: ''
  })
  .actions(self => ({
    async setUser(user) {
      self = Store.create(user);
    }
  }))
  .views(self => ({
    get userName() {
      return self ? self.firstName : 'user';
    }
  }));

export function initializeStore(snapshot = null) {
  const _store =
    store ??
    Store.create({
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      jwt: ''
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
