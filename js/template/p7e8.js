var word;
var num;
// let resultOld;
// let newArray = [];
var picSrc
let count = 0
$("#score-tex").text(count)
const welcomImg = "assets/images/p7e8/welcome.png"
var msg = $(".all").find(".content")
const allWords = ["cat", "pig", "elephant", "flamingo", "giraff", "lion", "monkey", "tiger", "dog", "zebra"];
var words = ["cat", "pig", "elephant", "flamingo", "giraff", "lion", "monkey", "tiger", "dog", "zebra"];
var pics = ["assets/images/p7e8/cat.png", "assets/images/p7e8/pig.png", "assets/images/p7e8/elephant.png", "assets/images/p7e8/flamingo.png", "assets/images/p7e8/giraff.png", "assets/images/p7e8/lion.png", "assets/images/p7e8/monkey.png", "assets/images/p7e8/tiger.png", "assets/images/p7e8/dog.png", "assets/images/p7e8/zebra.png"]




function generate() {
	$("#img").removeClass("rotate")
	if (words.length > 0) {

		num = Math.floor(Math.random() * (words.length))
		word = words[num]

		picSrc = pics[num]
		$("#img").attr("src", picSrc)
		let voice = new SpeechSynthesisUtterance()
		// voice.voice = voices[2]
		voice.text = word
		window.speechSynthesis.speak(voice)
		document.getElementById('inp').value = ''
	} else if (words.length === 0 && count === 0) {
		document.querySelector('#lose-img').classList.add("yp-animate")
		document.querySelector('#Skip').classList.add("disable")
		$("#btn").addClass("disable");
		$("#speak").addClass("disable");
		// document.querySelector('#lose-img').classList.remove("yp-u-hide")
		// document.querySelector('#feed').classList.remove("yp-u-hide")
		$('.content').html("<div class= 'pop'><h3>you need to answer!!</h3><img  class= 'angryCat' src='assets/images/jungle/angryCat.png'><img/></div>")

	} else if (words.length === 0 && count !== 0) {

		checkScoure()
	} else {
		console.log("game finshed")
	}
}


// function getRandomIndex(arr) {
// 	let randomIndex = Math.floor(Math.random() * (arr.length))
// 	let item = arr[randomIndex]

// 	return arr.indexOf(item)
// }


// function generate() {
// 	$("#img").removeClass("rotate")
// 	if (words.length > 0) {



// 		word = getRandomIndex(words);

// 		if (resultOld == word) {
// 			newArray = words.filter(item => item !== resultOld)
// 			word = getRandomIndex(newArray);
// 		}
// 		resultOld = word;
// 		picSrc = pics[word]


// 		$("#img").attr("src", picSrc)
// 		let voice = new SpeechSynthesisUtterance()
// 		voice.text = word
// 		window.speechSynthesis.speak(voice)
// 		document.getElementById('inp').value = ''
// 	} else if (words.length === 0 && count === 0) {
// 		document.querySelector('#lose-img').classList.add("yp-animate")
// 		document.querySelector('#Skip').classList.add("disable")
// 		$("#btn").addClass("disable");
// 		$("#speak").addClass("disable");
// 		$('.content').html("<div class= 'pop'><h2>you need to answer!!</h2><img  class= 'angryCat' src='assets/images/jungle/angryCat.png'><img/></div>")

// 	} else if (words.length === 0 && count !== 0) {

// 		checkScoure()
// 	} else {
// 	}
// }

