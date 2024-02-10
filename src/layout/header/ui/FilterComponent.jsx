import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useSearch } from "../../../store/SearchContext";

const FilterComponent = () => {
	const { searchQuery, setSearchQuery } = useSearch();

	const handleInputChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }}
				value={searchQuery}
				onChange={handleInputChange}
			/>
		</Search>
	);
};

export default FilterComponent;
