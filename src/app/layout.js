
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Providers } from './providers';

export const metadata = {
  title: 'Admin Portal',
  description: 'Admin Login',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}


// 'use client'; // ✅ Required
// import '../styles/globals.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// import { Provider } from 'react-redux';
// import store from '../store/store';

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <Provider store={store}>
//           {children}
//         </Provider>
//       </body>
//     </html>
//   );
// }
