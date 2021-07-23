import joi from "joi";

export const songSchema = joi.object({
    name: joi.string().required(),
    youtubeLink: joi.string().pattern(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/).required()
})

export const vote = joi.object({
    id: joi.number().required().positive() 
})