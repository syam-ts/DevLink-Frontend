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
    href: "/user/profile/profile",
  },  
  {
    title: "Wallet",
    icon: DashboardOutlinedIcon,
    href: "/user/profile/wallet",
  },  
  {
    title: "Notifications",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/user/profile/notifications",
  },
  {
    title: "chat",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/user/profile/chat",
  },
  {
    title: "Logout",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/user/logout",
  },
];

export default Menuitems;
