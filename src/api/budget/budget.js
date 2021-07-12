import request from '@/utils/request'

export function listbudget()
{
    return request({
        url: '/budget/list',
      method: 'get'
     
    }) 
}
export function getinfobudget(query)
{
   return request({
      url: '/budget/getbudgetInfo',
      method: 'get',
      params: query
   })
}
export function updatebudget(data)
{
   return request({
      url: '/budget/update',
      method: 'post',
      data: data
   })
}
export function removebudget(oid)
{
    return request({
       url: '/budget/del/'+oid,
       method: 'delete'
    })
}
export function addbudget(data)
{
   return request({
      url: '/budget/add',
      method: 'post',
      data: data
   })
}