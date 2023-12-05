// import { createContext, useContext, useState } from "react";

// const TokenContext = createContext();

// export const TokenProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem('jwt'));

//     const updateToken = (newToken) => {
//         setToken(newToken);
//         localStorage.setItem('jwt', JSON.stringify(newToken));
//     }

//     return (
//         <TokenContext.Provider value={{ token, updateToken }}>
//             {children}
//         </TokenContext.Provider>
//     );
// };

// export const useToken = () => {
//     const context = useContext(TokenContext);

//     if(!context) {
//         throw new Error('useToken debe ser utilizado dentro de un TokenProvider')
//     }

//     return context;
// };