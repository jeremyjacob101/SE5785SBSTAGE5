import sqlite3

conn = sqlite3.connect('merch.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

# Select all columns except 'image'
cursor.execute("SELECT id, name, price, category FROM products")
rows = cursor.fetchall()

for row in rows:
    print(dict(row))

conn.close()

