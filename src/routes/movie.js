import express from "express";
import {
  createMovies,
  getMovies,
  updateMovie,
  movieById,
  deleteMovie,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/", getMovies);

router.get("/:id", movieById);

router.post("/", createMovies);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

export default router;
