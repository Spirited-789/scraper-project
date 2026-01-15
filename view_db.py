import sqlite3

conn = sqlite3.connect("market_data.db")  
cursor = conn.cursor()

# Show all tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("Tables:", cursor.fetchall())

# Example: view all rows from products table
cursor.execute("SELECT * FROM products")
rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()
