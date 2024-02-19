<template>
  <div
    class="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    <Avatar v-model:path="avatar_path" @upload="updateProfile" />
    <div>
      <p class="text-base font-semibold text-gray-900 truncate dark:text-white">
        {{ username }}
      </p>
      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
        {{ user?.email }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const loading = ref(true);
const avatar_path = ref<string>("");
const username = ref<string>("");

const user = useSupabaseUser();

watch(
  user,
  async () => {
    if (user.value) {
      loading.value = true;
      const { data } = await client
        .from("profiles")
        .select("avatar_url, username")
        .eq("id", user.value?.id)
        .single();

      if (data) {
        avatar_path.value = data.avatar_url;
        username.value = data.username;
      }

      loading.value = false;
    }
  },
  { immediate: true }
);

async function updateProfile() {
  try {
    loading.value = true;

    const updates = {
      id: user.value?.id,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };

    const { error } = await client.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (error) {
    createError({ statusCode: 404, message: `${error}` });
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  const { error } = await client.auth.signOut();
  if (!error) {
    navigateTo("/login");
  } else {
    createError({ statusCode: 404, message: `${error}` });
  }
}
</script>

<style scoped></style>
