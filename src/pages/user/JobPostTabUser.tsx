import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import JobRender from '../../pages/client/AllJobs';
import { useSelector } from "react-redux";


export default function ClientJobTabs() {
 
    const clientId = useSelector((state: any) => state?.client?.currentClient?._id);

  
  let tabs = [
    {
      id: "my-jobs",
      label: "My Jobs",
      content:
      <JobRender clientId={clientId} type='my-jobs' />
     },
    {
      id: "progressing-jobs",
      label: "Progressing Jobs",
      content:
        <JobRender clientId={clientId} type='progressing-jobs' />
    },
  ];

 
  return (
    <div className="flex w-full flex-col my-44">
      <Tabs className='bg-white mx-auto ' aria-label="Dynamic tabs" items={tabs}>
        {(item) => ( 
          <Tab className='comfortaa-regular text-xl ' key={item.id} title={item.label}>
            <Card>
              <CardBody>{item.content}</CardBody>
            </Card>
          </Tab> 
        )}
      </Tabs>
    </div>
  );
}
