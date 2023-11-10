import autoprefixer from 'autoprefixer';
// import postcssPresetEnv from 'postcss-preset-env';

const config = {
	plugins: [
		// postcssPresetEnv({
		// 	features: { 'nested-rules': true }
		// }),
		autoprefixer()
	]
};

export default config;
