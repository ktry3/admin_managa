import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import HistoryIcon from "@mui/icons-material/History";
import MapIcon from "@mui/icons-material/Map";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TableViewIcon from "@mui/icons-material/TableView";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShieldIcon from "@mui/icons-material/Shield";

export const Menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    name: "Administrative",
    icon: <EventIcon />,
    NestedList: [
      {
        name: "User",
        path: "/dashboard/user-management/user",
        icon: <PersonIcon />,
      },
      {
        name: "Role",
        path: "/dashboard/user-management/role",
        icon: <ManageAccountsIcon />,
      },
      {
        name: "Permission",
        path: "/dashboard/user-management/permission",
        icon: <ShieldIcon />,
      },
      {
        name: "Role Permission",
        path: "/dashboard/user-management/role-permission",
        icon: <AdminPanelSettingsIcon />,
      },
    ],
  },
  {
    name: "Tenant Management",
    path: "/dashboard/tenant-management",
    icon: <TableViewIcon />,
  },
];
