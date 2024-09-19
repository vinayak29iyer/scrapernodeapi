import { saveUserData, findAllUsersAgg } from '../queries/userReg'

export const saveUserRegData = async(params) => {
    return saveUserData(params)
}

export const findAllUserAggData = async(params) => {
    return findAllUsersAgg(params)
}