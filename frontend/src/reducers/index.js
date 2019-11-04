import { combineReducers } from 'redux'
import gameSetting from './gameSetting'
import history from './history'
import isDescending from './isDescending'
import step from './step'
import setMode from './setMode'
import xIsNext from './xIsNext'
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import message from './message';
import socket from './socket';

const caroApp = combineReducers({
  gameSetting,
  history,
  isDescending,
  step,
  xIsNext,
  setMode,
  message,
  errors: errorReducer,
  auth: authReducer,
  socket
});
export default caroApp