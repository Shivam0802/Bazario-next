import toast from 'react-hot-toast'

export const toastError = (error: Error | string | any) => {
   console.error(error);
   console.log('toastError called with:', error);

   if (typeof error?.response?.data?.message === 'string') {
       toast.error(error.response.data.message);
   } else if (typeof error?.message === 'string') {
       toast.error(error.message);
   } else if (typeof error === 'string') {
       toast.error(error);
   } else {
       toast.error('ERROR');
   }
};

export const toastSuccess = (message: string) => {
   console.log('toastSuccess called with:', message);
   toast.success(message);
};

