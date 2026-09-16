/* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   INTERACTION / ANIMATION SCRIPT
   ============================================================ */


/* ============================================================
   01. PAGE LOADER
   ============================================================

   The loader creates a small premium transition before the
   website becomes visible.

   We don't want users staring at a blank screen while the
   hero image loads.
   ============================================================ */

window.addEventListener("load", () => {

    const loader = document.getElementById("pageLoader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 450);

});


/* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   CENTRAL CONTACT CONFIGURATION
   ============================================================

   Keep the firm's contact details in ONE place.

   This means that if the firm changes its email or WhatsApp
   number later, you only need to change it here instead of
   searching through the entire website.
   ============================================================ */

const FIRM_CONTACT = {

    // Official firm email supplied for this website
    email: "gregmugeni2011@gmail.com",

    // Uganda number supplied by the firm
    phone: "+256707266256",

    // WhatsApp uses the international number WITHOUT "+"
    whatsapp: "256707266256",

    // Google Maps location supplied by the firm
    maps:
        "https://share.google/MIrlbsOYrBV60aGWW"

};


/* ============================================================
   CONTACT URL BUILDERS
   ============================================================ */

/*
    Opens WhatsApp with a pre-written professional message.

    We deliberately don't make the visitor type everything
    from scratch. Reducing friction increases the probability
    that a prospective client actually contacts the firm.
*/

function openWhatsApp(message = "") {

    const encodedMessage =
        encodeURIComponent(message);

    const whatsappUrl =
        `https://wa.me/${FIRM_CONTACT.whatsapp}?text=${encodedMessage}`;

    window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
    );

}


/*
    Opens the visitor's email application.

    The subject is intentionally professional and useful to
    the firm's staff.
*/

function emailFirm(subject = "Legal Consultation Request") {

    const mailto =
        `mailto:${FIRM_CONTACT.email}` +
        `?subject=${encodeURIComponent(subject)}`;

    window.location.href = mailto;

}


/*
    Starts a telephone call on devices that support tel links.
*/

function callFirm() {

    window.location.href =
        `tel:${FIRM_CONTACT.phone}`;

}


/*
    Opens the supplied Google Maps location.

    We use the firm's supplied map link rather than guessing
    the exact building/plot.
*/

function openFirmLocation() {

    window.open(
        FIRM_CONTACT.maps,
        "_blank",
        "noopener,noreferrer"
    );

}



/* ============================================================
   02. NAVIGATION SCROLL EFFECT
   ============================================================

   When the visitor scrolls away from the hero, the navigation
   gets a translucent dark background.

   This improves readability while keeping the premium
   floating-navigation appearance.
   ============================================================ */

const siteHeader = document.querySelector(".site-header");


function updateNavigation() {

    if (!siteHeader) return;

    if (window.scrollY > 50) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
);

updateNavigation();



/* ============================================================
   03. MOBILE MENU
   ============================================================ */

const menuToggle = document.getElementById("menuToggle");

const mobileNav = document.getElementById("mobileNav");


if (menuToggle && mobileNav) {

    menuToggle.addEventListener("click", () => {

        mobileNav.classList.toggle("open");

    });


    /*
        Close the mobile menu when the visitor clicks
        one of the navigation links.
    */

    const mobileLinks =
        mobileNav.querySelectorAll("a");


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            mobileNav.classList.remove("open");

        });

    });

}



/* ============================================================
   04. FAQ ACCORDION
   ============================================================

   Each FAQ starts closed.

   Clicking a question opens it.

   Clicking another question closes the previous one.

   This keeps the page compact and avoids making the FAQ
   section excessively long.
   ============================================================ */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener("click", () => {


        /*
            Determine whether this item is already open.
        */

        const wasActive =
            item.classList.contains("active");


        /*
            Close every FAQ item first.
        */

        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            otherAnswer.style.maxHeight = null;

        });


        /*
            If the clicked item wasn't open,
            open it.
        */

        if (!wasActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});






/* ============================================================
   07. SMOOTH ANCHOR NAVIGATION
   ============================================================

   Most modern browsers already support smooth scrolling
   through CSS, but this adds a little extra control and
   accounts for the fixed navigation bar.
   ============================================================ */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



