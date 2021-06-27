import StarRating from "react-star-ratings";

const showAverageRating = (p) => {
	if (p && p.ratings) {
		let ratingsArray = p && p.ratings;
		let total = [];
		let length = ratingsArray.length;

		ratingsArray.map((r) => total.push(r.star));

		//calculate avg using reduce method
		//reduce working : [1 , 3 , 4 , 5]
		//{((1+3) + 4 ) +5}
		let totalReduced = total.reduce((p, n) => p + n, 0);

		let averageRating = totalReduced / length;
		// this is the calucated average
		return (
			<div className="text-center pt-1 pb-3">
				<span>
					<StarRating
						starDimension="20px"
						starSpacing="2px"
						starRatedColor="yellow"
						rating={averageRating}
						editing={false}
					/>{" "}
					({p.ratings.length})
				</span>
			</div>
		);
	}
};
