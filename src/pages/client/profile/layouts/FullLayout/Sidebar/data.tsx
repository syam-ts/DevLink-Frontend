import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

type Menu = {
  title: string,
  icon: any,
  href: string
}

const Menuitems: Menu[] = [
  {
    title: "Profile",
    icon: DashboardOutlinedIcon,
    href: "/client/profile/profile",
  },  
  {
    title: "Wallet",
    icon: DashboardOutlinedIcon,
    href: "/client/profile/wallet",
  },  
  {
    title: "Notifications",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/client/profile/notifications",
  },
  {
    title: "chat",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/client/profile/chat",
  },
  {
    title: "Logout",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/client/logout",
  },
];

export default Menuitems;
