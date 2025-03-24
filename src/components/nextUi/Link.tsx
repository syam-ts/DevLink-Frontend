import {Link} from "@heroui/react";
 
interface LinkComponentProps { 
    text: string 
}

 const LinkComponent: React.FC<LinkComponentProps> = (props) => {
  return (
    <div className=" gap-4"> 
      <Link isExternal showAnchorIcon className='text-[#0000ff]'> 
        {props.text}
      </Link>
    </div>
  );
};

export default LinkComponent;
