import mysql from 'mysql2/promise';

const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'prototipo_5s',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool = null;

export const getPool = async () => {
    if (!pool) {
        try {
            pool = await mysql.createPool(config);
            console.log('✅ Conectado a MySQL - ' + (process.env.MYSQLDATABASE || 'prototipo_5s'));
        } catch (err) {
            console.error('❌ Error de conexión:', err);
            throw err;
        }
    }
    return pool;
};

// Para mantener compatibilidad con tu código actual
export const sql = {
    Int: 'INT',
    VarChar: (size) => `VARCHAR(${size})`,
    DateTime: 'DATETIME',
    Bit: 'BOOLEAN',
    NVarChar: (size) => `VARCHAR(${size})`,
    MAX: 'MAX'
};

export default { getPool, sql };