import { combineReducers } from 'redux';

import {posts} from './post';
import { edit } from './edit';
export const reducers = combineReducers({ posts,edit });
