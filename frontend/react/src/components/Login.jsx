import React from "react";
import Logo from "../images/test2.png"
import Background from "../images/backg.jpg"

const Login = () => {
  return (
    <div class="flex items-center min-h-screen bg-gray-800">
        <div class="container mx-auto">
            <div class="max-w-md my-0 mx-0">
              <img class="absolute top-0 right-0 flex h-screen" src={Background} alt="back"></img>
              <section class="hero container mx-auto pb-0 flex justify-center">
                <img src={Logo} class="w-1/4" alt="logo" />
              </section>
                <div class="text-center">
                    <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Slug Finance</h1>
                    <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
                </div>
                <div class="m-7">
                    <form action="">
                        <div class="mb-6">
                            <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                            <input type="email" name="email" id="email" placeholder="user@ucsc.edu" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div class="mb-6">
                            <div class="flex justify-between mb-2">
                                <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                <a href="#!" class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                            </div>
                            <input type="password" name="password" id="password" placeholder="••••••••••" class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500" />
                        </div>
                        <div className="flex justify-between">
                          <div className="form-check">
                            <input type="checkbox" name="remember" id="remember" aria-label="Remember me" className="mr-1 rounded-sm focus:ring-violet-400 focus:dark:border-violet-400 focus:outline-none accent-violet-400" />
                            <label for="remember" className="form-check-label inline-block text-gray-400">Remember me</label>
                          </div>
                          <button type="button" className="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 px-8 py-3 space-x-2 font-semibold rounded text-white">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
};
  
export default Login;