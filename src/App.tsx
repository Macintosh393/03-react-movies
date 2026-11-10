import css from './App.module.css';
import { useState } from 'react';
import type { Movie } from './types/movie';
import { fetchMovies } from './services/movieService';
import SearchBar from './components/SearchBar/SearchBar';
import toast from 'react-hot-toast';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import MovieGrid from './components/MovieGrid/MovieGrid';
import MovieModal from './components/MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  const handleClose = () => {
    closeModal();
    setSelectedMovie(null);
  };

  return (
    <section className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid onSelect={handleSelect} movies={movies} />}
      {isModalOpen && selectedMovie !== null && (
        <MovieModal movie={selectedMovie} onClose={handleClose} />
      )}
    </section>
  );
}
