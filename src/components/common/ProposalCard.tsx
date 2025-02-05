
import { Link } from 'react-router-dom';
import apiInstance from '../../api/axiosInstance'
import { ProfileUser } from '../../pages/user/ProfileUser';
import { toast } from 'sonner';


export const ProposalCard = ({ proposals, roleType, roleId }: any) => {


    const acceptProposal = async (userId: string, clientId: string, jobPostId: string, bidAmount: number, bidDeadline: number) => {
        try {
            const body = {
                userId: userId,
                clientId: clientId,
                jobPostId: jobPostId,
                bidAmount: bidAmount,
                bidDeadline: bidDeadline
            }
            const { data } = await apiInstance.post('http://localhost:3000/client/job/createContract', body);

            console.log('THE REPOSNSE : ', data)
        } catch (err: any) {
            console.error('ERROR: ', err.message);
        }
    };

    const rejectProposal = async (userId: string, clientId: string, jobPostId: string) => {
        try {

            const body = {
                userId: userId,
                clientId: roleId,
                jobPostId: jobPostId
            }
            const { data } = await apiInstance.put('http://localhost:3000/client/job/proposal/reject', body);


            if (data.success) {
                toast.success("Proposal Rejected", {
                    style: {
                        backgroundColor: "green",
                        color: "white"
                    }
                })
                setTimeout(() => {
                    window.location.href = 'http://localhost:5173/client/jobs/proposals'
                }, 500);
            } else {
                toast.error(data.message, {
                    style: {
                        backgroundColor: "red",
                        color: "white"
                    }
                })
            }
        } catch (err: any) {
            console.error('ERROR: ', err.message);
        }
    };




    return (
        <div>
            {
                Object.entries(proposals).map((proposal: any) => (



                    <div className='w-2/3 border border-gray-100 shadow-xl rounded-xl h-full mx-auto my-12 p-3'>


                        {
                            proposal[1]?.status === 'pending' && (
                                <div>
                                <div className='h-16 w-16 '>
                                    <img className='w-12 h-12 rounded-full object-cover' src={proposal[1]?.userData?.profilePicture} alt='user-profile' />
                                </div>
                                <div className='grid gap-2 px-3'>
                                    <div>
                                        <span className='font-semibold text-lg'>Job Title:  {' _'}  {proposal[1]?.jobPostInfo}</span>
                                        <p className='text-sm'> {proposal[1]?.description} </p>
                                    </div>
                                    <div className='flex gap-5'>
                                        <span className='font-semibold text-xs'>Proposal Amount: {' _'} {proposal[1]?.bidAmount}.00₹/hr</span>
                                        <span className='font-semibold text-xs'>Propposal DeadLine: {' _'} {proposal[1]?.bidDeadline}hrs</span>
                                    </div>
                                    <div>
                                        <span className='font-semibold text-xs'>Propposal Description: {' _'} {proposal[1]?.description}hrs</span>
                                    </div>
                                </div>

                                <div className='flex justify-end pr-12 gap-3'>
                                    <div>
                                        <button className="rounded-full border bg-black text-white  border-slate-300  py-2 px-12 text-center text-sm transition-all shadow-sm" type="button">
                                            <Link to={`/${roleType}/userProfile/view/${proposal[1]?.userId}/client-proposal-view`} className='no-underline text-white font-bold ' >
                                                View
                                            </Link>

                                        </button>
                                    </div>
                                    {
                                        roleType === 'client' && (
                                            <div className='flex gap-3'>
                                                <div>
                                                    <button onClick={() => rejectProposal(proposal[1]?.userId, proposal[1]?.clientId, proposal[1]?.jobPostId)} className="rounded-full bg-[#fd2b2b] py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md font-bold hover:bg-slate-700" type="button">
                                                        Reject
                                                    </button>
                                                </div>
                                                <div>
                                                    <button onClick={() => acceptProposal(proposal[1]?.userId, proposal[1]?.clientId, proposal[1]?.jobPostId, proposal[1]?.bidAmount, proposal[1]?.bidDeadline)} className="rounded-full bg-[#0000ff] py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md font-bold hover:bg-slate-700" type="button">
                                                        Accept
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            )
                            
                        }

                    </div>
                ))
            }
        </div>
    )
}


