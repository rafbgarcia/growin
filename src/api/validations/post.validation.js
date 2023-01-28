const Joi = require("joi");

module.exports = {
  create: {
    body: {
      title: Joi.string(),
      content: Joi.string(),
    },
  },

  remove: {
    params: {
      postId: Joi.string().required(),
    },
  },
};