/* ============================================================
   08. PRACTICE AREA MICRO-INTERACTION
   ============================================================

   The practice areas respond to pointer movement on desktop.

   We keep this subtle so the website still feels serious.
   ============================================================ */

const practiceItems =
    document.querySelectorAll(".practice-item");


practiceItems.forEach(item => {

    item.addEventListener("mouseenter", () => {

        const arrow =
            item.querySelector(".practice-arrow");

        if (arrow) {

            arrow.style.transform =
                "translate(5px, -5px)";

            arrow.style.transition =
                "transform .3s ease";

        }

    });


    item.addEventListener("mouseleave", () => {

        const arrow =
            item.querySelector(".practice-arrow");

        if (arrow) {

            arrow.style.transform =
                "translate(0, 0)";

        }

    });

});




/* ============================================================
   OJAMBO & OJAMBO — TEAM MICROINTERACTIONS
   ============================================================ */

(function () {

    const teamMembers = document.querySelectorAll(
        '[data-team-member]'
    );

    if (!teamMembers.length) return;


    /* ----------------------------------------------------------
       SCROLL REVEAL
       ---------------------------------------------------------- */

    const teamObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.16,
            rootMargin: '0px 0px -60px 0px'
        }
    );


    teamMembers.forEach((member, index) => {

        /*
         * Slightly stagger each card so the team section
         * doesn't appear all at once.
         */

        member.style.transitionDelay =
            `${Math.min(index * 80, 320)}ms`;

        teamObserver.observe(member);


        /* ------------------------------------------------------
           SUBTLE POINTER MOVEMENT
           ------------------------------------------------------ */

        member.addEventListener('pointermove', (event) => {

            /*
             * Disable the tilt effect on touch devices.
             */

            if (window.matchMedia(
                '(hover: none)'
            ).matches) {
                return;
            }

            const rect = member.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width;

            const y =
                (event.clientY - rect.top) /
                rect.height;


            const moveX =
                (x - 0.5) * 5;

            const moveY =
                (y - 0.5) * 5;


            const photo =
                member.querySelector('.team-photo');


            if (photo) {

                photo.style.transform =
                    `translate3d(${moveX}px, ${moveY}px, 0) scale(1.012)`;

            }

        });


        /* ------------------------------------------------------
           RESET POINTER EFFECT
           ------------------------------------------------------ */

        member.addEventListener('pointerleave', () => {

            const photo =
                member.querySelector('.team-photo');

            if (photo) {

                photo.style.transform =
                    '';

            }

        });

    });


})();




