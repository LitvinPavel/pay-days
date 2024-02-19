import { serverSupabaseUser as User, serverSupabaseClient as Client } from "#supabase/server"; 


export default defineEventHandler(async (event) => {
  try {
    const user = await User(event);
    const client = await Client(event);
    const query = getQuery(event);
    const name = getRouterParam(event, 'name')
    if (!user) {
        throw createError({ statusCode: 401, message: "Unauthorized" });
      }

    const { error } = await client
      .from(`${name}`)
      .delete()
      .eq("id", `${query.id}`)

    if (error) throw createError({ statusCode: 404, message: error?.message || 'not found' });
  } catch (error) {
    createError({ statusCode: 404, message: `${error}` });
  }
});
