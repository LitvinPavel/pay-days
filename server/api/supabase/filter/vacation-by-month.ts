import { serverSupabaseUser as User, serverSupabaseClient as Client } from "#supabase/server"; 
import dateFormat from "~/utils/date-format";


export default defineEventHandler(async (event) => {
  const user = await User(event);
  const client = await Client(event);
  if (!user) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }
  const { year, month } = getQuery(event);
  
  const search_from = dateFormat(new Date(Number(year), Number(month), 1), 'yyyy-MM-dd')
  const search_to = dateFormat(new Date(Number(year), Number(month) + 1, 0), 'yyyy-MM-dd')

  const { data, error } = await client.from(`vacations`).select("*").eq("user_id", user?.id).gte('date_from', `${search_from}`).lte('date_to', `${search_to}`);
  if (error) {
    throw createError({ statusCode: 404, message: error?.message || 'not found' });
  }
  if (!data) return null;
  return data;
});
