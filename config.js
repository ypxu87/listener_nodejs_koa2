/**
 * 系统配置文件
 */

const config = {
    // 数据库连接
    mongodb: {
        user: 'asenxu',
        pass: '123456',
        host: '127.0.0.1',
        port: 27017,
        database: 'listen'
    },
    root:__dirname
}

module.exports = config;