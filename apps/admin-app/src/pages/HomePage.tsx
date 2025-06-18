import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const { locale } = useParams();

  useEffect(() => {
    navigate(`/${locale}/overview`);
  }, [navigate, locale]);

  return null;
}