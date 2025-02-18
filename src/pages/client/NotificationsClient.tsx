import { useSelector } from 'react-redux';
import Notification from '../../components/common/NotificationCard'
import { ClientState } from '../../config/state/allState';
 

function NotificationsClient() {
 
 
  return (
    <div>
        <Notification />
    </div>
  )
}

export default NotificationsClient