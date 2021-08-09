import Head from "next/head";
import { Container } from "../styles";
import MyApp from "./_app";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Readlists | Curated readings for the curious</title>
        <meta name="description" content="Books curated as playlists" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <Container> */}
          <MyApp></MyApp>
        {/* </Container> */}
      </main>
    </div>
  );
}
