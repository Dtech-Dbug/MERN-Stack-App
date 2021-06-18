import { Skeleton, Card } from "antd";
import React from "react";

const LoadingCardComponent = ({ count }) => {
	const LoadCard = () => {
		const cardArray = [];

		for (let i = 0; i < count; i++) {
			cardArray.push(
				<Card>
					<Skeleton active></Skeleton>
				</Card>
			);
		}
	};

	return <div className="row p-2">{LoadCard()}</div>;
};

export default LoadingCardComponent;
