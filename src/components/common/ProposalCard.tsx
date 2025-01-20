
import { Link } from 'react-router-dom';
import apiInstance from '../../api/axiosInstance'
import { ProfileUser } from '../../pages/user/ProfileUserTest';


export const ProposalCard = ({ proposals, clientId }: any) => {

    const acceptProposal = async (userId: string, jobPostId: string) => {
        try {
            const body = {
                userId: userId,
                clientId: clientId,
                jobPostId: jobPostId
            }
            const { data } = await apiInstance.axiosInstanceClient.post('http://localhost:3000/client/job/createContract', body);
        } catch (err: any) {
            console.error('ERROR: ', err.message);
        }
    };



    return (
        <div>
            {
                Object.entries(proposals).map((proposal: any) => (
                    <div className='w-2/3 border border-gray-100 shadow-xl rounded-xl h-full mx-auto my-12 p-3'>
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

                        <div className='flex justify-end pr-12 gap-5'>
                            <div>
                                <button className="rounded-md border border-slate-300 py-2 px-12 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600  hover:bg-gray-300 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                                    <Link to={`/client/userProfile/view/${proposal[1]?.userId}/client-proposal-view`} className='no-underline text-black '>
                                        View
                                    </Link>
                                  
                                </button>
                            </div>
                            <div>
                                <button onClick={() => acceptProposal(proposal[1]?.userId, proposal[1]?.jobPostId)} className="rounded-md bg-slate-800 py-2 px-12 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


