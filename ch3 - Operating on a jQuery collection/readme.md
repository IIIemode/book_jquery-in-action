# 3. Operating on a jQuery collection

* Creating and injecting new HTML elements in the DOM
* Manipulating a jQuery collection
* Iterating over the elements of a jQuery collection

## 3.1 Generating new HTML
Создать пустой элемент без содержимого:

```js
let $el = $('<div>'); // Эквивалентно $('<div></div>') и $('<div/>'), но короче
```

При создании элементов с контентом нужно следить за валидностью HTML:

```js
let $el = $('<div>Hello</div>'); // Тег закрыт, когда есть контент
```

При создании элементов с атрибутами нужно передавать их в виде объекта вторым параметром:

```js
let $img = $('<img>', {
        alt: 'Star icon',
        src: 'images/ico_star.png',
        'class': 'ico-star' // в кавычках, class — зарезервированное слово
    })
    .appendTo('body'); // сразу вставляем в DOM при создании
```

## 3.2 Managing the jQuery collection
### 3.2.1 Determining the size of a set
jQuery-коллекция похожа на массив (но это объект) и имеет метод `length`:

```js
$('p').length // покажет количество параграфов на странице
```

### 3.2.2 Obtaining elements from a set
Можно использовать синтаксис а-ля массив и по индексу в квадратных скобках доставать элементы из коллекции:

```js
var img = $('img')[0]; // достанет первую картинку как DOM-объект

// аналогично, с помощью метода get:
var img = $('img').get(0);
var img = $('img').get(-1); // последний элемент
var img = $('img').get(-2); // предпоследний элемент
var img = $('img').get(); // без индекса вернет JS-массив DOM-объектов
```

Код метода `get`: `jquery-notes/jquery-3.1.1.js:130`

`$('img')` — это коллекция jQuery, содержащая DOM-объекты. Свойства и методы jQuery применимы к коллекции, но не к отдельным ее элементам. Т. о., чтобы достать третий элемент из коллекции в виде jQuery-объекта через `get()` придется сделать так: `$($('p').get(2))`. Так делать не нужно, есть метод `eq`:

```js
var $thirdParagraph = $('p').eq(2);
var $thirdParagraph = $('p:eq(2)'); // то же самое, но медленнее
```

В jQuery некоторые методы имеют экваваленты в виде фильтров: `.eq()` и `:eq()`. **Всегда предпочтительно использовать методы, они работают быстрее.**

Методы `.first()` и `.last()` — сахар для `.eq(0)` и `.eq(-1)`.

Еще раз:

* `.get(1)` вернет DOM-элемент
* `.get()` вернет массив всех элементов
* `.eq(1)` вренет jQuery-объект.

`$('div').toArray()` — вернет массив DOM-элементов. В отличие от `get()` без параметров вернет массив в любом случае (`get` с параметром вернет `undefined`, если не найдет элемент).

`var index = $('div').index('.my-class')` — вернет индекс элемента из коллекции. Аргументы могут быть разные, см. [код примера](index_method.html). 

### 3.2.3 Getting sets using relationships
* `.children([selector])` — выбрать детей по слектору.
* `.content()` — как `children`, но учитывает тектовые ноды.
* [`nextUntil([selector|element][,filter])`](https://api.jquery.com/nextUntil/) — выбрать элементы до определенного.
* [`closest(selector [, context])`](https://api.jquery.com/closest/) — вернет ближайший родительский элемент, удовлетворяющий селектору. Если не найдет родителя — вернет сам элемент.
* `.find(selector)` — вернет выборку из дочерних элементов, удовлетворяющих селектору

Прочие методы тут: https://api.jquery.com/category/traversing/tree-traversal/

### 3.2.4 Slicing and dicing a set
Документация: https://api.jquery.com/category/traversing/miscellaneous-traversal/

Добавить элементов в выборку:

```js
$topMenu.find('li').add($('#bottomMenu').find('li'));
```

Убрать элементы из выборки:

```js
$topMenu.find('li').not('.active');
```

В `not()` можно передавать функцию-фильтр:

```js
var $pWithChildren = $('p').not(function (index, element) {
    // не добавлять абзацы без дочерних элементов
    return ($(element).children().length === 0);
});
```

Отфильтровать выборку (http://api.jquery.com/filter/):

```js
$('td').filter(function() {
    // Оставить только те td, в которых положительные цифры
    return this.innerHTML.match(/^\d+$/);
});
```

`filter` в цепочке:

```js
$('img')
    .addClass('opaque') // добавить всем класс
    .filter('[title*="dog"]') // оставить те, у которых dog в title
    .addClass('red-border'); // только им добавить класс red-border
```

`$('div').slice(start[, end])` — ограничивает выборку по позиции, работает как `slice` в строках. От `start` включительно до `end` не включая его.

`$('div').has('p')` — оставит в выборке только дивы, у которых есть дочерние абзацы.

`.map(function(index, element){})` — выполнить действие над каждым элементом коллекции. **Отличается от `map` в массивах порядком аргументов и возвращает jQuery-объект**. Часто нужно, чтобы вернулся обычный массив, для этого можно использовать `toArray()` или нативный `map`:

```js
// Обрабатываем коллекцию, преобразуем результат в массив:
var allIDs = $('div').map(function(index, element) {
    return element.id;
}).toArray();

// Используем нативный метод map из JS:
var allIDs = $('div').get().map(function(element, index) {
    return element.id;
});
```

См. [пример](3.2.4_operations_on_sets.html).

`.each()` так же возвращает коллекцию и порядок аргументов в коллбэке отличается от `forEach` из массива.

### 3.2.5 Even more ways to use a set
`.is()` — проверяет, имеется ли в выборке хотя бы 1 элемент удовлетворяющий параметру (селектор, функция, DOM-элемент, jQuery-объект). Работает быстро.

`.end()` — отменяет последнюю фильтрацию выборки, возвращает предыдущую выборку в цепочоке:

```js
$('img')
    .filter('[title]').hide() // скрыть отфильтрованные
    .end() // вернуться к первоначальной выборке до фильтрации
    .addClass('my-class'); // добавить класс ко всем картинкам
```

jQuery при операциях над выборкой сохраняет изменения в стеке. Методы `end()` и [`addBack`](http://api.jquery.com/addback/) берут состояния выборки из него.

```js
$( "li.third-item" ) // первая выборка в стеке — третий элемент списка
    .nextAll() // добавляем в стэк все последующие сиблинги (третий не включается)
    .addBack() // включаем в выборку и третий
  .css( "background-color", "red" );
```

### Документация
http://api.jquery.com/category/traversing/