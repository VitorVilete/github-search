This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# What is this about?

This is a React application that search repository and commit data from Github API.

# ES6+ features used in this project

## Destructuring Assignment
The destructuring assignment is a nice and organized way to get only the things you need from an array or object. There are examples of Destructuring Assignment on this project that can be seen on the Commits and Repos components. It is used to get multiple variables from the state in a single line.

## Template Literals
Template literals makes it easy and clean to pass you data to a string without having to concatenate. Plus, you can write a multi-line string, since it understands new-line characters inside the template string. Examples of this can be found on the Commits, Repos, Loader and Navigation components. All the styled components in this application were made with template literals.

## Spread Operator
Also known as Spread Syntax, the Spread Operator can be very useful, specially when dealing with arrays. You can find an example of it working on the Commits component, where it sets the commits with the new commits using a Spread Syntax.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `yarn storybook`

Launches the Storybook of this application.<br>

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.