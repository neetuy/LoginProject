// const initialState = {value:''}

export default function reducer(state=0, action){
    switch(action.type){
        case "INCREASE":
        return {
            value:action.value
          };
        case 'DECREASE':
        return{
            value:action.value
        };
          default:
          return state;
    }
}
