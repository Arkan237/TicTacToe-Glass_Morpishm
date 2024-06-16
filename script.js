document.body.style.height = `${window.innerHeight}px`

let player = 1;
let filled = 0;
const boxs = document.querySelectorAll('.board > div:not(.panel,.lines,.lines > *)');
const p1b = document.getElementsByClassName("p1-box")[0]
const p2b = p1b.nextElementSibling.nextElementSibling
const lines = document.getElementsByClassName("lines")[0]
const overlay = document.getElementsByClassName("overlay")[0]

// Algorithm to check for the winner
function checkWin() {
	if (checkLine(0,1,2)) {
		drawLine("horizontal-1")
		lines.children[0].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(3,4,5)) {
		drawLine("horizontal-2")
		lines.children[0].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(6,7,8)) {
		drawLine("horizontal-3")
		lines.children[0].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(0,3,6)) {
		drawLine("vertical-1")
		lines.children[1].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(1,4,7)) {
		drawLine("vertical-2")
		lines.children[1].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(2,5,8)) {
		drawLine("vertical-3")
		lines.children[1].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(0,4,8)) {
		drawLine("diagonal-1")
		lines.children[2].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (checkLine(2,4,6)) {
		drawLine("diagonal-2")
		lines.children[2].addEventListener("animationend",() => showWinner(`Player ${player} Wins!`))
	} else if (filled == 9) {
		showWinner(`Tie!`)
	} else { // Move turn to another player if the box hasn't filled yet
		player = player == 1 ? 2 : 1;
	}
}

function checkLine(a, b, c) {
	return boxs[a].innerHTML == boxs[b].innerHTML &&
		   boxs[b].innerHTML == boxs[c].innerHTML &&
		   boxs[a].innerHTML != '';
}

// Function to reset the board
function resetBoard() {
	location.reload()
	player = 1;
}

// Draw the line if anyone wins
function drawLine(direction) {
	lines.style.display = "block"
	switch (direction) {
		case "horizontal-1":
		case "horizontal-2":
		case "horizontal-3":
			lines.children[0].classList.add(direction)
			lines.children[0].style.display = "block"
			break
		case "vertical-1":
		case "vertical-2":
		case "vertical-3":
			lines.children[1].classList.add(direction)
			lines.children[1].style.display = "block"
			break
		case "diagonal-1":
		case "diagonal-2":
			lines.children[2].classList.add(direction)
			lines.children[2].style.display = "block"
			break
	}
}

// Function to show the dialogue
function showWinner(message) {
	overlay.style.display = "flex"
	setTimeout(() => {
		overlay.style.left = 0
		overlay.style.right = 0
		overlay.classList.add("overlay-show")
		overlay.children[0].children[0].innerHTML = message
		overlay.children[0].classList.add("dialog-show")

	},500)
	for (const b of overlay.children[0].children[1].children) {
		b.addEventListener("click",() => {
			overlay.children[0].classList.remove("dialog-show")
			overlay.classList.remove("overlay-show")
			setTimeout(() => {
				overlay.style.left = ''
				overlay.style.right = ''
				overlay.style.display = "none"
			},500)
			setTimeout(() => {
				(b.innerHTML === "Restart")
				? resetBoard()
				: location.assign("../index.html")
			},500)
		})
	}
}

// Highlight Player 1 box when game started
p1b.parentElement.addEventListener("animationend",() => setTimeout(() => p1b.classList.toggle("p1-turn"),1000))

// Place x or o when the box clicked and check whether anyone wins or not
boxs.forEach(box => {
	box.addEventListener('click', () => {
		if (box.innerHTML == '') {
			box.innerHTML = "<span></span>"
			box.children[0].innerHTML = player == 1 ? '×' : 'O';
			p1b.classList.toggle("p1-turn")
			p2b.classList.toggle("p2-turn")
			if (player == 1) {
				box.style.color = "#00D1FF"
				box.style.textShadow = "5px 8px 4px rgba(0, 209, 255, 0.5)"
			}
			else {
				box.style.color = "#FF4E4E"
				box.style.fontSize = "70px"
				box.style.textShadow = "5px 8px 4px rgba(255, 78, 78, 0.5)"
			}
			box.children[0].classList.toggle("placed")
			filled++
			checkWin()
		}
	});
})

// Reset game when reset button pressed
document.getElementsByClassName("restart")[0].addEventListener("click", () => resetBoard())