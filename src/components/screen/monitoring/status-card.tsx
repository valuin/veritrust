import React from 'react';
import { cn } from '@/lib/utils'; 
import { StatusDetails } from '@/lib/type';

type StatusCardProps = {
  status: StatusDetails;
};

export function StatusCard({ status }: StatusCardProps) {
  const bgColor = status.status === 'Approved' ? 'bg-green-200'
                : status.status === 'Pending' ? 'bg-yellow-200'
                : status.status === 'Rejected' ? 'bg-red-200'
                : 'bg-gray-200'; 

   const textColor = status.status === 'Approved' ? 'text-green-800' 
                 : status.status === 'Pending' ? 'text-yellow-800'
                 : status.status === 'Rejected' ? 'text-red-800'
                 : 'text-gray-800'; 

  return (
    <div className={cn("p-6 rounded-xl shadow-md", bgColor)}> 
      <h3 className={cn("text-2xl font-bold mb-2", textColor)}>
        {status.status}
      </h3>
      <p className={cn("text-sm", textColor)}>
        {status.description}
      </p>
    </div>
  );
}