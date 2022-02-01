import { combineReducers } from 'redux';

import {posts} from './post';
import { edit } from './edit';
import { userinfo } from './userinfo';
export const reducers = combineReducers({ posts,edit,userinfo });
