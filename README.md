# OpenBook

A community book-sharing web app where people can list books they no longer need and lend them to others, making reading material more accessible and reducing waste.

Built as a **Level 2 group project at Brunel University London (2023–24)**, aligned with the UN's **Sustainable Development Goal 4: Quality Education**.

> This repository is my personal copy of the group project. I led the **My Books** feature end to end (React + Spring Boot + MySQL) and set up the shared frontend structure the team built on.

<!-- SCREENSHOT: My Books page with a few listed books -->
<!-- ![My Books](screenshots/my-books.png) -->

---

## My Books: the feature I built

My Books lets a user manage the books they are offering to lend.

- **Add a book** with title, author, publisher, year, genre, condition, location, description and a cover image
- **ISBN auto-fill:** entering an ISBN fetches the book's details from the [Open Library API](https://openlibrary.org/developers/api) and fills the form automatically
- **List, edit and delete** your own books
- **Cover images** stored in MySQL as BLOBs and served back as images
- **Form validation** with React Hook Form and Yup: ISBN-10 / ISBN-13 format checking, required fields and a publication year that can't be in the future, with inline error messages under each field. The Open Library lookup only runs once the ISBN is valid, avoiding unnecessary API calls.
- **Sorting and filtering** of the user's book list on the frontend

<!-- SCREENSHOT/GIF: entering an ISBN and the form filling itself -->
<!-- ![ISBN auto-fill](screenshots/isbn-autofill.gif) -->

---

## Tech stack

| Layer        | Technologies                                                     |
| ------------ | ---------------------------------------------------------------- |
| Frontend     | React 18, React Router 6, Axios, React Hook Form, Yup, CRACO     |
| Backend      | Java, Spring Boot, Spring Data JPA (Hibernate), Maven            |
| Database     | MySQL 8                                                          |
| External API | Open Library                                                     |
| Tools        | VS Code, Thunder Client / Postman, MySQL Workbench, Git & GitHub |

---

## My Books API

| Method   | Endpoint                         | Description                                 |
| -------- | -------------------------------- | ------------------------------------------- |
| `GET`    | `/api/books`                     | List all books                              |
| `GET`    | `/api/books/{id}`                | Get one book's details                      |
| `GET`    | `/api/books/cover/{id}`          | Get a book's cover image                    |
| `POST`   | `/api/books/addBookInfo`         | Add book details (JSON)                     |
| `POST`   | `/api/books/uploadCover/{id}`    | Upload a cover image (multipart form-data)  |
| `PUT`    | `/api/books/updateBookInfo/{id}` | Update book details (JSON)                  |
| `PUT`    | `/api/books/updateCover/{id}`    | Replace a cover image (multipart form-data) |
| `DELETE` | `/api/books/{id}`                | Delete a book                               |

The backend follows a layered structure: `controller` → `service` → `repository` → `model`, with a `DTO` for transferring book data and a CORS configuration for the React frontend.

---

## Challenges and what I learned

**Sending a book and its cover together.** The add-book form contains both text fields and an image, which can't travel in a single JSON body. I split the flow into two endpoints, one for the details as JSON and one for the cover as multipart form-data, and stored the image as a BLOB. This made it possible to edit details and replace covers independently, and taught me a lot about how data moves through a full-stack app.

**Making the form faster to fill in.** Typing every field by hand was slow, so I integrated the Open Library API to look a book up by ISBN and pre-fill the form.

**Team structure and integration.** I set up the team's shared React template (with a navigation bar that changes after login) and the GitHub repository so everyone could build on a common base. The backends ended up being developed separately, which made it hard to integrate everything by the end. The lesson I took away: agree on architecture and shared services early, and keep checking that the pieces fit together.

---

## My role in the team

- Set up the **shared React project template** and the **team GitHub repository**
- Designed and built the **My Books** feature end to end (frontend, backend, database)
- Served as **Scrum Master for Sprint 2**, keeping the team on track remotely over the holiday period
- Wrote user stories for the **Book Listing** and **Book Filter** epics
- Contributed to ideation with **empathy maps** and a **Lean Canvas**
- Tracked my work with a **Gantt chart** and a sprint **risk register**

---

## Running it locally

### Prerequisites

- Node.js and npm
- Java 17 or newer
- MySQL 8

### 1. Database

Create an empty database (tables are created automatically on first run):

```sql
CREATE DATABASE openbook;
```

The backend expects MySQL at `localhost:3307`. If yours runs on the default port `3306`, change the URL in
`myBooks_backend/openBook/src/main/resources/application.properties`.

### 2. Backend (Spring Boot, port 8080)

```bash
cd myBooks_backend/openBook
DB_PASSWORD='your-mysql-password' ./mvnw spring-boot:run
```

The username defaults to `root`; set `DB_USERNAME` to use a different one.

### 3. Frontend (React, port 3000)

```bash
cd openBook
npm install
npm start
```

Then open **http://localhost:3000/mybooks**.

### Troubleshooting

If the Maven wrapper fails with an `SSLHandshakeException` while downloading, force TLS 1.2:

```bash
JAVA_TOOL_OPTIONS="-Djdk.tls.client.protocols=TLSv1.2" DB_PASSWORD='your-mysql-password' ./mvnw spring-boot:run
```

---

## Known limitations

- **Login is not connected to My Books.** Registration and login were built by teammates with a separate backend that was never integrated. In the app, the My Books link only appears in the menu after logging in, so for a local demo go straight to `/mybooks`.
- Other pages (such as Revision sessions and Book Reviews) were built by teammates and are included for completeness; they may need their own backends to work.
- Books are not yet linked to individual users. The data model for this (a one-to-many relationship between users and books) was designed but not completed within the project timeline.

---

## Ideas for the future

- Link books to their owners once authentication is integrated
- Add a status field (_available_ / _borrowed by X_) to each listing
- Show only a general area instead of a full postcode, for safety
- Favourites list with notifications when a saved book becomes available
- Map view of books available nearby

---

## Acknowledgements

Built with my teammates in **Group 32**, CS2001, Brunel University London. Thanks to our tutors for their guidance throughout the project.
