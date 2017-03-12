# Introducing jQuery
> “There are only two kinds of languages: the ones people complain about and the ones nobody uses.”
> — Bjarne Stroustrup

## Unobtrusive (ненавязчивый) JS 
Нужно разделять:
* Структуру документа (HTML), structure
* Внешний вид документа (CSS), style
* Поведение элементов документа (JS), behavior

```html
<!-- Плохо, внешний вид смешан с поведением и структурой: -->
<button onclick="document.getElementById('xyz').style.color='red';">
    Click Me
</button>
```

Любые скрипты должны работать с HTML из файлов, подключаемых внизу страницы, перед `</body>` за исключением особых случаев (полифилы и пр.).

## Почему скрипты нужно подключать внизу страницы
* Чтоб не мешали рендерить страницу.
* Чтоб не блокировали загрузку других ресурсов.

## Chaining
```js
// Instead of writing
var obj = new Obj();
obj.method();
obj.anotherMethod();
obj.yetAnotherMethod();

// you can write
var obj = new Obj();
obj.method().anotherMethod().yetAnotherMethod();
```

## Контекст в селекторах
Чтобы выбрать элемент из DOM, нужно передать селектор и опционально [контекст](http://api.jquery.com/jquery/#selector-context):

```js
$( "div.foo" ).click(function() {
    // Начнет искать не все спаны, а спаны внутри .foo
  $( "span", this ).addClass( "bar" );
});
```

Тестирование использования контекста в селекторах: http://output.jsbin.com/aciji4/6

jQuery сначала находит контекст, а потом элементы из селектора в нем.

## Как называть то, что вернет jQery('div')
* Коллекция
* Выборка
* Объект
* Сет

## Ожидание загрузки документа

```js
// Весь документ целиком:
$(window).on('load', function() {}); // можно использовать только раз

// Дождались, пока загрузится и распарсится HTML (сгенерится DOM):
$(document).ready(function() {}); // можно использовать много раз
$(function() { /*... */ }) // сокращенный синтаксис

// Но лучше всего располагать код перед </body>.
```

