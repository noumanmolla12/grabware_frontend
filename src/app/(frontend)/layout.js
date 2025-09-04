// 'use client';

// import { Provider } from 'react-redux';
// import store from '../store/store';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Provider store={store}>
//            <Header />
//           {children}
//           <Footer />
//         </Provider>
//       </body>
//     </html>
//   );
// }

'use client';

import Header from './../../components/Header';
import Footer from './../../components/Footer';
import UserNavbar from './../../components/UserNavbar';

export default function FrontendLayout({ children }) {
  return (
    <>
      <Header />
      <UserNavbar/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
