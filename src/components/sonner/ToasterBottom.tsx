import { Toaster, toast } from 'sonner';


export const Sonner = () => {
  return (
    <div>
      <Toaster position="bottom-right" richColors   />
      <button className='hidden' onClick={() => toast.error('M')}></button>
    </div>
  );
}