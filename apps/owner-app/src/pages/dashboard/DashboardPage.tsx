import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { locale } = useParams();

  useEffect(() => {
    navigate(`/${locale}/dashboard/overview`);
  }, [navigate, locale]);

  return null;
}
