const User =require("./model/user")

const isManager =  (req, res, next) => {
    console.log(req)
    const {user} = req
    if (user) {
        User.findOne({username: user.username}, (err, doc) => {
            if (err) console.error(err)
            if (doc) {
                if (doc.managerOrStar === "manager") {
                    next()
                }
            }else {
                res.send("Not a manager.")
            }
        })
    }
}
module.exports = isManager