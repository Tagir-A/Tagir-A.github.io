$(function() {
	let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"]
	function createUrl(type, name) {
		return `https://wind-bow.gomix.me/twitch-api/${type}/${name}?callback=?`
	}
	function getChannelData() {
		channels.forEach((channel, i) => {
			$(`#element${i} .text-block h2 a`).text(channel)
			$(`#element${i} .text-block h2 a`).attr("href", `https://www.twitch.tv/${channel}`)
			$.getJSON(createUrl("channels", channel), function(data) {
				let status = "unknown"
				if (data.status == 404) {
					status = data.message
					$(`#element${i} .led`).addClass("not-found")
				} else {
					status = data.status
				}
				$(`#element${i} .text-block p`).text(status)
				let logo = data.logo ? data.logo : "https://placekitten.com/g/70/70"
				$(`#element${i} img`).attr("src", logo)
			})
			
		})
	}
	function getStreamData() {
		channels.forEach((channel,i) => {
			$.getJSON(createUrl("streams", channel), function(data) {
				if (!data.stream) {
					$(`#element${i} .led`).addClass("offline")
				} else {
					let streamInfo = data.stream.channel.status
					$(`#element${i} .led`).addClass("online")
				}
			})
		})
		console.log("check")
	}
	function applyHidden(name) {
		for (let i = 0; i < channels.length; i++) {
			let isOnOrOff = $(`#element${i} .led`).hasClass(name) || $(`#element${i} .led`).hasClass("not-found")
			$(`#element${i}`).toggleClass("hidden", isOnOrOff)
		}
	}
	$("#all").addClass("active")
	getChannelData()
	getStreamData()
	$("#all, #online, #offline").click(function(event) {
		event.preventDefault()
		$("#all, #online, #offline").removeClass("active")
		$(this).addClass("active")
	})
	$("#online").click(function(event) {
		applyHidden("offline")
	})
	$("#offline").click(function(event) {
		applyHidden("online")
	})
	$("#all").click(function(event) {
		for (let i = 0; i < channels.length; i++) {
			$(`#element${i}`).removeClass("hidden")
		}
	})
})