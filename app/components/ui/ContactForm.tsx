import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário, por exemplo, usando fetch ou axios
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Nome
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700'
        >
          Email
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='subject'
          className='block text-sm font-medium text-gray-700'
        >
          Assunto
        </label>
        <input
          type='text'
          id='subject'
          name='subject'
          value={formData.subject}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='message'
          className='block text-sm font-medium text-gray-700'
        >
          Mensagem
        </label>
        <textarea
          id='message'
          name='message'
          value={formData.message}
          onChange={handleChange}
          required
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
        />
      </div>
      <div>
        <button
          type='submit'
          className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Enviar
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
