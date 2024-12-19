import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';

type Menu = {
  title: string,
  icon: any,
  href: string
}

const Menuitems: Menu[] = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/dashboards/dashboard1",
  },   
  {
    title: "User",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/tables/user-table",
  },
  {
    title: "Client",
    icon: AutoAwesomeMosaicOutlinedIcon,
    href: "/tables/client-table",
  },
];

export default Menuitems;
