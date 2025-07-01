#contact form submission code
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Database Model
class Submission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    subject = db.Column(db.String(150), nullable=False)
    content = db.Column(db.Text, nullable=False)
    additional_info = db.Column(db.Text)

# Create the database tables
with app.app_context():
    db.create_all()

@app.route('/', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        submission = Submission(
            name=request.form['name'],
            email=request.form['email'],
            subject=request.form['subject'],
            content=request.form['content'],
            additional_info=request.form.get('additional_info', '')
        )

        db.session.add(submission)
        db.session.commit()

        return "Thank you! Your submission has been saved."

    return render_template('contact.html')



if __name__ == '__main__':
    app.run(debug=True)
