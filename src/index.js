document.addEventListener(`DOMContentLoaded`, () => {
    fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(data => {
        let filter = document.getElementById(`good-dog-filter`)
        let dogBar = document.getElementById(`dog-bar`)

        function makeEverything({name, image, isGoodDog, id}) {
            let span = document.createElement(`span`)
            let dogCard = document.getElementById(`dog-info`)
            
            span.textContent = name
            span.addEventListener(`click`, () => {
                let img = document.createElement(`img`)
                let h2 = document.createElement(`h2`)
                let button = document.createElement(`button`)

                Array.from(dogCard.children).forEach(tag => tag.remove())

                img.src = image
                h2.textContent = name
                if (isGoodDog === true) {
                    button.textContent = 'Good Dog!'
                } else {
                    button.textContent = 'Bad Dog!'
                }
                button.addEventListener(`click`, () => {
                    if (isGoodDog === true) {
                        button.textContent = 'Bad Dog!'
                        .isGoodDog = false
                        } else if (isGoodDog === false) {
                            button.textContent = 'Good Dog!'
                            isGoodDog = true
                        }
                    
                    fetch(`http://localhost:3000/pups/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify({
                            isGoodDog: isGoodDog
                        })
                    })
                })
                dogCard.append(img, h2, button)
            })
            
            dogBar.appendChild(span)
        }

        data.forEach(makeEverything)

        filter.addEventListener(`click`, () => {
            if (filter.textContent === `Filter good dogs: OFF`) {
                //Do filtering
                Array.from(dogBar.children).forEach(tag => tag.remove())
                data.forEach((obj) => {
                    if (obj.isGoodDog === true) {
                        makeEverything(obj)
                    }
                })
                filter.textContent = `Filter good dogs: ON`
            } else {
                //Show ALL!!
                Array.from(dogBar.children).forEach(tag => tag.remove())
                data.forEach(makeEverything)
                filter.textContent = `Filter good dogs: OFF`
                   
            }
            
            
        })
    })
    
})