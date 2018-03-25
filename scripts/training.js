(function(){
    document.addEventListener('DOMContentLoaded', function(){
        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        const title = document.querySelector('#title')
        const searchString = window.location.search
        const searchParams = new URLSearchParams(searchString)
        const param = searchParams.get('utm')
        title.textContent = param == 2 ? 'Стройка в Одинцово' : 'Стройка в Кунцево'
    })
})()