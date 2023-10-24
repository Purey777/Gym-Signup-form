import Movie from "../../model/movie.model.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.send(movies);
  } catch (err) {
    res.status(404).send("No movie found!");
    console.log(err);
  }
};

export const movieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
  } catch (err) {
    res.status(404).send("Movie with that id not found.");
    console.log(err);
  }
};

export const createMovies = async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    rating: req.body.rating,
    price: req.body.price,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).send("A new movie has been added!");
    console.log(newMovie);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    movie.price = req.body.price;
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).send("Try again!");
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (movie) {
      Movie.deleteOne();
    }
    res.send("Movie deleted!");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
