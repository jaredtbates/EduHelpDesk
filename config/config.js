module.exports = {
    server: {
        address: '0.0.0.0',
        port: 80
    },
    database: {
        type: 'sqlite',
        host: '127.0.0.1',
        database: 'eduhelpdesk',
        username: 'root',
        password: 'password',
        port: 3306
    },
    app: {
        authProvider: 'google',
        classPeriods: 7
    }
};