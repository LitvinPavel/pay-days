<template>
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
</template>

<script setup lang="ts">
interface IResultItem {
    first: number;
    last: number;
    lastYear?: number;
    month: number;
    work: number[];
    days: { [key: string]: IDayState }
}

interface IDayState {
    isHoliday: boolean;
    weekDay: number;
    plan?: number;
    fact?: number;
}
const props = defineProps({
  year: { type: Number, default: new Date().getFullYear() },
  month: { type: Number, default: new Date().getMonth() }
});

  const emit = defineEmits(['loaded'])
  // const { year, month } = useCurrentMonth();

  onMounted(async() => {
    const state = await useGetStorage(`${props.year}-${props.month}`);
    if (!state) {
      await setStage();
    } else emit('loaded', true);
  });

  async function setStage()  {
    try {
      const { data } = await useFetchCalendar(props.year);
      if (data.value) {
        (data.value || []).forEach((item: IResultItem, key: number) => {
          useSetStorage(`${props.year}-${key}`, item);
        })
      }
      
      emit('loaded', true);
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style scoped>
.loader {
  text-align: center;
  vertical-align: middle;
  position: relative;
  display: flex;
  
}

.loader span {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  background: #eee;
  border-radius: 50%;
  margin: 0 0.25rem;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
}

.loader span:nth-child(2) {
  background: #f07e6e;
}

.loader span:nth-child(3) {
  background: #84cdfa;
}

.loader span:nth-child(4) {
  background: #5ad1cd;
}

.loader span:not(:last-child) {
  animation: animate 1.5s linear infinite;
}

@keyframes animate {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(30px);
  }
}

.loader span:last-child {
  animation: jump 1.5s ease-in-out infinite;
}

@keyframes jump {
  0% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(10px, -10px);
  }
  20% {
    transform: translate(20px, 10px);
  }
  30% {
    transform: translate(30px, -50px);
  }
  70% {
    transform: translate(-150px, -50px);
  }
  80% {
    transform: translate(-140px, 10px);
  }
  90% {
    transform: translate(-130px, -10px);
  }
  100% {
    transform: translate(-120px, 0);
  }
}
</style>