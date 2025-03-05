import mysql.connector
from config.config import DATABASE_CONFIG


# Creacion de la canoexion


def get_db_connection():
    conn = mysql.connector.connect(**DATABASE_CONFIG)
    return conn