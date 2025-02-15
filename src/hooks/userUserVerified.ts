import { useSelector } from "react-redux"


 const useUserVerified = () => {
    const isVerified = useSelector((state: any) => state.user.currentUser.isProfileFilled);
    console.log(isVerified)
    if(!isVerified) throw new Error('User not verified');

    return isVerified;
};

export default useUserVerified;