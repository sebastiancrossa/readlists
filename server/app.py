import json
from flask import Flask

app = Flask(__name__)


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
