import { useState } from 'react';
import type { Movie } from './types/movie';
import { fetchMovies } from './services/movieService';
import SearchBar from './components/SearchBar/SearchBar';
import toast from 'react-hot-toast';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);

      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error('No movies found for your request.');
      } else {
        setMovies(data);
      }
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}
