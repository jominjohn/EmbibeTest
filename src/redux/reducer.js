const studentsReducer = (state = {}, action) => {
  switch(action.type) {
     case 'GET_STUDENTS':
       return state = {...action.studentsData};

     default:
       return state;
   }
};

export default studentsReducer;