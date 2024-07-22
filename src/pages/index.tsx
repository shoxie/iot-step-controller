import React from 'react';
import BoxTable from '@/components/BoxTable';
import { NullableBoxData } from '@/types';
import Parameters from '@/components/Parameters';

const Home: React.FC = () => {
  const boxesData: NullableBoxData[] = [
    { code: 'A1', name: 'Slot 1' },
    { code: 'A2', name: 'Slot 2' },
    { code: 'A3', name: 'Slot 3' },
    { code: 'B1', name: 'Slot 4' },
    { code: 'B2', name: 'Slot 5' },
    { code: 'B3', name: 'Slot 6' },
    { code: 'C1', name: 'Slot 7' },
    { code: 'C2', name: 'Slot 8' },
    { code: 'C3', name: 'Slot 9' },
  ];

  return (
    <>
      <Parameters />
      <div className=''>
        <div className="flex flex-col justify-center space-y-48 w-full min-h-screen items-center">
          <BoxTable boxesData={boxesData} />
        </div>
      </div>
    </>
  );
};

export default Home;
