import Link from "next/link";
import styled from "styled-components";

const FeaturedHeader = () => {
  return (
    <div class="col-md-10 center">
      <div class="card card-style">
        <div class="card-body">
          <InnerContainer class="row">
            <div class="left col-md-6 ft-text">
              <Tag>Readlist of the Week</Tag>
              <h1 class="card-title">Essential mystery</h1>
              <h5 class="card-text">
                Famous mysteries that will have you at the edge of your seat.
              </h5>
              <Link href="/readlist/6" passHref>
                <a class="btn btn-primary">Go to readlist</a>
              </Link>
            </div>
            <div class="right col-md-5">
              <img src="/icon-readlist.png" width="auto" height="200" />
            </div>
          </InnerContainer>
        </div>
      </div>
    </div>
  );
};

const InnerContainer = styled.div`
  display: flex;
  justify-items: space-between;

  .right {
    text-align: right;
  }
`;

const Tag = styled.p`
  margin: 0 0 1rem 0;
  padding: 0.3rem 1rem;

  font-weight: bold;
  text-transform: uppercase;

  border-radius: 50rem;
  color: white;
  background-color: #8c50ed;
  width: fit-content;
`;

export default FeaturedHeader;
