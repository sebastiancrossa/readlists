import { useState, useEffect } from "react";

const Playlist = ({ rawData }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Loop through the raw data (isbn) and fetch all info from them
    const fetchData = async () => {
      Promise.all(
        rawData.map(async (book) => {
          const data = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&key=${process.env.NEXT_PUBLIC_BOOKS_API}`
          ).then((res) => res.json());

          const fetchedBook = data.items[0].volumeInfo;

          setBooks((prevState) => [
            ...prevState,
            {
              title: fetchedBook["title"],
              authors: fetchedBook["authors"],
              publishedDate: fetchedBook["publishedDate"],
              rating: fetchedBook["averageRating"],
              thumbnail: fetchedBook["imageLinks"]["thumbnail"],
              link: fetchedBook["infoLink"],
            },
          ]);
        })
      );
    };

    fetchData();
  }, []);

  console.log(books);

  return (
    <div class="col-md-10 center">
      <div class="row">
        <div class="col-md-10 playlist-hd">
          <h2>Introduction to American Literature</h2>
        </div>
        <div class="col-md-2 playlist-hd">
          <div class="text-right">
            <button type="button" class="btn right">
              See more
            </button>
          </div>
        </div>
        <div class="row">
          {books.length > 0 &&
            books.map((book) => (
              <div class="col-md-2 playlist-row position-relative">
                <img
                  src={book.thumbnail}
                  class="rounded mx-auto d-block"
                  width="auto"
                  height="200"
                />
                <p class="book-title">{book.title}</p>
                <p class="book-author">{book.authors[0]}</p>
                <a href={book.link} class="stretched-link" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
