const initialState = {fieldValue:''}
import action from './action.js'

export default function reducer(state=initialState, action){
    if(action.type=="NAME"){
        return action.fieldValue
    }
    else if(action.type=="ADDRESS"){
        return action.fieldValue
    }
    return state
}
