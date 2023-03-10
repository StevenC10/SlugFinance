import React from "react";

const Portfolio = () => {

  return (
    <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
        <h2 className="mb-4 text-2xl font-semibold leading-tight">Watchlist</h2>
        <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col className="w-24" />
                </colgroup>
                <thead className="dark:bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Symbol</th>
					<th className="p-3">Name</th>
					<th className="p-3">Change </th>
					<th className="p-3">Change %</th>
					<th className="p-3">Last Price</th>
				</tr>
			</thead>
			<tbody>
				<tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
					<td className="p-3">
						<p>MSFT</p>
					</td>
					<td className="p-3">
						<p>Microsoft Corporation</p>
					</td>
					<td className="p-3">
						<p>0.12</p>
					</td>
					<td className="p-3">
						<p>-0.03%</p>
					</td>
					<td className="p-3">
						<p>100.20</p>
					</td>
				</tr>
			</tbody>
            </table>
	    </div>
    </div>
  )
};
  
export default Portfolio;
