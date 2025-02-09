import { useSelector } from 'react-redux';
import Notification from '../../components/common/NotificationCard'
 

function NotificationsClient() {


    const clientId = useSelector((state: any) => state?.client?.currentClient?._id);


  return (
    <div>
        <Notification role='client' roleId={clientId} />
    </div>
  )
}

export default NotificationsClient