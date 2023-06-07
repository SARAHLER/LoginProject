import { combineReducers } from 'redux';
import taskReducer from './taskSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

export type RootState = {
  tasks: ReturnType<typeof taskReducer>;
};

export default rootReducer;
