import { SuccessTransferMoneyModal } from "../../../components/nextUi/modals/SuccessTransferMoneyModal";

function WithdrawRequest() {
  return (
    <div>
      <div className="bg-gray-200 flex justify-between w-2/3 my-20 mx-auto rounded-small ">
        <div className='px-5 py-3'>
        <p>UserName: </p>
        <p>Amount: </p>
        <p>Account Number: </p>
        </div>
        <div className='py-16 px-5'>
          <button
            className="rounded-small bg-[#0000ff] text-center text-sm text-white hover:bg-slate-700 ml-2"
            type="button"
          >
            <SuccessTransferMoneyModal />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WithdrawRequest;
