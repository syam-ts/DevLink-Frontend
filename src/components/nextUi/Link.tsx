import {Link} from "@heroui/react";
 
interface Props { 
    text: string 
}

export const App: React.FC<Props> = (props) => {
  return (
    <div className=" gap-4"> 
      <Link isExternal showAnchorIcon className='text-[#0000ff]'> 
        {props.text}
      </Link>
    </div>
  );
}
