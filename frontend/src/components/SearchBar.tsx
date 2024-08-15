import { TextField } from "@mui/material";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <TextField
      type='text'
      value={searchTerm}
      variant='outlined'
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder='Search recipes...'
    />
  );
};

export default SearchBar;