function checkScoure() {
	$(msg).css("display", "flex");
	if (count > allWords.length / 2) {

		$('.content').html("<div class= 'pop'><h1>your Score is:</h1><h3>" + count + "  out of  " + allWords.length + "</h3><br><h3 class= 'congrts'>Congratulations</h3><img  class= 'happyCat' src='assets/images/jungle/happyCat.png'><img/></div>")
		$('#sub').addClass("disable")
		$("#Skip").addClass("disable");
		$("#speak").addClass("disable");
	} else {
		$('.content').html("<div class= 'pop'><h1>your Score is:</h1><h3>" + count + "  out of  " + allWords.length + "</h3><br><h3 class= 'faild'>try again</h3><img  class= 'sadCat' src='assets/images/jungle/sadCat.png'><img/></div>")

	}
	$('#sub').addClass("disable")

}
document.getElementById('btn').addEventListener('click', function () {

	$("#btn").addClass("disable");
	$("#speak").removeClass("disable");
	$("#inp").removeClass("disable");
	$("#sub").removeClass("disable");
	$("#Skip").removeClass("disable");
	generate()
	setTimeout(() => {
		$("#btn").removeClass("disable");

	}, 1500);

})
document.getElementById('Skip').addEventListener('click', function () {
	$("#Skip").addClass("disable");
	$("#speak").removeClass("disable");
	$("#inp").removeClass("disable");
	$("#sub").removeClass("disable");
	words.splice(num, 1)
	pics.splice(num, 1)
	generate()

	setTimeout(() => {
		$("#Skip").removeClass("disable");
	}, 1500);

})
document.getElementById('sub').addEventListener('click', function () {

	if (document.getElementById('inp').value.trim() === "") return;

	if (document.getElementById('inp').value.toLowerCase() == word) {
		$(msg).html(`<div class= 'msg right'><h1>Correct!<img  class= 'correcttick' src='assets/images/jungle/correcttick.png'><img/></h1> <button type="button" id="close-meCorr" class="btn">close</button></div>`);
		words.splice(num, 1)
		playSound("assets/images/jungle/cat-correct.mp3");
		pics.splice(num, 1)
		$(msg).css("display", "flex");
		count++
		$("#score-tex").text(count)
		$("#inp").addClass("disable");
		document.getElementById('inp').value = word
		$('#sub').addClass("disable")
		$("#Skip").addClass("disable");
		$("#speak").addClass("disable");
	} else {
		$(msg).html(`<div class= 'msg wrong'><h1><img  class= 'wrongtick' src='assets/images/jungle/wrongtick.png'><img/><br>Correct Answer:${word} </h1><button id="close-me" type="button" class="btn">close</button></div>`)
		words.splice(num, 1)
		pics.splice(num, 1)
		playSound("assets/images/jungle/cat-wrong.wav");
		$(msg).css("display", "flex");
		let wrongValue = document.getElementById('inp').value
		document.getElementById('inp').value = wrongValue
		$('#sub').addClass("disable")
		$("#Skip").addClass("disable");
		$("#speak").addClass("disable");
	}
	if (words.length == 0) {
		checkScoure()
	}
	$("#close-me").on("click", function () {
		$(msg).css("display", "none");
		$('#sub').removeClass("disable")
		$("#Skip").removeClass("disable");
		$("#speak").removeClass("disable");
	})
	$("#close-meCorr").on("click", function () {
		$(msg).css("display", "none");

	})

})

document.getElementById('speak').addEventListener('click', function () {
	let voice = new SpeechSynthesisUtterance()
	voice.text = word
	speechSynthesis.speak(voice)
})

function fnReloadAll() {
	words = ["cat", "pig", "elephant", "flamingo", "giraff", "lion", "monkey", "tiger", "dog", "zebra"];
	pics = ["assets/images/p7e8/cat.png", "assets/images/p7e8/pig.png", "assets/images/p7e8/elephant.png", "assets/images/p7e8/flamingo.png", "assets/images/p7e8/giraff.png", "assets/images/p7e8/lion.png", "assets/images/p7e8/monkey.png", "assets/images/p7e8/tiger.png", "assets/images/p7e8/dog.png", "assets/images/p7e8/zebra.png"]
	$("#btn").removeClass("disable");
	$("#speak").addClass("disable");
	$("#inp").addClass("disable");
	$("#sub").addClass("disable");
	$("#Skip").addClass("disable");
	$(msg).css("display", "none");
	document.querySelector('#lose-img').classList.add("yp-u-hide")
	document.querySelector('#feed').classList.add("yp-u-hide")
	document.getElementById('inp').value = ""
	document.querySelector('#lose-img').classList.remove("yp-animate")
	count = 0
	$("#img").attr("src", welcomImg)
	$("#data").addClass("hide")
	$("#img").addClass("rotate")
	$(".reloadBtnAll").addClass("disable")
	$("#score-tex").text("0")


}
$("#playbtn").on("click", function () {
	$("#data").removeClass("hide")
	const audioEntro = new Audio('./assets/images/jungle/jungle.mp3');
	audioEntro.loop = true;
	audioEntro.play();
	$(".reloadBtnAll").removeClass("disable")
	count = 0
	$("#score-tex").text("0")
})

function fnReloadScreen() {
	$('div.active').find('.showAns').remove();
	$('div.active').find('.option').removeClass('disabled optDisable').on('click');
	stopAudio();
	fnTemplate1_v1($('div.active'));
}

function fnAudio(obj) {
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	var playPromise = $audio2[0].play();

	if (playPromise !== undefined) {
		playPromise.then(function (value) {
			// Automatic playback started!
			// Show playing UI.
			$audio1[0].currentTime = 0;
			$("#slider").slider({
				"value": 0
			});
			$audio1[0].pause();
			$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
			$('#pButton .playImg').show();
			$('#pButton .pauseImg').hide();
		})
			.catch(function (error) {
				// Auto-play was prevented
				// Show paused UI.
			});
	}
}

