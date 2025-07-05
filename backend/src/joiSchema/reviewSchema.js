import joi from 'joi';

const reviewJoiSchema=joi.object({
       comment:joi.string().required(),
        rating:joi.number().min(1).max(5).required()
})

export default reviewJoiSchema;