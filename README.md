# webpack-react-heroku-recipes-collection
## Create a react app using webpack you need to install the below dependencies
1.npm install @babel-core babel-loader @babel/preset-env @babel/preset-react --save--dev\
2. build a file name called .babelrc and include the below codes\
{\
    "presets": ["@babel/preset-env", "@babel/preset-react"]\
  }\
3.  Inside the webpack.config.js file\
      module:{\
      rules:[{\
             test:/\.(js|jxs)$/,\
             use:{loader:"babel-loader"},\
             exclude:/node_modules/\
            }]}

https://jbrecipecollection.herokuapp.com/
