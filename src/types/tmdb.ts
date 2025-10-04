export type Movie = {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  media_type?: "movie" | "tv" | string;
};

export type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type DetailedTitle = Movie & {
  genres?: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  videos?: { results: { key: string; site: string; type: string; name: string }[] };
  similar?: PagedResponse<Movie>;
};

export type Movie = {
  id: number;
  title?: string;
  name?: string; // TV の場合
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  media_type?: "movie" | "tv" | string;
};

export type PagedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type DetailedTitle = Movie & {
  genres?: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  videos?: { results: { key: string; site: string; type: string; name: string }[] };
  similar?: PagedResponse<Movie>;
};


