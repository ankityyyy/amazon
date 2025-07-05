import Joi from 'joi';


const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().min(100).required(),
  qty: Joi.number().min(1).required(),
   category:Joi.string().required(),
  
}); 

export  {productSchema};