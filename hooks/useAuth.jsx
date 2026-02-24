import { useContext } from "react";
import { AuthContext } from "@/lib/Auth";

export default function useAuth() {
    return useContext(AuthContext)
}