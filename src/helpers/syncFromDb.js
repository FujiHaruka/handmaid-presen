const syncFromDb = async ({set, db}) => {
  await db.load()
  const data = await db.getWhole()
  set(data)
}

export default syncFromDb
