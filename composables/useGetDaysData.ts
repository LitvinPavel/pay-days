export const useGetDaysData = async (year: number, month: number) => {
  const last = ref<number>(0);

  const { days, work } = await useGetStorage(`${year}-${month}`);
  if (month) {
    const { work: prevWork } = await useGetStorage(`${year}-${month - 1}`);
    last.value =
      prevWork.filter((w: number) => w > 15).length / prevWork.length;
  }

  const first = computed(() => {
    return work.filter((w: number) => w <= 15).length / work.length;
  });

  const lastYear = computed(() => {
    return month === 11 ? work.length - first.value : 0;
  });
  return { days, work, first, last, lastYear };
};
