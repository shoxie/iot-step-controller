import React from 'react';
import BoxTable from '@/components/BoxTable';
import { NullableBoxData } from '@/types';

const Home: React.FC = () => {
  const boxesData: NullableBoxData[] = [
    { code: 'A1', name: 'Box 1' },
    { code: 'A2', name: 'Box 2' },
    { code: 'A3', name: 'Box 3' },
    null,
    { code: 'B2', name: 'Box 5' },
    null,
    { code: 'C1', name: 'Box 7' },
    { code: 'C2', name: 'Box 8' },
    { code: 'C3', name: 'Box 9' },
  ];

  return (
    <div className="flex flex-col justify-center space-y-48 items-center min-h-screen bg-[#191724]">
      
      <BoxTable boxesData={boxesData} />
    </div>
  );
};

export default Home;
