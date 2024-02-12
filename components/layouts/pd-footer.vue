<template>
  <footer class="fixed bottom-0 left-0 z-20 w-full p-4 border-t shadow md:flex md:items-center md:justify-between bg-gray-800 border-gray-600">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      Дата установки: {{ new Date(date).toLocaleString() }}
    </span>
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
</footer>
</template>

<script setup lang="ts">
const date = useAppConfig().buildDate;
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 60px;
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
