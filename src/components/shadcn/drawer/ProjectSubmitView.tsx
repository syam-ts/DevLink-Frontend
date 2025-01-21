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

import { Button } from "../../../components/shadcn/ui/button"


export const ProjectSubmissionViewDrawer = () => {

    return (
        <Drawer>
            <DrawerTrigger>Open</DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className='w-1/3 mx-auto arsenal-sc-regular h-96 p-12 bg-gray-50 rounded-lg'>
                    <span> TItle</span>
                    <span>We are looking for an experienced Full-Stack Developer to build an app (ios/android) for buying, selling, and trading cards. The platform should include features similar to a financial order book with real-time price tracking and matching for buyers and sellers.

                        The MVP should also have:

                        User Registration & Profiles: Users can create accounts, manage profiles, and track their transactions.</span>
                <span className='mx-auto'>Progress</span>
               <span className='mx-auto'>Attahed file</span>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>

    )
}