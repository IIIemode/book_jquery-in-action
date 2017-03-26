# 5 Bringing pages to life with jQuery

* Manipulating element class names
* Setting the content of DOM elements
* Getting and setting form element values
* Cloning DOM elements
* Modifying the DOM tree by adding, moving, or replacing elements

## 5.1 Changing element styling
### 5.1.1 Adding and removing class names
`className` вообще отстой, работать с классами как со строкой неудобно.

[`classList`](http://learn.javascript.ru/attributes-and-custom-properties#классы-в-виде-объекта-classlist), IE10+ лучше, но позволяет работать только с одним элементом, а jQuery может работать с коллекцией.

`addClass(String|Function)` — добавляет класс(-ы) ко всей коллекции.

`removeClass()` — удаляетт классы.

В методы можно передавать функцию, которая сможет обработать каждый элемент коллекции.

`toggleClass(String|Function, state)` — классы или ф-я возвращаюая классы в виде строки для переключения (каждый индивидуально). `state` говорит, добавлять или удалять классы.

См. кейс [`5.1.1_toggleClass.html`](5.1.1_toggleClass.html).

`hasClass()` — проверить наличие класса. `true`, если все эелменты сета имеют класс.

### 5.1.2 Getting and setting styles
`css(name, value)` — назначить стили. Работает подобно `attr`. Так же можно передавать функцию в качестве `value`.

Шорткат для изменения значения: `$('.expandable').css('width', '+=20')`.

Вместо `name, value` можно передавать объект сразу с пачкой CSS-свойств:

```js
$('p').css({
    margin: '1em',
    color: '#1933FF',
    opacity: function (index, currentValue) {
        return 1 - ((index % 10) / 10);
        // (index % 10) - чтоб значение было от 0 до 1 даже если будет больше 10 элементов в сете
    }
});
```

`css(name)` как геттер принимает строку или массив CSS-свойств и возвращает стили. Вернет строку или объект.

#### Getting and Setting Dimensions
`.width()` и `.height()`, в отличие от `.css('width|height')` вернут сразу число.

До jQuery 3 возвращались округленные значения (`parseInt`), в `3.0` округления нет, значение более точное.

`el.style.width|height` сработают только для значений, установленных в атрибуте `style`. Для значений из CSS используют [`getComputedStyle`](https://learn.javascript.ru/styles-and-classes), который вернет строку с пикселями: `500px`.

См. примеры в [`css.html`](examples/css.html).

`innerWidth()` — вернет ширину + паддинг не включая бордер.

`outerWidth([includeMargin])` — вернет ширину + паддинг + бордер. Если передать `true`, то включит еще и маржин.

Имеются аналогичные методы для `height`.

См. [примеры](examples/5.1.2_width_height.html).

#### Positions and Scrolling
`offset()` — геттер/сеттер. Вернет/установит позицию относительно документа. Возвращает/принимает объект вида `{top: y, left: x}` или ф-ю, которая такой объект вернет. Если в сете более одного элемента, то сеттер установит координаты для каждого. А геттер возьмет только координаты первого.

`position()` — координаты относительно родителя с позиционированием (`absolute|relative|fixed`). Только геттер.

См. [примеры](examples/5.1.2_offset.html).

`scrollLeft([value])`, `scrollTop([value])` — геттер/сеттер скролла. Работает на элементах со скроллом.

## Вопросы и задания

### 50 оттенков серого
На [странице](tasks/50_shades_of_grey.html) имеется 50 блоков, все розовые. Используя метод `.css()` перекрасьте эти блоки так, чтобы получилось 50 оттенков серого:

<img src="tasks/50_shades_view.png" width="400">

### Шарик, отталкивающийся от стен
Используя полученные знания реализуйте шарик как на [примере](https://youtu.be/M0YAKFMTxKw). Шар должен перемещаться по всему документу, отталкиваясь от краев как от стен.

Для выполнения задачи понадобится функция [`setInterval`](http://learn.javascript.ru/settimeout-setinterval#setinterval).

### Кнопка «Наверх»
Реализуйте кнопку «Наверх», которая появляется после того, как пользователь проскроллил хотя бы один экран.