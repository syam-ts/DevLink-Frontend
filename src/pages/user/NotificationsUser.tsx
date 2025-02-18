import { useSelector } from 'react-redux';
import Notification from '../../components/common/NotificationCard'
import { UserState } from '../../config/state/allState';

 

function NotificationsUser () {
 
   const userId: string = useSelector((state: UserState) => state?.user?.currentUser?._id);
 

  return (
    <div>
       
        <Notification  />
    </div>
  )
}

export default NotificationsUser