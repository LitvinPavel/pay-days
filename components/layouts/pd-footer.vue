<template>
  <footer class="fixed w-full bottom-0 transform transition duration-500 ease-in-out z-30 h-[30rem] bg-zinc-800 mt-1" :class="{ 'translate-y-[25rem]': !isShow }">
    <div class="relative p-8">
      <div class="absolute top-2 left-1/2 ml--20 h-0.5 w-20 bg-white rounded-full translate-x-[-2.5rem]" @click="$emit('show')" />
      <span>Дата установки: {{ new Date(date).toLocaleString() }} PWA Installed: {{ $pwa?.isPWAInstalled }}</span>
      <ClientOnly>
        <div
          v-if="$pwa?.offlineReady || $pwa?.needRefresh"
          class="pwa-toast"
          role="alert"
        >
          <div class="message">
            <span v-if="$pwa.offlineReady"> Приложение готово к работе в автономном режиме </span>
            <span v-else>
              Доступен новый контент
            </span>
          </div>
          <button v-if="$pwa.needRefresh" @click="$pwa.updateServiceWorker()">
            Обновить
          </button>
          <button @click="$pwa.cancelPrompt()">Закрыть</button>
        </div>
        <div
          v-if="
            $pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh
          "
          class="pwa-toast"
          role="alert"
        >
          <div class="message">
            <span>Установить PayDays?</span>
          </div>
          <button @click="$pwa.install()">Да</button>
          <button @click="$pwa.cancelInstall()">Нет</button>
        </div>
      </ClientOnly>
    </div>
    
  </footer>
</template>

<script setup lang="ts">
defineProps({
  isShow: { type: Boolean, default: false }
});
const date = useAppConfig().buildDate;
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>
