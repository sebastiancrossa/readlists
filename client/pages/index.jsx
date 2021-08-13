import Head from "next/head";
import { Container } from "../styles";

// Component imports
import Nav from "../components/Nav";
import Featured from "../components/Featured";
import Playlist from "../components/Playlist";
import BookModal from "../components/BookModal";
import Create from "../components/CreateModal";

export default function Home({ data, playlistData }) {
  console.log(playlistData);

  return (
    <div>
      <Head>
        <title>Kuration | Curated readings for the curious</title>
        <meta name="description" content="Books curated as playlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Nav />
          <Featured />
          {playlistData.map((playlist) => {
            <Playlist playlist={playlist} rawData={data} />;
          })}
          <BookModal />
          <Create />
        </Container>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetch("http://localhost:5000").then((res) => res.json());
  const playlistData = await fetch(
    "http://localhost:5000/defaultplaylists"
  ).then((res) => res.json());

  return {
    props: {
      data,
      playlistData,
    },
  };
}
