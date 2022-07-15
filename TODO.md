**TODO:**
- [ ] remove the dependency of readFile for template from `showGuestBookHandlr`
- [ ] Create api router
- [ ] Add xhr for add comments in guestBook

**DONE:**
  - [x] Read the comment history once when the app starts
  - [x] Extract an entity for guest book
    * addComment
    * commentsHistory
  - [x] Use Express module for middlewares
  - [x] Test the endpoints using Supertest
  - [x] Validate the request method
  - [x] Take the `dataFilePath` from config
  - [x] Add feature for hiding the watering Jar image
  - [x] Add a handler `parseBodyParams` to parse `bodyParams`
  - [x] Make router async
  - [x] Add `POST` method
  - [x] Show the comments in same page
  - [x] Use the template for `guestBook`
   - [x] Keep the template hardcoded
  - [x] Add a handler `parseSearchParams` to parse `searchParams`
  - [x] Pullout `commentHandler` to `commentHandler` instead of `handler.js`
  - [x] Separate the `server` and `application`
  - [x] Make the `startServer` call the `app`
  - [x] Take the `root` from config
  - [x] Pullout `router` to `app.js`
    - [x] Make `app` take the `config` as input
  - [x] separate the `main` and `server`
  - [x] Show the comments in different page
  - [x] Use http server
  - [x] Bind the `serveFileContent` with `srverPath`
  - [x] Save the comments in JSON file
    * name
    * comment
    * date time
  - [x] Parse the text input
  - [x] Change the response message based on the status code
  - [x] Create a page for `guestBook`
  - [x] Saved the comment in a variable
  - [x] Handle invalid comment
  - [x] Take inputs from `guestBook`
  - [x] Make simple pages for `ageratum` and `guestBook` and connect them to `home` page
  - [x] Create a page for `ageratum` 
  - [x] Create a page for `abeliophyllum` 
  - [x] Create `handler.js`
  - [x] Create home page.
  - [x] Create a server with empty page.
  - [x] Get the resources.
