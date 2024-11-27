import { useState } from 'react';
import { IoAddOutline, IoCloseOutline, IoRemoveOutline } from 'react-icons/io5';

const faqs = [
  {
    question: 'What experience do you have in software development?',
    answer:
      'I have hands-on experience in frontend and backend development, cloud infrastructure, and database management, working across diverse industries like fintech, logistics, and gaming.',
  },
  {
    question: 'What makes you stand out as a developer?',
    answer:
      'I combine technical expertise with creative problem-solving and excellent communication skills, ensuring high-quality solutions aligned with team goals and client needs.',
  },
  {
    question: 'How do you approach project deadlines?',
    answer:
      'I prioritize effective time management and clear communication, ensuring tasks are delivered on schedule while maintaining the highest quality standards.',
  },
  {
    question: 'Do you work well in team environments?',
    answer:
      'Absolutely! I thrive in agile team settings, using methodologies like Scrum to enhance collaboration and productivity while fostering a positive work environment.',
  },
  {
    question: 'What technologies are you proficient in?',
    answer:
      'I am skilled in technologies like Next.js, React, Spring Boot, .NET, Tailwind CSS, AWS, and more, with a focus on delivering scalable and efficient solutions.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="w-full h-full px-8 py-12 bg-transparent text-slate-200">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 font-inria animate-fade-in">
        Frequently Asked Questions
      </h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-slate-700 rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-base md:text-lg font-semibold text-slate-200 hover:text-sky-400 font-inria duration-300"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="transition-opacity duration-300 ease-in-out">
                {openIndex === index ? (
                  <IoRemoveOutline size={24} className="opacity-100" />
                ) : (
                  <IoAddOutline size={24} className="opacity-100" />
                )}
              </span>
            </button>
            <div
              className={`transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? 'max-h-screen opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
              style={{
                overflow: 'hidden',
                padding: openIndex === index ? '0 1rem 1rem' : '0 1rem 0',
              }}
            >
              <p className="text-slate-400 mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
