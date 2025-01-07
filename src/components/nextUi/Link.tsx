import {Link} from "@nextui-org/react";
 

export default function App(props: any) {
  return (
    <div className=" gap-4"> 
      <Link isExternal showAnchorIcon> 
        {props.text}
      </Link>
    </div>
  );
}
