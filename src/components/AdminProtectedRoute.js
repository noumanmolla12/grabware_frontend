'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useHasMounted from '../hooks/useHasMounted';

export default function AdminProtectedRoute({ children }) {
  const router = useRouter();
  const hasMounted = useHasMounted();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (hasMounted) {
      const admin = localStorage.getItem('admin');
      if (!admin) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [hasMounted]);

  if (!hasMounted || !isAuthenticated) return null; // Avoid hydration mismatch

  return <>{children}</>;
}

