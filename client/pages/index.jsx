import Head from "next/head";
import { Container } from "../styles";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Readlists | Curated readings for the curious</title>
        <meta name="description" content="Books curated as playlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <h1>Readlists</h1>
          <h2>Curated readings for the curious</h2>
        </Container>
      </main>
    </div>
  );
}
