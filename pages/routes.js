// import type { ComponentProps, FC, ReactNode } from 'react';
// import { AiOutlineLoading3Quarters } from 'react-icons/ai';
// import { BiNotification } from 'react-icons/bi';
// import { BsCreditCard2FrontFill, BsImages } from 'react-icons/bs';
// import { FaBars, FaSpinner } from 'react-icons/fa';
// import { FiNavigation } from 'react-icons/fi';
// import {
//   HiAnnotation,
//   HiArrowCircleDown,
//   HiBadgeCheck,
//   HiBell,
//   HiChevronDoubleRight,
//   HiClipboardList,
//   HiCollection,
//   HiCreditCard,
//   HiDeviceTablet,
//   HiDuplicate,
//   HiHome,
//   HiMinus,
//   HiOutlineChevronDoubleRight,
//   HiOutlineClock,
//   HiPencilAlt,
//   HiStar,
//   HiTable,
//   HiUser,
// } from 'react-icons/hi';
// import { MdColorLens, MdTab } from 'react-icons/md';
// import AccordionPage from './pages/AccordionPage';
// import AlertsPage from './pages/AlertsPage';
// import DashboardPage from './pages/DashboardPage';
import PassengerDashboard from "../components/PassengerDashboard";
import PassengerMyRides from "../components/PassengerMyRides";
// import PassengerMyProfile from "../components/PassengerMyProfile";
// import PassengerMyWallet from "../components/PassengerMyWallet";
import PassengerAllRides from "../components/PassengerAllRides";


// export type ComponentCardItem = {
//   className: string;
//   images: { light: string; dark: string };
// };

// export type RouteProps = {
//   title: string;
//   icon: FC<ComponentProps<'svg'>>;
//   href: string;
//   component: ReactNode;
//   group: boolean;
//   card?: ComponentCardItem;
// };

export const routes = [
  {
    title: 'Dashboard',
    // icon: HiHome,
    href: '/',
    component: <PassengerDashboard />,
    group: false,
  },
  {
    title: 'Alerts',
    // icon: HiBell,
    href: '/alerts',
    component: <PassengerAllRides />,
    group: false,
    card: {
      className: 'w-56',
      images: { light: 'alerts-light.svg', dark: 'alerts-dark.svg' },
    },
  },
  {
    title: 'Accordion',
    // icon: HiCreditCard,
    href: '/accordion',
    component: <PassengerMyRides />,
    group: false,
    card: {
      className: 'w-56',
      images: { light: 'accordion-light.svg', dark: 'accordion-dark.svg' },
    },
  },
  
];
