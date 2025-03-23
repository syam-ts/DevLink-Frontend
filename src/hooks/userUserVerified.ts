import { useSelector } from "react-redux"
import { UserState } from "../config/state/allState";


const useUserVerified = () => {
    const isVerified = useSelector((state: UserState) => state.user.currentUser.isProfileFilled);
    console.log(isVerified)
    if (!isVerified) return false;
    return true;
};

export default useUserVerified;