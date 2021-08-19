import { useState, useEffect } from "react";
import Link from "next/link";

const Playlist = ({ playlist, rawData }) => {
  const [books, setBooks] = useState([]);
  const { _id, name, description, owner } = playlist;

  useEffect(() => {
    // filtering only the info from the current playlist
    const filteredData = rawData.filter(
      (book) => parseInt(book.playlist_id) === parseInt(_id)
    );

    console.log("fetching playlist", _id);
    // Loop through the raw data (isbn) and fetch all info from them
    const fetchData = async () => {
      Promise.all(
        filteredData.map(async (book) => {
          let resStatus;

          const data = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&key=${process.env.NEXT_PUBLIC_BOOKS_API}`
          ).then((res) => {
            resStatus = res.status;
            return res.json();
          });

          // Only assign data if status code is 200 (successful)
          if (resStatus == 200 && data.items) {
            const fetchedBook = data?.items[0]?.volumeInfo;

            setBooks((prevState) => [
              ...prevState,
              {
                title: fetchedBook["title"],
                authors: fetchedBook["authors"]
                  ? fetchedBook["authors"]
                  : "Not found :(",
                publishedDate: fetchedBook["publishedDate"],
                rating: fetchedBook["averageRating"],
                thumbnail: fetchedBook["imageLinks"]
                  ? fetchedBook["imageLinks"]["thumbnail"]
                  : "https://ravenspacepublishing.org/wp-content/uploads/2019/04/default-book.jpg",
                link: fetchedBook["infoLink"],
              },
            ]);
          }
        })
      );
    };

    fetchData();
  }, []);

  return (
    <div class="col-md-10 center">
      <div class="row">
        <div class="col-md-10 playlist-hd">
          <h2>{name}</h2>
        </div>
        <div class="col-md-2 playlist-hd">
          <div class="text-right">
            <Link href={`/readlist/${_id}`} passHref>
              <a>See all books</a>
            </Link>
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
