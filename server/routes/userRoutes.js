const router = require("express").Router();
const { loginRoute } = require("../../public/src/utils/APIRoutes");
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/usersControllers");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar", setAvatar);
router.get("/allUsers/:id", getAllUsers);

module.exports = router;
