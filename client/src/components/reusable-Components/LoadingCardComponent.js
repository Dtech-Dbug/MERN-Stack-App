import { Skeleton, Card } from "antd";
import React from "react";

const LoadingCardComponent = ({ count }) => {
	const LoadCard = () => {
		const cardArray = [];

		for (let i = 0; i < count; i++) {
			cardArray.push(
				<Card className="col-md-4 m-2">
					<Skeleton active></Skeleton>
				</Card>
			);
		}
		return cardArray;
	};

	return <div className="row pb-5">{LoadCard()}</div>;
};

export default LoadingCardComponent;
