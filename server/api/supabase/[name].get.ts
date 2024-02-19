import { serverSupabaseUser as User, serverSupabaseClient as Client } from "#supabase/server"; 


export default defineEventHandler(async (event) => {
  const user = await User(event);
  const client = await Client(event);
  if (!user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const name = getRouterParam(event, 'name')

  const { data, error } = await client.from(`${name}`).select("*").eq("user_id", user?.id);
  if (error) {
    throw createError({ statusCode: 404, message: error?.message || 'not found' });
  }
  if (!data) return null;
  return data;
});
