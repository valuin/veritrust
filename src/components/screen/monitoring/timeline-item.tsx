// components/TimelineItem.tsx
import { TimelineEntry } from '@/lib/type';
import React from 'react';

type TimelineItemProps = {
  entry: TimelineEntry;
  isFirst: boolean; 
  isLast: boolean;  
  isCurrent?: boolean; 
};

export function TimelineItem({ entry, isFirst, isLast, isCurrent }: TimelineItemProps) {
  const dotColor = isCurrent ? 'bg-blue-600' : 'bg-gray-400'; 
  const lineColor = 'bg-gray-300'; 

  return (
    <div className="flex relative pb-8"> 
      {/* Vertical Line */}
      <div className={`absolute inset-0 left-4 w-0.5 ${lineColor} ${isFirst ? 'top-8' : 'top-0'} ${isLast ? 'h-8' : 'h-full'}`}> {/* Position the line */}
      </div>

      {/* Dot */}
      <div className={`z-10 flex items-center`}> 
         <div className={`w-8 h-8 rounded-full ${dotColor} flex items-center justify-center`}>
         </div>
      </div>

      {/* Content */}
      <div className="flex-grow ml-4">
        <div className="flex justify-between items-start mb-1">
           <h4 className={'font-semibold text-sm text-blue-600'}>
             {entry.date}
           </h4>
           <span className="text-xs text-gray-500 ml-4">
             {entry.timestamp}
           </span>
        </div>
        <p className="text-gray-700 text-sm">{entry.description}</p>
      </div>
    </div>
  );
}