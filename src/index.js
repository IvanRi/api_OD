import express, { json } from 'express'
import morgan from 'morgan'
import productRoutes from './../components/product/productRoutes'
//init
const app = express();
//middleware
app.use(morgan('dev'))
app.use(json())

//routes
app.use('/api/products',productRoutes)

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});

export default app
