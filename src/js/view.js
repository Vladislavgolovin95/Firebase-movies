export class View {
  constructor({onNewMovie, onDeleteMovie, onToggleLabelStatus}) {
    this.inputMovieNode = document.getElementById('inputMovie');
    this.moviesNode = document.getElementById('moviesList');
    this.addMovieBtnNode = document.getElementById('addBtn');

    this.onNewMovie = onNewMovie;
    this.onDeleteMovie = onDeleteMovie;
    this.onToggleLabelStatus = onToggleLabelStatus;

    this.addMovieBtnNode.addEventListener('click', () => {
      this.getFromMovie();
      this._clearInput();
    });

    this.moviesNode.addEventListener('click', (event) => {
      const id = event.target.id;
      
      if (event.target.classList.contains('btnCloseCheckbox')) {
        onDeleteMovie(id);
      };
    })
  }

  getFromMovie = () => {
    const nameMovie = this.inputMovieNode.value;

    if (nameMovie.trim() === '') {
      alert('Введите название фильма!');
    } else {
      this.onNewMovie(nameMovie);
    }
  }

  _clearInput = () => {
    this.inputMovieNode.value = '';
  }

  renderMovies = (movies) => {
    this.moviesNode.innerHTML = '';
    
    movies.forEach(movie => {
      const checkbox = document.createElement('label');
      const checkboxWrapper = document.createElement('div');
      const realCheckbox = document.createElement('input');
      const customCheckbox = document.createElement('span');
      const nameMovie = document.createElement('span');
      const btnCloseCheckbox = document.createElement('button');

      checkbox.setAttribute('id', movie.id);
      checkbox.setAttribute('class', 'checkbox');
      checkboxWrapper.setAttribute('class', 'checkbox-wrapper');
      realCheckbox.setAttribute('id', movie.title);
      realCheckbox.setAttribute('class', 'real-checkbox');
      realCheckbox.setAttribute('type', 'checkbox');
      customCheckbox.setAttribute('class', 'custom-checkbox');
      nameMovie.setAttribute('id', 'nameMovie');
      nameMovie.setAttribute('class', 'nameMovie');
      nameMovie.innerText = movie.title;
      btnCloseCheckbox.setAttribute('id', movie.id);
      btnCloseCheckbox.setAttribute('class', 'btnCloseCheckbox');
      
      this.moviesNode.append(checkbox);
      checkbox.append(checkboxWrapper, btnCloseCheckbox);
      checkboxWrapper.append(realCheckbox, customCheckbox, nameMovie);

      if (movie.viewed) {
        checkbox.classList.add('active-checkbox');
        realCheckbox.setAttribute('checked', true)
      }
    });


    const checkboxes = document.querySelectorAll('.real-checkbox');
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener('click', (e) => {
          const label = e.target.closest('label');
          label.classList.toggle('active-checkbox');
          this.onToggleLabelStatus(label);
      });
    });   
  }
}