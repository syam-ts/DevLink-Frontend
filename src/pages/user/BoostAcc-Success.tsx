import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUserInstance } from "../../api/axiosInstance/axiosUserInstance";

export default function Component() {
  const user = useParams();

  let timestamp = Date.now(),
    date = new Date(timestamp);
  const options: any = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleString("en-US", options);

  let refrenecNumber: number = Math.round(Math.random() * 109433000);

  useEffect(() => {
    (async () => {
      const response: any = await apiUserInstance.patch(
        `/profile/boost/success/${user?.userId}`
      );
    })();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
        <CircleCheckIcon className="h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-2xl font-semibold">Payment Successful</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Thank you for your purchase!
        </p>
        <div className="mt-6 border rounded-lg p-4 w-full max-w-md">
          <div className="flex justify-between text-sm">
            <span>Amount Paid:</span>
            <span className="font-medium">400.00₹</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Date & Time:</span>
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Reference Number:</span>
            <span className="font-medium">{refrenecNumber}</span>
          </div>
        </div>
        <Link
          to="/user/profile/profile"
          className="mt-6 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Return to Profile
        </Link>
      </main>
      <footer className="flex items-center justify-center h-14 border-t">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// function MountainIcon(props: any) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   )
// }
