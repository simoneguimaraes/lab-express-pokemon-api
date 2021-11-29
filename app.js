const express = require("express");
const app = express();
const PORT = 4000;

// Hint: Don't forget that to be able to receive data from the client, you have to tell Express to accept JSON request bodies :)
const postRouter = require("./posts");
app.use(express.json());
app.use("/", postRouter);

// Importing all the pokemon for our data file
const allPokemon = require("./data");


// -- Define your route listeners here! --
app.listen(PORT, () => console.log(`Server up and running at port ${PORT}`));
