import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../../components/shadcn/ui/drawer"
 

import { Progress } from "../../../components/ui/progress"
import React from "react";



export const ProjectSubmissionViewDrawer = ({title, description, progress, attachedFile,}: any) => {

    const [progressPercernt, setProgressPercent]: any = React.useState(13);

    
  React.useEffect(() => {
    const timer = setTimeout(() => setProgressPercent(66), 500)
    return () => clearTimeout(timer)
  }, [])

    return (
        <Drawer>
            <DrawerTrigger>View Request</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className='w-1/2 mx-auto nunito-regular h-96 p-20 '>
                  <div className='grid '>
                  <span className='text-xl nunito-bold '> Job TItle : {title} </span>
                    <span className='nunito-regular text-md'>
                        Submission Description : {description}
                    </span>
                <span className='mx-auto text-md'>Total Progress: {progress}%</span>
               <Progress value={progress} className={`w-[${progress}]`} />
               <span className='mx-auto'>Attahed file: {attachedFile}</span>
                  </div>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>

    )
}