




'use client';

import useHasMounted from '@/hooks/useHasMounted'; // adjust the path if needed
import AdminNavbar from '../../../components/AdminNavbar';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminHeaderEdit from '../../../components/AdminHeaderEdit';
export default function AdminLayout({ children }) {
  const hasMounted = useHasMounted();

  // Prevent rendering until client has mounted to avoid hydration mismatch
  if (!hasMounted) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <AdminHeaderEdit/>
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-0">
          {children}
        </main>
      </div>
    </div>
  );
}

