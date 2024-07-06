import request from "@/utils/request";

//
export const getParkListApi = () =>{
    return request({
        url:'/park/statistics/info',
        method:'get'
    })
}

//请求楼宇详细信息 /park/statistics/building
export const getParkBuildingApi = (id) =>{
    return request({
        url:'/park/statistics/building',
        method:'get',
        params:{
            id
        }
    })
}


// 请求停车场详细信息 /parking/area/{id}
export const getParkAreaApi = (id) =>{
    return request({
        url:`/parking/area/${id}`,
        method:'get'
    })
}
