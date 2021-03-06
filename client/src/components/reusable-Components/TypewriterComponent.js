import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = ({ text }) => (
	<Typewriter
		options={{
			strings: text,
			loop: true,
			autoStart: true,
		}}
	/>
);
export default TypewriterComponent;
