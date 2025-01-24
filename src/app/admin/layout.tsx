import React from 'react';
import LeftSidebar from '@/components/LeftBar';
import NavBar from '@/components/NavBar';
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='overflow-hidden md:flex'>
      <div className="flex-1 lg:block">
        <LeftSidebar />
      </div>
      <div className='flex-[4]'>
        <NavBar />
        {children}
      </div>
    </div>
  );
}