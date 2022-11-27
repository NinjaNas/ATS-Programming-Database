const SearchBar = ({ students, setStudents }) => {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) {
      return setStudents(students);
    }
    const resultsArray = students.filter((students) =>
      (students.first_name + " " + students.last_name)
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );

    setStudents(resultsArray);
  };

  return (
    <header>
      <form className="search" onSubmit={handleSubmit}>
        <input
          placeholder="Search"
          className="search__input"
          type="text"
          id="search"
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
};
export default SearchBar;
