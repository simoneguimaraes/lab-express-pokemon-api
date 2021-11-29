// A GET /pokemon route, that serves an array of objects containing data about all the Pokemons
app.get("/pokemon", (req, res) => {
  res.send(req);
});

// An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)
app.get("/pokemon/:id", (req, res) => {
  res.send(req.params);
});

// A GET /search route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)
app.get("/search", (req, res, next) => {
  res.send(req.query);
});

app.get("/", (req, res, next) => {
  res.render("index");
});

//BONUS
// A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons (don't worry about persisting the data to the disk, we're gonan learn that later)

// A PUT /pokemon/:id route, that updates an existing Pokemon with the provided data

// A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message
