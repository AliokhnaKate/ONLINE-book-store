const items = [{
        title: "ВСЕ сказки и картинки",
        author: "Сутеев В.Г.",
        tags: ["3+", "6+"],
        price: 33.00,
        img: "./img/1.jpg",
        rating: 4.9,
    },
    {
        title: "Дядя Федор, пес и кот",
        author: "Успенский Э.Н.",
        tags: ["0+", "3+"],
        price: 18.30,
        img: "./img/2.jpg",
        rating: 5.0,
    },
    {
        title: "Крокодил Гена и его друзья",
        author: "Успенский Э.Н.",
        tags: ["3+"],
        price: 33.00,
        img: "./img/3.jpg",
        rating: 4.9,
    },
    {
        title: "Все вредные советы",
        author: "Остер Г.Б.",
        tags: ["0+", "3+"],
        price: 16.80,
        img: "./img/4.jpg",
        rating: 4.9,
    },
    {
        title: "Все о кролике Питере",
        author: "Поттер Б.",
        tags: ["3+"],
        price: 42.60,
        img: "./img/5.jpg",
        rating: 4.8,
    },
    {
        title: "Все о динозаврах.",
        author: "Ферт Р.",
        tags: ["5+"],
        price: 10.60,
        img: "./img/6.jpg",
        rating: 4.7,
    },
    {
        title: "Все сказки для малышей",
        author: "Маршак С.Я.",
        tags: ["0+"],
        price: 18.30,
        img: "./img/7.jpg",
        rating: 4.9,
    },
    {
        title: "Приключения Чиполлино",
        author: "Джанни Родари",
        tags: ["0+"],
        price: 18.30,
        img: "./img/8.jpg",
        rating: 3.0,
    },
    {
        title: "Планета динозавров.",
        author: "Барсотти Э.",
        tags: ["6+", "8+"],
        price: 26.10,
        img: "./img/9.jpg",
        rating: 5.0,
    },
    {
        title: "Атлас мира в картинках.",
        author: "Барсотти Э.",
        tags: ["6+"],
        price: 29.40,
        img: "./img/10.jpg",
        rating: 4.1,
    },
    {
        title: "Всё о Манюне",
        author: "Абгарян Н.",
        tags: ["8+", "12+"],
        price: 45.60,
        img: "./img/11.jpg",
        rating: 4.1,
    },
    {
        title: "Все-все животные",
        author: "Дмитриева В.Г.",
        tags: ["6+"],
        price: 17.40,
        img: "./img/12.jpg",
        rating: 3.9,
    },
];

//товары после применения поиска или фильтров, которые будем показывать пользователю
let currentState = [...items];

//сделаем выборку
//найдем контейнер для хранения товаров
const itemsContainer = document.querySelector('#shop-items');
//шаблон для карточки товара
const itemTemplate = document.querySelector('#item-template');
//выведем текст, если ничего не найдено под то, что введет пользователь
const nothingFound = document.querySelector('#nothing-found');

//напишем ф-ю для создания верстки карточки товара
function render(array) {
    //перебор item не нужен, тк мы ниже деструктурируем св-ва объекта
    //array.forEach((item) => {
    //берем за основу шаблон товара
    // const template = makeTamplate(item);
    //вставляем контейнер на страницу
    // itemsContainer.append(template);
    //  });

    //для удобства, вместо перебора forEach выше, разберем объект на отдельные переменные = деструктурируем св-ва объекта
    const { title, author, tags, price, img, rating } = array;

    //очистим текст "Ничего не найдено" на странице, тк он больше не нужен
    nothingFound.textContent = ' ';
    //берем за основу шаблон товара
    const item = itemTemplate.content.cloneNode(true);
    //наполняем шаблон информацией из обекта
    item.querySelector('h1').textContent = title;
    item.querySelector('p').textContent = author;
    item.querySelector('.price').textContent = price + ' ' + 'руб';
    //если в обьекте записать price в виде '33.40 руб', то привести это значение к числу нужно сначала достать дробное число с помощью parsetFloat, а потом ф-лу написать как выше и добавить 'руб'????
    item.querySelector('img').src = img;

    //находим контейнер для рейтинга
    const ratingContainer = item.querySelector('.rating');
    //рисуем необходимое кол-во звездочек
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star') //font-awesome
        ratingContainer.append(star);
    }

    //находим контейнер для tags
    const tagsContainer = item.querySelector(`.tags`);
    //рисуем теги для товара
    tags.forEach((tag) => {
        const age = document.createElement('div');
        age.classList.add('tag');
        age.textContent = tag;
        tagsContainer.append(age);
    })

    return item;
}

