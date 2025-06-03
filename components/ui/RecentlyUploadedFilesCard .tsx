import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { RecentlyUploadedFilesCardProps } from '../../types';


const RecentlyUploadedFilesCard = ({ fileName , course , date , fileUrl } : RecentlyUploadedFilesCardProps) => {
  return (
    <div className="space-y-4">
      <a href={fileUrl} download>
          <div
          className="flex flex-col gap-5 items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-background md:flex-row"
        >
          <div className="flex flex-col items-center gap-3 md:flex-row">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/10 text-primary">
              <FiFileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium text-text">{fileName}</p>
              <p className="text-xs text-text-secondary">{course}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary">{date}</span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default RecentlyUploadedFilesCard;
