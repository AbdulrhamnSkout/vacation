const dal = require("../data-access-layer/dal");



async function getFollowAsync(id){
    const sql="SELECT vacationId FROM followers WHERE userId=?;"
    const  follow = await dal.executeAsync(sql,id)
    return follow
}


async function followAsync(follow){
    const sql="INSERT INTO followers VALUES (?,?)"
    await dal.executeAsync(sql,[follow.userId,follow.vacationId])
}



async function unFollowAsync(follow){
    const sql="DELETE FROM followers WHERE userId = ? AND vacationId=?"
    await dal.executeAsync(sql,[follow.userId,follow.vacationId])

}


module.exports={
    followAsync,
    unFollowAsync,
    getFollowAsync
}