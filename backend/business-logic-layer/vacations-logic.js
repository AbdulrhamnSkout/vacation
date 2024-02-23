const dal = require("../data-access-layer/dal")
const Vacation = require("../models/vacation")
const uuid = require("uuid");

async function getOneVacationAsync(id) {
    const sql = `SELECT vacations.* , X.followers
    FROM vacations  JOIN (SELECT COUNT(userId) as followers  ,vac.vacationId
    FROM (SELECT vacationId FROM vacations) as vac LEFT JOIN  followers 
    ON followers.vacationId=vac.vacationId
    GROUP BY(vacationId)) as X 
    ON vacations.vacationId = x.vacationId
    WHERE vacations.vacationId=?`
    
    const vacations = await dal.executeAsync(sql, id);
    if (vacations.length === 0) return null;
    const vacation = vacations[0]
    return vacation;
}

async function getAllVacationsAsync() {
    const sql = `SELECT vacations.* , X.followers
    FROM vacations  JOIN (SELECT COUNT(userId) as followers  ,vac.vacationId
    FROM (SELECT vacationId FROM vacations) as vac LEFT JOIN  followers 
    ON followers.vacationId=vac.vacationId
    GROUP BY(vacationId)) as X 
    ON vacations.vacationId = x.vacationId`

    const vacations = await dal.executeAsync(sql);
    if (vacations.length === 0) return null;


    return vacations;
}

async function addVacationAsync(vacation,image) {
    const sql = "INSERT INTO vacations VALUES(DEFAULT,?,?,?,?,?,?)"
    vacation.imageName="default.jpg"
    vacation.followers=0
    if(image){
        const extension = image.name.substr(image.name.lastIndexOf("."));
        vacation.imageName = uuid.v4() + extension;
        image.mv("./images/"+ vacation.imageName ); 
    }
    
    const info = await dal.executeAsync(sql, [vacation.description, vacation.destination, vacation.price, vacation.start, vacation.end, vacation.imageName])
    vacation.vacationId = info.insertId;
    return vacation
}

// full and part in same function
async function updateVacationAsync(vacation,image) {
    if (!vacation.vacationId) return null
    if(image){
        const extension = image.name.substr(image.name.lastIndexOf("."));
        vacation.imageName = uuid.v4() + extension;
        image.mv("./images/"+ vacation.imageName ); 
    }
    
    let keys = Object.keys(vacation)
    keys = keys.filter(key => key in { description: null, destination: null, price: null, start: null, end: null, imageName: null })
    if (keys.length === 0) return null
    let str = keys.reduce((prev, cur) => prev.concat(cur + " = ? ,"), "")
    str = str.slice(0, str.lastIndexOf(","))

    const sql = "UPDATE vacations SET " + str + "WHERE vacationId = ? "
    const info = await dal.executeAsync(sql, [...keys.map(v=>vacation[v]),vacation.vacationId])

    //take care if vacation is part obj 
    return info.affectedRows === 0 ? null : await getOneVacationAsync(vacation.vacationId);


}
async function deleteVacationAsync(id) {
    let sql="DELETE FROM followers WHERE vacationId = ?"
    let info = await dal.executeAsync(sql, id);
    sql = "DELETE FROM vacations WHERE vacationId = ?";
    info = await dal.executeAsync(sql, id);
    return info.affectedRows === 1;

}

module.exports = {
    getOneVacationAsync,
    getAllVacationsAsync,
    addVacationAsync,
    updateVacationAsync,
    deleteVacationAsync
}