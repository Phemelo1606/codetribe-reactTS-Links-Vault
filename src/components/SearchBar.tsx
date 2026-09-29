import { SearchIcon } from './Icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search">
      <label htmlFor="search" className="sr-only">
        Search your storage
      </label>
      <SearchIcon className="search-icon" />
      <input
        id="search"
        type="search"
        className="search-input"
        placeholder="Search your storage…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
