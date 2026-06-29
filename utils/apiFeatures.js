// utils/apiFeatures.js

class APIFeatures {
  // query = Restaurant.find()

  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search functionality
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }

  // Filter functionality
  filter() {
    const queryCopy = { ...this.queryStr };

    // Remove fields that should not be used for filtering
    const removeFields = ["keyword", "limit", "page", "sortBy"];

    removeFields.forEach((el) => delete queryCopy[el]);

    // Advanced filtering for gte, gt, lte, lt
    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // Sorting functionality
  sort() {
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy.toLowerCase();

      let sortQuery = {};

      // Sort by ratings (highest first)
      if (sortBy === "ratings") {
        sortQuery = { ratings: -1 };
      }

      // Sort by number of reviews
      else if (sortBy === "reviews") {
        sortQuery = { numOfReviews: -1 };
      }

      // Apply sorting
      this.query = this.query.sort(sortQuery);
    }

    return this;
  }

  // Pagination functionality
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);

    return this;
  }
}

module.exports = APIFeatures;