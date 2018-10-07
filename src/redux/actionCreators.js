export default function getStudentsData() {
	return (dispatch, getState) => {

		fetch('https://api.myjson.com/bins/1dlper')
		.then(response => response.json())
		.then(studentsData => {
      dispatch({
        type: 'GET_STUDENTS',
        studentsData
      });
		});
	};
}