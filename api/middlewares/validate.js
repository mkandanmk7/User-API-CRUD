import Joi from "joi";
import httpStatus  from "http-status";

export const validate = (schema)=>(req,res,next) => {
    try {
        let {error}=schema.validate(req.body);
        if(error){
            return res.status(httpStatus.BAD_REQUEST).json({error:error.details[0].message})
        }
        next()
    } catch (error) {
       res.status(httpStatus.INTERNAL_SERVER_ERROR).json({errro:"internal server error"})
    }
}