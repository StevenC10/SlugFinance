import React from "react";
import Logo from "../images/test2.png"
import Background from "../images/backg.jpg"
import {useNavigate} from 'react-router-dom';

const Signup = () => {
  // CSE186 Login Component
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:5000/v0/create', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        alert('Success!');
        localStorage.setItem('user', JSON.stringify(json));
        history('/');
      })
      .catch((err) => {
        alert(`Error creating account: (${err}), please try again`);
      });
  };

  return (
    <div>
      <div className="flex items-center min-h-screen bg-gray-800">
        <img className="invisible 2xl:visible absolute top-0 right-0 flex h-screen" src={Background} alt="back"></img>
          <div className="hero container my-auto pb-0 mx-auto flex justify-center 2xl:justify-start">
            <div className="max-w-md mx-0">
              <a rel="noopener noreferrer" href="/" aria-label="Back to homepage">
                <section className="hero container mx-auto pb-0 flex justify-center">
                  <img src={Logo} className="w-1/4" alt="logo" />
                </section>
              </a>
                <div className="text-center">
                    <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Slug Finance</h1>
                    <p className="text-gray-500 dark:text-gray-400">Create your Slug Finance account</p>
                </div>
                <div className="m-7">
                    <form action="">
                        <div className="mb-6">
                            <label htmlFor="name" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Name</label>
                            <input type="text" name="name" id="name" placeholder="John Smith" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="user@ucsc.edu" onChange={handleInputChange} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                            <input type="password" name="password" aria-label="password" id="password" placeholder="••••••••••" onChange={handleInputChange} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="cpassword" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirm Password</label>
                            <input type="password" name="cpassword" aria-label="cpassword" id="cpassword" placeholder="••••••••••" className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="flex justify-between">
                          <div className="text-sm text-gray-400">Already signed up?
                            <a href="/login" className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"> Log in!</a>
                          </div>
                          <button type="button" onClick={handleSubmit} className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 px-8 py-3 space-x-2 font-semibold rounded text-white">Sign up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  );
};
  
export default Signup;