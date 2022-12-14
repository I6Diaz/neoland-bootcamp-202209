const { LengthError, NotFoundError } = require('com/errors')
const deleteVehicle = require('../logic/deleteVehicle')

module.exports = (req, res) => {
    try {
        const { params: { vehicleId }, userId } = req

        deleteVehicle(userId, vehicleId)
            .then(() => res.status(204).send())
            .catch(error => {
                if (error instanceof NotFoundError)
                    res.status(404).json({ erorr: error.message })
                else
                    res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof LengthError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}