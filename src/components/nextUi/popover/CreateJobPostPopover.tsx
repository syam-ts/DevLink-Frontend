import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";

export const CreatePostPopover = () => {
    return (
        <Popover placement="top">
            <PopoverTrigger>
                <Button className='font-bold px-20 bg-gray-300 text-white'>
                    <img className='w-7 h-7 justify-center absolute'
                     src='https://cdn-icons-png.flaticon.com/128/9370/9370116.png'
                      /> 
                     </Button>
                
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2 arsenal-sc-regular">
                    <div className="text-small font-bold text-center">Locked</div> 
                    <div className="text-xs">You need to Verify to access this feature</div>

                </div>
            </PopoverContent>
        </Popover>
    );
}
