
document.addEventListener('DOMContentLoaded', function (event) {
  var x = document.getElementsByClassName('cmp-languagenavigation__item--active')[0]
  if (typeof x === 'undefined') return

  var classnameWithLanguage = x.className.split(' ')[1]
  if (typeof classnameWithLanguage === 'undefined') return

  var span = document.createElement('span')
  span.setAttribute('class', classnameWithLanguage)

  var language_code = classnameWithLanguage.split('-')
  language_code = language_code[language_code.length - 1]

  var text = document.createTextNode('')
  span.appendChild(text)

  var targetElement = document.getElementsByClassName('cmp-languagenavigation')[0]
  if (typeof targetElement === 'undefined') return
  targetElement.insertBefore(span, targetElement.firstChild)
})
