import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([""]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://online-movie-database.p.rapidapi.com/auto-complete",
      params: { q: `${input}` },
      headers: {
        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
        "X-RapidAPI-Key": "f761570832mshc17af0801685019p1039b4jsnfecac71a93b9",
      },
    };

    const identifier = setTimeout(async () => {
      if (input !== "") {
        axios
          .request(options)
          .then(function (response) {
            let data = response.data;
            data.d ? setMovies([...data.d]) : setMovies([]);
          })
          .catch(function (error) {
            console.error(error);
          });
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
            {movies[0]
              ? movies.map((movie, idx) => {
                  return (
                    <p className="movie" key={idx}>
                      {movie.l}
                    </p>
                  );
                })
              : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
