(function(){
    document.addEventListener('DOMContentLoaded', function(){
        function getParam(name) {
            const searchString = window.location.search
            const params = new URLSearchParams(searchString)
            const param = params.get(name)
            return param
          }
        const title = document.querySelector('#title')
        const param = getParam('utm')
        console.log(param)
        title.textContent = param == 2 ? 'Стройка в Одинцово' : 'Стройка в Кунцево'
    })
})()