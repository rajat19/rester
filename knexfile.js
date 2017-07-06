module.exports = {

  development: {
    client: 'mysql2',
    debug: true,
    connection: {
      host: 'localhost',
      user: 'root',
      password: 'smartprix',
      port: 3306,
      database: 'ninjas'
    }
  }
}
