export type User = {
    id:number|null
    name: string;
    email: string;
    password: string;
    address:string;
    phone:string;
};

export const initialUserState: User = {
  id:0,
  name: "",
  email: "",
  password: "",
  address: "",
  phone: "",
};

//helpers for useReducer of user....
export type Action ={
    type: 'CREATE'|'UPDATE'|'GET'|'REMOVE',
    data: Partial<User>
};

  export const userReducer = (state: User, action: Action): User => {
    switch (action.type) {
      case "CREATE":{
        const {id,name,password,email}= action.data as Partial<User>;
        return {
          id:id ||0,
          name: name||'',
          password: password || '',
          email:email||'',
          address:'',
          phone:''
      }
      }
        
      case "UPDATE":
        console.log(action.data);
        
        if (!action.data) {
          return state; 
        }
          
        return {
          // ...state,
          id: state.id,
          name: action.data.name || state.name,
          password :state.password,
          email: action.data.email || state.email,
          address: action.data.address || state.address,
          phone: action.data.phone || state.phone,
    }
    default:
      return state;
  }
}