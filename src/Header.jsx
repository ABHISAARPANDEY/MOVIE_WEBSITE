import React, { useState } from 'react';
import './Header.css';
import Card from './Card';

const Header = () => {
  const [movies, setMovies] = useState([]); // Store all movies
  const [searchedMovies, setSearchedMovies] = useState([]); // Store searched movies
  const [searchTerm, setSearchTerm] = useState(''); // Store the search term

  const search_movies = (event) => {
    setSearchTerm(event.target.value); // Update the search term
  };

  const submit = (event) => {
    event.preventDefault();
    if (searchTerm === "") {
      setSearchedMovies(movies); // Show all movies if the search term is empty
    } else {
      const filteredMovies = movies.filter((elem) =>
        elem.original_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchedMovies(filteredMovies); // Set searched movies
    }
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTYyZTkyZjMzODIzMzE1ZTc4MzliMDI1OGE1Nzk5MyIsIm5iZiI6MTczMzE0ODU2MS44MDcwMDAyLCJzdWIiOiI2NzRkYmY5MTQ1NThkYWU0NDkzZGRhZDAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.s0tMsaplFcJzi5opdL3RMy_V0xOpgfEDB6anRMwJ_Ro'
    }
  };

  const fetchMovies = async () => {
    let allMovies = [];
    // Fetch movies from multiple pages (let's fetch 5 pages here)
    for (let page = 1; page <= 50; page++) {
      const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`, options);
      const data = await res.json();
      allMovies = allMovies.concat(data.results); // Add new movies to the list
    }
    setMovies(allMovies); // Store all movies
    setSearchedMovies(allMovies); // Show all movies by default
  };

  // Call fetchMovies function when component mounts
  useState(() => {
    fetchMovies(); // Fetch movies on mount
  }, []);

  return (
    <>
      <div className='header'>
        <p className='logo'>IMPH</p>
        <p className='quotes'>Your next favorite movie is just a click away. Made By Abhisaar</p>
        <div className='search-container'>
          <form className='Forms'>
            <input
              className='search'
              placeholder='Search Your Favourite Movies'
              type="text"
              value={searchTerm}
              onChange={search_movies}
            />
            <button className='submit' onClick={submit}>Search</button>
          </form>
        </div>
      </div>
      <div className='movie-grid'>
        {searchedMovies.length > 0 ? (
          searchedMovies.map((elem, index) => (
            <Card
              key={index}
              TITLE={elem.original_title}
              POSTER={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
            />
          ))
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </>
  );
};

export default Header;
