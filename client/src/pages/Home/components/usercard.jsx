import React from "react";
import Button from "antd/es/button";

const UserCard = ({user}) => {
	return (
		<div className="bg-opacity-50 bg-[#6b65c2] w-[400px] shadow-md rounded-lg p-6">
			<h2 className="text-white font-clash-grotesk text-xl font-bold mb-2">
				{user[0]} {user[1]} 
			</h2>
			<p className="text-white font-clash-grotesk mb-4">
				Wallet Address: 0xC9F58a37fEa347683edBdD55d4Ca9CC51797fd84
			</p>
			<img
				src={user[3]}
				alt="User Profile"
				className="w-24 h-24 rounded-full mx-auto mb-4"
			/>
			<div className="flex justify-center">
				<Button
					type="primary"
					className="bg-white text-blue-500 font-clash-grotesk font-bold py-2 px-4 rounded"
				>
					Add to Contacts
				</Button>
			</div>
		</div>
	);
};

export default UserCard;