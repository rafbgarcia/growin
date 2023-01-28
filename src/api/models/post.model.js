const mongoose = require("mongoose");
const httpStatus = require("http-status");
const { omitBy, isNil } = require("lodash");
const APIError = require("../errors/api-error");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.statics = {
  async get(id) {
    let post;

    if (mongoose.Types.ObjectId.isValid(id)) {
      post = await this.findById(id).exec();
    }
    if (post) {
      return post;
    }

    throw new APIError({
      message: "Post does not exist",
      status: httpStatus.NOT_FOUND,
    });
  },

  list({ page = 1, perPage = 30, name, email, role }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },
};

module.exports = mongoose.model("Post", postSchema);
