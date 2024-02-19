<script setup>
const props = defineProps(["path"]);
const { path } = toRefs(props);

const emit = defineEmits(["update:path", "upload"]);

const supabase = useSupabaseClient();

const uploading = ref(false);
const src = ref("");
const files = ref();

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

const uploadAvatar = async (evt) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;

    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    emit("update:path", filePath);
    emit("upload");
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

downloadImage();

watch(path, () => {
  if (path.value) {
    downloadImage();
  }
});
</script>

<template>
  <div class="relative flex-shrink-0">
    <label for="single" class="cursor-pointer">
      <img
        v-if="src"
        :src="src"
        alt="Avatar"
        class="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0"
      />
      <user-circle-icon v-else class="w-10 h-10 me-3 text-gray-700" />
      <pen-icon
        class="top-0 start-7 absolute w-4 h-4 bg-zinc-500 border-2 border-gray-800 rounded-full"
      />
    </label>
    <input
      type="file"
      id="single"
      accept="image/*"
      class="absolute invisible"
      @change="uploadAvatar"
      :disabled="uploading"
    />
  </div>
</template>
