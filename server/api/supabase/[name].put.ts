import { serverSupabaseUser as User, serverSupabaseClient as Client } from "#supabase/server"; 


export default defineEventHandler(async (event) => {
  try {
    const user = await User(event);
    const client = await Client(event);
    const body = await readBody(event);
    const name = getRouterParam(event, 'name');
    const query = getQuery(event);
    if (!user) {
        throw createError({ statusCode: 401, message: "Unauthorized" });
      }
    const data = [
      {
        created_at: new Date(),
        ...body
      },
    ];

    const { error } = await client
      .from(`${name}`)
      .update(data)
      .eq("id", `${query.id}`)
      .select();

    if (error) throw createError({ statusCode: 404, message: error?.message || 'not found' });
  } catch (error) {
    createError({ statusCode: 404, message: `${error}` });
  }
});
