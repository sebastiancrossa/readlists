import { useRouter } from "next/router";
import styled from "styled-components";

import { BsPlus } from "react-icons/bs";
import Nav from "../../components/Nav";

const Readlist = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Nav />
      <div class="col-md-10 center readlist-about">
        <div class="row">
          <div class="col-md-6">
            <h1>Readlist {id}</h1>
            <p>Kurator</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div class="col-md-10 center">
          <div class="row">
            <div class="col-md-2">
              <img
                src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780525559474_p0_v6%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
                class="rounded mx-auto d-block"
                width="auto"
                height="200"
              ></img>
            </div>
            <div class="col-md-4">
              <p class="book-title">The Midnight Library</p>
              <p class="book-author">Matt Haig</p>
              <p class="book-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div class="col-md-2">
              <img
                src="https://prodimage.images-bn.com/lf?set=key%5Bresolve.pixelRatio%5D,value%5B1%5D&set=key%5Bresolve.width%5D,value%5B300%5D&set=key%5Bresolve.height%5D,value%5B10000%5D&set=key%5Bresolve.imageFit%5D,value%5Bcontainerwidth%5D&set=key%5Bresolve.allowImageUpscaling%5D,value%5B0%5D&product=path%5B/pimages/9780525559474_p0_v6%5D&call=url%5Bfile:common/decodeProduct.chain%5D"
                class="rounded mx-auto d-block"
                width="auto"
                height="200"
              ></img>
            </div>
            <div class="col-md-4">
              <p class="book-title">The Midnight Library</p>
              <p class="book-author">Matt Haig</p>
              <p class="book-title">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="col-md-4">
              <AddButton>
                <BsPlus />
                <p>Have a book suggestion? Add it to readlist</p>
              </AddButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AddButton = styled.button`
  margin: 2rem;
  padding: 1rem;

  width: 9rem;
  height: 15rem;

  border: 2px dashed black;
  border-radius: 5px;
`;

export default Readlist;
