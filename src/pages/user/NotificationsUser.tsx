import { useSelector } from 'react-redux';
import Notification from '../../components/common/NotificationCard'


 

function NotificationsUser () {
 
   const userId = useSelector((state: any) => state?.user?.currentUser?.user?._id);

   console.log('user id', userId)

  return (
    <div>
       
        <Notification role='user' roleId={userId} />
    </div>
  )
}

export default NotificationsUser