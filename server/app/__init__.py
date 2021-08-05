import json
import os
from flask import Flask, render_template, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://{user}:{passwd}@{host}:{port}/{table}".format(
    user=os.getenv("POSTGRES_USER"),
    passwd=os.getenv("POSTGRES_PASSWORD"),
    host=os.getenv("POSTGRES_HOST"),
    port=5432,
    table=os.getenv("POSTGRES_DB"),
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class books(db.Model):
    # __tablename__ = "books"

    _id = db.Column('id', db.Integer(), primary_key=True)
    isbn = db.Column(db.String())
    playlist_id = db.Column( db.String())

    def __init__(self, isbn, playlist_id):
        self.isbn = isbn
        self.playlist_id = playlist_id

    def __repr__(self):
        return f"<Book {self.title}>"

class playlists(db.Model):
    # __tablename__ = "playlists"

    _id = db.Column("id", db.Integer(), primary_key=True) 
    name = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __repr__(self):
        return f"<Playlist {self.title}>"

@app.route("/")
def index():
    # adding dummy data
    testPlaylist = playlists("Introduction to American Literature", "sample desc")
    testBook = books("9780399128967", "1")
    db.session.add(testPlaylist)
    # db.session.add(testBook)
    db.session.commit()

    # book = books.query.filter_by(isbn="9780399128967").first();
    # file = json.load(open("playlist.json"))
    return book


@app.route("/<playlist>")
def open_file(playlist):
    file = json.load(open(playlist + ".json"))
    return file


if __name__ == "__main__":
    db.create_all() # create the db if it doesn't exist
    app.run(host="0.0.0.0")
