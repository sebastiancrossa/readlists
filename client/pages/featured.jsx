// import { Card, Button, Image } from "bootsrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import pic from "./img-placeholder.png";

export default function Featured() {
  return (
    <div class="col-md-10">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h1 class="card-title">Playlist's of the Week</h1>
              <h4 class="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </h4>
              <a href="#" class="btn btn-primary">
                Go somewhere
              </a>
            </div>
            <div class="col-md-6">
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
}
