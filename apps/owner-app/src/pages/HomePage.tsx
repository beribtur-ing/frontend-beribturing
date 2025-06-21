import { useEffect } from 'react';
import { useAuthContext } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate(`/dashboard/overview`);
      } else {
        navigate(`/login`);
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return null;
}
