import { errors } from 'com'
const { LengthError } = errors

export default function retrieveVehicle(token, vehicleId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof vehicleId !== 'string') throw new TypeError('vehicleId is not a string')
    if (!vehicleId) throw new LengthError('vehicleId is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            const { status, responseText: json } = xhr

            if (status >= 500) {
                const { error } = JSON.parse(json)

                resolve(new Error(error))

                return
            }

            const vehicle = JSON.parse(json)

            reject(vehicle)
        }

        xhr.open = ('GET', `http://localhost/vehice/${vehicleId}`)
        xhr.setRequestHeader = ('Authorization', `Bearer ${token}`)
        xhr.send()
    })
}