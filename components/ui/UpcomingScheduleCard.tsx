import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { UpcomingScheduleCardProps } from '../../types';

const formatTime = (isoTime: string) => {
  const date = new Date(isoTime);
  return date.toLocaleString('en-EG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const UpcomingScheduleCard = ({ title, course, time }: UpcomingScheduleCardProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-background">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
            <FiCalendar className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-text">{title}</p>
            <p className="text-xs text-text-secondary">{course}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default UpcomingScheduleCard;
