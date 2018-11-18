export default function getStudentsData() {
	return (dispatch, getState) => {

	    dispatch({
	      type: 'GET_STUDENTS_REQUEST'
	    });

		fetch('https://api.myjson.com/bins/1dlper')
		.then(response => response.json())
		.then(studentsData => {
	      dispatch({
	        type: 'GET_STUDENTS_SUCCESS',
	        studentsData
	      });
		})
		.catch(error => {
			dispatch({
				type: 'GET_STUDENTS_FAILURE'
			});
		});
	};
}