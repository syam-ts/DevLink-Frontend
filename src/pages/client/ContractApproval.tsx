import { ProjectApprovalCard } from '../../components/common/ProjectApprovalCard'
import { apiClientInstance } from '../../api/axiosInstance/axiosClientRequest';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ClientState } from '../../config/state/allState'



function ContractApproval() {

    const [pendingApprovals, setPendingApprovals] = useState({}); 
    const clientId: string = useSelector((state: ClientState) => state?.client?.currentClient?._id); 

    useEffect(() => {
        try {

            (async () => {
                const { data } = await apiClientInstance.get(`/contractsSubmissions`);

                console.log('RESPONSE FROM APPROVAL :', data?.data)
                setPendingApprovals(data?.data)
            })();
        } catch (err: any) {
            console.error('ERROR: ', err.message);
        }

    }, []);


    return (
        <div>
            <div className='text-center mt-20'>
                <span className='text-xl arsenal-sc-regular '>Pending Approvals</span>
            </div>
            <ProjectApprovalCard pendingApprovals={pendingApprovals} />
        </div>
    )
}

export default ContractApproval