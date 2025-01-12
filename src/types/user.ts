export type User = {
    Name: string;
    // lastName: string;
    email: string;
    password: string;
    address:string;
    phone:string;
};

export const initialUserState: User = {
  Name: "",
  // lastName: "",
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

  export const userReducer = (state: User, action: Action): User|any => {
    switch (action.type) {
      case "CREATE":
        return { ...action.data };
      case "UPDATE":
        return { ...state, ...action.data };
      default:
        return state;
    }
  }