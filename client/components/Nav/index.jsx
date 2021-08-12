const Nav = () => {
  return (
    <div class="row">
      <div class="col-md-10 nav-margin">
        <nav class="navbar navbar-expand-lg">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">
              Kuration
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">
                    All playlists
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    // href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#createReadlist"
                  >
                    Create a Readlist
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">[specific readlist]</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
