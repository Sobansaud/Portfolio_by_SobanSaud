 'use client';

import React from 'react';

export default function BackgroundAnimation() {
	return (
		<div className="fixed inset-0 -z-10 overflow-hidden">
			{/* Large-screen video: hidden on small devices for performance and readability */}
			<video
				autoPlay
				loop
				muted
				playsInline
				className="absolute w-full h-full object-cover hide-on-mobile"
			>
				<source src="/video123.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>

			{/* Optional subtle overlay for readability; leave transparent so site background shows */}
			<div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
		</div>
	);
}



