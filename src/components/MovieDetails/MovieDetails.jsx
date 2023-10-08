import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

function MovieDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); // This is how you get the movie id from the URL
  const movieDetails = useSelector((store) => store.movieDetails);
  const movieDetailsGenres = useSelector((store) => store.movieDetailsGenres);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIE_DETAILS", payload: id }); // Dispatch an action to fetch the movie by its id
    dispatch({ type: "FETCH_MOVIE_DETAILS_GENRES", payload: id }); // Dispatch an action to fetch the movie genres by its id
  }, [id, dispatch]); // Add id and dispatch to the dependency array

  return (
    <main>
      <h1>MovieDetails</h1>
      <section className="movieDetails"></section>
      <div key={movieDetails.id}>
        <h3>{movieDetails.title}</h3>
        <img src={movieDetails.poster} alt={movieDetails.title} />
        <p>{movieDetails.description}</p>
        <p>Genres:</p>
        <br />
        {movieDetailsGenres.map((genre) => (
          <p key={genre.name}>{genre.name}</p>
        ))}

        <button
          onClick={() => {
            history.push("/");
          }}
        >
          Back to List
        </button>
      </div>
    </main>
  );
}

export default MovieDetails;
