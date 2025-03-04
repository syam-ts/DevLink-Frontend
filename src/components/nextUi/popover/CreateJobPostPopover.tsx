import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

export const CreatePostPopover = () => {
    return (
        <Popover placement="top">
            <PopoverTrigger>
                <Button className='py-1 px-3 font-bold bg-gray-300 text-white'>
                    <img className='w-7 h-7 justify-center absolute'
                     src='https://cdn-icons-png.flaticon.com/128/1828/1828471.png'
                      />
                     Create Job Post 
                     </Button>
                
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2 arsenal-sc-regular">
                    <div className="text-small font-bold text-center">Locked</div> 
                    <div className="text-xs">You need to Login to access this feature</div>

                </div>
            </PopoverContent>
        </Popover>
    );
}
