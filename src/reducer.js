var inititalStore = {
    name:'',
    age:''
}

export default function reducer(state = inititalStore, action){
    switch(action.type){
        case "INCREASE":
        return {
            name:action.name,
            age:action.age
          };
          default:
          return {
              name:state.name,
              age:state.age
    };
}
}