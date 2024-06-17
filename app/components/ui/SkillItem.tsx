import Image from 'next/image';

type SkillItemProps = {
  title: string;
  desc: string;
  image: string;
};

const SkillItem: React.FC<SkillItemProps> = ({ title, desc, image }) => {
  return (
    <li className='group flex flex-col items-center justify-center px-3 gap-4 w-full max-w-60 h-48 border border-gray-800 rounded-lg shadow-md hover:shadow-xl bg-white hover:bg-primary hover:text-white transition-colors'>
      <div className='border-2 border-gray-900 rounded-full p-2 group-hover:bg-white'>
        <Image
          src={image}
          alt={title}
          width={10}
          height={10}
          className='w-10 h-10'
        />
      </div>

      <div className='flex flex-col gap-2 text-sm text-center'>
        <h4 className='text-sm font-semibold text-shadow'>{title}</h4>
        <p>{desc}</p>
      </div>
    </li>
  );
};

export default SkillItem;
