import {combineReducers} from 'redux'
import UserReducer from './user'
import Cart from './cartaction'
import cart from '../../pages/cart';
import cartaction from './cartaction';

export default combineReducers({
    user : UserReducer,
    cart :Cart
})
