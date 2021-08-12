import Head from "next/head";
import { Container } from "../styles";

// Component imports
import Nav from "../components/Nav";
import Featured from "../components/Featured";
import Playlist from "../components/Playlist";
import BookModal from "../pages/book-modal";
import Create from "../pages/create";

export default function Home() {
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
          <Playlist />
          <BookModal />
          <Create />
        </Container>
      </main>
    </div>
  );
}
