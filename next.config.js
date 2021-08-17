const path = require("path");
const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		disable: process.env.NODE_ENV === "development",
		// dest: 'public',
		register: true,
		sw: "/sw.js",
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
	env: {
		JWT_SECRET: "somesecret",
		SENDGRID_KEY: "",
		CLOUDINARY_URL: "",
		CLOUDINARY_VIDEO_URL: "",
		STRIPE_SECRET_KEY: "",
		STRIPE_PUBLISHABLE_KEY: "",
	},
});
