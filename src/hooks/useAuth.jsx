import { useContext } from "react";
import { AuthContext } from "../contexto/Auth";

export default function useAuth(){
    return useContext(AuthContext)
}