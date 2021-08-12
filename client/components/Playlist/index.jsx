import React from "react";

const Playlist = () => {
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
          <div class="col-md-2 playlist-row position-relative">
            <img
              src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780525559474_p0_v6%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
              class="rounded mx-auto d-block"
              width="auto"
              height="200"
            ></img>
            <p class="book-title">The Midnight Library </p>
            <p class="book-author">Matt Haig</p>
            <a
              href="https://www.barnesandnoble.com/w/the-midnight-library-matt-haig/1136586832?ean=9780525559474"
              // data-toggle="modal"
              // data-target="#exampleModal"
              class="stretched-link"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
