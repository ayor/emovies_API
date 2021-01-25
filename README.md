# eMovies Rest API

This project utilzes Node js runtime and Express Framework to build a Rest API for a movies Store.

* Architecture 
 
 The project was built using the MVC (Model-View-Controller) Framework.
  * Models - These are basically the structure/Schema of your data and how that data should look like in your Database.
  * Controllers - The controller is reponsible for handling user interaction and choosing the apppropriate views/result to render/return. 
  *Views - This is the interface for interaction with the user. Could consists of forms to collect user data and other also displays data from the server(API). The view for Rest APi are mostly built with other frameworks (Vue, React or Angular) 
[FrontEnd](https://github.com/ayor/emovies_Frontend)



## Getting Started

```
npm install

```

```
npm start
```

###Prerequisites

* [bcryptjs](https://www.npmjs.com/package/bcryptjs)
```
npm install --save bcryptjs
```

* [EasyInvoice](https://www.npmjs.com/package/easyinvoice)
```
npm install --save easyinvoice
```

* [Express](https://expressjs.com/en/starter/installing.html)
```
npm install --save express
```

* [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
 
```
npm install --save jsonwebtoken
```

* [Mongoose](https://mongoosejs.com/docs/)
Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. 
```
npm install --save mongoose
```


* [Multer](https://www.npmjs.com/package/multer)
Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 
```
npm install --save multer
```


* [Nodemon](https://www.npmjs.com/package/nodemon) 
Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
```
npm install --save-dev nodemon
```

#### Deployment

This Web API is hosted on Heroku. For more information on how to deploy to heroku with GIT please check this [documentation](https://devcenter.heroku.com/articles/git)

##### Author

* **Ayomide Dosumu**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
