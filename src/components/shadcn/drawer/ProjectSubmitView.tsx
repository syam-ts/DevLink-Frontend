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

  useEffect(() => {
    const timer: number = setTimeout(() => setProgressPercent(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Drawer>
      <DrawerTrigger>View Request</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="w-1/2 mx-auto nunito-regular h-96 p-20 ">
          <div className="grid ">
            <span className="text-xl nunito-bold "> Job TItle : {title} </span>
            <span className="nunito-regular text-md">
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
