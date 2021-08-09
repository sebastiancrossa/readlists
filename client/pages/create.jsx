export default function Create() {
  return (
    <div>
      {/* <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#createReadlist"
      >
        Create Readlist
      </button> */}

      <div
        class="modal fade"
        id="createReadlist"
        tabindex="-1"
        aria-labelledby="createReadlist"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createReadlistLabel">
                Create a Readlist
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="readlistName" class="form-label">
                  Readlist Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="readlistName"
                  placeholder="A Cool Readlist Name"
                ></input>
              </div>
              <div class="mb-3">
                <label for="kutarorName" class="form-label">
                  Kurator's Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="kuratorName"
                  placeholder="John Smith"
                ></input>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
