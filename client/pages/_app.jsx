import Head from "next/head";
import "../styles/globals.css";
import Navigation from "./nav";
import Featured from "./featured";
import Playlist from "./playlist-horizontal";
import "../styles/style.css";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />;
  return (
    <div>
      <Head>
        // Responsive meta tag
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        // bootstrap CDN
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossorigin="anonymous"
        ></script>
      </Head>
      <div>
        <Navigation></Navigation>
        <Featured></Featured>
        <Playlist></Playlist>
      </div>
    </div>

    // <Featured></Featured>
  );
}

export default MyApp;
