'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaHome, FaNewspaper, FaCalendarAlt, FaEye, FaUsers,
  FaBell, FaMoneyBill, FaFileAlt
} from 'react-icons/fa';

export default function AdminSidebar() {
  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      paddingTop: '20px'
    }}>
      <ul style={{ listStyleType: 'none', padding: '0 20px' }}>
        <li><Link href="/admin/login" className="no-underline"><SidebarItem icon={<FaHome />} text="Dashboard" /></Link></li>
        <li><Link href="/admin/header-setup/view-header" className="no-underline"><SidebarItem icon={<FaHome />} text="Navbar" /></Link></li>
        <li><Link href="/admin/news" className="no-underline"><SidebarItem icon={<FaNewspaper />} text="News" /></Link></li>
        <li><Link href="/admin/pages/event/view-event" className="no-underline"><SidebarItem icon={<FaCalendarAlt />} text="Events" /></Link></li>
        <li><Link href="/admin/pages/implink/view-implink" className="no-underline"><SidebarItem icon={<FaEye />} text="Important Links" /></Link></li>
        <li><Link href="/admin/pages/member/view-member" className="no-underline"><SidebarItem icon={<FaUsers />} text="Our Members" /></Link></li>
        <li><Link href="/admin/pages/ordercircular/view-ordercircular" className="no-underline"><SidebarItem icon={<FaBell />} text="Orders And Circulars" /></Link></li>
        <li><Link href="/admin/tenders" className="no-underline"><SidebarItem icon={<FaBell />} text="Tenders" /></Link></li>
        <li><Link href="/admin/pages/Notification/view-notification" className="no-underline"><SidebarItem icon={<FaMoneyBill />} text="Notification" /></Link></li>
        <li><Link href="/admin/pages/notice/view-notice" className="no-underline"><SidebarItem icon={<FaFileAlt />} text="Public Notice" /></Link></li>
        <li><Link href="/admin/pages/enewsletter/view-enewsletter" className="no-underline"><SidebarItem icon={<FaFileAlt />} text="Enewsletter" /></Link></li>
        <li><Link href="/admin/pages/house-agenda/view-house-agenda" className="no-underline"><SidebarItem icon={<FaFileAlt />} text="House Agenda & Proceeding" /></Link></li>
      </ul>
    </aside>
  );
}

// Sidebar item
const SidebarItem = ({ icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '10px 0',
    fontSize: '15px',
    cursor: 'pointer',
    color: '#ecf0f1'
  }}>
    <span style={{ marginRight: '10px', fontSize: '16px' }}>{icon}</span>
    {text}
  </div>
);




// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import {
//   FaBars, FaBell, FaCalendarAlt, FaEye, FaFileAlt,
//   FaHome, FaMoneyBill, FaNewspaper, FaUsers
// } from 'react-icons/fa';

// export default function AdminSidebar() {
//   return (
//     <aside style={{
//       width: '250px',
//       backgroundColor: '#2c3e50',
//       color: '#ecf0f1',
//       paddingTop: '20px'
//     }}>
//       <ul style={{ listStyleType: 'none', padding: '0 20px' }}>
//         <li><Link href="/admin/login" className="no-underline"><SidebarItem icon={<FaHome />} text="Dashboard" /></Link></li>
//         <li><Link href="/admin/header-setup/view-header" className="no-underline"><SidebarItem icon={<FaHome />} text="Navbar" /></Link></li>
//         <li><Link href="/admin/news" className="no-underline"><SidebarItem icon={<FaNewspaper />} text="News" /></Link></li>
//         <li><Link href="/admin/events" className="no-underline"><SidebarItem icon={<FaCalendarAlt />} text="Events" /></Link></li>
//         <li><Link href="/admin/important-links" className="no-underline"><SidebarItem icon={<FaEye />} text="Important Links" /></Link></li>
//         <li><Link href="/admin/members" className="no-underline"><SidebarItem icon={<FaUsers />} text="Our Members" /></Link></li>
//         <li><Link href="/admin/orders-circulars" className="no-underline"><SidebarItem icon={<FaBell />} text="Orders And Circulars" /></Link></li>
//         <li><Link href="/admin/tenders" className="no-underline"><SidebarItem icon={<FaBell />} text="Tenders" /></Link></li>
//         <li><Link href="/admin/notification" className="no-underline"><SidebarItem icon={<FaMoneyBill />} text="Notification" /></Link></li>
//         <li><Link href="/admin/public-notice" className="no-underline"><SidebarItem icon={<FaFileAlt />} text="Public Notice" /></Link></li>
//         <li><Link href="/admin/enewsletter" className="no-underline"><SidebarItem icon={<FaFileAlt />} text="Enewsletter" /></Link></li>
//         <li><Link href="/admin/house-agenda" className="no-underline"><SidebarItem icon={<FaFileAlt />} text="House Agenda & Proceeding" /></Link></li>
//       </ul>
//     </aside>
//   );
// }

// const SidebarItem = ({ icon, text }) => (
//   <div style={{
//     display: 'flex',
//     alignItems: 'center',
//     padding: '10px 0',
//     fontSize: '15px',
//     cursor: 'pointer',
//     color: '#ecf0f1'
//   }}>
//     <span style={{ marginRight: '10px', fontSize: '16px' }}>{icon}</span>
//     {text}
//   </div>
// );
