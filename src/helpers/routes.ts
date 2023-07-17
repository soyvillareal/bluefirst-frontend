export const names = {
    home: '/',
    auth: 'auth',
    login: 'login',
    register: 'register',
    users: 'users',
    user: 'user',
    sessions: 'sessions',
    notFound: 'notFound',
};

export const routes = {
    home: '/',
    login: `/${names.auth}/${names.login}`,
    register: `/${names.auth}/${names.register}`,
    users: `/${names.users}`,
    user: `/${names.user}/:id`,
    sessions: `/${names.sessions}`,
    notFound: `/${names.notFound}`,
};