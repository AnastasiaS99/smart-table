import {getPages} from "../lib/utils.js";

export const initPagination = (
    {pages, fromRow, toRow, totalRows}, 
    createPage) 
    => {
    // @todo: #2.3 — подготовить шаблон кнопки для страницы и очистить контейнер
    const pageTemplate = pages.firstElementChild.cloneNode(true) // в качестве шаблона берём первый элемент
    pages.firstElementChild.remove() // и удаляем его 

     return (data, state, action) => {
        // @todo: #2.1 — посчитать количество страниц, объявить переменные и константы
        const rowsPerPage = state.rowsPerPage // для короткой записи
        const pageCount = Math.ceil(data.length / rowsPerPage) // округление в большую сторону
        let page = state.page // страница переменной

        // @todo: #2.6 — обработать действия

        if (action)
            switch (action.name) {
             case "prev":
                page = Math.max(1, page - 1)
                break // переход на предыдущую страницу
            case "next":
                page = Math.min(pageCount, page + 1)
                break // переход на следующую страницу
             case "first":
                page = 1
                break // переход на первую страницу
            case "last":
                page = pageCount
                break // переход на последнюю страницу
      }

        // @todo: #2.4 — получить список видимых страниц и вывести их
        const visiblePages = getPages(page, pageCount, 5) // Получим массив страниц, которые нужно показать, берем 5 страниц
        pages.replaceChildren(
            ...visiblePages.map((pageNumber) => {
        // перебираем их и создаём для кнопку
        const el = pageTemplate.cloneNode(true) // клонируем шаблон, который взяли до этого
        return createPage(el, pageNumber, pageNumber === page) // вызываем колбэк из настроек для заполнения кнопки данными
      })
    )

        // @todo: #2.5 — обновить статус пагинации

        fromRow.textContent = (page - 1) * rowsPerPage + 1 // С какой строки выводим
        toRow.textContent = Math.min(page * rowsPerPage, data.length) // До какой строки выводим, в случае последней страницы показываем количество, которое осталось
        totalRows.textContent = data.length // Сколько всего строк выводим на всех страницах вместе 

        // @todo: #2.2 — посчитать сколько строк нужно пропустить и получить срез данных

        const skip = (page - 1) * rowsPerPage // количество строк, которые нужно пропустить
        return data.slice(skip, skip + rowsPerPage) // получаем нужную часть строк (заменяем имеющийся return)

        return data.slice(0, 10)
    }
}