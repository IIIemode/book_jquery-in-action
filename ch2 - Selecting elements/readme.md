# 2. Selecting elements
* Selecting elements with jQuery by using CSS selectors
* Discovering the unique jQuery-only filters
* Developing custom filters
* Learning the context parameter of the jQuery() function

jQuery-селекторы полностью совместимы с CSS3.

Переменные с объектами jQuery нужно именовать так:

```js
let $allElements = $('*'); // доллар-префикс
```

### 2.2.2 Id selector
Айдишники могут содержать что угодно, кроме пробелов (стандарт w3c). Эти символы можно эскейпить: `$('#hello\\.world')` — точка внутри айдишника.

Под капотом используется `getElementById`.

Вернет первый попавшийся элемент с айди. Или нулевую коллекцию, если таких айдишников нет.

Нельзя использовать с именами тегов, классами. Потеряем в производительности:

```js
// Плохо:
let $slider = $('div#slider');

// Хорошо:
let $slider = $('#slider');
```

### 2.2.3 class selector
Не привязываемся к элементам (используем БЭМ). Ищем по классам:

```js
// Плохо:
let $slider = $('div.js-slider');

// Хорошо:
let $slider = $('.js-slider');
```

### 2.2.4 Tag selector
`getElementsByTagName` под капотом.

Не использовать с `id`. Это бессмысленно и вредит производительности.

Этот селектор самый медленный, нужно использовать с осторожностью.

Так делать можно (если очень надо), проход по DOM производится 1 раз:

```js
var $els = $('div, span');
```

## 2.3 Retrieving elements by their hierarchy
[Селекторы по взаимному расположению элементов](https://learn.javascript.ru/css-selectors#отношения)

* `#slider > li` — непосредственные дочерние элементы
* `.current ~ li` — все последующие `li` того же уровня, что и `.current`
* `.current + li` — первый следующий элемент того же уровня, что и `.current`

## 2.4 Selecting elements using attributes

`querySelectorAll` под капотом.

Нужно быть внимательными с кавычками: `$('a[href^="http://"');`. Использовать сочетание одинарные/двойные и по возможности избегать экранирования.

Элемент в селекторе использовать необязательно: `$('[class^="js-"]')` — выбрать все элементы, класс которых начинается с `js-`.

В CSS нет фильтра `!=` для атрибутов. Но он есть в jQuery (своя реализация, выполняется дольше):

```js
$("a[href!='http://jquery.com']") // все ссылки, кроме http://jquery.com
```

Можно использовать несколько атрибутов: `input[type="text"][required]`.
* [Селекторы атрибутов](https://learn.javascript.ru/css-selectors#селекторы-атрибутов)

## Стандарт
* [Селекторы CSS3, спецификация](https://www.w3.org/TR/css3-selectors/#selectors)

## 2.5 Introducing filters (псевдоклассы CSS + бонусы jQuery)
### 2.5.1 Position filters
Фильтры из jQuery (нет в CSS):

* `:first`
* `:last`
* `:even`
* `:odd`
* `:eq(n)` — выбрать элемент с индексом `n` (может быть отрицательным)
* `:gt(n)` — выбрать элементы после текущего не включая его (может быть отрицательным)
* `:lt(n)` — выбрать элементы после текущего не включая его (может быть отрицательным)

Отрицательный аргумент `n` будет брать элементы с конца коллекции: последний — `-1`, предпоследний `-2` и т. д.

В фильтрах, которые дает jQuery, индексы начинаются с `0`. В фильтрах из спецификации CSS индексы идут с `1`.

### 2.5.2 Child filters
`eq` работает только с выборкой по селектору, `nth-child` работает *со всеми элементами внутри родителя, независимо от их типа, даже если в селекторе они не указаны*. См. `./selectors_example.html`, пример `nth-child vs eq`.

* https://learn.javascript.ru/css-selectors#фильтр-по-месту-среди-соседей
* https://learn.javascript.ru/css-selectors#фильтр-по-месту-среди-соседей-с-тем-же-тегом

### 2.5.3 Form filters
Выбрать чекнутые чекбоксы: `$('input[type="checkbox"]:checked')`. Нужно использовать именно CSS-псевдокласс `:checked`.

Так выберутся только те, которые изначально чекнутые в HTML (прописан атрибут `checked`): `$('input[type="checkbox"][checked]')`.

Есть jQuery, нет в CSS:
* `:checkbox`: `$('input:checkbox:checked')`.
* `:button` — выберет кнопки (`button` и `input[type="reset|submit|button]`).
* `:file` — `input[type="file"]`
* `:image` — `input[type="image"]`
* `:input` — form elements: `input|select|textarea|button`
* `:password` — `input[type="password"]`
* `:radio` — `input[type="radio"]`
* `:reset` — `input[type="reset"]`, `button[type="reset"]`
* `:selected` — выбранные элементы `option` в селекте
* `:submit` — `input[type="submit"]`, `button[type="submit"]`
* `:text` — `input[type="text"]`, `input` без указанного типа (`text` будет по умолчанию)

### 2.5.4 Content filters
Нет в CSS:
* `$('li:has(a):contains(Link 3)')` — выбрать все ссылки с текстом `Link 3` внутри `li`.
* `:parent` — выберет элементы, которые являются родителями (содержать хоть один дочерний).

Есть в CSS:
* `:empty` — выбрать пустой элемент (нет детей).

### 2.5.5 Other filters
jQuery-фильтры (нет в CSS):
* Visibility: `:hidden`, `:visible`
* Обратить селектор: `input:not(:checkbox)`.
* `:animated` — элементы в процессе анимации
* `:header` — заголовки `h1...h6`

Нужно сначала сделать выборку и только потом ее фильтровать через `:not`:

```js
// Не так:
$(':not[img[src*="dog"]') // выдает все, что не img

// а так:
$('img:not([src*="dog"]') // нормально отработает
```

`:hidden` — не видны на странице. Входит и `display: none`, `visibility: hidden`, `input[type="hidden"]`.


**В jQuery 3 `<br>` и пустые инлайновые элементы считаются видимыми**. Они фактически занимают место (перевод строки, пробел).

### 2.5.6 How to create custom filters
Можно создавать кастомные фильтры для выборок, которые часто повторяются.

Пример: http://jsbin.com/mucigo/edit?html,js,console,output

## 2.6 Enhancing performances using context
По умолчанию в `$()` подразумевается, что выборка по селектору идет внутри `document`. Но мы можем задать контекст вторым параметром (DOM-элемент, строка или jQuery-коллекция).

```js
// Плохо, самый медленный вариант. Ищем сначала p, потом фильтруем по #myId:
$('#myId p')

// Лучше, работает быстрее, вернет то же самое, но будет искать сначала #myId, а потом внутри него p:
$('p', '#myId')

// Хорошо. Работает как предыдущий, но читается проще:
$('#myId').find('p')
```

Если имеется выборка и нужно найти что-то внутри нее, то используем контекстный поиск через `.find`:

```js
var $form = $('#myForm');

// Хорошо:
$form.find(':checked').addClass('_on');

// Плохо. Через второй параметр $ будет то же самое, но читается хуже:
$(':checked', $form).addClass('_on');
```

См. [пример](2.6_performance.html).