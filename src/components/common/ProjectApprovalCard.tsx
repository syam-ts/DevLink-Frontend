import { Link } from "react-router-dom";
import { ProjectSubmissionViewDrawer } from "../shadcn/drawer/ProjectSubmitView";


export const ProjectApprovalCard = ({ pendingApprovals }: any) => {

 

    return (
        <div>
            {Object.entries(pendingApprovals).map((pendingApproval: any) => (
                <div className="w-2/3 grid gap-2 border-gray-100 shadow-xl rounded-xl h-[200px] border mx-auto my-20 p-4 arsenal-sc-regular">
                    <div> 
                    
                        <ul className='flex gap-20'>
                            <li><p>Title</p>
                                <p>{pendingApproval[1]?.jobPostData?.title}</p>
                            </li>
                            <li><p>Amount</p>
                                <p>{pendingApproval[1]?.jobPostData?.amount}</p>
                            </li>
                            <li><p>Status</p>
                                <p>{pendingApproval[1]?.status || 'status'}</p>
                            </li>
                            <li><p>Created on</p>
                                <p>{pendingApproval[1]?.createdAt}</p>
                            </li>
                             
                        </ul>
                    </div>
                    <div className='text-end'>
                        <button
                            className="rounded-md bg-[#0000ff] px-12 py-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                        > 
                          <Link to='' className='no-underline text-white'>
                          Approve Contract
                          </Link>
                        </button> 
                        <button
                            className="rounded-md bg-[#0000ff] px-12 py-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                        > 
                          <Link to={`/client/contract/view/${pendingApproval[1]?.contractId}`} className='no-underline text-white'>
                          View Contract
                          </Link>
                        </button> 
                        <button
                            className="rounded-md bg-[#0000ff] px-12 py-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                            type="button"
                        > 

                             <ProjectSubmissionViewDrawer title={pendingApproval[1]?.jobPostData?.title} description={pendingApproval[1]?.description} progress={pendingApproval[1]?.progress} attachedFile={pendingApproval[1]?.attachedFile} />
                        </button> 
                      </div> 
                    <div > 
                    </div>
                </div>
            ))}
        </div>
    );
};
