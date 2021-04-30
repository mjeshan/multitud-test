import React from 'react';
import JobqueuesIcon from '@material-ui/icons/RestorePage';
import ProjectsIcon from '@material-ui/icons/Assignment';
import PhysiciansIcon from '@material-ui/icons/PersonPin';
import PerformanceIcon from '@material-ui/icons/Assessment';


 export const menuStructure = [
  {
    'label' : 'All Customers',
    'routerLink' : '/all-customers/',
    icon : () => { return(<JobqueuesIcon/>) },
    'subMenu' : null,
  },
  {
    'label' : 'By Segments',
    'routerLink' : '/by-segments/',
    icon : () => { return(<ProjectsIcon/>) },
    'subMenu' : null,
  },
  {
    'label' : 'By Customer Value',
    'routerLink' : '/by-customer-value/',
    icon : () => { return(<PhysiciansIcon/>) },
    'subMenu' : null,
  },
  {
    'label' : 'By Customer Value Trend',
    'routerLink' : '/by-customer-value-trend/',
    icon : () => { return(<PerformanceIcon/>) },
    'subMenu' : null,
  },

]
