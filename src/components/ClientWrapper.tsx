"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';

const ClientWrapper = ({children}: {children: React.ReactNode}) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true); // Show loader and disable scrolling
      document.body.classList.add("no-scroll");
    };
  
    const handleRouteComplete = () => {
      setLoading(false); // Hide loader and enable scrolling
      document.body.classList.remove("no-scroll");
    };
  
    // Listen for route changes
    handleRouteChange();
  
    // Simulate a delay for the loader
    const timeout = setTimeout(() => {
      handleRouteComplete();
    }, 3000); // Adjust the delay as needed
  
    return () => {
      clearTimeout(timeout);
      document.body.classList.remove("no-scroll"); // Cleanup
    };
  }, [pathname, searchParams]);
  return (
    <div>
      {loading && <Loader />}
      {children}
    </div>
  )
}

export default ClientWrapper