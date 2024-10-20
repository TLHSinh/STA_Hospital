import {Children, createContext, useContext, useEffect, useReducer } from "react";

const initialState={
    user:null,
    role:null,
    token:null,
};

export const authContext = createContext(initialState);

const authReducer = (state,action)=>{
    switch(action.type){
        case 'LOGIN_START':

            return{
                user:null,
                role:null,
                token:null,
            };

            case "LOGIN_SUCCESS":
                return {
                    user: action.payload.user,  // Lấy user từ payload
                    token: action.payload.token,  // Gán token từ payload
                    role: action.payload.role  // Gán role từ payload
                };
            

        case 'LOGOUT':
            return{
                user:null,
                role:null,
                token:null,
            };

        default:
            return state;
    }
};
export const AuthContextProvider=({children})=>{
    const [state,dispatch] = useReducer(authReducer, initialState)

    return<authContext.Provider 
    value={{
        user:state.user, 
        token:state.token,
        role:state.role,
        dispatch,
        }}>
        {children}
    </authContext.Provider>
}