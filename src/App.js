import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_API_KEY;

    const identifier = setTimeout(async () => {
      if (input !== "") {
        const res = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${input}`
        );
        let data = res.data;
        setMovies([...data.results]);
      }
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          placeholder="Search a movie..."
          className="input-area"
          value={input}
          type="text"
          onChange={handleChange}
        />
        {input !== "" && (
          <div className="display">
            {movies[0] ? (
              movies.map((movie, idx) => {
                return (
                  <p className="movie" key={idx}>
                    {movie.original_title}
                  </p>
                );
              })
            ) : (
              <p>No result found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
