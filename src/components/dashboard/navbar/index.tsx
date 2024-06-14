import DesktopNavbar from './desktop-navbar';
import { Menus } from './menu';

const DashboardNavbar = ({ children }: { children: React.ReactNode }) => {
  return <DesktopNavbar menus={Menus}>{children}</DesktopNavbar>;
};

export default DashboardNavbar;
