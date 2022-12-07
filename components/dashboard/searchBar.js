import Styles from "../../styles/Forms.module.css";

//Searchbar used in the admin dashboard for All Students and User//
const SearchBar = ({ students, setStudents }) => {
	const handleSubmit = (e) => e.preventDefault();
	//Function that maps through students passed as props when Change occurs in input//
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
			<form
				className='search'
				onSubmit={handleSubmit}>
				<input
					className={Styles.input}
					placeholder='Search'
					type='text'
					id='search'
					onChange={handleSearchChange}
				/>
			</form>
		</header>
	);
};
export default SearchBar;
