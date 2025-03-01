import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

type Menu = {
  title: string,
  icon: any,
  href: string
};

 

const Menuitems: Menu[] = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/admin/index/dashboard",
  },   
  {
    title: "User",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/admin/index/tables/user-table",
  },
  {
    title: "Client",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/admin/index/tables/client-table",
  },
  {
    title: "Requests",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/admin/index/requests",
  },
  {
    title: "Contracts",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/admin/index/contracts",
  },
  {
    title: "Wallet",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/admin/index/wallet",
  } 
];

export default Menuitems;
