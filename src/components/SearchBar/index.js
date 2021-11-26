const SearchBar = () => {
  return (
    <form>
      <h2>Search City</h2>
      <input
        placeholder='e.g. Frankfurt'
      />
      <button>
        Check Weather
      </button>
      or
      <button>
        {/* onClick={getUserCoord} */}
        Get My Location
      </button>
    </form>
  );
};

export default SearchBar;
