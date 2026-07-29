class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Search by keyword
  search() {
  if (this.queryString.keyword) {

    const keyword = {
      $or: [
        {
          title: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          location: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          industry: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          skills: {
            $elemMatch: {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          },
        },
      ],
    };

    this.query = this.query.find(keyword);
  }

  return this;
}search() {
  if (this.queryString.keyword) {

    const keyword = {
      $or: [
        {
          title: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          location: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          industry: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        },
        {
          skills: {
            $elemMatch: {
              $regex: this.queryString.keyword,
              $options: "i",
            },
          },
        },
      ],
    };

    this.query = this.query.find(keyword);
  }

  return this;
}

  // Filter
  filter() {
  const queryCopy = { ...this.queryString };

  const removeFields = [
    "keyword",
    "page",
    "limit",
    "sort",
    "salaryMin",
    "salaryMax",
  ];

  removeFields.forEach((key) => delete queryCopy[key]);

  // Exact filters
  this.query = this.query.find(queryCopy);

  // Salary Range
  if (this.queryString.salaryMin || this.queryString.salaryMax) {

    const salaryFilter = {};

    if (this.queryString.salaryMin) {
      salaryFilter.$gte = Number(this.queryString.salaryMin);
    }

    if (this.queryString.salaryMax) {
      salaryFilter.$lte = Number(this.queryString.salaryMax);
    }

    this.query = this.query.find({
      salary: salaryFilter,
    });
  }

  return this;
}

  // Sort
  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // Pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default APIFeatures;