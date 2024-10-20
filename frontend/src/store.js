// store.js
import { createStore, combineReducers} from 'redux';
import { currentUserReducer, currentUserDataReducer, responseReducer, responseStatusReducer } from './redux/reducers';
  
const rootReducer = combineReducers({
    response: responseReducer,
    responsestatus: responseStatusReducer,
    currentuser: currentUserReducer,
    currentuserdata: currentUserDataReducer
  });

  // Create Redux store with persisted reducer and middleware
  const store = createStore(rootReducer);
  
export default store;