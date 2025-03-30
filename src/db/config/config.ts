import "dotenv/config"

const { DB_USER, DB_PASSWORD, DB_HOST, DB_DATABASE_DEV, DB_DATABASE_PROD, NODE_ENV } = process.env

export const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE_DEV,
    host : DB_HOST,
    dialect: "postgres"
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE_PROD,
    host: DB_HOST,
    dialect: "postgres"
  }
}

export const currentConfig = config[NODE_ENV as keyof typeof config] || config.development;

