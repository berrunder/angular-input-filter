## Тестовое задание

Отдельная страница с JS-проверкой

Для тестового задания выберите **два любых** пункта из списка ниже, которые будете делать.

Условия и рекомендации:

- На выходе два файла: html и JS
- Можно использовать любые библиотеки
- Код должен быть аккуратным и эффективным (на это внимательно смотрим)
- Вёрстку оценивать не будем
- Выполнение задания с высшим баллом является плюсом
Нужно сделать проверку нескольких полей. Проверка делается только после того, как убран фокус из поля. Также важно помогать пользователю, а не пугать его ошибками (подробнее внутри каждого задания). Необходимо сделать проверку для следующих полей:
- VIN-номер: инпут, ровно 17 знаков, только латиница, цифры и заглавные буквы. Другие значение вбить нельзя. Если пользователь не нажал капс-лок или не зажал шифт, мы сами меняем регистр. Если пользователь забыл переключить раскладку с русской на латиницу, то мы сами меняем кириллические буквы на соответсвующую на клавиатуре латинскую. То есть ФЫВА → ASDF.
- Серия и номер документа (одинаково для СТС и ПТС): инпут, ровно 10 знаков,
цифры и кириллица, вид (отображение внутри инпута) следующий: 00 00
000000 или 00 ХХ 000000, где 0 — цифра, а Х — буква.
- Регистрационный номер: инпут, 8 или 9 знаков. Цифры, кириллица, заглавные
буквы. Вид следующий: А 001 АА 77 или А 001 АА 777. То есть в конце может
быть либо 2, либо 3 цифры.
- **Высший балл.** Водительские права: 10 знаков, только заглавные, только
кириллица и цифры. Вид следующий 12 ХХ 123456. На месте ХХ могут быть
цифры или буквы. Важно: если один знак из ХХ буква, то и второй буква. И
наоборот. При этом если пользователь на месте третьего или четвертого знака
ввёл цифру, то если рядом введена буква О, то она меняется на цифру 0. И
наборот: если на месте третьего или четвертого знака буква, то ноль меняется
на О.
- Номер телефона: только цифры. Вид: 8 000 000-00-00.
- Фамилия. Латинские буквы меняем на соответсвующую на клавиатуре
кириллическую. То есть ASDF → ФЫВА.
- **Высший балл.** Дата выдачи документа: инпут, формат: ДД.ММ.ГГГГ, может
быть не раньше, чем текущий день минус 10 лет. Дату можно выбрать
дейтпикером или с клавиатуры. Дейтпикером нельзя выбрать дату, которая не
подходит под условие.