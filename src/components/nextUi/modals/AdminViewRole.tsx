import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
 
  
  export const ViewRole = ({ roleId, roleInfo} : any) => {

    console.log('THE MODAL OPENED', roleId)

    const [ role , setRole] = useState({});
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(()=> {
      try{
      console.log('id ',roleId);
      console.log('info', roleInfo);
          (async () => {
            const { data }: any = axios.get(`http://localhost:3000/admin/viewRole/${roleId}/${roleInfo}`);

            console.log('The result ', data);
          }
            )();
      }catch(err: any) {
        console.log('ERROR: ', err.message);
      }
    }, []);
    
  
    return (
      <>
        <Button className='bg-white' onPress={onOpen}>  </Button>
        <Modal
          backdrop="opaque"
          size={"5xl"}
          classNames={{
            backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
          }}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
               
                <ModalBody>
                  <main className="profile-page">
                     
                 
                      <div> 
                         <section className="relative block ">
                         <div className="absolute top-0 w-full h-full bg-center bg-cover"
                          style={{backgroundImage: `url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')`}}>
                           <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                         </div>
                         <div className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: 'translateZ(0px)'}}>
                           <svg className="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                             <polygon className="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                           </svg>
                         </div>
                       </section>
                       <section className="relative py-16 bg-blueGray-200">
                         <div className="container mx-auto px-4">
                           <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
                             <div className="px-6">
                               <div className="flex flex-wrap justify-center">
                                 <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                   <div className="">
                                     {/* <img alt="user-profile" className='w-64 h-48 rounded-full object-fill' src={user?.profilePicture} /> */}
                                   </div>
                                 </div>
                           
                           
                                 <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                   <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                     <div className="mr-4 p-3 text-center">
                                       <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">
                                         Total Jobs
                                         </span>
                                     </div>
                                     <div className="mr-4 p-3 text-center">
                                       <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">
                                         Finished
                                         </span>
                                     </div>
                                     <div className="lg:mr-4 p-3 text-center">
                                       <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600"> </span><span className="text-sm text-blueGray-400">
                                         Pay/hour
                                         </span>
                                     </div>
                                   </div>
                                 </div>
                               </div>
                      
                               <div className="text-center mt-12">
                                 <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                                      Name:  
                                 </h3>
                                 <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                                   <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                   Email:  
                                 </div>
                                 <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-thin">
                                   <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                   mobile:   
                                 </div>
                                 <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                   <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                   Location: 
                                 </div>
                                 <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                   <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"> </i>
                                   Male - 27
                                 </div>
                                 <div className="mb-2 text-blueGray-600 mt-10">
                                   <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"> Education </i>University of Computer Science
                                 </div>
                                 <div className="mb-2 text-blueGray-600">
                                   <i className="fas fa-university mr-2 text-lg text-blueGray-400">Domain - </i> Backend Developer
                                 </div>
                                 <div className="mb-2 text-blueGray-600"> 
                                   <i className="fas fa-university mr-2 text-lg text-blueGray-400">Skills -  </i>  
 
                                    
                                 </div>
                               </div>
                               <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                 <div className="flex flex-wrap justify-center">
                                   <div className="w-full lg:w-9/12 px-4">
                                     <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                     
                                     </p>
                                     {/* <a href="#pablo" className="font-normal text-pink-500">Show more</a> */}
                                   </div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         </div>
                         </section>
                 
                     </div>
                       
                     </main>
                </ModalBody>
            
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  