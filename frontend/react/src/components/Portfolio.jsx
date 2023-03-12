import React from "react";
import {useNavigate} from 'react-router-dom';

const Portfolio = () => {

	const history = useNavigate();

	const redirect = (event) => {
		history('/individual');
	};

  return (
	<div>
	<h2 className="m-4 text-2xl font-semibold leading-tight">Watchlist</h2>
    <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
  	<table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-100">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Ticker</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Change (Daily)</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Change % (Daily)</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Last Price</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900"></th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
      <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="text-sm">
            <div class="font-medium text-gray-700">AAPL</div>
            <div class="text-gray-400">Apple Inc.</div>
          </div>
        </th>
        <td class="px-6 py-4 text-red-700 font-medium">-2.28</td>
        <td class="px-6 py-4 text-red-700 font-medium">-1.49%</td>
        <td class="px-6 py-4 font-medium">150.59</td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
          </div>
        </td>
      </tr>
	  <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="text-sm">
            <div class="font-medium text-gray-700">AAPL</div>
            <div class="text-gray-400">Apple Inc.</div>
          </div>
        </th>
        <td class="px-6 py-4">-2.28</td>
        <td class="px-6 py-4">-1.49%</td>
        <td class="px-6 py-4">150.59</td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
          </div>
        </td>
      </tr>
	  <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div class="text-sm">
            <div class="font-medium text-gray-700">AAPL</div>
            <div class="text-gray-400">Apple Inc.</div>
          </div>
        </th>
        <td class="px-6 py-4">-2.28</td>
        <td class="px-6 py-4">-1.49%</td>
        <td class="px-6 py-4">150.59</td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
  )
};
  
export default Portfolio;
