import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

export async function getServicesList() {
    const [rows] = await pool.query("SELECT * FROM services");
    return rows;
};

export async function getService(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM services
    WHERE id = ?
    `, [id]);
    return rows[0];
};

const services = await getServicesList()
console.log(services);
