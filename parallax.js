const foregroundPlanet = document.getElementById('planet1')
const backgroundPlanet = document.getElementById('planet2')

window.addEventListener('scroll', () => {
  // 128px == 8rem
  foregroundPlanet.style.transform = `translateY(${128 - (window.scrollY * .50)}px)`
  backgroundPlanet.style.transform = `translateY(-${window.scrollY * .10}px)`
})
