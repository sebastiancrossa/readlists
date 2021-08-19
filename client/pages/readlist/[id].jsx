import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { BsPlus } from "react-icons/bs";
import Nav from "../../components/Nav";

const Readlist = ({ data, playlistData }) => {
  const [books, setBooks] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    // Fetching all of the individual book info with the google books api
    const fetchData = async () => {
      Promise.all(
        data.map(async (book) => {
          const bookData = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn}&key=${process.env.NEXT_PUBLIC_BOOKS_API}`
          ).then((res) => res.json());

          const fetchedBook = bookData.items[0].volumeInfo;

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

  return (
    <div>
      <Nav />
      <div class="col-md-10 center readlist-about">
        <div class="row">
          <div class="col-md-6">
            <h1>{playlistData.name}</h1>
            <p>Curated by Kurator</p>
            <p>{playlistData.description}</p>
          </div>
        </div>
      </div>
      <div class="col-md-10 center">
        <BooksGrid>
          {books.map((book) => (
            <BookItem>
              <div className="left">
                <img src={book.thumbnail} alt={book.title} />
              </div>
              <div className="right">
                <h2>{book.title}</h2>
                <h3>by {book.authors[0]}</h3>

                <p>{book.rating} / 5</p>
                <p>{book.publishedDate}</p>

                <a href={book.link}>Link to buy</a>
              </div>
            </BookItem>
          ))}

          <AddButton>
            <p>Suggest a book</p>
            <BsPlus size={30} />
          </AddButton>
        </BooksGrid>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { query } = ctx;

  // Fetch all data
  const data = await fetch("http://localhost:5000").then((res) => res.json());
  const playlistData = await fetch(
    "http://localhost:5000/defaultplaylists"
  ).then((res) => res.json());

  // Get only the books from the current playlist
  const filteredData = data.filter((book) => book.playlist_id === query.id);
  const filteredPlaylists = playlistData.filter(
    (playlist) => playlist._id === parseInt(query.id)
  );

  return {
    props: {
      data: filteredData,
      playlistData: filteredPlaylists[0],
    },
  };
}

const AddButton = styled.button`
  width: 8rem;
  height: 11.18rem;

  border: 2px dashed black;
  border-radius: 5px;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

const BookItem = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  grid-gap: 1rem;

  img {
    border-radius: 5px;
  }

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  h3 {
    font-size: 1rem;
  }

  .right {
    text-align: left;
  }
`;

export default Readlist;
