import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { apiUserInstance } from "../../../api/axiosInstance/axiosUserInstance";

export default function App() {
  const boostAccount = async () => {
    try {
      const { data } = await apiUserInstance.post(`/boostProfile`);
      window.location.href = `${data.url?.url}`;
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("ERROR: ", err.message);
    }
  };

  const content = (
    <PopoverContent className="w-[440px] ">
      {(titleProps) => (
        <div className="px-1 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Boost Account
          </p>
          <div className="mt-2 flex flex-col gap-2 w-full">
            <p className="font-mono text-lg">Price: 400 ₹</p>
            <hr />
            <p className="text-lg">
              <span className=""> ○ </span>
              you are agrreing on muliple terms by doing the payment. You cannot
              redo the payment process and your account will be boosted as long
              as you use it
            </p>
            <div className="text-end">
              <button
                onClick={boostAccount}
                className="rounded-small bg-sky-500 w-44 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                type="button"
              >
                Proceed payment
              </button>
            </div>
          </div>
        </div>
      )}
    </PopoverContent>
  );

  return (
    <div className=" ">
      <Popover showArrow backdrop={"blur"} offset={10} placement="bottom">
        <PopoverTrigger>
          <Button
            className="capitalize  bg-transparent"
            color="warning"
            variant="flat"
          >
            <span className="text-white bg-gray-800 font-extrabold border border-black py-1.5 px-3 rounded-small">
              Boost
            </span>
          </Button>
        </PopoverTrigger>
        {content}
      </Popover>
    </div>
  );
}
