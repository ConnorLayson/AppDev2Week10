import{createContext,useContext,useState}from'react';
const AuthContext=createContext(null);
// Demo credentials only. Replace this client-side demo with a backend auth service for production.
const DEMO_USERS=[{username:'reader',password:'reader123',role:'regular'},{username:'admin',password:'admin123',role:'admin'}];
export function AuthProvider({children}){const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('newsreader_user'))}catch{return null}});
const login=(username,password)=>{const found=DEMO_USERS.find(u=>u.username===username&&u.password===password);if(!found)return false;const safe={username:found.username,role:found.role};setUser(safe);localStorage.setItem('newsreader_user',JSON.stringify(safe));return true};
const logout=()=>{setUser(null);localStorage.removeItem('newsreader_user')};
const isAuthenticated=!!user;const isAdmin=()=>user?.role==='admin';
return <AuthContext.Provider value={{user,login,logout,isAuthenticated,isAdmin}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);