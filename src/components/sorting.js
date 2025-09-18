import {sortCollection, sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (data, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // @todo: #3.1 — запомнить выбранный режим сортировки
            action.dataset.value = sortMap[action.dataset.value] // Сохраним и применим как текущее следующее состояние
            field = action.dataset.field // В кнопке есть информация о поле сортировки
            order = action.dataset.value // Берём направление для точности

            // @todo: #3.2 — сбросить сортировки остальных колонок
            columns.forEach((column) => {
                // Перебираем элементы (в columns у нас массив кнопок)
                if (column.dataset.field !== action.dataset.field) {
                // Если это не нужная кнопка, которую нажал пользователь
                column.dataset.value = "none" // сбрасываем кнопку в начальное состояние
        }
      })
        } else {
            // @todo: #3.3 — получить выбранный режим сортировки
            columns.forEach(column => {                        // Перебираем все кнопки для сортировки
                if (column.dataset.value !== 'none') {        // Ищем ту, что находится не в изначальном состоянии 
                    field = column.dataset.field;            // Сохраняем поле в переменных
                    order = column.dataset.value;            // Задаём направление сортировки
    }
});
        }

        return sortCollection(data, field, order);
    }
}