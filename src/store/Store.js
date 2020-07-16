import { types } from 'mobx-state-tree';

const userModel = types.model({
    email: types.string,
    firstName: types.string,
    lastName: types.string,
    jwt: types.string
});

const Store = types
    .model('Store', {
        user: types.frozen(userModel)
    })
    .views(self => ({
        getUserName() {
            return `${self.user.firstName} ${self.user.lastName}`;
        }
    }));

export { Store };
