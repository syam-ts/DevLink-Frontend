import { useSelector } from "react-redux";


export const getUserHook = () => {
    const user = useSelector((state: any) => state.currentUser.user);
    return user;
};


export const getClientHook = () => {
    const client = useSelector((state: any) => state.currentClient.client);
    return client;
};