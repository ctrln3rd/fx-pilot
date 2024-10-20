/*popup actions*/
export const setCurrentUser = (currentuseremail) =>({
  type: 'CURRENT_USER_EMAIL',
  payload:currentuseremail
});
export const setCurrentUserVerified = (currentuserverified) =>({
  type: 'CURRENT_USER_VERIFIED',
  payload:currentuserverified
});

export const setCurrentUserData = (currentuserdata) =>({
  type: 'CURRENTUSER_DATA',
  payload:currentuserdata
});

export const setResponse = (response) =>({
  type: 'RESPONSE',
  payload: response
});


  