function showAns() {
	isMusicPlaying = false;

	$audio1[0].pause();
	$audio2[0].pause();
	stopAudio();
	isMusic1Playing = false;

	$('div.active').find('.option[data-Answer="correct"]').append(correctImg);
	$('div.active').find('.option[data-Answer="incorrect"]').addClass('disabled');
	$('div.active').find('.option').addClass('optDisable').off('click');
	$(this).addClass('disabled');
}

function setAudio(_src) {
	if (_src == "") {
		$('.controlsDiv').addClass('hide');
	} else {
		$('.controlsDiv').removeClass('hide');
	}
	$audio1[0].setAttribute('src', _src);
	$audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
	if ($(obj).hasClass('disabled')) {
		return false;
	}

	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	$audio2[0].play();
	isMusic1Playing = false;
	isMusic2Playing = true;

}


function fnUpdateTimer() {
	var progressValue = Math.round(($audio1[0].currentTime / $audio1[0].duration) * 100);
	slider.value = progressValue;
}



function fnStartAudio(_state) {
	$audio2[0].pause();
	if (_state == 'play') {
		$('#pButton .playImg').hide();
		$('#pButton .pauseImg').show();
		$audio1[0].play();
		isMusic1Playing = true;
	} else {
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
	}
	$audio1[0].addEventListener('timeupdate', fnUpdateTimer);
}

function stopAudio() {
	$audio1[0].pause();
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	$audio1[0].currentTime = 0;
	slider.value = 0;
	isMusic1Playing = false;
	$audio2[0].pause();
	isMusic2Playing = false;
	lastAudio = 0;


}

const handlerIn = () => {
	playSound("./assets/images/jungle/leavesSound.mp3")
}

const handlerOut = () => {
	let heartBeat = document.querySelector("audio");
	heartBeat.pause()
}

let movingLeafs = $(".movingLeaf")

movingLeafs.each((index, leaf) => {
	$(leaf).on("mouseenter", handlerIn).on("mouseleave", handlerOut);
})




function setAudio(_src) {
	if (_src == "") {
		$('.controlsDiv').addClass('hide');
	} else {
		$('.controlsDiv').removeClass('hide');
	}
	$audio1[0].setAttribute('src', _src);
	$audio1[0].load();
}

/* Title Audio function */
function fnTitleAudioClick(obj) {
	if ($(obj).hasClass('disabled')) {
		return false;
	}

	$audio1[0].pause();
	$audio1[0].removeEventListener('timeupdate', fnUpdateTimer);
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	var titleAudioPath = $(obj).attr('data-audioSrc');
	$audio2[0].setAttribute('src', titleAudioPath);
	$audio2[0].load();
	$audio2[0].play();
	isMusic1Playing = false;
	isMusic2Playing = true;

}


function fnUpdateTimer() {
	var progressValue = Math.round(($audio1[0].currentTime / $audio1[0].duration) * 100);
	slider.value = progressValue;
}



function fnStartAudio(_state) {
	$audio2[0].pause();
	if (_state == 'play') {
		$('#pButton .playImg').hide();
		$('#pButton .pauseImg').show();
		$audio1[0].play();
		isMusic1Playing = true;
	} else {
		$('#pButton .playImg').show();
		$('#pButton .pauseImg').hide();
		$audio1[0].pause();
		lastAudio = 0;
		isMusic1Playing = false;
	}
	$audio1[0].addEventListener('timeupdate', fnUpdateTimer);
}

function stopAudio() {
	$audio1[0].pause();
	$('#pButton .playImg').show();
	$('#pButton .pauseImg').hide();
	$audio1[0].currentTime = 0;
	slider.value = 0;
	isMusic1Playing = false;
	$audio2[0].pause();
	isMusic2Playing = false;
	lastAudio = 0;


}


function playSound(url) {
	stopSound();
	$("audio").each(function () {
		if (!$(this).parent().hasClass("audio-player")) $(this).remove();
	});
	var ourAudio = document.createElement("audio");
	ourAudio.style.display = "none";
	ourAudio.src = url;
	ourAudio.autoplay = true;
	ourAudio.onended = function () {
		this.remove();
	};
	document.body.appendChild(ourAudio);
}

// stop any Sound function
function stopSound(resetSlider) {
	$("audio").each(function () {
		this.pause(); // Stop playing
		$(this).parent().find(".toggle-play").removeClass("pause").addClass("play");
		if (resetSlider) {
			this.currentTime = 0;
		}
	});
}