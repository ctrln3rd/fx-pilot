   const currentUserInitial = {
    email: '',
    verified: false
   }
   const currentUserReducer = (state = currentUserInitial, action) => {
   switch (action.type) {
       case 'CURRENT_USER_EMAIL':
       return {
           ...state,
           email: action.payload,
       };
       case 'CURRENT_USER_VERIFIED':
        return {
            ...state,
           verified: action.payload,
        };
       default:
       return state;
   }
   };

   const currentUserDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'CURRENTUSER_DATA':
        return {
            ...state,
            value: action.payload,
        };
        default:
        return state;
    }
    };

    const responseInitial = {
        value: false,
       }
    const responseReducer = (state = responseInitial, action) => {
       switch (action.type) {
           case 'RESPONSE':
           return {
               ...state,
               value: action.payload,
           };
           default:
           return state;
       }
       };

  
  export {currentUserDataReducer,currentUserReducer, responseReducer};