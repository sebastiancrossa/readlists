import json
import os
from flask import Flask, render_template, send_from_directory, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

app.config[
    "SQLALECHMY_DATABASE_URI"
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


class BookModel(db.Model):
    __tablename__ = "books"

    isbn = db.Column(db.String(), primary_key=True)
    playlist_id = db.Column(db.String())

    def __init__(self, isbn, playlist_id):
        self.isbn = isbn
        self.playlist = playlist_id

    def __repr__(self):
        return f"<Book {self.title}>"


@app.route("/")
def index():
    file = json.load(open("playlist.json"))
    return file


@app.route("/<playlist>")
def open_file(playlist):
    file = json.load(open(playlist + ".json"))
    return file


if __name__ == "__main__":
    app.run(host="0.0.0.0")
