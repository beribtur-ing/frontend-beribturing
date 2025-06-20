import { useEffect } from 'react';
import { useAuthContext } from '../lib/auth';
import { useNavigate, useParams } from 'react-router-dom';

export default function HomePage() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const { locale } = useParams();

  useEffect(() => {
    if (!loading) {
      if (user) {
        navigate(`/${locale}/dashboard/overview`);
      } else {
        navigate(`/${locale}/login`);
      }
    }
  }, [user, loading, navigate, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return null;
}
