
import { Accordion } from "./Accordion";

export const Faq = () => {
    const faqs = [
        {
          "id": 1,
          "question": "Why should I use CodeBook?",
          "answer": "CodeBook is a valuable tool for securely storing and organizing sensitive information like passwords, personal notes, or code snippets. It offers strong AES encryption, cross-platform support, and customizable data fields. Whether you're managing login credentials or maintaining a personal coding knowledge base, CodeBook helps keep your information safe, accessible, and well-organized—all in one place."
        },
        {
          "id": 2,
          "question": "Can I access my eBook on mobile?",
          "answer": "Yes, you can access your eBook on a mobile device using apps like Kindle, Google Play Books, or Apple Books. Just download the eBook in a compatible format (such as PDF or EPUB) and open it with your preferred reading app. Many platforms also allow cloud syncing, so you can read across multiple devices seamlessly."
        },
        {
          "id": 3,
          "question": "Do you offer refunds?",
          "answer": "Yes, we offer refunds in accordance with our return policy. If you're not satisfied with your purchase, you can request a refund within the specified return period. Please ensure the item is unused and in its original condition. For more details, check our Refund & Returns section in the app."
        },
        {
          "id": 4,
          "question": "Do you support Internation payments?",
          "answer": "Yes, we support international payments. You can shop from anywhere using globally accepted payment methods like credit/debit cards, PayPal, and more. Currency conversion is handled automatically at checkout."
        }
    ];
    
  return (
    <section className="my-10 p-7 border rounded dark:border-slate-700 shadow-sm px-[50px]">        
      <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-3 underline underline-offset-8">Question in mind?</h1>    
            <div className="" id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
              { faqs.map((faq) => (
                <Accordion key={faq.id} faq={faq} /> 
              )) }
            </div>
      </section>
)
}
