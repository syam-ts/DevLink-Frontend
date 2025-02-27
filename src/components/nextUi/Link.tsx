import {Link} from "@heroui/react";
 

export default function App(props: any) {
  return (
    <div className=" gap-4"> 
      <Link isExternal showAnchorIcon className='text-[#0000ff]'> 
        {props.text}
      </Link>
    </div>
  );
}
