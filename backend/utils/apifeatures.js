class ApiFeatures {
    constructor(query,querystr){
        this.query = query;
         this.querystr = querystr
    }

    // for product search
    search(){
        const keyword = this.querystr.keyword
        ? {
            name: {
                $regex: this.querystr.keyword,
                $options: 'i',
            },

        }
        :{};
        this.query = this.query.find({...keyword});
        return this;
    }
  filter(){
    const queryCopy = { ...this.querystr};
    // Removing some fields for category
    const removefield = ["keyword","page","limit"];
    removefield.forEach((key)=> delete queryCopy[key]);

    // filter for price or rating

    let querystr = JSON.stringify(queryCopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }

  // pagination that's how many product show in par page

  pagination(resultPerPage){
    const currentPerPage = Number(this.querystr.page) || 1;
    const skip = resultPerPage*(currentPerPage-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
};
module.exports = ApiFeatures;