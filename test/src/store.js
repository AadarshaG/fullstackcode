import { applyMiddleware, createStore} from "redux";
import thunk from 'redux-thunk';


const middlewares = [thunk];

const defaultStore = {
    users: {
        user:{},
        users: [],
        isLoading: false
    },
    products:{
        product: {},
        products: [],
        isLoading: false
    },
    counter: 0
};


function userReducer(state,action){
    console.log('Hello');
}

export const store = createStore(userReducer,defaultStore, applyMiddleware(...middlewares));