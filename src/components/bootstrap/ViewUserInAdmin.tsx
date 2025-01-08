 

import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ViewUserInAdmin({roleId, roleInfo}: any) {

  const [user, setUser]: any = useState({})
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

 
  useEffect(() => {
    (async()=> {
      const response = await axios.get(`http://localhost:3000/admin/viewRole/${roleId}/${roleInfo}`)
      console.log('THE USER ', response.data?.data?.roleInformation)
      setUser(response.data?.data?.roleInformation)
    })();
  }, [])


  return (
    <>
      
      <button onClick={() => setLgShow(true)}>
      <img className='h-5 w-5 cursor-pointer' src='https://cdn-icons-png.flaticon.com/128/159/159604.png' />
      </button>
    
      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        centered
        aria-labelledby="example-modal-sizes-title-lg"
        style={{ height: '90vh' }}
      >
        {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Large Modal
          </Modal.Title>
        </Modal.Header> */}
        <Modal.Body 
          style={{ height: '600px', overflowY: 'auto' }}
        > 
                
                <div className=" flex max-w-full flex-col items-center rounded-xl  px-4 py-4 text-center  ">
                <div className="mb-4 md:mr-6 md:mb-0">
                    <img className="h-56 rounded-lg object-cover md:w-56" src={user?.profilePicture} alt="" />
                </div>
                <div className="">
                    <p className="text-xl font-medium text-gray-700">{user?.name}</p>
                    <p className="mb-4 text-sm font-medium text-gray-500">{user?.description}</p> 
                    <div className="flex space-x-2 mx-44">
                    <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                        <p className="text-sm font-medium text-gray-500">Age</p>
                        <p className="text-3xl font-medium text-gray-600">{user?.age}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                        <p className="text-sm font-medium text-gray-500">Papers</p>
                        <p className="text-3xl font-medium text-gray-600">7</p>
                    </div>
                    <div className="flex flex-col items-center rounded-xl bg-gray-100 px-4 py-2">
                        <p className="text-sm font-medium text-gray-500">Rating</p>
                        <p className="text-3xl font-medium text-gray-600">4.5*</p>
                    </div>
                
                    </div>
                    <div className="mb-3"></div>
                    <div className="flex space-x-2">
                    <button className="w-full rounded-lg border-black border bg-white px-4 py-2 font-medium text-gray-500"> Close </button>
                    <button className="w-full rounded-lg border-2 border-transparent bg-blue-600 px-4 py-2 font-medium text-white"> Message </button>
                    </div>
                </div>
              </div>

             
    
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewUserInAdmin;