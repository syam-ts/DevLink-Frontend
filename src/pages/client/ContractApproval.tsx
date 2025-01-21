import { ProjectApprovalCard } from '../../components/common/ProjectApprovalCard'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function ContractApproval() {

    const clientId = useSelector(
        (state: any) => state?.client?.currentClient?._id
      );

      
      const [pendingApprovals, setPendingApprovals] = useState({}); 




   useEffect(() => {
    try{

        (async() => {
            const { data } = await axios.get(`http://localhost:3000/client/contracts/submissions/${clientId}`);

            console.log('RESPONSE FROM APPROVAL :', data?.data)
            setPendingApprovals(data?.data)
        })();
    }catch(err: any) {
        console.error('ERROR: ',err.message);
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