import { Link } from "react-router-dom";


function SearchBar() {
    return (


        < section className="search-block" >
            <input type="text" placeholder="Search by artist or city..." />
            <button>Search</button>
        </section >
    )
}

export default SearchBar;
