import json
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask import (
    Flask,
    render_template,
    jsonify,
    send_from_directory,
    request,
    redirect,
    url_for,
)
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
app.config[
    "SLQALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}".format(
    user=os.getenv("POSTGRES_USER"),
    passwd=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=5432,
    table=os.getenv("POSTGRES_DB"),
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = "temp string"  # TODO: change this to an env variable

db = SQLAlchemy(app)
migrate = Migrate(app, db)
session = {}


class users(db.Model):
    __tablename__ = "users"

    _id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())

    def __init__(self, username, password):
        self.username = username
        self.password = password
        self.playlists = playlists.query.filter_by(owner=username)

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
    owner = db.Column(db.String())
    name = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, owner, name, description):
        self.owner = owner
        self.name = name
        self.description = description

    def __repr__(self):
        return f"<Playlist {self.name}>"

    def __str__(self):
        return self.name


@app.route("/")
def index():
    # Getting response in json format
    output = []

    for book in books.query.all():
        data = {}
        data["isbn"] = book.isbn
        data["playlist_id"] = book.playlist_id
        output.append(data)

    return jsonify(output)


@app.route("/defaultplaylists")
def defaultplaylists():
    output = []

    for playlist in playlists.query.all():
        data = {}
        data["_id"] = playlist._id
        data["owner"] = playlist.owner
        data["name"] = playlist.name
        data["description"] = playlist.description
        output.append(data)

    return jsonify(output)

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


@app.route("/login", methods=("GET", "POST"))
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


@app.route("/logout", methods=["POST"])
def logout():
    if "username" in session:
        session.pop("username")
    return redirect(url_for("index"), code=302)


@app.route("/createplaylist", methods=("GET", "POST"))
def createplaylist():
    if "username" in session:
        if request.method == "POST":
            name = request.form.get("playlist name")
            description = request.form.get("description")
            error = None

            if not name:
                error = "Playlist name required."
            elif (
                name
                in users.query.filter_by(username=session["username"]).first().playlists
            ):
                error = f"Playlist {name} already exists."

            if error is None:
                new_playlist = playlists(username, name, description)
                db.session.add(new_playlist)
                db.session.commit()
                session["playlists"].append(new_playlist)

                return redirect(url_for("createplaylist"), code=201)
            else:
                return error, 418
        else:
            return error, 418
    else:
        return redirect(url_for("login"), code=401)


# Reinitializing the values of our database only on first load
@app.before_first_request
def before_req_func():
    db.drop_all()
    db.create_all()

    # ---- Data insertion ---- #
    books_am_lit = (
        books("9780060933272", "1"), # To Kill a Mockingbird
        books("9780020198819", "1"), # The Great Gatsby
        books("9783499108518", "1"), # The Catcher and the Rye
    )

    books_19_women = (
        books("9780140430721", "2"), # Pride and Prejudice
        books("9780075543893", "2"), # Little Women
        books("9780192815132", "2"), # Jane Eyre
    )

    books_dystopian = (
        books("9780345342966", "3"), # Fahrenheit 451
        books("9780140817744", "3"), # 1984
        books("9780582060166", "3"), # Brave New World
        books("9780340960196", "3"), # Dune
    )

    books_ww2 = (
        books("9780006736776", "4"), # Number the Stars
        books("9780307475732", "4"), # The Book Thief
        books("9780141032009", "4"), # Diary of Anne Frank
        books("9780099487821", "4"), # Boy in Striped Pyjamas
    )

    books_short = (
        books("9785457724440", "5"), # Summer in a day
        books("9780789154798", "5"), # Story of an hour
        books("9780415263580", "5"), # Yellow wallpaper
        books("9780141396330", "5"), # The Lottery
        books("9780194237079", "5"), # Murder in the Rue Morgue
    )

    books_mystery = (
        books("9780192823786", "6"), # Adventures of Sherlock Holmes
        books("9780062073488", "6"), # And then there were none
        books("9780142401200", "6"), # The Westing Game
    )

    plists = (
        playlists(
            "Default",
            "Introduction to American Literature",
            "Classic American works.",
        ),
        playlists(
            "Default",
            "19th Century Women",
            "Historically influential stories by and about women.",
        ),
        playlists(
            "Default",
            "20th Century Dystopian",
            "Notable dystopian works reflecting the political climate at the time.",
        ),
        playlists(
            "Default",
            "WWII Stories",
            "Real and realistic fiction books about people living through the holocaust.",
        ),
        playlists(
            "Default",
            "Popular Short Story",
            "Works that demonstrate length does not always dictate quality.",
        ),
        playlists(
            "Default",
            "Essential Mystery",
            "Famous mysteries that will have you at the edge of your seat.",
        ),
    )

    for plist in plists:
        db.session.add(plist)

    for book in books_am_lit:
        db.session.add(book)

    for book in books_19_women:
        db.session.add(book)

    for book in books_dystopian:
        db.session.add(book)

    for book in books_ww2:
        db.session.add(book)

    for book in books_short:
        db.session.add(book)

    for book in books_mystery:
        db.session.add(book)

    db.session.commit()
    # ---- ---- #


if __name__ == "__main__":
    db.init_app(app)
    app.run(host="0.0.0.0")
