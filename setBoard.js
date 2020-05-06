const slider = document.querySelector('.slider')
const sliderValueSelected = document.querySelector('.slider-value-selected')

slider.addEventListener('input', () => {
    sliderValueSelected.textContent = slider.value
})