# app.py
from flask import Flask, render_template, request
from db_utils import get_products

app = Flask(__name__)

@app.route("/", methods=["GET"])
def shop():
    search_term = request.args.get("search", "")
    selected_filters = request.args.getlist("filter")
    items = get_products(search_term, selected_filters)
    return render_template("shop.html", items=items, search=search_term, filters=selected_filters)

if __name__ == "__main__":
    app.run(debug=True)
