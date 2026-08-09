const section =
    document.querySelector(".about-section");

const card1 =
    document.querySelector(".card-1");

const card2 =
    document.querySelector(".card-2");

const card3 =
    document.querySelector(".card-3");


function clamp(value, min, max) {

    return Math.max(
        min,
        Math.min(max, value)
    );

}


function updateCards() {

    const rect =
        section.getBoundingClientRect();


    const scrollDistance =
        section.offsetHeight -
        window.innerHeight;


    let progress =
        -rect.top /
        scrollDistance;


    progress =
        clamp(progress, 0, 1);



    /* =========================
       CARD 2
    ========================== */

    let p2 =
        (progress - 0.08) /
        0.27;


    p2 =
        clamp(p2, 0, 1);



    /* =========================
       CARD 3
    ========================== */

    let p3 =
        (progress - 0.48) /
        0.27;


    p3 =
        clamp(p3, 0, 1);



    /* =========================
       CARD 1
    ========================== */

    const card1Scale =
        1 - (p2 * 0.08);


    const card1Y =
        -(p2 * 40);


    const card1Opacity =
        1 - (p2 * 1.15);


    card1.style.transform =
        `
        translateY(${card1Y}px)
        scale(${card1Scale})
        `;


    card1.style.opacity =
        clamp(
            card1Opacity,
            0,
            1
        );



    /* =========================
       CARD 2
    ========================== */

    const card2EnterY =
        110 - (p2 * 110);


    const card2Scale =
        1 - (p3 * 0.08);


    const card2ExitY =
        -(p3 * 40);


    const card2Y =
        card2EnterY +
        card2ExitY;


    const card2Opacity =
        p2 *
        (1 - p3 * 1.15);


    card2.style.transform =
        `
        translateY(${card2Y}%)
        scale(${card2Scale})
        `;


    card2.style.opacity =
        clamp(
            card2Opacity,
            0,
            1
        );



    /* =========================
       CARD 3
    ========================== */

    const card3Y =
        110 -
        (p3 * 110);


    card3.style.transform =
        `translateY(${card3Y}%)`;


    card3.style.opacity =
        p3;

}



/* =========================
   EVENTS
========================= */

window.addEventListener(
    "scroll",
    updateCards,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateCards
);


/* Initial */

updateCards();

/* =========================================
   STACK SCROLL ANIMATION
========================================= */

const stackCards =
    document.querySelectorAll(".stack-card");


const stackObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


stackCards.forEach((card) => {

    stackObserver.observe(card);

});


/* =========================================
   WHOLE CARD FLIP
========================================= */

stackCards.forEach((card) => {

    card.addEventListener("click", () => {

        card.classList.toggle("flipped");

    });

});