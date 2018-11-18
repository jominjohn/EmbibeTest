const initialState = {
	studentsData: {},
	isError: false,
	isLoader: false
}

const studentsReducer = (state = initialState, action) => {
  switch(action.type) {
     case 'GET_STUDENTS_SUCCESS':
       return state = { ...state, studentsData: { ...action.studentsData }, isLoader: false };

     case 'GET_STUDENTS_FAILURE':
       return state = { ...state, isError: true };

     case 'GET_STUDENTS_REQUEST':
       return state = { ...state, isLoader: true };

     default:
       return state;
   }
};

export default studentsReducer;