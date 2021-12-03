const express = require("express");
const app = express();
const PORT = 5000;
const allPokemon = require("./data");

// Hint: Don't forget that to be able to receive data from the client, you have to tell Express to accept JSON request bodies :)
app.use(express.json());

// A GET /pokemon route, that serves an array of objects containing data about all the Pokemons
app.get("/pokemon", (req, res) => res.json(allPokemon));

// An GET /pokemon/:id route, that serves an object of a specific Pokemon (search in the array using the provided id)
app.get("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const pokemonFound = allPokemon.find(
    (currentPokemon) => currentPokemon.id == id
  );
  if (pokemonFound) {
    return res.json(pokemonFound);
  } else {
    return res.json({ mensagem: "Pokemon não encontrado." });
  }
});

// A GET /search route, where the user can search Pokemons by name or type (when searching by type, should return all the pokemon found with that type)
app.get("/search", (req, res, next) => {
  //   res.send(req.query);
  const queryParams = req.query;
  for (let key in queryParams) {
    const foundPokemon = allPokemon.filter((currentPokemon) => {
      if (key === "types") {
        return currentPokemon.types.includes(queryParams.types);
      } else if (key === "name") {
        return currentPokemon.name.includes(queryParams.name);
      }
    });

    if (foundPokemon.length > 0) {
      return res.json(foundPokemon);
    } else {
      return res.json({ mensagem: "Pokemon não encontrado." });
    }
  }
});

// A POST /pokemon route, that inserts the new Pokemon into the existing list of all Pokemons

app.post("/pokemon", (req, res) => {
  const lastId = allPokemon[allPokemon.length - 1].id;
  const newPokemon = { ...req.body, id: lastId + 1 };
  allPokemon.push(newPokemon);
  return res.json(newPokemon);
});

// A PUT /pokemon/:id route, that updates an existing Pokemon with the provided data
app.put("/pokemon/:id", (req, res) => {
  const id = req.params.id;
  const formData = req.body;
  const foundPokemon = allPokemon.find(
    (currentPokemon) => currentPokemon.id === Number(id)
  );
  const pokemonIndex = allPokemon.findIndex(
    (currentPokemon) => currentPokemon.id === Number(id)
  );
  if (pokemonIndex !== -1) {
    foundPokemon[pokemonIndex] = { ...foundPokemon, ...formData };
  }
});

// A DELETE /pokemon/:id route, that deletes an existing Pokemon and returns a success message

app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
