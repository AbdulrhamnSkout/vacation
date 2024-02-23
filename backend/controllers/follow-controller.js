const express = require("express");
const followLogic = require("../business-logic-layer/follow-logic");
const verifyLoggedIn = require("../middleware/verify-logged-in");
const router = express.Router();
router.use(verifyLoggedIn)


router.get("/follow/:id([0-9]+)", async (request, response) => {

    try {
        const id= +request.params.id
        const follow = await followLogic.getFollowAsync(id)
        response.json(follow)
    }
    catch (err) {
        response.status(500).send(err)
    }

})


router.post("/follow", async (request, response) => {
    try {
        const follow = await followLogic.followAsync(request.body);
        response.end()
    }
    catch (err) {
        response.status(500).send(err.message);

    }
});

router.delete("/follow/:id", async (request, response) => {
    try {
        let [userId, vacationId] = request.params.id.split("&")
        userId = +userId
        vacationId = +vacationId
        await followLogic.unFollowAsync({ userId, vacationId });
        response.end()
    }
    catch (err) {
        response.status(500).send(err.message);

    }
});

module.exports = router