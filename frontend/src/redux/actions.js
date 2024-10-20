/*popup actions*/
export const setCurrentUser = (currentuser) =>({
  type: 'CURRENT_USER',
  payload:currentuser
});

export const setCurrentUserData = (currentuserdata) =>({
  type: 'CURRENTUSER_DATA',
  payload:currentuserdata
});

export const setResponse = (response) =>({
  type: 'RESPONSE',
  payload: response
});

export const setResponseStatus = (responsestatus) =>({
  type: 'RESPONSE_STATUS',
  payload: responsestatus
});
  
