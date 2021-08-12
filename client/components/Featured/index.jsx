import React from "react";

const FeaturedHeader = () => {
  return (
    <div class="col-md-10 center">
      <div class="card card-style">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 ft-text">
              <h5>Readlist of the Week</h5>
              <h1 class="card-title">A Cool Readlist</h1>
              <h5 class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </h5>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
            <div class="col-md-5">
              <img
                src="https://images.unsplash.com/photo-1594312915251-48db9280c8f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1650&q=80"
                class="rounded mx-auto d-block"
                // alt="Responsive image"
                width="auto"
                height="200"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedHeader;