// напишем ф-ю для отрисовки и перерисовки карточек товаров
function renderItems(arr) {
    //удалить предыдущие карточки из контейнера
    itemsContainer.innerHTML = '';
    //очистить текст "Ничего не найдено", если он был и больше не нужен
    nothingFound.textContent = ' ';
    //добавить текст "Ничего не найдено", если не нашлось ни одного подходящего товара
    arr.forEach((item) => {
            //вызываем ф-ю для каждого товара, чтобы она вставила по шаблону необходимый товар, совпадающий с пользователем, в itemsContainer
            const resultItem = render(item);
            itemsContainer.append(resultItem);
        })
        //Если массив товаров пустой подставляем текст "ничего не найдено"
    if (arr.length === 0) {
        nothingFound.textContent = 'Ничего не найдено';
    }
}
//передаем копию массива, а не исходный массив, т.к после фильтрации/сортировки будет браться уже отфильтрованный/отсортированный массив и сразу сортируем по алфавиту
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

//напишем ф-ю для сортировки товаров по алфавиту
function sortByAlphabet(a, b) {
    //смотрим по св-ву title
    //если title первого товара алфавитно меньше второго
    if (b.title > a.title) {
        return -1;
        //если title первого товара алфавитно больше второго
    } else if (b.title < a.title) {
        return 1;
        //если они равны
    } else {
        return 0;
    }
}

//нужно отсортировать товары из select. У каждого элемента option есть свойство value, в котором записана строка, определяющая тип сортировки: alphabet — по алфавиту, expensive — сначала дорогие, rating - по рейтингу.

//запишем в переменную sortControl select и добавим на него обработчик события "change", те хотим среагировать в тот момент, когда пользователь изменяет выбранную опцию в выпадающем списке

//найдем select c опциями сортировки
const sortControl = document.querySelector('#sort');

//навесим обработчик события в зависимости от опции сортировки
sortControl.addEventListener("change", (event) => {
    //в переменную запишем атрибут value, что выбрал пользователь
    const selectedOption = event.target.value;
    switch (selectedOption) {
        //почему-то не получается через if else... пишет не определена переменная expensive, но почему не определена, если const selectedOption = event.target.value они вытягиваются из html????
        case 'expensive':
            //сначала дорогие
            currentState.sort((a, b) => b.price - a.price)
            break;
        case 'cheap':
            //дешевые
            currentState.sort((a, b) => a.price - b.price)
            break;
        case 'rating':
            //от более высокого рейтинга к более низкому
            currentState.sort((a, b) => b.rating - a.rating)
            break;
        default:
            //по алфавиту
            currentState.sort((a, b) => sortByAlphabet(a, b))
            break;
    }
    //вызовем ф-ю для вывода на страницу массива
    renderItems(currentState);
})

//поиск товаров
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');

//напишем ф-ю для поиска товаров по введенному пользователем тексту (сбрасывает фильтр)
//почему здесь ф-я без параметров??? и не вызываем ее, куда передаем исходный массив???
function applySearch() {
    //преобразуем значение input: содержимое input - value приведем к  нижнему регистру и уберем лишние пробелы
    const newsearchInput = searchInput.value.toLowerCase().trim();
    //отфильтруем массив согласно введенному пользователем тексту
    currentState = items.filter((elem) => elem.title.toLowerCase().includes(newsearchInput));
    //отфильтрованный массив отсортировали по афавиту
    currentState.sort((a, b) => sortByAlphabet(a, b));
    //сбросываем значение выбранной опции в верстке (на случай, если пользователь успел выбрать какую-то из сортировок).
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}
//добавим обработчик событие при клике на кнопку
//и здесь ф-я applySearch без параметров???
searchBtn.addEventListener('click', applySearch);
//добавим обработчик событие "search", он сработает как при нажатии Enter, так и при очистке содержимого поля на крестик.
searchInput.addEventListener('search', applySearch);