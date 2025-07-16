from flask import Flask, render_template, request, redirect, url_for
from db_utils import get_products
import sqlite3
import uuid

app = Flask(__name__)

@app.route("/", methods=["GET"])
def shop():
    search_term = request.args.get("search", "")
    selected_filters = request.args.getlist("filter")
    raw_items = get_products(search_term, selected_filters)

    conn = sqlite3.connect("merch.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    items = []
    for row in raw_items:
        item = dict(row)  # ✅ convert to mutable dict
        cursor.execute("SELECT id, text FROM reviews WHERE product_id = ?", (item["id"],))
        item["reviews"] = cursor.fetchall()
        items.append(item)

    conn.close()
    return render_template("shop.html", items=items, search=search_term, filters=selected_filters)


@app.route("/submit_review/<int:item_id>", methods=["POST"])
def submit_review(item_id):
    review_text = request.form.get("review_text", "").strip()
    if review_text:
        conn = sqlite3.connect("merch.db")
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO reviews (id, product_id, text) VALUES (?, ?, ?)",
            (str(uuid.uuid4()), item_id, review_text)
        )
        conn.commit()
        conn.close()
    return redirect(url_for("shop"))

if __name__ == "__main__":
    app.run(debug=True)
