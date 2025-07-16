# db_utils.py
import sqlite3

def get_products(search=None, filters=None):
    conn = sqlite3.connect('merch.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    query = "SELECT * FROM products WHERE 1=1"
    params = []

    if search:
        query += " AND name LIKE ?"
        params.append(f"%{search}%")

    if filters:
        placeholders = ','.join('?' * len(filters))
        query += f" AND category IN ({placeholders})"
        params.extend(filters)

    cursor.execute(query, params)
    items = cursor.fetchall()
    conn.close()
    return items
