import { Model } from "./model.js";
import { View } from "./view.js";

export class Controller {
  constructor() {
    this.model = new Model({
      onMovieListChanged: this.handleModelMovies,
    });
    this.view = new View({
      onNewMovie: this.handleViewNewMovie,
      onToggleLabelStatus: this.handleChangedStatus,
      onDeleteMovie: this.handleViewMovies,
    });
  }

  init() {
    this.model.updateData();
  }

  handleViewNewMovie = (nameMovie) => {
    this.model.addMovie(nameMovie);
  }

  handleModelMovies = (movies) => {
    this.view.renderMovies(movies);
  }

  handleViewMovies = (id) => {
    this.model.deleteMovie(id);
  }

  handleChangedStatus = (label) => {
    this.model.changedStatusMovie(label);
  }
}