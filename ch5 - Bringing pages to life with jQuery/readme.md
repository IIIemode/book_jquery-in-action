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

### Вопросы и задания

### 5.1.2 Getting and setting styles
