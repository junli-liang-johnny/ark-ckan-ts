export default {
	"verbose": true,
	"moduleNameMapper": {
		'^(\\.{1,2}/.*)\\.js$': '$1',
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	"moduleFileExtensions": [
		"js",
		"jsx",
		"tsx",
		"ts"
	],
	"modulePaths": [
		"<rootDir>/src/.*\\.(ts|js)"
	],
	"modulePathIgnorePatterns": [
		"<rootDir>/node_modules"
	],
	"extensionsToTreatAsEsm": [
		".ts"
	],
	"transform": {
		'^.+\\.(js|jsx)?$': 'babel-jest',
		'^.+\\.(ts|tsx)?$': 'ts-jest',
	},
	"transformIgnorePatterns": [
		'<rootDir>/node_modules/',
	],
	"testMatch": [
		'**/__tests__/**/*.+(ts|tsx|js|jsx)',
		'**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'
	]
}