import { useSelector } from "react-redux";
import { ClientState, UserState } from "../config/state/allState";


export const getUserHook = () => {
    const user = useSelector((state: UserState) => state.user.currentUser);
    return user;
};


export const getClientHook = () => {
    const client = useSelector((state: ClientState) => state.client.currentClient);
    return client;
};