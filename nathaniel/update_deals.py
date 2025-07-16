import sqlite3

def apply_deals(filename='deal.txt', db_path='merch.db'):
    # Read deals into a dictionary: {product_name: discount_amount}
    deals = {}
    with open(filename, 'r') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                name, discount_str = line.split(',', 1)
                discount = float(discount_str)
                deals[name.strip()] = discount
            except ValueError:
                print(f"Skipping invalid line: {line}")

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # For each deal, update the price if product exists and price > discount
    for name, discount in deals.items():
        # Get current price
        cursor.execute("SELECT price FROM products WHERE name = ?", (name,))
        row = cursor.fetchone()
        if row:
            current_price = row[0]
            new_price = current_price - discount
            if new_price < 0:
                new_price = 0  # Prevent negative prices
            cursor.execute("UPDATE products SET price = ? WHERE name = ?", (new_price, name))
            print(f"Updated '{name}': {current_price} -> {new_price}")
        else:
            print(f"Product '{name}' not found in database.")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    apply_deals()
