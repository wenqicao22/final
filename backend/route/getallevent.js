const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const {manager} = req.body
  await Event.find({manager: manager}, (err, doc) => {
    if (err) console.error(err)
    const allEvent = []
    if (doc !== null && doc.length !== 0){
      doc.array.forEach(element => {
        const event = {
          id: element._id,
          manager: element.manager,
          name: element.name,
          star: element.star,
          isAccepted: element.isAccepted
        }
        allEvent.push(event)
      });
    }
    res.send(allEvent)
  })
})

module.exports = router;