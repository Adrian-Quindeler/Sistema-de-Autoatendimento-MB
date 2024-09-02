function incrementClick(element) {
    var counter = element.querySelector('.click-counter');
    var count = parseInt(counter.textContent) + 1;
    counter.textContent = count;
    counter.style.display = 'flex';
}
