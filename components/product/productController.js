import Product from './productModel'

export async function listAllProduct(req , res){
  console.log(Product)
  const productList = await Product.findAll()
  res.send({data: productList})
}