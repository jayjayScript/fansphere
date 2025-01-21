import { PulseLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000cc] z-50">
      <PulseLoader color="#FFFFFF" size={15} />
    </div>
  );
};

export default Loader;