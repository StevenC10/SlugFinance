import React from "react";
import Logo from "../images/test2.png"
import Background from "../images/backg.jpg"

const Signup = () => {
  return (
    <div>
      <div class="flex items-center min-h-screen bg-gray-800">
        <div class="container mx-auto">
            <div class="max-w-md my-0 mx-0">
              <img class="absolute top-0 right-0 flex h-screen" src={Background} alt="back"></img>
              <section class="hero container mx-auto pb-0 flex justify-center">
                <img src={Logo} class="w-1/4" alt="logo" />
              </section>
                <div class="text-center">
                    <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Slug Finance</h1>
                    <p class="text-gray-500 dark:text-gray-400">Create your Slug Finance account</p>
                </div>
                <div class="m-7">
                    <form action="">
                        <div class="mb-6">
                            <label for="name" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Name</label>
                            <input type="text" name="name" id="name" placeholder="John Smith" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="user@ucsc.edu" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                              <label for="password" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••••" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                              <label for="cpassword" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirm Password</label>
                            <input type="cpassword" name="cpassword" id="cpassword" placeholder="••••••••••" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="flex justify-end">
                          <button type="button" className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 px-8 py-3 space-x-2 font-semibold rounded text-white">Sign up</button>
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