import { db } from '../firebase'

function getAllUnits() {
  return new Promise((resolve, reject) => {
    db.collection('units')
      .get()
      .then((allUnits) => {
        resolve(allUnits)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
export default { getAllUnits }
