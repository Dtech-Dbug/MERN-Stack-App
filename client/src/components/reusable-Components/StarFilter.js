import React from "react";
import StarRating from "react-star-ratings";

const StarFilter = ({ starClick, numberOfStars }) => (
	<>
		<StarRating
			changeRating={() => starClick(numberOfStars)}
			numberOfStars={numberOfStars}
			starDimension="20px"
			starSpacing="2px"
			starHoverColor="red"
			starEmptyColor="yellow"
		/>
		<br />
	</>
);

export default StarFilter;
