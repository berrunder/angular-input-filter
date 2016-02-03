'use strict';
var app = angular.module('myApp', []);

var vinRegExp = /^[\dA-Z]+$/,
    licenseRegExp = /^(\d\d)\s*(\d\d|[А-Я]{2})\s*(\d{6})$/;

app.controller('MyCtrl', ['$scope', function ($scope) {
    $scope.license = '';
    $scope.vin = '';
}]);


app.directive('license', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            ctrl.$parsers.push(function (inputValue) {
                var transformedInput = $filter('license')(inputValue);
                ctrl.$setViewValue(transformedInput);
                ctrl.$render();

                return transformedInput;
            });

            ctrl.$render = function () {
                var value = $filter('license')(ctrl.$viewValue);
                if (value && licenseRegExp.test(value)) {
                    value = value.replace(licenseRegExp, '$1 $2 $3');
                }

                element.val(value);
            };

            ctrl.$validators.license = function (modelValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                return licenseRegExp.test(modelValue);
            };
        }
    };
}]);

app.directive('vinInput', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.push(function (inputValue) {
                var transformedInput = $filter('vin')(inputValue);

                if (transformedInput !== inputValue) {
                    ctrl.$setViewValue(transformedInput);
                    ctrl.$render();
                }

                return transformedInput;
            });

            ctrl.$validators.vin = function (modelValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }

                return vinRegExp.test(modelValue);
            };

            ctrl.$render = function () {
                element.val($filter('vin')(ctrl.$viewValue));
            };
        }
    };
}]);

var charMapRuEn = {
    'Й': 'Q',
    'Ц': 'W',
    'У': 'E',
    'К': 'R',
    'Е': 'T',
    'Н': 'Y',
    'Г': 'U',
    'Ш': 'I',
    'Щ': 'O',
    'З': 'P',
    'Ф': 'A',
    'Ы': 'S',
    'В': 'D',
    'А': 'F',
    'П': 'G',
    'Р': 'H',
    'О': 'J',
    'Л': 'K',
    'Д': 'L',
    'Я': 'Z',
    'Ч': 'X',
    'С': 'C',
    'М': 'V',
    'И': 'B',
    'Т': 'N',
    'Ь': 'M'
};

function charsetFixRuEn(word) {
    return word.split('').map(function (char) {
        return charMapRuEn[char] || char;
    }).join('');
}

function isDigit(char) {
    return /\d/.test(char);
}

function isCyrillic(char) {
    return /[А-Я]/.test(char);
}

function replaceAt(str, index, char) {
    return str.substr(0, index) + char + str.substr(index + char.length);
}

app.filter('vin', function () {
    return function (inputVal) {
        if (!inputVal) {
            return '';
        }

        var fixedValue = charsetFixRuEn(
            (inputVal + '').trim()
                .toUpperCase()
        );

        // уберём лишние символы ("Другие значения вбить нельзя")
        return fixedValue.replace(/[^\dA-Z]/g, '');
    };
});

app.filter('license', function () {
    return function (inputVal) {
        if (!inputVal) {
            return '';
        }

        var fixedValue = (inputVal + '').trim()
            .toUpperCase()
            .replace(/[^\dА-Я]+/g, '');

        if (fixedValue.length > 3) {
            if (isDigit(fixedValue[2]) && fixedValue[3] === 'О') {
                fixedValue = replaceAt(fixedValue, 3, '0');
            } else if (isDigit(fixedValue[3]) && fixedValue[2] === 'О') {
                fixedValue = replaceAt(fixedValue, 2, '0');
            } else if (isCyrillic(fixedValue[2]) && fixedValue[3] === '0') {
                fixedValue = replaceAt(fixedValue, 3, 'О');
            } else if (isCyrillic(fixedValue[3]) && fixedValue[2] === '0') {
                fixedValue = replaceAt(fixedValue, 2, 'О');
            }
        }

        return fixedValue;
    };
});