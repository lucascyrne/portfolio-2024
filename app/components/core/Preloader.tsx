const Preloader = () => {
  return (
    <div className='fixed z-50 inset-0 flex items-center justify-center bg-background z-50'>
      <div className='spinner border-4 border-t-primary border-secondary rounded-full w-16 h-16 animate-spin'></div>
    </div>
  );
};
export default Preloader;
