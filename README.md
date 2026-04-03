# Notepad

In this activity, you'll build an API that manages a list of notes.

Test cases have been defined to guide you through this activity! Test your code with
`npm run test`.

## Build the data layer

Once again, we are storing our data as an array in `db/notes.js`. This time,
notice that we are exporting functions to interact with the data, rather than
the data itself. This is a common practice to limit direct access to the data.

1. Complete `getNoteById` to _find_ the note with the given id.
2. Complete `addNote` to create a new note with the given text.

## Organize API routes with an Express router

Once our data layer is complete, we can move on to serving that data with Express!
[An Express router](https://expressjs.com/en/guide/routing.html#express-router) is
a way to extract related middleware into a separate module which can then be exported
and imported into the main app.

3. In `api/notes.js`, create a new Express router and export it.
4. Back in `app.js`, **use** body-parsing middleware so that it can parse JSON request
   bodies.
5. Import your newly created Express router and use it as the middleware for the
   `/notes` route. Your app will now prepend `/notes` to the routes that you are
   about to define in your router.

> [!WARNING]
>
> Remember that _middleware order matters_! Route-handling middleware should live
> _after_ preprocessing middleware, such as logging middleware or body-parsing
> middleware. Error-handling middleware should come _last_, after all other middleware.

6. In your router, `GET /` should send the array of notes.
7. `POST /`
   1. If the request does not have a body, send the message "Request must have a body."
      with status 400.
   2. If `text` is not provided, send the message "New note must have text." with
      status 400.
   3. If the text is provided, then create the note and send it back with status 201.
8. `GET /:id`
   1. Send the note with the given ID if it exists.
   1. If the note with the ID was not found, send status 404 with a corresponding
      message.

If everything was done correctly, your app should now be able to handle requests to
`GET /notes`, `POST /notes`, and `GET /notes/:id`. You should pass all test cases!
