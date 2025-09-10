import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function ContactForm({ header, web3AccessKey }) {
  useEffect(() => {
    import("react-toastify/dist/ReactToastify.css");
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formParams = new URLSearchParams();
    for (const key in formData) {
      formParams.append(key, formData[key]);
    }
    formParams.append("access_key", web3AccessKey);
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formParams,
        mode: "no-cors",
      });
      toast.success("Form Submitted Succesfully");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} method='post'>
      <ToastContainer />
      <div className='flex flex-col gap-6'>
        <h5 className='text-xxl font-bold text-black'>{header}</h5>
        <div>
          <label
            htmlFor='name'
            className='mb-[10px] block text-left font-semibold'>
            Your name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter your full name'
            className='w-full rounded-[50px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorLime'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='mb-[10px] block text-left font-semibold'>
            Email address
          </label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter your email address'
            className='w-full rounded-[50px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorLime'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor='message'
            className='mb-[10px] block text-left font-semibold'>
            Write your message
          </label>
          <textarea
            name='message'
            id='message'
            placeholder='Write us your question here...'
            className='min-h-[130px] w-full rounded-[30px] border border-ColorBlack/50 px-[30px] py-[15px] outline-none transition-all duration-300 placeholder:text-ColorBlack/50 focus:border-ColorLime'
            value={formData.message}
            onChange={handleChange}
            required></textarea>
        </div>
      </div>
      <button
        type='submit'
        className={`mt-5 btn is-lime is-large btn-animation group inline-block rounded-[3px]`}>
        <span>Submit Message</span>
      </button>
    </form>
  );
}

export default ContactForm;
