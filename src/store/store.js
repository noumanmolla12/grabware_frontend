// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/admin/adminSlice';
import headerReducer from '../features/common/headerSlice';
import eventReducer from '../features/event/eventSlice';
import implinkReducer from '../features/implink/implinkSlice';
import navbarSlice from '../features/common/navbarSlice';
import memberReducer from '../features/member/memberSlice';
import orderCircularReducer from '../features/orderCircular/orderCircularSlice';
import notificationReducer from '../features/notification/notificationSlice';






const store = configureStore({
  reducer: {
    admin: adminReducer,
    headers: headerReducer,
    event: eventReducer,
    implink: implinkReducer,
    navbars: navbarSlice,
    members: memberReducer,
    orderCirculars: orderCircularReducer,
    notifications: notificationReducer,
    // Add more slices here (user, header, etc.)
  },
});

export default store;
