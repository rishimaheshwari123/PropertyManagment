const BASE_URL = process.env.REACT_APP_BASE_URL


export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/register",
}

export const admin = {
    CREATE_CATEGORY: BASE_URL + "/category/create",
    GET_ALL_CATEGORY: BASE_URL + "/category/getAll",
    DELETE_CATEGORY: BASE_URL + "/category/delete",
    UPDATE_CATEGORY: BASE_URL + "/category/update",
    IMAGE_UPLOAD: BASE_URL + "/image/multi",
    CREATE_PROPERTY_INFORMATION: BASE_URL + "/propertyinformation/create",
    GET_ALL_PROPERTY_INFORMATION: BASE_URL + "/propertyinformation/getAll",
    DELETE_PROPERTY: BASE_URL + "/propertyinformation/delete",


    CREATE_PROPERTY_COMMITI: BASE_URL + "/propertycommiti/create",
    GET_ALL_PROPERTY_COMMITI: BASE_URL + "/propertycommiti/getAll",
    DELETE_PROPERTY_COMMITI: BASE_URL + "/propertycommiti/delete",


    CREATE_UNITS: BASE_URL + "/units/create",
    GET_ALL_UNITS: BASE_URL + "/units/getAll",
    DELETE_UNITS: BASE_URL + "/units/delete",

}