const express = require("express");
const vacationLogic = require("../business-logic-layer/vacations-logic")
const path = require('path');
const verifyLoggedIn = require("../middleware/verify-logged-in")
const router = express.Router();
const Vacation = require("../models/vacation")
const isAdmin=require("../middleware/is-admin")
// const s=require("../app/")

//router.use(verifyLoggedIn)

//get all vacations
router.get("/", verifyLoggedIn,async (request, response) => {
    try {
        const vacations = await vacationLogic.getAllVacationsAsync()
        response.json(vacations)

    }
    catch (err) {
        response.status(500).send("err")
    }


})

//get one vacation
router.get("/:id([0-9]+)", verifyLoggedIn,async (request, response) => {
    try {
        //Date    
        const id = +request.params.id
        request.body.vacationId = id;

        //Logic
        const vacation = await vacationLogic.getOneVacationAsync(id)
        if (!vacation) return response.status(404).send(`id ${id} not found.`);


        // Success: 
        response.json(vacation);


    }
    catch (err) {
        response.status(500).send("err");
    }

})

//add vacation
router.post("/",isAdmin, async (request, response) => {
    try {
        //Data
        const vacation = new Vacation(request.body)

        // Validation: 

        //Logic
        const addedVacation = await vacationLogic.addVacationAsync(vacation, request.files ? request.files.image : null);

        // Success: 
        response.status(201).json(addedVacation);
    }

    catch (err) {
        response.status(500).send(err.message);
    }

})

// update full vacation
router.put("/:id([0-9]+)", isAdmin ,async (request, response) => {
    try {
        // Data: 
        const id = +request.params.id;
        request.body.vacationId = id;
        const vacation = new Vacation(request.body);

        // Logic: 
        const updatedVacation = await vacationLogic.updateVacationAsync(request.body,request.files ? request.files.image : null);
        if (!updatedVacation) return response.status(404).send(`id ${id} not found.`);

        // Success:
        response.json(updatedVacation);

    }
    catch (err) {
        response.status(500).send(err);

    }
})

//delete vacation
router.delete("/:id([0-9]+)", isAdmin ,async (request, response) => {

    try {
        //Date
        const id = +request.params.id;

        //Logic
        await vacationLogic.deleteVacationAsync(id);

        // Success:
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }

})


router.get("/images/:imageName", (request, response) => {
    try {
        // Data: 
        const imageName = request.params.imageName;
        const newDir=path.join(__dirname,"/..")

        response.sendFile(newDir + "/images/" + imageName);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports=router




