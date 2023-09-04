import { Firebase } from "./firebase.js";
import { v4 as uuidv4 } from 'uuid';

export class Model {
  constructor({onMovieListChanged}) {
    this.movies = [];
    this.firebase = new Firebase();
    
    this.onMovieListChanged = onMovieListChanged;
  }

  updateData = () => {
    this.firebase.pull().then(moviesFB => {
      this.movies = moviesFB;
      this.onMovieListChanged(this.movies);
    });
  }

  addMovie = (nameMovie) => {
    const movie = {
      title: nameMovie,
      viewed: false,
      id: uuidv4(),
    }

    this.movies.push(movie);
    this.firebase.push(movie);
    this.updateData()
  }

  changedStatusMovie = (label) => {
    let statusMovie = null;
    let id = label.id;

    if (label.classList.contains('active-checkbox')) {
      statusMovie = true;
      this.firebase.update(id, statusMovie);
      console.log(id, statusMovie)
      return
    };
    statusMovie = false;
    this.firebase.update(id, statusMovie);
    console.log(id, statusMovie)
  }

  deleteMovie = (id) => {
    this.firebase.delete(id);
    this.movies.splice(this._getIndexOfMovies(id), 1);

    this.onMovieListChanged(this.movies);
  }

  _getIndexOfMovies = (id) => {
    const indexItem = this.movies.findIndex(item => item.id == id);
    return indexItem;
  }
}