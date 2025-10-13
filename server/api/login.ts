import { z } from 'zod'

const bodySchema = z.object({
  id: z.number().optional(),
  username: z.string().min(1),
  password: z.string().min(6),
})

export default defineEventHandler(async (event) => {
  const {id, username, password} = await readValidatedBody(event, bodySchema.parse);
  console.log(id, username);
  await setUserSession(event, {
      user: {
        name: username,
      },
    })
    return {}
})
