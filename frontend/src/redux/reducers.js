   const currentUserInitial = {
    value: false,
   }
   const currentUserReducer = (state = currentUserInitial, action) => {
   switch (action.type) {
       case 'CURRENT_USER':
       return {
           ...state,
           value: action.payload,
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
       const responseStatusInitial = {
        value: false,
       }
    const responseStatusReducer = (state = responseStatusInitial, action) => {
       switch (action.type) {
           case 'RESPONSE_STATUS':
           return {
               ...state,
               value: action.payload,
           };
           default:
           return state;
       }
       };

  
  export {currentUserDataReducer,currentUserReducer, responseReducer, responseStatusReducer};