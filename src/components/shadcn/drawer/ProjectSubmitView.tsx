import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "../../../components/shadcn/ui/drawer";
import { Progress } from "../../../components/ui/progress";
import React, { useEffect, useState } from "react";

interface ProjectSubmissionViewDrawerProps {
  title: string;
  description: string;
  progress: number | null;
  attachedFile: string;
}

export const ProjectSubmissionViewDrawer: React.FC<
  ProjectSubmissionViewDrawerProps
> = ({ title, description, progress, attachedFile }) => {
  const [progressPercent, setProgressPercent] = useState<number>(13);
  console.log('progressPercent: ', progressPercent);

  useEffect(() => {
    const timer = setTimeout(() => setProgressPercent(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Drawer>
      <DrawerTrigger className='bg-gray-600 text-white px-4 rounded-full'>View Request</DrawerTrigger>
      <DrawerContent className='bg-white arsenal-sc-regular'>
        <DrawerHeader className="w-1/2 mx-auto arseanl-sc-regular h-96 lg:p-20 max-sm:w-p-1">
          <div className="grid ">
            <span className="text-xl arseanl-sc-regular line-clamp-1"> Job TItle : {title} </span>
            <span className="arseanl-sc-regular text-md line-clamp-2">
              Submission Description : {description}
            </span>
            <span className="mx-auto text-md">Total Progress: {progress}%</span>
            <Progress value={progress} className={`w-[${progress}]`} />
            <span className="mx-auto gap-3 flex">
              Attahed file:
              <Link to={attachedFile}>{attachedFile}</Link>
            </span>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
