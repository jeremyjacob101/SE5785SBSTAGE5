#dial menu code
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def contact_info():
    return render_template('dial_menu.html')

if __name__ == '__main__':
    app.run(debug=True)
