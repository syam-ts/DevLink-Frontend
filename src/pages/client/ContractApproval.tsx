import { ProjectApprovalCard } from '../../components/common/ProjectApprovalCard'
import { apiClientInstance } from '../../api/axiosInstance/axiosClientRequest';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';



function ContractApproval() {

    const clientId: string = useSelector((state: any) => state?.client?.currentClient?._id);


    const [pendingApprovals, setPendingApprovals] = useState({});




    useEffect(() => {
        try {

            (async () => {
                const { data } = await apiClientInstance.get(`/contracts/submissions/${clientId}`);

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