import mongoose from "mongoose";

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: {
    type: String,
    uppercase: true,
    required: true,
    releaseYear: Date,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    default: 10,
    required: true,
  },
});

const Movie = mongoose.model("movie", movieSchema);
export default Movie;
