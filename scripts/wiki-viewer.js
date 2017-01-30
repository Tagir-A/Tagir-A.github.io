$(function() {
	function reset() {
		$(".verticalCenter").addClass("centering")
		for (let i = 0; i < 10; i++) {
			$(".searchResult").remove()
		}
	}
	let query
	$("#searchForm").submit( function(e){
		e.preventDefault()
		query = $(this).find('input[type="search"]').val();
		reset()
			$(".verticalCenter").removeClass("centering")
			$.getJSON(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=10&namespace=0&format=json&callback=?`, function(data) {
				if (data[2][0].includes("may refer")) {
					data[1].shift()
					data[2].shift()
					data[3].shift()
				}
				for (let i = 0; i < data[1].length; i++) {
					$(".col-md-12").append(`<a target="_blank" href="${data[3][i]}" class="searchResult">
					<h2>${data[1][i]}</h2>
					<p>${data[2][i]}</p>
				</a>`)
				}
			})
		})
	$("input[type='reset']").click(function() {
		reset()
	})
})