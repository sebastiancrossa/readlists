import json
import os

from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, jsonify, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config['SLQALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}'.format(user=os.getenv('POSTGRES_USER'),  passwd=os.getenv('POSTGRES_PASSWORD'), host=os.getenv('POSTGRES_HOST'), port=5432, table=os.getenv('POSTGRES_DB')) 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = "temp string" # TODO: change this to an env variable

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class users(db.Model):
    __tablename__ = "users"

    _id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())
    # TODO: add playlists field

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def __repr__(self):
        return f"<User {self.username}>"

    def __str__(self):
        return self.username


class books(db.Model):
    __tablename__ = "books"

    _id = db.Column(db.Integer(), primary_key=True)
    isbn = db.Column(db.String())
    playlist_id = db.Column(db.String())

    def __init__(self, isbn, playlist_id):
        self.isbn = isbn
        self.playlist_id = playlist_id

    def __repr__(self):
        return f"<Book {self.isbn}>"

    def __str__(self):
        return self.isbn


class playlists(db.Model):
    __tablename__ = "playlists"

    _id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return f"<Playlist {self.name}>"

    def __str__(self):
        return self.name


@app.route("/")
def index():
    # ---- Dummy data ---- #
    # TODO: Add real book info
    testPlaylist = playlists("Introduction to American Literature", "sample desc")
    testBook = books("9780399128967", "32")
    testBook1 = books("9780399128968", "33")
    db.session.add(testBook)
    db.session.add(testBook1)
    db.session.add(testPlaylist)
    db.session.commit()
    # ---- ---- #

    # Getting response in json format
    output =  []

    for book in books.query.all():
        data = {}
        data['isbn'] = book.isbn
        data['playlist_id'] = book.playlist_id
        output.append(data)

    return jsonify(output)


# @app.route("/<playlist>")
# def open_file(playlist):
#     file = json.load(open(playlist + ".json"))
#     return file
# return playlists.query.filter_by(name=playlist)

# User handle
@app.route("/register", methods=("GET", "POST"))
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        error = None

        if not username:
            error = "Username required."
        elif not password:
            error = "Password required."
        elif users.query.filter_by(username=username).first() is not None:
            error = f"User {username} is already registered."

        if error is None:
            new_user = users(username, generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            session["username"] = username

            return redirect(url_for("index"), code=302)
        else:
            return error, 418
    else:
        username = ""
        if "username" in session:
            username = session["username"]
        return username

@app.route('/login', methods=("GET", "POST"))
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        error = None

        user = users.query.filter_by(username=username).first()

        if user is None:
            error = "Incorrect username."
        elif not check_password_hash(user.password, password):
            error = "Incorrect password."

        if error is None:
            session["username"] = username
            return redirect(url_for("index"), code=302)
        else:
            return error, 418
    else:
        username = ""
        if "username" in session:
            username = session["username"]
        
        return username

@app.route("/logout", methods=("POST"))
def logout():
    if "username" in session:
        session.pop("username")
    return redirect(url_for("index"), code=302)

# Reinitializing the values of our database only on first load
@app.before_first_request
def before_req_func():
    db.drop_all()
    db.create_all()

if __name__ == "__main__":
    db.init_app(app)
    app.run(host="0.0.0.0")
