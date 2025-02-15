import { useSelector } from "react-redux"


const useUserVerified = () => {
    const isVerified = useSelector((state: any) => state.user.currentUser.isProfileFilled);
    console.log(isVerified)
    if (!isVerified) return false;
    return true;
};

export default useUserVerified;