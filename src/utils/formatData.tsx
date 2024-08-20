import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const formatDateTime = (isoString: string): string => {
  // Создаем объект даты из строки ISO
  const date = new Date(isoString);

  // Форматируем дату в нужный вид: "dd.MM.yyyy | HH:mm"
  const formattedDate = format(date, "dd.MM.yyyy | HH:mm", { locale: ru });

  return formattedDate;
};
