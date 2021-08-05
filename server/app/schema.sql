DROP TABLE IF EXISTS playlist;
DROP TABLE IF EXISTS book;

CREATE TABLE playlist (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE book(
 idbn INTEGER PRIMARY KEY AUTOINCREMENT,
 playlist_id INTEGER NOT NULL,
 FOREIGN KEY (playlist_id) REFERENCES playlist (id)
);

INSERT INTO playlist (1, name, description) VALUES ("Introduction to American Literature", "sample description")
INSERT INTO book (isbn, playlist_id) VALUES (12345, 1)
