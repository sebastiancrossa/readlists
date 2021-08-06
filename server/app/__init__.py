import json
import os
from flask import Flask, render_template, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"
db = SQLAlchemy(app)


class books(db.Model):
    __tablename__ = "books"

    _id = db.Column(db.Integer(), primary_key=True)
    isbn = db.Column(db.String())
    playlist_id = db.Column(db.String())

    def __init__(self, isbn, playlist_id):
        self.isbn = isbn
        self.playlist_id = playlist_id

    def __repr__(self):
        # return f"<Book {self.isbn}>"
        return "<books %r>" % self.isbn

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
    # adding dummy data
    testPlaylist = playlists("Introduction to American Literature", "sample desc")
    testBook = books("9780399128967", "32")
    testBook1 = books("9780399128968", "33")
    db.session.add(testBook)
    db.session.add(testBook1)
    db.session.add(testPlaylist)
    db.session.commit()

    # book = books.query.filter_by(isbn="9780399128967").first();
    # file = json.load(open("playlist.json"))
    # print(str(db))
    # return repr(books.query.all())
    # return str(db.Table("books", db.MetaData()).columns.keys())
    print(books.query.all())
    return repr(books.query.all())


# @app.route("/<playlist>")
# def open_file(playlist):
#     file = json.load(open(playlist + ".json"))
#     return file
# return playlists.query.filter_by(name=playlist)

if __name__ == "__main__":
    db.drop_all()
    db.create_all()  # create the db if it doesn't exist
    app.run(host="0.0.0.0")
