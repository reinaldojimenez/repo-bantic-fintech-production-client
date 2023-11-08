import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-police-station',
    label: 'menu.inicio',
    to: `${adminRoot}/inicio`,
  },
  {
    id: 'generarqr',
    icon: 'iconsminds-qr-code',
    label: 'menu.generarqr',
    to: `${adminRoot}/generarqr`,
  },
  {
    id: 'verqr',
    icon: 'simple-icon-frame',
    label: 'menu.verqr',
    to: `${adminRoot}/verqr`,
  },
  {
    id: 'cobranza',
    icon: 'iconsminds-police-station',
    label: 'menu.cobranza',
    to: `${adminRoot}/cobranza`,
  },
  
];

/* const datacp = [
  {
    id: 'gogo',
    icon: 'simple-icon-frame',
    label: 'menu.gogo',
    to: `${adminRoot}/gogo`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.start',
        to: `${adminRoot}/gogo/start`,
      },
    ],
  },
  {
    id: 'generarqr',
    icon: 'simple-icon-frame',
    label: 'menu.generarqr',
    to: `${adminRoot}/generarqr`,
  },
  {
    id: 'cobranza',
    icon: 'iconsminds-police-station',
    label: 'menu.cobranza',
    to: `${adminRoot}/cobranza`,
  },
  {
    id: 'secondmenu',
    icon: 'iconsminds-three-arrow-fork',
    label: 'menu.second-menu',
    to: `${adminRoot}/second-menu`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.second',
        to: `${adminRoot}/second-menu/second`,
      },
    ],
  },
  {
    id: 'blankpage',
    icon: 'iconsminds-bucket',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`,
  },
  {
    id: 'docs',
    icon: 'iconsminds-library',
    label: 'menu.docs',
    to: 'https://gogo-react-docs.coloredstrategies.com/',
    newWindow: true,
  },
]; */
export default data;