/* =========================================================
   EXPERTISE INTERACTION ENGINE
   Ojambo & Ojambo Advocates

   - Cursor spotlight
   - Expand / collapse
   - Animated arrow
   - One open practice area at a time
   - Keyboard accessibility
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const practiceList =
        document.querySelector(".practice-list");

    if (!practiceList) return;


    const practices =
        practiceList.querySelectorAll(".practice-item");


    /* =====================================================
       ADD INTERACTIVE CONTROLS
       ===================================================== */

    practices.forEach((practice, index) => {

        const number =
            practice.querySelector(".practice-number");

        const main =
            practice.querySelector(".practice-main");

        const title =
            practice.querySelector("h3");

        const description =
            practice.querySelector("p");


        if (!main || !title || !description) {
            return;
        }


        /* Make the row keyboard accessible */

        practice.setAttribute(
            "tabindex",
            "0"
        );

        practice.setAttribute(
            "role",
            "button"
        );

        practice.setAttribute(
            "aria-expanded",
            "false"
        );


        /* =================================================
           ARROW
           ================================================= */

        const interaction =
            document.createElement("span");

        interaction.className =
            "practice-interaction";

        interaction.setAttribute(
            "aria-hidden",
            "true"
        );

        interaction.innerHTML = "↗";


        /*
         * The original third grid column was previously
         * unused because the arrow markup is commented out.
         */

        practice.appendChild(
            interaction
        );


        /* =================================================
           EXPANDABLE CONTENT
           ================================================= */

        const expand =
            document.createElement("div");

        expand.className =
            "practice-expand";

        expand.innerHTML = `

            <div class="practice-expand-inner">

                <div class="practice-expand-content">

                    <div class="practice-detail-line"></div>

                    <div class="practice-detail-label">
                        Practice area
                    </div>

                    <p>
                        ${description.textContent.trim()}
                    </p>

                </div>

            </div>

        `;


        practice.appendChild(
            expand
        );


        /* =================================================
           CURSOR MICRO-INTERACTION
           ================================================= */

        practice.addEventListener(
            "mousemove",
            event => {

                const rect =
                    practice.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                practice.style.setProperty(
                    "--practice-x",
                    `${x}px`
                );

                practice.style.setProperty(
                    "--practice-y",
                    `${y}px`
                );

            }
        );


        /* =================================================
           OPEN / CLOSE
           ================================================= */

        const togglePractice = () => {

            const isOpen =
                practice.classList.contains(
                    "is-expanded"
                );


            /*
             * Close every other practice area.
             */

            practices.forEach(other => {

                other.classList.remove(
                    "is-expanded"
                );

                other.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });


            /*
             * If this one wasn't already open,
             * open it.
             */

            if (!isOpen) {

                practice.classList.add(
                    "is-expanded"
                );

                practice.setAttribute(
                    "aria-expanded",
                    "true"
                );

                practiceList.classList.add(
                    "has-expanded"
                );

            } else {

                practiceList.classList.remove(
                    "has-expanded"
                );

            }

        };


        /* =================================================
           CLICK
           ================================================= */

        practice.addEventListener(
            "click",
            event => {

                /*
                 * Prevent accidental double-triggering
                 * if another interactive element exists.
                 */

                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {
                    return;
                }

                togglePractice();

            }
        );


        /* =================================================
           KEYBOARD
           ================================================= */

        practice.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    togglePractice();

                }

            }
        );


        /* =================================================
           STAGGERED NUMBER REVEAL
           ================================================= */

        if (number) {

            number.style.transitionDelay =
                `${index * 40}ms`;

        }

    });


    /* =====================================================
       KEEP LIST STATE CORRECT
       ===================================================== */

    const observer =
        new MutationObserver(() => {

            const anyOpen =
                practiceList.querySelector(
                    ".practice-item.is-expanded"
                );

            practiceList.classList.toggle(
                "has-expanded",
                Boolean(anyOpen)
            );

        });


    observer.observe(
        practiceList,
        {
            subtree: true,
            attributes: true,
            attributeFilter: [
                "class"
            ]
        }
    );

});



/* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   PREMIUM SCROLL REVEAL ENGINE
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {



    /* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   INTERACTIVE LEGAL INSIGHTS
   ============================================================ */


    const reader = document.getElementById("insightReader");
    const readerPanel = document.querySelector(".insight-reader-panel");
    const readerClose = document.getElementById("insightReaderClose");
    const readerBackdrop = document.querySelector(".insight-reader-backdrop");

    const readerCategory =
        document.getElementById("insightReaderCategory");

    const readerTime =
        document.getElementById("insightReaderTime");

    const readerTitle =
        document.getElementById("insightReaderTitle");

    const readerBody =
        document.getElementById("insightReaderBody");

    const readerProgress =
        document.getElementById("insightReaderProgress");

    const filters =
        document.querySelectorAll(".insight-filter");

    const cards =
        document.querySelectorAll(".insight-card");

    const readButtons =
        document.querySelectorAll(".insight-read");


    /*
     * ----------------------------------------------------------
     * INSIGHT CONTENT
     * ----------------------------------------------------------
     *
     * These are editorial summaries for the website.
     * They are intentionally framed as general information,
     * not legal advice.
     */

    const insights = {

        investment: {

            category: "INVESTMENT",

            time: "6 MIN READ",

            title:
                "Doing Business in Uganda: Legal Considerations for Foreign Investors",

            body: `
                <p>
                    Uganda offers opportunities for businesses and
                    investors operating across a range of sectors.
                    Entering the market, however, requires an
                    understanding of the legal and regulatory
                    environment in which the investment will operate.
                </p>

                <p>
                    <strong>Start with the structure.</strong>
                    Investors should consider the appropriate business
                    structure, ownership arrangements, governance
                    requirements and the nature of the activities the
                    proposed business will undertake.
                </p>

                <p>
                    Regulatory requirements can also differ depending
                    on the sector. Licensing, tax, employment,
                    investment and other compliance obligations may
                    need to be considered before operations begin.
                </p>

                <p>
                    <strong>Due diligence matters.</strong>
                    Before committing capital, investors should conduct
                    appropriate legal and commercial due diligence on
                    counterparties, assets, contracts and regulatory
                    requirements.
                </p>

                <p>
                    The legal issues surrounding an investment can be
                    highly specific to its structure, sector and
                    circumstances. Professional legal advice should
                    therefore be obtained before taking action.
                </p>
            `
        },


        property: {

            category: "PROPERTY",

            time: "5 MIN READ",

            title:
                "Buying Property in Uganda: Key Legal Considerations",

            body: `
                <p>
                    Property transactions require careful legal
                    due diligence before a buyer commits to a
                    transaction.
                </p>

                <p>
                    <strong>Title verification is fundamental.</strong>
                    A purchaser should establish the status of the
                    property and verify the relevant ownership and
                    registration information before proceeding.
                </p>

                <p>
                    The transaction should also be considered in the
                    context of the applicable land tenure, contractual
                    arrangements, restrictions and any interests that
                    may affect the property.
                </p>

                <p>
                    Buyers should pay particular attention to the
                    documentation supporting the transaction and the
                    obligations of each party before completion.
                </p>

                <p>
                    Property transactions can involve significant
                    financial commitments. Independent legal due
                    diligence can help identify issues that should be
                    addressed before a transaction proceeds.
                </p>
            `
        },


        corporate: {

            category: "CORPORATE",

            time: "7 MIN READ",

            title:
                "Establishing a Business in Uganda: What International Clients Should Know",

            body: `
                <p>
                    Establishing a business in a new jurisdiction
                    involves more than registering a company. The
                    proposed activities, ownership structure and
                    regulatory environment should all be considered
                    from the outset.
                </p>

                <p>
                    <strong>Structure the business carefully.</strong>
                    Investors should consider the most appropriate
                    corporate structure, governance arrangements,
                    ownership interests and contractual relationships.
                </p>

                <p>
                    Regulatory compliance is another important
                    consideration. Depending on the nature of the
                    business, different licensing, employment, tax
                    and sector-specific requirements may apply.
                </p>

                <p>
                    Contracts should also clearly establish the rights
                    and obligations of the parties involved. This can
                    be particularly important where international
                    investors are working with local partners,
                    suppliers or service providers.
                </p>

                <p>
                    International clients should obtain advice
                    tailored to their particular proposed structure
                    and activities before establishing or expanding
                    operations in Uganda.
                </p>
            `
        },
kayanja: {

    category: "CASE IN FOCUS",

    time: "4 MIN READ",

    title:
        "Defamation Proceedings: A High-Profile Criminal Trial in Uganda",

    body: `
        <p>
            <strong>Publicly reported matter.</strong>
            Ojambo & Ojambo Advocates has been involved in the
            defence representation in a high-profile criminal
            proceeding before the Mwanga II Magistrate's Court
            in Kampala.
        </p>

        <p>
            The matter concerns allegations made against Pastor
            Robert Kayanja and proceedings involving nine accused
            persons. The case began in July 2023 and has involved
            multiple stages of defence testimony and court
            proceedings.
        </p>

        <p>
            The Daily Monitor reported on July 9, 2025 that the
            court warned the defence over continued adjournments.
            The report stated that defence lawyer Robert Ojambo
            was unable to proceed on that particular day because
            of illness, while another member of the defence team
            requested an adjournment.
        </p>

        <p>
            The prosecution objected to the postponement, while
            the presiding magistrate expressed concern about the
            history of delays and indicated that the court would
            expect the matter to proceed without further
            unnecessary adjournments.
        </p>

        <p>
            The case illustrates the importance of careful trial
            management, effective defence representation and
            adherence to procedural requirements in complex
            criminal proceedings.
        </p>

        <p class="insight-source">
            Source:
            <a
                href="https://www.monitor.co.ug/uganda/news/national/court-warns-defence-over-delays-in-pastor-kayanja-s-defamation-trial-5112104"
                target="_blank"
                rel="noopener noreferrer"
            >
                Daily Monitor — Court warns defence over delays
                in Pastor Kayanja's defamation trial ↗
            </a>
        </p>

        <p class="insight-disclaimer">
            This case note is based on publicly reported information
            and is provided for general informational purposes.
            It does not disclose confidential client information
            or constitute legal advice.
        </p>
    `
}
    };


    /* ============================================================
       FILTERING
       ============================================================ */

    filters.forEach(filter => {

        filter.addEventListener("click", () => {

            const selected =
                filter.dataset.filter;


            filters.forEach(button => {

                const active =
                    button === filter;

                button.classList.toggle(
                    "active",
                    active
                );

                button.setAttribute(
                    "aria-selected",
                    active ? "true" : "false"
                );

            });


            cards.forEach(card => {

                const category =
                    card.dataset.category;

                const show =
                    selected === "all" ||
                    category === selected;

                if (show) {

                    card.classList.remove(
                        "is-hidden"
                    );

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";
                        card.style.transform =
                            "translateY(0)";

                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform =
                        "translateY(20px)";

                    setTimeout(() => {

                        card.classList.add(
                            "is-hidden"
                        );

                    }, 350);

                }

            });

        });

    });


    /* ============================================================
       OPEN INSIGHT
       ============================================================ */

    function openInsight(key) {

        const insight =
            insights[key];

        if (!insight) {
            return;
        }


        readerCategory.textContent =
            insight.category;

        readerTime.textContent =
            insight.time;

        readerTitle.textContent =
            insight.title;

        readerBody.innerHTML =
            insight.body;


        reader.classList.add("open");

        reader.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "insight-reader-open"
        );


        readerPanel.scrollTop = 0;

        readerProgress.style.width = "0%";


        setTimeout(() => {

            readerClose.focus();

        }, 100);

    }


    /* ============================================================
       CLOSE INSIGHT
       ============================================================ */

    function closeInsight() {

        reader.classList.remove("open");

        reader.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "insight-reader-open"
        );

        readerProgress.style.width =
            "0%";

    }


    readButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                openInsight(
                    button.dataset.insight
                );

            }
        );

    });


    readerClose.addEventListener(
        "click",
        closeInsight
    );


    readerBackdrop.addEventListener(
        "click",
        closeInsight
    );


    /* ============================================================
       ESCAPE KEY
       ============================================================ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                reader.classList.contains("open")
            ) {

                closeInsight();

            }

        }
    );


    /* ============================================================
       READING PROGRESS
       ============================================================ */

    readerPanel.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                readerPanel.scrollTop;

            const scrollHeight =
                readerPanel.scrollHeight -
                readerPanel.clientHeight;

            if (scrollHeight <= 0) {

                readerProgress.style.width =
                    "100%";

                return;

            }

            const progress =
                (scrollTop / scrollHeight) * 100;

            readerProgress.style.width =
                `${Math.min(
                    100,
                    Math.max(0, progress)
                )}%`;

        }
    );


    /*
       Respect users who have requested reduced motion.
       The CSS fallback also handles this, but avoiding the
       observer makes the browser do less work.
    */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (reducedMotion) {
        return;
    }


    /*
       IntersectionObserver is much more efficient than listening
       to scroll events continuously.

       threshold:
       The animation begins when approximately 12% of an element
       enters the viewport.
    */
/* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   PERSISTENT PREMIUM SCROLL ANIMATION ENGINE
   ============================================================

   Behaviour:
   ------------------------------------------------------------
   • Animates elements when they ENTER the viewport
   • Resets them when they LEAVE the viewport
   • Animates them again when they ENTER
   • Works repeatedly while scrolling up and down
   • Supports all existing animation classes
   • Keeps stagger animations intact
   • Mobile friendly
   • Respects prefers-reduced-motion
   • No continuous scroll listener
   ============================================================ */


  

    /* ============================================================
       SELECT ALL SCROLL ANIMATED ELEMENTS
       ============================================================ */

    const scrollAnimatedElements = document.querySelectorAll(`
        .scroll-reveal,
        .scroll-reveal-text,
        .scroll-heading,
        .scroll-number,
        .scroll-image,
        .scroll-stagger,
        .scroll-line-reveal,
        .client-logo.scroll-reveal,
        .practice-item.scroll-reveal,
        .team-member.scroll-reveal
    `);


    if (!scrollAnimatedElements.length) {
        return;
    }


    /* ============================================================
       ACCESSIBILITY
       ------------------------------------------------------------
       If the visitor prefers reduced motion, everything remains
       visible without animation.
       ============================================================ */

    if (reducedMotion) {

        scrollAnimatedElements.forEach(element => {

            element.classList.add("is-visible");

        });

        return;
    }


    /* ============================================================
       INTERSECTION OBSERVER
       ------------------------------------------------------------
       IMPORTANT:

       We DO NOT use observer.unobserve().

       That is what allows the animation to happen again every
       time the element comes back into the viewport.
       ============================================================ */

    const scrollObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                const element = entry.target;


                /* =================================================
                   ELEMENT ENTERED VIEWPORT
                   ================================================= */

                if (entry.isIntersecting) {

                    element.classList.add("is-visible");

                    return;
                }


                /* =================================================
                   ELEMENT LEFT VIEWPORT
                   -------------------------------------------------
                   Remove the state so the next entrance triggers
                   the animation again.
                   ================================================= */

                element.classList.remove("is-visible");

            });

        },
        {
            /*
             * Start slightly before the element is fully visible.
             * This makes the animation feel intentional rather
             * than waiting until the element is already on screen.
             */
            threshold: 0.12,

            /*
             * Gives the animation a little breathing room.
             */
            rootMargin: "0px 0px -8% 0px"
        }
    );


    /* ============================================================
       OBSERVE EVERYTHING
       ============================================================ */

    scrollAnimatedElements.forEach(element => {

        scrollObserver.observe(element);

    });


    /* ============================================================
       HANDLE ELEMENTS ALREADY IN VIEW
       ------------------------------------------------------------
       Useful when the page loads halfway down because of:
       • anchor links
       • browser restoration
       • refresh
       • mobile browser restoration
       ============================================================ */

    requestAnimationFrame(() => {

        scrollAnimatedElements.forEach(element => {

            const rect =
                element.getBoundingClientRect();

            const viewportHeight =
                window.innerHeight ||
                document.documentElement.clientHeight;


            if (
                rect.top < viewportHeight &&
                rect.bottom > 0
            ) {

                element.classList.add("is-visible");

            }

        });

    });


    /* ============================================================
       OPTIONAL: RE-CHECK AFTER RESIZE
       ------------------------------------------------------------
       Helps when switching between:
       • desktop
       • tablet
       • mobile
       • browser resize
       ============================================================ */

    let resizeTimer;

    window.addEventListener(
        "resize",
        () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                scrollAnimatedElements.forEach(element => {

                    const rect =
                        element.getBoundingClientRect();

                    const viewportHeight =
                        window.innerHeight ||
                        document.documentElement.clientHeight;


                    if (
                        rect.top < viewportHeight &&
                        rect.bottom > 0
                    ) {

                        element.classList.add("is-visible");

                    }

                });

            }, 150);

        },
        { passive: true }
    );




    /*
       Observe all scroll animation elements.
    */

    document
        .querySelectorAll(`
            .scroll-reveal,
            .scroll-reveal-text,
            .scroll-heading,
            .scroll-number,
            .scroll-image,
            .scroll-stagger,
            .scroll-line-reveal
        `)
        .forEach(element => {

            observer.observe(element);

        });



         const teamMembers = document.querySelectorAll(
        "[data-team-member]"
    );

    teamMembers.forEach(member => {

        const photoPath = member.dataset.photo;

        if (!photoPath) {
            // No photograph supplied.
            // Keep the existing initials.
            return;
        }

        const placeholder = member.querySelector(
            ".photo-placeholder"
        );

        if (!placeholder) return;

        const image = document.createElement("img");

        image.className = "team-photo-image";

        image.src = photoPath;

        image.alt = member.querySelector("h3")
            ? `${member.querySelector("h3").textContent.trim()} — Ojambo & Ojambo Advocates`
            : "Ojambo & Ojambo Advocates team member";

        image.loading = "lazy";

        image.decoding = "async";

        /* Successful image */
        image.addEventListener("load", () => {

            placeholder.classList.add("has-photo");

        });

        /* Failed image → initials remain */
        image.addEventListener("error", () => {

            image.remove();

            placeholder.classList.remove("has-photo");

        });

        placeholder.prepend(image);

    });


});