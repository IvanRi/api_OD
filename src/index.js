import express, { json } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import productRoutes from './../components/product/productRoutes'
//init
const app = express();
let port = process.env.PORT || 3001;

//middleware
app.use(morgan('dev'))
app.use(json())
app.use(cors())

//routes
app.use('/api/products',productRoutes)

app.listen(port, function () {
  console.log('Example app listening on port 3001!');
});

export default app
