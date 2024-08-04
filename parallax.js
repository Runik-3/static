const foregroundPlanet = document.getElementById('planet1')
const backgroundPlanet = document.getElementById('planet2')

window.addEventListener('scroll', () => {
  foregroundPlanet.style.transform = `translateY(${100 - (window.scrollY * .50)}px)`
  backgroundPlanet.style.transform = `translateY(-${window.scrollY * .10}px)`
})
