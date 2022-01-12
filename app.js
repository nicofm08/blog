const express = require('express');
const articlesRoutes = require('./routes/articles')
const commentsRoutes = require('./routes/comments')
const usersRoutes = require('./routes/users')
const loginRoutes = require('./routes/login')
const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log('Escuchando puerto 8000');
})


/* ROUTES*/
app.use('/articles', articlesRoutes);
app.use('/comments', commentsRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoutes);


/* ERROR HANDLER - RESET APP */
process.on('uncaughtException', function (err) {
    console.log('Error General: ' + err);
    resetApp();
});
