const supportTypes = {
    "uah" : {
        tab: "#tab0",
        item: "act0"
    },
    "dol" : {
        tab: "#tab1",
        item: "act1"
    },
    "eur" : {
        tab: "#tab2",
        item: "act2"
    },
    "paypal" : {
        tab: "#tab5",
        item: "act5"
    },
    "subscribe" : {
        tab: "#tab3",
        item: "act3"
    },
    "business" : {
        tab: "#tab4",
        item: "act4"
    },
}

function activateTab(tabId, target) {
    if (target.classList.contains('active')) {
        return;
    }

    let actives = document.querySelectorAll('.active');

    actives.forEach((e) => {
        e.classList.remove('active')
    })

    target.classList.add('active')
    document.querySelector(tabId).classList.add('active')

    changeUrl(tabId)
}

function changeUrl(tabId) {
    let url = new URL(window.location.href);

    Object.entries(supportTypes).forEach(([key, value]) => {
        if (value.tab == tabId) {
            url.searchParams.set('support', key)
        }
    })

    history.pushState({}, '', url.href);    
}

function handleForm(e) {
    e.preventDefault();

    let formdata = new FormData(document.querySelector('form'))

    fetch('/form.php', {method: "POST", body: formdata})
    .then((response) => {console.log(response)})

    document.querySelector('form').innerHTML = "<p class='text'>Дякуємо! незабаром ми з вами зв'яжемося.</p>"
}

function copier(text, element) {
    navigator.clipboard.writeText(text)
    element.parentElement.classList.add('active');

    setTimeout(() => {
        element.parentElement.classList.remove('active');
    }, 500)
}

function getItem(desc) {
    return document.querySelector("#" + desc);
}

function triggerMenu() {
    let menu = document.querySelector("#headerNav");

    menu.classList.toggle('active')
}

let numbers = document.querySelectorAll('.number');

function scroller(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            let step = 200;
            let target = entry.target;
            let times = target.childElementCount;

            let interv = setInterval(() => {
                if (times > 0) {
                entry.target.scrollBy({
                    left: 0,
                    top: target.offsetHeight,
                    behavior: 'smooth'
                })
                times = times - 1;
                } else {
                    clearInterval(interv)
                }
            }, step)
        }
    })
};

let observer;

let options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
};

observer = new IntersectionObserver(scroller, options);

numbers.forEach((num) => {
    observer.observe(num);
})

let temp = window.innerWidth;
temp = (100 - (834 / (temp / 100))) / 2;
temp = temp + '%';

const optionsSplide = {
    type: 'loop',
    perPage: 1,
    pagination: false,
    trimSpace: false,
    fixedWidth: '804px',
    width: '100%',
    focus: 0,
    gap: '30px',
    padding: temp,
    breakpoints: {
        1230: {
            gap: "0",
            fixedWidth: "375px",
            padding: "0",
            focus: 0,
            width: "375px",
            trimSpace: true
        }
    }
};

const slider = new Splide( '#image-slider', optionsSplide);

slider.mount();

document.addEventListener('DOMContentLoaded', () => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    Object.entries(supportTypes).forEach(([key, value]) => {
        if (params.get('support') == key) {
            activateTab(value.tab, getItem(value.item))
        }
    })
})