import { UserRegModel } from '../models/index'

export const saveUserData = async(params) => {
    return UserRegModel.create(params)
}
export const findOneUsrByParams = async (params) => {
    return UserRegModel.findOne(params)
}
export const findAllUsersAgg = async(params)=>{
    const { limit, page } = params
    const result = await UserRegModel.aggregate([
        // {
        //   $match: { age: desiredAge } 
        // },
        {
          $facet: {
            count: [
              { $count: "total" } 
            ],
            documents: [
              { $sort: { _id: -1 } },  // Sort by _id in descending order (or any other field)
              { $skip: Number((page - 1) * limit) },   
              { $limit: Number(limit * 1) },   
              { $project: { password: 0  } }  //exclude password
            ]
          }
        }
      ])

      return {
        totalCount: result[0].count[0]?.total || 0,
        data: result[0]?.documents
      }
}