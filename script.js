/* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   INTERACTION / ANIMATION SCRIPT
   ============================================================ */
/*
 * ============================================================
 * O&O ADVOCATES — SERVICE WORKER REGISTRATION
 * ============================================================
 */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("/service-worker.js", {
                scope: "/"
            })
            .then(registration => {

                console.log(
                    "[O&O PWA] Service worker registered:",
                    registration.scope
                );

            })
            .catch(error => {

                console.error(
                    "[O&O PWA] Service worker registration failed:",
                    error
                );

            });

    });

}

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



/* ============================================================
   O&O PREMIUM PWA INSTALL EXPERIENCE
   ============================================================ */

(() => {

    let deferredInstallPrompt = null;

    const banner =
        document.getElementById("ooInstallBanner");

    const installButton =
        document.getElementById("ooInstallButton");

    const closeButton =
        document.getElementById("ooInstallClose");


    if (
        !banner ||
        !installButton ||
        !closeButton
    ) {
        return;
    }


    /* ============================================================
       CHECK WHETHER THE SITE IS ALREADY INSTALLED
       ============================================================ */

    const isStandalone =
        window.matchMedia(
            "(display-mode: standalone)"
        ).matches ||
        window.navigator.standalone === true;


    if (isStandalone) {
        return;
    }


    /* ============================================================
       DISMISSAL MEMORY
       ------------------------------------------------------------
       Don't keep annoying the visitor after they close it.
       ============================================================ */

    const dismissed =
        localStorage.getItem(
            "oo_install_banner_dismissed"
        );


    /* ============================================================
       SHOW BANNER
       ============================================================ */

    function showInstallBanner() {

        if (dismissed) {
            return;
        }

        banner.classList.add("is-visible");

        banner.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* ============================================================
       HIDE BANNER
       ============================================================ */

    function hideInstallBanner(
        remember = false
    ) {

        banner.classList.remove(
            "is-visible"
        );

        banner.setAttribute(
            "aria-hidden",
            "true"
        );


        if (remember) {

            localStorage.setItem(
                "oo_install_banner_dismissed",
                "1"
            );

        }

    }


    /* ============================================================
       BROWSER MAKES PWA INSTALL AVAILABLE
       ============================================================ */

    window.addEventListener(
        "beforeinstallprompt",
        event => {

            /*
             * Prevent Chrome from showing its own
             * automatic install prompt.
             */

            event.preventDefault();


            /*
             * Save the prompt so our branded
             * button can trigger it later.
             */

            deferredInstallPrompt = event;


            /*
             * Give the page a moment before showing
             * the banner so it feels intentional.
             */

            setTimeout(() => {

                showInstallBanner();

            }, 1800);

        }
    );


    /* ============================================================
       INSTALL BUTTON
       ============================================================ */

    installButton.addEventListener(
        "click",
        async () => {

            if (!deferredInstallPrompt) {
                return;
            }


            const promptEvent =
                deferredInstallPrompt;


            /*
             * Prevent another click from trying
             * to reuse the same prompt.
             */

            deferredInstallPrompt = null;


            try {

                await promptEvent.prompt();

                const result =
                    await promptEvent.userChoice;


                /*
                 * Whether accepted or dismissed,
                 * hide our custom banner.
                 */

                hideInstallBanner(
                    result.outcome !== "accepted"
                );

            } catch (error) {

                console.warn(
                    "O&O install prompt unavailable:",
                    error
                );

            }

        }
    );


    /* ============================================================
       CLOSE
       ============================================================ */

    closeButton.addEventListener(
        "click",
        () => {

            hideInstallBanner(true);

        }
    );


    /* ============================================================
       SUCCESSFUL INSTALL
       ============================================================ */

    window.addEventListener(
        "appinstalled",
        () => {

            deferredInstallPrompt = null;

            hideInstallBanner();

            localStorage.removeItem(
                "oo_install_banner_dismissed"
            );

        }
    );


    /* ============================================================
       SAFETY CHECK
       ------------------------------------------------------------
       If the user installs the app through the browser menu,
       remove our banner too.
       ============================================================ */

    window.addEventListener(
        "pageshow",
        () => {

            const installed =
                window.matchMedia(
                    "(display-mode: standalone)"
                ).matches ||
                window.navigator.standalone === true;


            if (installed) {

                hideInstallBanner();

            }

        }
    );

})();


/* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   PREMIUM EXPERTISE READER
   ============================================================

   This replaces the old expandable Expertise rows.

   EXPERIENCE
   ------------------------------------------------------------
   • Click any practice area
   • Dark cinematic backdrop appears
   • Editorial reader slides in from the right
   • Large visual image
   • Practice number + category
   • Large editorial heading
   • Detailed explanation
   • "What we cover" list
   • Relevant official resources
   • Consultation CTA
   • Previous / next practice navigation
   • Reading progress indicator
   • ESC to close
   • Backdrop click to close
   • Keyboard navigation
   • Touch / mobile optimized
   • Respects reduced motion
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    const practiceItems =
        document.querySelectorAll(".practice-item");

    if (!practiceItems.length) return;


    /* ============================================================
       PRACTICE AREA CONTENT
       ------------------------------------------------------------
       The original page descriptions remain the foundation.

       The additional copy is intentionally written as general
       informational website content rather than specific legal
       advice or promises about outcomes.
       ============================================================ */

    const practiceAreas = {

        corporate: {

            number: "01",

            category: "CORPORATE & COMMERCIAL",

            shortTitle: "Corporate & Commercial",

            title:
                "Building businesses with legal clarity.",

            intro:
                "Legal counsel for companies, commercial relationships, transactions and business operations in Uganda.",

            image:
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=88",

            imageAlt:
                "Contemporary professional business environment",

            overview: `
                <p>
                    Businesses make legal decisions at almost every
                    stage of their development — from choosing a
                    structure and establishing relationships to
                    negotiating agreements and managing ongoing
                    commercial obligations.
                </p>

                <p>
                    Our corporate and commercial practice is designed
                    around those decisions. We provide legal counsel
                    for companies and organisations navigating
                    commercial activity in Uganda, with attention to
                    the practical implications of each transaction or
                    business relationship.
                </p>

                <p>
                    The objective is straightforward: help clients
                    understand the legal dimensions of a commercial
                    decision before that decision becomes a problem.
                </p>
            `,

            focus: [
                "Corporate structuring",
                "Commercial agreements",
                "Business transactions",
                "Shareholder and governance matters",
                "Ongoing corporate advisory",
                "Commercial relationships"
            ],

            contextTitle:
                "For businesses making consequential decisions.",

            context:
                "Whether establishing a new business relationship, reviewing an agreement or considering a transaction, legal advice can help identify obligations, risks and issues that deserve attention before a decision is implemented.",

            resources: [
                {
                    label: "Uganda Registration Services Bureau",
                    short: "URSB",
                    url: "https://ursb.go.ug/"
                },
                {
                    label: "Uganda Revenue Authority",
                    short: "URA",
                    url: "https://ura.go.ug/"
                }
            ]

        },


        investment: {

            number: "02",

            category: "FOREIGN INVESTMENT",

            shortTitle: "Foreign Investment",

            title:
                "Entering Uganda with greater legal clarity.",

            intro:
                "Supporting international investors navigating Uganda's legal and commercial environment.",

            image:
                "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1800&q=88",

            imageAlt:
                "Business professionals discussing an investment",

            overview: `
                <p>
                    Entering a new market requires more than identifying
                    a commercial opportunity. Investors must understand
                    the legal environment in which the proposed
                    investment will operate.
                </p>

                <p>
                    This can involve considering ownership structures,
                    corporate arrangements, agreements, regulatory
                    requirements, employment considerations and the
                    legal status of assets or counterparties.
                </p>

                <p>
                    We assist clients in approaching these questions
                    from a Uganda-facing perspective, helping them
                    identify the legal issues that should be considered
                    before capital is committed or operations begin.
                </p>
            `,

            focus: [
                "Investment structuring",
                "Market-entry considerations",
                "Corporate establishment",
                "Commercial agreements",
                "Regulatory considerations",
                "Legal due diligence"
            ],

            contextTitle:
                "For international clients entering Uganda.",

            context:
                "Cross-border decisions often involve several legal and commercial considerations at once. A Uganda-focused legal review can help international clients understand the local dimensions of a proposed investment.",

            resources: [
                {
                    label: "Uganda Investment Authority",
                    short: "UIA",
                    url: "https://ugandainvest.go.ug/"
                },
                {
                    label: "Uganda Registration Services Bureau",
                    short: "URSB",
                    url: "https://ursb.go.ug/"
                },
                {
                    label: "Bank of Uganda",
                    short: "BOU",
                    url: "https://bou.or.ug/"
                },
                {
                    label: "Uganda Revenue Authority",
                    short: "URA",
                    url: "https://ura.go.ug/"
                }
            ]

        },


        property: {

            number: "03",

            category: "REAL ESTATE & LAND",

            shortTitle: "Real Estate & Land",

            title:
                "Protecting value in property decisions.",

            intro:
                "Legal support involving property, acquisitions, leases, development, due diligence and disputes.",

            image:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=88",

            imageAlt:
                "Modern property development",

            overview: `
                <p>
                    Property transactions can involve substantial
                    financial commitments and long-term consequences.
                    The legal position of the property, the transaction
                    documents and the interests of the parties should
                    therefore be considered carefully.
                </p>

                <p>
                    Our real estate and land practice covers legal
                    support connected with acquisitions, leases,
                    development, due diligence and property-related
                    disputes.
                </p>

                <p>
                    We approach property matters with a focus on
                    documentation, ownership, contractual obligations
                    and the particular circumstances surrounding the
                    transaction.
                </p>
            `,

            focus: [
                "Property acquisitions",
                "Land due diligence",
                "Leases and tenancy arrangements",
                "Property development",
                "Transaction documentation",
                "Land and property disputes"
            ],

            contextTitle:
                "Because property decisions are rarely simple.",

            context:
                "Before a property transaction moves forward, clients may need to understand the legal position of the property, the documents involved and the obligations being assumed by each party.",

            resources: [
                {
                    label: "Uganda Judiciary",
                    short: "JUDICIARY",
                    url: "https://judiciary.go.ug/"
                },
                {
                    label: "Uganda Law Reform Commission",
                    short: "ULRC",
                    url: "https://ulrc.go.ug/"
                }
            ]

        },


        disputes: {

            number: "04",

            category: "DISPUTE RESOLUTION",

            shortTitle: "Dispute Resolution",

            title:
                "When disagreement becomes a legal matter.",

            intro:
                "Strategic representation and advice in civil and commercial disputes.",

            image:
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1800&q=88",

            imageAlt:
                "Legal documents prepared for a dispute",

            overview: `
                <p>
                    Commercial and civil disagreements can affect
                    relationships, assets, contracts and business
                    continuity. Once a dispute emerges, understanding
                    the legal position and available procedural
                    options becomes important.
                </p>

                <p>
                    Our dispute resolution practice provides strategic
                    advice and representation in civil and commercial
                    disputes, with attention to the underlying facts,
                    documentation and legal issues involved.
                </p>

                <p>
                    Every dispute has its own circumstances. The
                    appropriate approach therefore depends on the
                    nature of the matter, the parties involved and the
                    stage at which legal assistance is sought.
                </p>
            `,

            focus: [
                "Civil disputes",
                "Commercial disputes",
                "Contractual disagreements",
                "Dispute strategy",
                "Representation",
                "Pre-litigation legal advice"
            ],

            contextTitle:
                "For matters where the details matter.",

            context:
                "Early legal assessment can help clarify the issues in dispute, the relevant documents and the procedural position before the matter develops further.",

            resources: [
                {
                    label: "Judiciary of Uganda",
                    short: "JUDICIARY",
                    url: "https://judiciary.go.ug/"
                },
                {
                    label: "Uganda Law Reform Commission",
                    short: "ULRC",
                    url: "https://ulrc.go.ug/"
                }
            ]

        },


        employment: {

            number: "05",

            category: "EMPLOYMENT & LABOUR",

            shortTitle: "Employment & Labour",

            title:
                "Clearer employment relationships.",

            intro:
                "Advice on employment relationships, contracts, compliance and workplace disputes.",

            image:
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=88",

            imageAlt:
                "Professional team meeting",

            overview: `
                <p>
                    Employment relationships involve continuing
                    obligations between employers and employees. Clear
                    agreements and appropriate legal advice can be
                    important when relationships are established,
                    changed or brought to an end.
                </p>

                <p>
                    Our employment and labour practice covers advice
                    relating to employment relationships, contracts,
                    compliance and workplace disputes.
                </p>

                <p>
                    We focus on helping clients understand the legal
                    considerations surrounding workplace decisions
                    before those decisions are implemented.
                </p>
            `,

            focus: [
                "Employment contracts",
                "Employment relationships",
                "Workplace compliance",
                "Employment documentation",
                "Workplace disputes",
                "Employment advisory"
            ],

            contextTitle:
                "For employers and individuals navigating work.",

            context:
                "Employment matters can involve both contractual and practical considerations. The right legal review depends on the particular relationship, documents and circumstances involved.",

            resources: [
                {
                    label: "Uganda Revenue Authority",
                    short: "URA",
                    url: "https://ura.go.ug/"
                }
            ]

        },


        regulatory: {

            number: "06",

            category: "REGULATORY & ADVISORY",

            shortTitle: "Regulatory & Advisory",

            title:
                "Making complex requirements easier to navigate.",

            intro:
                "Legal advice for regulatory, compliance and wider advisory matters.",

            image:
                "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=88",

            imageAlt:
                "Professional documents and regulatory paperwork",

            overview: `
                <p>
                    Regulatory questions can sit at the centre of
                    business, investment and institutional decisions.
                    Understanding the applicable requirements before
                    acting can be an important part of responsible
                    decision-making.
                </p>

                <p>
                    Our regulatory and advisory practice provides legal
                    guidance on matters where clients need to understand
                    legal requirements, obligations and potential
                    compliance considerations.
                </p>

                <p>
                    The precise legal position will depend on the
                    sector, activity and circumstances. We therefore
                    approach advisory work around the specific question
                    the client needs answered.
                </p>
            `,

            focus: [
                "Regulatory advisory",
                "Compliance considerations",
                "Business requirements",
                "Institutional advisory",
                "Sector-specific legal questions",
                "Ongoing legal guidance"
            ],

            contextTitle:
                "For decisions shaped by regulation.",

            context:
                "Where regulation affects a commercial or institutional decision, understanding the applicable requirements early can help clients plan the legal aspects of that decision.",

            resources: [
                {
                    label: "Uganda Revenue Authority",
                    short: "URA",
                    url: "https://ura.go.ug/"
                },
                {
                    label: "Bank of Uganda",
                    short: "BOU",
                    url: "https://bou.or.ug/"
                },
                {
                    label: "Uganda Investment Authority",
                    short: "UIA",
                    url: "https://ugandainvest.go.ug/"
                },
                {
                    label: "Uganda Registration Services Bureau",
                    short: "URSB",
                    url: "https://ursb.go.ug/"
                }
            ]

        }

    };


    /* ============================================================
       BUILD THE READER
       ------------------------------------------------------------
       We create it dynamically so you do NOT have to add a second
       large HTML block to index.html.
       ============================================================ */

    const reader = document.createElement("div");

    reader.className = "expertise-reader";

    reader.id = "expertiseReader";

    reader.setAttribute("aria-hidden", "true");

    reader.innerHTML = `

        <div class="expertise-reader-backdrop"></div>

        <article
            class="expertise-reader-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="expertiseReaderTitle"
        >

            <!-- =================================================
                 TOP BAR
                 ================================================= -->

            <header class="expertise-reader-header">

                <div class="expertise-reader-brand">

                    <span class="expertise-reader-mark">
                        O&O
                    </span>

                    <span>
                        OJAMBO & OJAMBO ADVOCATES
                    </span>

                </div>


                <div class="expertise-reader-meta">

                    <span
                        id="expertiseReaderCategory"
                    >
                        CORPORATE & COMMERCIAL
                    </span>

                    <span
                        class="expertise-reader-index"
                        id="expertiseReaderIndex"
                    >
                        01 / 06
                    </span>

                </div>


                <button
                    type="button"
                    class="expertise-reader-close"
                    id="expertiseReaderClose"
                    aria-label="Close practice area"
                >
                    ×
                </button>

            </header>


            <!-- =================================================
                 PROGRESS
                 ================================================= -->

            <div class="expertise-reader-progress">

                <span
                    id="expertiseReaderProgress"
                ></span>

            </div>


            <!-- =================================================
                 SCROLLABLE CONTENT
                 ================================================= -->

            <div
                class="expertise-reader-content"
                id="expertiseReaderContent"
            >

                <!-- HERO VISUAL -->

                <div
                    class="expertise-reader-visual"
                    id="expertiseReaderVisual"
                >

                    <img
                        id="expertiseReaderImage"
                        src=""
                        alt=""
                    >

                    <div class="expertise-reader-visual-overlay"></div>

                    <span
                        class="expertise-reader-big-number"
                        id="expertiseReaderBigNumber"
                    >
                        01
                    </span>

                    <span class="expertise-reader-visual-label">
                        O&O / PRACTICE
                    </span>

                </div>


                <!-- EDITORIAL INTRO -->

                <div class="expertise-reader-intro">

                    <p
                        class="expertise-reader-kicker"
                        id="expertiseReaderKicker"
                    >
                        CORPORATE & COMMERCIAL
                    </p>

                    <h1
                        id="expertiseReaderTitle"
                    ></h1>

                    <p
                        class="expertise-reader-lead"
                        id="expertiseReaderLead"
                    ></p>

                </div>


                <!-- OVERVIEW -->

                <div class="expertise-reader-section">

                    <div class="expertise-reader-section-number">
                        01
                    </div>

                    <div>

                        <p class="expertise-reader-section-label">
                            THE PRACTICE
                        </p>

                        <div
                            class="expertise-reader-body"
                            id="expertiseReaderBody"
                        ></div>

                    </div>

                </div>


                <!-- WHAT WE COVER -->

                <div class="expertise-reader-section">

                    <div class="expertise-reader-section-number">
                        02
                    </div>

                    <div>

                        <p class="expertise-reader-section-label">
                            WHAT WE COVER
                        </p>

                        <div
                            class="expertise-focus-list"
                            id="expertiseReaderFocus"
                        ></div>

                    </div>

                </div>


                <!-- CONTEXT -->

                <div class="expertise-reader-context">

                    <div class="expertise-reader-context-number">
                        03
                    </div>

                    <div>

                        <p class="expertise-reader-section-label">
                            WHY IT MATTERS
                        </p>

                        <h2 id="expertiseReaderContextTitle"></h2>

                        <p id="expertiseReaderContext"></p>

                    </div>

                </div>


                <!-- OFFICIAL RESOURCES -->

                <div class="expertise-reader-resources">

                    <div>

                        <p class="expertise-reader-section-label">
                            RELEVANT RESOURCES
                        </p>

                        <h2>
                            Official sources
                            <span>for further reference.</span>
                        </h2>

                    </div>

                    <div
                        class="expertise-resource-list"
                        id="expertiseReaderResources"
                    ></div>

                </div>


                <!-- CONSULTATION -->

                <div class="expertise-reader-cta">

                    <div>

                        <p class="expertise-reader-section-label">
                            DISCUSS YOUR MATTER
                        </p>

                        <h2>
                            Need counsel
                            <span>for a specific matter?</span>
                        </h2>

                    </div>

                    <a
                        href="#contact"
                        class="expertise-reader-cta-button"
                        id="expertiseReaderCTA"
                    >
                        Book a Confidential Consultation
                        <span>↗</span>
                    </a>

                </div>

            </div>


            <!-- =================================================
                 PREVIOUS / NEXT
                 ================================================= -->

            <footer class="expertise-reader-footer">

                <button
                    type="button"
                    id="expertiseReaderPrev"
                    class="expertise-reader-nav"
                >

                    <span class="expertise-reader-nav-arrow">
                        ←
                    </span>

                    <span>

                        <small>
                            PREVIOUS
                        </small>

                        <strong id="expertiseReaderPrevName">
                            —
                        </strong>

                    </span>

                </button>


                <div class="expertise-reader-footer-center">
                    O&O / EXPERTISE
                </div>


                <button
                    type="button"
                    id="expertiseReaderNext"
                    class="expertise-reader-nav expertise-reader-nav-next"
                >

                    <span>

                        <small>
                            NEXT
                        </small>

                        <strong id="expertiseReaderNextName">
                            —
                        </strong>

                    </span>

                    <span class="expertise-reader-nav-arrow">
                        →
                    </span>

                </button>

            </footer>

        </article>
    `;


    document.body.appendChild(reader);


    /* ============================================================
       CACHE READER ELEMENTS
       ============================================================ */

    const backdrop =
        reader.querySelector(".expertise-reader-backdrop");

    const panel =
        reader.querySelector(".expertise-reader-panel");

    const content =
        document.getElementById("expertiseReaderContent");

    const closeButton =
        document.getElementById("expertiseReaderClose");

    const category =
        document.getElementById("expertiseReaderCategory");

    const index =
        document.getElementById("expertiseReaderIndex");

    const image =
        document.getElementById("expertiseReaderImage");

    const bigNumber =
        document.getElementById("expertiseReaderBigNumber");

    const kicker =
        document.getElementById("expertiseReaderKicker");

    const title =
        document.getElementById("expertiseReaderTitle");

    const lead =
        document.getElementById("expertiseReaderLead");

    const body =
        document.getElementById("expertiseReaderBody");

    const focus =
        document.getElementById("expertiseReaderFocus");

    const contextTitle =
        document.getElementById("expertiseReaderContextTitle");

    const context =
        document.getElementById("expertiseReaderContext");

    const resources =
        document.getElementById("expertiseReaderResources");

    const progress =
        document.getElementById("expertiseReaderProgress");

    const prevButton =
        document.getElementById("expertiseReaderPrev");

    const nextButton =
        document.getElementById("expertiseReaderNext");

    const prevName =
        document.getElementById("expertiseReaderPrevName");

    const nextName =
        document.getElementById("expertiseReaderNextName");


    /* ============================================================
       ORDER
       ============================================================ */

    const order = [
        "corporate",
        "investment",
        "property",
        "disputes",
        "employment",
        "regulatory"
    ];


    let currentIndex = 0;

    let activePractice = null;


    /* ============================================================
       RENDER PRACTICE AREA
       ============================================================ */

    function renderPractice(key) {

        const data =
            practiceAreas[key];

        if (!data) return;


        currentIndex =
            order.indexOf(key);

        activePractice =
            key;


        /* --------------------------------------------------------
           BASIC CONTENT
           -------------------------------------------------------- */

        category.textContent =
            data.category;

        index.textContent =
            `${data.number} / 06`;

        kicker.textContent =
            data.category;

        title.textContent =
            data.title;

        lead.textContent =
            data.intro;

        bigNumber.textContent =
            data.number;


        /* --------------------------------------------------------
           IMAGE
           -------------------------------------------------------- */

        image.src =
            data.image;

        image.alt =
            data.imageAlt;


        /* --------------------------------------------------------
           BODY
           -------------------------------------------------------- */

        body.innerHTML =
            data.overview;


        /* --------------------------------------------------------
           FOCUS LIST
           -------------------------------------------------------- */

        focus.innerHTML =
            data.focus
                .map((item, i) => `

                    <div class="expertise-focus-item">

                        <span>
                            ${String(i + 1).padStart(2, "0")}
                        </span>

                        <strong>
                            ${item}
                        </strong>

                        <i>
                            ↗
                        </i>

                    </div>

                `)
                .join("");


        /* --------------------------------------------------------
           CONTEXT
           -------------------------------------------------------- */

        contextTitle.textContent =
            data.contextTitle;

        context.textContent =
            data.context;


        /* --------------------------------------------------------
           OFFICIAL RESOURCES
           -------------------------------------------------------- */

        resources.innerHTML =
            data.resources
                .map(resource => `

                    <a
                        href="${resource.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="expertise-resource"
                    >

                        <span class="expertise-resource-code">
                            ${resource.short}
                        </span>

                        <span class="expertise-resource-name">
                            ${resource.label}
                        </span>

                        <span class="expertise-resource-arrow">
                            ↗
                        </span>

                    </a>

                `)
                .join("");


        /* --------------------------------------------------------
           PREVIOUS / NEXT
           -------------------------------------------------------- */

        const previousIndex =
            (currentIndex - 1 + order.length) %
            order.length;

        const nextIndex =
            (currentIndex + 1) %
            order.length;


        prevName.textContent =
            practiceAreas[
                order[previousIndex]
            ].shortTitle;


        nextName.textContent =
            practiceAreas[
                order[nextIndex]
            ].shortTitle;


        /* --------------------------------------------------------
           RESET READING POSITION
           -------------------------------------------------------- */

        content.scrollTop = 0;

        progress.style.width = "0%";


        /* --------------------------------------------------------
           SMALL CONTENT REVEAL
           -------------------------------------------------------- */

        reader.classList.remove("reader-content-ready");

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                reader.classList.add(
                    "reader-content-ready"
                );

            });

        });

    }


    /* ============================================================
       OPEN
       ============================================================ */

    function openPractice(key) {

        renderPractice(key);


        reader.classList.add("open");

        reader.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "expertise-reader-open"
        );


        /*
         * Focus the close button after the opening animation starts.
         */
        setTimeout(() => {

            closeButton.focus();

        }, 150);

    }


    /* ============================================================
       CLOSE
       ============================================================ */

    function closePractice() {

        reader.classList.remove("open");

        reader.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "expertise-reader-open"
        );

        progress.style.width = "0%";

    }


    /* ============================================================
       PREVIOUS
       ============================================================ */

    function openPrevious() {

        const previousIndex =
            (currentIndex - 1 + order.length) %
            order.length;

        renderPractice(
            order[previousIndex]
        );

    }


    /* ============================================================
       NEXT
       ============================================================ */

    function openNext() {

        const nextIndex =
            (currentIndex + 1) %
            order.length;

        renderPractice(
            order[nextIndex]
        );

    }


    /* ============================================================
       PRACTICE ROWS
       ============================================================ */

    practiceItems.forEach((item, index) => {

        const titleElement =
            item.querySelector("h3");

        if (!titleElement) return;


        const titleText =
            titleElement.textContent
                .trim()
                .toLowerCase();


        let key = null;


        if (
            titleText.includes("corporate")
        ) {
            key = "corporate";

        } else if (
            titleText.includes("foreign investment")
        ) {
            key = "investment";

        } else if (
            titleText.includes("real estate")
        ) {
            key = "property";

        } else if (
            titleText.includes("dispute")
        ) {
            key = "disputes";

        } else if (
            titleText.includes("employment")
        ) {
            key = "employment";

        } else if (
            titleText.includes("regulatory")
        ) {
            key = "regulatory";
        }


        if (!key) return;


        /*
         * Make the existing row behave like a button.
         */

        item.setAttribute(
            "tabindex",
            "0"
        );

        item.setAttribute(
            "role",
            "button"
        );

        item.setAttribute(
            "aria-haspopup",
            "dialog"
        );


        /*
         * Store the key for debugging / future enhancements.
         */

        item.dataset.practice =
            key;


        /*
         * CLICK
         */

        item.addEventListener(
            "click",
            event => {

                /*
                 * If a future button/link is placed inside the row,
                 * don't accidentally open twice.
                 */

                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {
                    return;
                }

                openPractice(key);

            }
        );


        /*
         * KEYBOARD
         */

        item.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openPractice(key);

                }

            }
        );


        /*
         * Add a subtle "EXPLORE" state without changing
         * the existing HTML.
         */

        item.style.setProperty(
            "--practice-index",
            `"${String(index + 1).padStart(2, "0")}"`
        );

    });


    /* ============================================================
       CLOSE EVENTS
       ============================================================ */

    closeButton.addEventListener(
        "click",
        closePractice
    );


    backdrop.addEventListener(
        "click",
        closePractice
    );


    /* ============================================================
       NAVIGATION BUTTONS
       ============================================================ */

    prevButton.addEventListener(
        "click",
        openPrevious
    );


    nextButton.addEventListener(
        "click",
        openNext
    );


    /* ============================================================
       KEYBOARD NAVIGATION
       ============================================================ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !reader.classList.contains("open")
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closePractice();

                return;

            }


            if (
                event.key === "ArrowLeft"
            ) {

                openPrevious();

                return;

            }


            if (
                event.key === "ArrowRight"
            ) {

                openNext();

            }

        }
    );


    /* ============================================================
       READING PROGRESS
       ============================================================ */

    content.addEventListener(
        "scroll",
        () => {

            const scrollTop =
                content.scrollTop;

            const scrollHeight =
                content.scrollHeight -
                content.clientHeight;


            if (
                scrollHeight <= 0
            ) {

                progress.style.width =
                    "100%";

                return;

            }


            const percentage =
                (
                    scrollTop /
                    scrollHeight
                ) * 100;


            progress.style.width =
                `${Math.min(
                    100,
                    Math.max(
                        0,
                        percentage
                    )
                )}%`;

        },
        { passive: true }
    );


    /* ============================================================
       SWIPE NAVIGATION
       ------------------------------------------------------------
       Mobile users can swipe left/right through practice areas.
       ============================================================ */

    let touchStartX = 0;

    let touchStartY = 0;


    content.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        { passive: true }
    );


    content.addEventListener(
        "touchend",
        event => {

            const touch =
                event.changedTouches[0];

            const deltaX =
                touch.clientX -
                touchStartX;

            const deltaY =
                touch.clientY -
                touchStartY;


            /*
             * Ignore mostly vertical scrolling.
             */

            if (
                Math.abs(deltaX) < 70 ||
                Math.abs(deltaX) < Math.abs(deltaY)
            ) {
                return;
            }


            if (deltaX < 0) {

                openNext();

            } else {

                openPrevious();

            }

        },
        { passive: true }
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

scrollObserver.observe(element);
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


















    /* ============================================================
   OJAMBO & OJAMBO ADVOCATES
   PREMIUM CLIENTS READER
   ============================================================

   CLIENT EXPERIENCE
   ------------------------------------------------------------
   The main Clients section remains intentionally minimal.

   Clicking a client opens a full editorial reader containing:

   • Large client identity
   • Client number
   • Organisation category
   • Editorial introduction
   • Publicly available organisation context
   • Relationship / engagement section
   • Relevant public resources
   • Official website where verified
   • Enquiry CTA
   • Previous / Next navigation
   • Reading progress
   • Keyboard navigation
   • Mobile swipe navigation
   • Reduced-motion support

   IMPORTANT:
   ------------------------------------------------------------
   We do not invent specific legal matters, confidential work,
   transactions, outcomes or testimonials.

   The reader only presents information that is appropriate for
   public-facing firm positioning.
   ============================================================ */


    const clientCards =
        document.querySelectorAll(".client-logo:not(.legal-resource-card)");

    if (!clientCards.length) return;


    /* ============================================================
       CLIENT DATA
       ============================================================ */

    const clients = {

        kenlloyd: {

            number: "01",

            category: "LOGISTICS · TRADE · BUSINESS",

            name: "KENLLOYD",

            subtitle: "LOGISTICS LIMITED",

            title:
                "Legal counsel around complex commercial environments.",

            intro:
                "A selected client relationship represented within the firm's corporate and commercial practice.",

            mark:
                "KENLLOYD",

            description: `
                <p>
                    Kenlloyd Logistics Limited is a Ugandan company
                    operating across logistics, petroleum marketing
                    and commodity trading.
                </p>

                <p>
                    The organisation's public profile describes a
                    business that has diversified beyond its original
                    clearing and forwarding activities into multiple
                    commercial areas.
                </p>

                <p>
                    For organisations operating across interconnected
                    commercial activities, legal considerations can
                    arise across contracts, corporate arrangements,
                    regulatory requirements, transactions and ongoing
                    business relationships.
                </p>
            `,

            focus: [
                "Corporate & commercial matters",
                "Commercial relationships",
                "Business transactions",
                "Contractual considerations",
                "Regulatory considerations",
                "Ongoing legal advisory"
            ],

            contextTitle:
                "Counsel for businesses operating across multiple commercial interests.",

            context:
                "The firm's corporate and commercial practice is structured to support organisations navigating business decisions, commercial relationships and legal obligations in Uganda.",

            officialLabel:
                "Kenlloyd Logistics",

            officialUrl:
                "https://www.kenlloyd-logistics.com/"

        },


        pioneer: {

            number: "02",

            category: "TRANSPORT · INFRASTRUCTURE · BUSINESS",

            name: "pioneer",

            subtitle: "EASY BUS",

            title:
                "Legal thinking for businesses that move people.",

            intro:
                "A selected client relationship within a business environment involving transport and commercial activity.",

            mark:
                "pioneer",

            description: `
                <p>
                    Pioneer Easy Bus is a public transport business
                    associated with bus operations in Kampala.
                </p>

                <p>
                    Public records and reporting document the company's
                    role in Kampala's urban transport environment,
                    including its historical concession and related
                    commercial and legal matters.
                </p>

                <p>
                    Transport businesses operate within a particularly
                    interconnected legal environment, where commercial,
                    regulatory, contractual and operational questions
                    can intersect.
                </p>
            `,

            focus: [
                "Commercial matters",
                "Transport-sector considerations",
                "Contractual relationships",
                "Regulatory matters",
                "Dispute-related issues",
                "Business advisory"
            ],

            contextTitle:
                "Where commercial activity meets regulation and infrastructure.",

            context:
                "The legal environment surrounding transport and infrastructure businesses can involve several parties and regulatory considerations at the same time.",

            officialLabel:
                "Public legal record — Uganda",

            officialUrl:
                "https://ulii.org/en/akn/ug/judgment/ughccd/2017/185/eng@2017-11-16"

        },


        capital: {

            number: "03",

            category: "LOGISTICS · PROCUREMENT · BUSINESS",

            name: "CAPITAL",

            subtitle: "LOGISTICS",

            title:
                "Commercial counsel for operational businesses.",

            intro:
                "A selected client relationship within the firm's business and commercial client portfolio.",

            mark:
                "CAPITAL",

            description: `
                <p>
                    Capital Logistics is presented on the firm's
                    website as one of its selected clients.
                </p>

                <p>
                    Logistics and procurement businesses operate
                    through commercial relationships involving
                    suppliers, customers, contracts, property,
                    personnel and regulatory requirements.
                </p>

                <p>
                    Our broader corporate and commercial practice
                    provides a legal framework for organisations
                    dealing with these kinds of commercial decisions
                    in Uganda.
                </p>
            `,

            focus: [
                "Commercial agreements",
                "Business relationships",
                "Procurement considerations",
                "Corporate advisory",
                "Contractual obligations",
                "Regulatory considerations"
            ],

            contextTitle:
                "Supporting commercial operations with legal clarity.",

            context:
                "Businesses with multiple operational relationships often need legal guidance that connects contracts, commercial decisions and regulatory considerations.",

            officialLabel:
                "Capital Logistics",

            officialUrl:
                "mailto:robertojambo@gmail.com?subject=Enquiry%20regarding%20Capital%20Logistics"

        },


        elsmed: {

            number: "04",

            category: "HEALTHCARE · TECHNOLOGY · INSTITUTIONS",

            name: "ELSMED",

            subtitle: "HEALTH CARE SOLUTIONS LTD",

            title:
                "Legal support where business meets healthcare.",

            intro:
                "A selected client relationship represented within the firm's broader business and institutional client portfolio.",

            mark:
                "ELSMED",

            description: `
                <p>
                    Elsmed Health Care Solutions is presented on the
                    firm's website as a selected client.
                </p>

                <p>
                    Publicly available information describes the
                    organisation's involvement in healthcare
                    technology, medical equipment and healthcare
                    infrastructure projects in Uganda.
                </p>

                <p>
                    Organisations working in highly regulated
                    environments may encounter legal questions
                    involving commercial relationships, projects,
                    contracts, regulatory requirements and
                    institutional counterparties.
                </p>
            `,

            focus: [
                "Corporate & commercial matters",
                "Healthcare-sector business",
                "Commercial agreements",
                "Project-related matters",
                "Regulatory considerations",
                "Institutional relationships"
            ],

            contextTitle:
                "For organisations operating where regulation matters.",

            context:
                "Healthcare-related commercial activity can involve several contractual, institutional and regulatory dimensions, making clear legal analysis particularly important.",

            officialLabel:
                "Elsmed Health Care Solutions",

            officialUrl:
                "https://elsmedhealthcaresolutions.chromaticpaintsug.com/"

        },


        returnhope: {

            number: "05",

            category: "INTERNATIONAL · ORGANISATION · USA",

            name: "RETURN HOPE",

            subtitle: "INTERNATIONAL, INC.",

            country: "USA",

            title:
                "Uganda-facing counsel for international organisations.",

            intro:
                "A selected international client relationship represented within the firm's portfolio.",

            mark:
                "RETURN HOPE",

            description: `
                <p>
                    Return Hope International, Inc. is identified on
                    the firm's website among its selected clients.
                </p>

                <p>
                    International organisations working across
                    jurisdictions may need local legal guidance when
                    their activities, relationships or interests
                    intersect with Uganda.
                </p>

                <p>
                    Our practice is positioned to provide Uganda-facing
                    legal advice to international clients, institutions
                    and organisations navigating local legal and
                    commercial considerations.
                </p>
            `,

            focus: [
                "Uganda-facing legal advice",
                "International organisations",
                "Institutional relationships",
                "Local legal considerations",
                "Commercial matters",
                "Regulatory considerations"
            ],

            contextTitle:
                "Local legal understanding for international organisations.",

            context:
                "International clients may require a local legal perspective when their activities, relationships or interests extend into Uganda.",

            officialLabel:
                "Contact O&O regarding this client enquiry",

            officialUrl:
                "mailto:robertojambo@gmail.com?subject=Enquiry%20regarding%20Return%20Hope%20International"

        },


        christian: {

            number: "06",

            category: "INSTITUTIONAL · ORGANISATION",

            name: "Christian",

            subtitle: "LIFE MINISTRIES",

            title:
                "Legal counsel for organisations with institutional responsibilities.",

            intro:
                "A selected client relationship within the firm's institutional portfolio.",

            mark:
                "Christian",

            description: `
                <p>
                    Christian Life Ministries is presented on the
                    firm's website as one of its selected clients.
                </p>

                <p>
                    Organisations and institutions can encounter legal
                    questions across governance, agreements, property,
                    employment, regulatory matters and relationships
                    with third parties.
                </p>

                <p>
                    Our wider advisory practice is designed around
                    understanding those legal questions in the context
                    of the organisation involved.
                </p>
            `,

            focus: [
                "Institutional advisory",
                "Governance considerations",
                "Commercial agreements",
                "Property matters",
                "Employment matters",
                "Regulatory considerations"
            ],

            contextTitle:
                "Legal advice shaped around the organisation.",

            context:
                "Institutional clients can require legal advice across several areas at once, making context and careful issue identification important.",

            officialLabel:
                "Contact O&O regarding this client enquiry",

            officialUrl:
                "mailto:robertojambo@gmail.com?subject=Enquiry%20regarding%20Christian%20Life%20Ministries"

        },


        kirk: {

            number: "07",

            category: "TECHNICAL SERVICES · BUSINESS",

            name: "KIRK",

            subtitle: "TECHNICALS LTD",

            title:
                "Legal support for technical and commercial businesses.",

            intro:
                "A selected client relationship represented within the firm's business portfolio.",

            mark:
                "KIRK",

            description: `
                <p>
                    Kirk Technicals Ltd is identified on the firm's
                    website as a selected client.
                </p>

                <p>
                    Technical businesses can operate through a network
                    of contracts, suppliers, customers, employees and
                    other commercial counterparties.
                </p>

                <p>
                    Our corporate and commercial practice provides
                    legal support around the agreements, relationships
                    and business decisions that underpin those
                    activities.
                </p>
            `,

            focus: [
                "Commercial agreements",
                "Business relationships",
                "Corporate advisory",
                "Contractual matters",
                "Employment considerations",
                "Regulatory questions"
            ],

            contextTitle:
                "Keeping commercial relationships legally clear.",

            context:
                "For technical and operational businesses, contracts and commercial relationships can form an important part of everyday activity.",

            officialLabel:
                "Contact O&O regarding this client enquiry",

            officialUrl:
                "mailto:robertojambo@gmail.com?subject=Enquiry%20regarding%20Kirk%20Technicals"

        }

    };


    /* ============================================================
       CLIENT ORDER
       ============================================================ */

    const order = [
        "kenlloyd",
        "pioneer",
        "capital",
        "elsmed",
        "returnhope",
        "christian",
        "kirk"
    ];


    /* ============================================================
       IDENTIFY CLIENT CARD
       ============================================================ */

    function getClientKey(card) {

        if (
            card.classList.contains("client-kenlloyd")
        ) {
            return "kenlloyd";
        }

        if (
            card.classList.contains("client-pioneer")
        ) {
            return "pioneer";
        }

        if (
            card.classList.contains("client-capital")
        ) {
            return "capital";
        }

        if (
            card.classList.contains("client-elsmed")
        ) {
            return "elsmed";
        }

        if (
            card.classList.contains("client-returnhope")
        ) {
            return "returnhope";
        }

        if (
            card.classList.contains("client-christian")
        ) {
            return "christian";
        }

        if (
            card.classList.contains("client-kirk")
        ) {
            return "kirk";
        }

        return null;

    }


    /* ============================================================
       CREATE READER
       ============================================================ */

  const clientsReader =
    document.createElement("div");

clientsReader.className =
    "clients-reader";

clientsReader.id =
    "clientsReader";

clientsReader.setAttribute(
    "aria-hidden",
    "true"
);

clientsReader.innerHTML = `



        <div class="clients-reader-backdrop"></div>

        <article
            class="clients-reader-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clientsReaderTitle"
        >

            <header class="clients-reader-header">

                <div class="clients-reader-brand">

                    <span class="clients-reader-mark">
                        O&O
                    </span>

                    <span>
                        OJAMBO & OJAMBO ADVOCATES
                    </span>

                </div>


                <div class="clients-reader-meta">

                    <span id="clientsReaderCategory">
                        SELECTED CLIENT
                    </span>

                    <span
                        id="clientsReaderIndex"
                        class="clients-reader-index"
                    >
                        01 / 07
                    </span>

                </div>


                <button
                    type="button"
                    class="clients-reader-close"
                    id="clientsReaderClose"
                    aria-label="Close client profile"
                >
                    ×
                </button>

            </header>


            <div class="clients-reader-progress">
                <span id="clientsReaderProgress"></span>
            </div>


            <div
                class="clients-reader-content"
                id="clientsReaderContent"
            >

                <!-- CLIENT HERO -->

                <div class="clients-reader-visual">

                    <div
                        class="clients-reader-visual-grid"
                    ></div>

                    <div
                        class="clients-reader-wordmark"
                        id="clientsReaderWordmark"
                    >
                        KENLLOYD
                    </div>

                    <div
                        class="clients-reader-submark"
                        id="clientsReaderSubmark"
                    >
                        LOGISTICS LIMITED
                    </div>

                    <div
                        class="clients-reader-country"
                        id="clientsReaderCountry"
                    ></div>

                    <span class="clients-reader-visual-label">
                        SELECTED CLIENT / O&O
                    </span>

                    <span
                        class="clients-reader-big-number"
                        id="clientsReaderNumber"
                    >
                        01
                    </span>

                </div>


                <!-- INTRO -->

                <div class="clients-reader-intro">

                    <p
                        class="clients-reader-kicker"
                        id="clientsReaderKicker"
                    >
                        LOGISTICS · TRADE · BUSINESS
                    </p>

                    <h1
                        id="clientsReaderTitle"
                    ></h1>

                    <p
                        class="clients-reader-lead"
                        id="clientsReaderLead"
                    ></p>

                </div>


                <!-- ABOUT -->

                <div class="clients-reader-section">

                    <div class="clients-reader-section-number">
                        01
                    </div>

                    <div>

                        <p class="clients-reader-section-label">
                            CLIENT CONTEXT
                        </p>

                        <div
                            class="clients-reader-body"
                            id="clientsReaderBody"
                        ></div>

                    </div>

                </div>


                <!-- FOCUS -->

                <div class="clients-reader-section">

                    <div class="clients-reader-section-number">
                        02
                    </div>

                    <div>

                        <p class="clients-reader-section-label">
                            RELEVANT COUNSEL
                        </p>

                        <div
                            class="clients-focus-list"
                            id="clientsReaderFocus"
                        ></div>

                    </div>

                </div>


                <!-- CONTEXT -->

                <div class="clients-reader-context">

                    <div class="clients-reader-context-number">
                        03
                    </div>

                    <div>

                        <p class="clients-reader-section-label">
                            THE O&O APPROACH
                        </p>

                        <h2
                            id="clientsReaderContextTitle"
                        ></h2>

                        <p
                            id="clientsReaderContext"
                        ></p>

                    </div>

                </div>


                <!-- PUBLIC LINK -->

                <div class="clients-reader-resources">

                    <div>

                        <p class="clients-reader-section-label">
                            RELEVANT LINK
                        </p>

                        <h2>
                            Explore
                            <span>the public record.</span>
                        </h2>

                    </div>


                    <a
                        href="#"
                        id="clientsReaderResource"
                        class="clients-resource-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >

                        <span
                            class="clients-resource-code"
                            id="clientsReaderResourceCode"
                        >
                            WEB
                        </span>

                        <span
                            class="clients-resource-name"
                            id="clientsReaderResourceName"
                        >
                            Official website
                        </span>

                        <span class="clients-resource-arrow">
                            ↗
                        </span>

                    </a>

                </div>


                <!-- CTA -->

                <div class="clients-reader-cta">

                    <div>

                        <p class="clients-reader-section-label">
                            DISCUSS A MATTER
                        </p>

                        <h2>
                            Need legal counsel
                            <span>for your organisation?</span>
                        </h2>

                    </div>

                    <a
                        href="#contact"
                        class="clients-reader-cta-button"
                    >
                        Book a Confidential Consultation
                        <span>↗</span>
                    </a>

                </div>

            </div>


            <!-- NAV -->

            <footer class="clients-reader-footer">

                <button
                    type="button"
                    class="clients-reader-nav"
                    id="clientsReaderPrev"
                >

                    <span class="clients-reader-nav-arrow">
                        ←
                    </span>

                    <span>

                        <small>
                            PREVIOUS
                        </small>

                        <strong id="clientsReaderPrevName">
                            —
                        </strong>

                    </span>

                </button>


                <div class="clients-reader-footer-center">
                    O&O / SELECTED CLIENTS
                </div>


                <button
                    type="button"
                    class="clients-reader-nav clients-reader-nav-next"
                    id="clientsReaderNext"
                >

                    <span>

                        <small>
                            NEXT
                        </small>

                        <strong id="clientsReaderNextName">
                            —
                        </strong>

                    </span>

                    <span class="clients-reader-nav-arrow">
                        →
                    </span>

                </button>

            </footer>

        </article>
    `;


    document.body.appendChild(clientsReader);


    /* ============================================================
       ELEMENTS
       ============================================================ */

    const backdrop =
       clientsReader.querySelector(
            ".clients-reader-backdrop"
        );

    const content =
        document.getElementById(
            "clientsReaderContent"
        );

    const closeButton =
        document.getElementById(
            "clientsReaderClose"
        );

    const category =
        document.getElementById(
            "clientsReaderCategory"
        );

    const index =
        document.getElementById(
            "clientsReaderIndex"
        );

    const number =
        document.getElementById(
            "clientsReaderNumber"
        );

    const wordmark =
        document.getElementById(
            "clientsReaderWordmark"
        );

    const submark =
        document.getElementById(
            "clientsReaderSubmark"
        );

    const country =
        document.getElementById(
            "clientsReaderCountry"
        );

    const kicker =
        document.getElementById(
            "clientsReaderKicker"
        );

    const title =
        document.getElementById(
            "clientsReaderTitle"
        );

    const lead =
        document.getElementById(
            "clientsReaderLead"
        );

    const body =
        document.getElementById(
            "clientsReaderBody"
        );

    const focus =
        document.getElementById(
            "clientsReaderFocus"
        );

    const contextTitle =
        document.getElementById(
            "clientsReaderContextTitle"
        );

    const context =
        document.getElementById(
            "clientsReaderContext"
        );

    const resource =
        document.getElementById(
            "clientsReaderResource"
        );

    const resourceCode =
        document.getElementById(
            "clientsReaderResourceCode"
        );

    const resourceName =
        document.getElementById(
            "clientsReaderResourceName"
        );

    const progress =
        document.getElementById(
            "clientsReaderProgress"
        );

    const prevButton =
        document.getElementById(
            "clientsReaderPrev"
        );

    const nextButton =
        document.getElementById(
            "clientsReaderNext"
        );

    const prevName =
        document.getElementById(
            "clientsReaderPrevName"
        );

    const nextName =
        document.getElementById(
            "clientsReaderNextName"
        );


    let currentIndex = 0;


    /* ============================================================
       RENDER CLIENT
       ============================================================ */

    function renderClient(key) {

        const data =
            clients[key];

        if (!data) return;


        currentIndex =
            order.indexOf(key);


        category.textContent =
            data.category;

        index.textContent =
            `${data.number} / ${order.length}`;

        number.textContent =
            data.number;

        wordmark.textContent =
            data.mark;

        submark.textContent =
            data.subtitle;

        country.textContent =
            data.country || "";

        kicker.textContent =
            data.category;

        title.textContent =
            data.title;

        lead.textContent =
            data.intro;

        body.innerHTML =
            data.description;


        /* --------------------------------------------------------
           FOCUS
           -------------------------------------------------------- */

        focus.innerHTML =
            data.focus
                .map((item, index) => `

                    <div class="clients-focus-item">

                        <span>
                            ${String(index + 1).padStart(2, "0")}
                        </span>

                        <strong>
                            ${item}
                        </strong>

                        <i>
                            ↗
                        </i>

                    </div>

                `)
                .join("");


        /* --------------------------------------------------------
           CONTEXT
           -------------------------------------------------------- */

        contextTitle.textContent =
            data.contextTitle;

        context.textContent =
            data.context;


        /* --------------------------------------------------------
           PUBLIC LINK
           -------------------------------------------------------- */

        resource.href =
            data.officialUrl;

        resourceName.textContent =
            data.officialLabel;


        if (
            data.officialUrl.startsWith("mailto:")
        ) {

            resourceCode.textContent =
                "ENQUIRY";

            resource.target =
                "_self";

        } else {

            resourceCode.textContent =
                "PUBLIC";

            resource.target =
                "_blank";

        }


        /* --------------------------------------------------------
           PREVIOUS / NEXT
           -------------------------------------------------------- */

        const previousIndex =
            (
                currentIndex -
                1 +
                order.length
            ) % order.length;


        const nextIndex =
            (
                currentIndex +
                1
            ) % order.length;


        prevName.textContent =
            `${clients[
                order[previousIndex]
            ].name} ${
                clients[
                    order[previousIndex]
                ].subtitle
            }`;


        nextName.textContent =
            `${clients[
                order[nextIndex]
            ].name} ${
                clients[
                    order[nextIndex]
                ].subtitle
            }`;


        /* --------------------------------------------------------
           RESET
           -------------------------------------------------------- */

        content.scrollTop = 0;

        progress.style.width =
            "0%";


       clientsReader.classList.remove(
            "client-content-ready"
        );


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                clientsReader.classList.add(
                    "client-content-ready"
                );

            });

        });

    }


    /* ============================================================
       OPEN
       ============================================================ */

    function openClient(key) {

        renderClient(key);

        clientsReader.classList.add("open");

        clientsReader.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "clients-reader-open"
        );


        setTimeout(() => {

            closeButton.focus();

        }, 150);

    }


    /* ============================================================
       CLOSE
       ============================================================ */

    function closeClient() {

       clientsReader.classList.remove(
            "open"
        );
clientsReader.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "clients-reader-open"
        );

    }


    /* ============================================================
       PREVIOUS
       ============================================================ */

    function previousClient() {

        const previousIndex =
            (
                currentIndex -
                1 +
                order.length
            ) % order.length;


        renderClient(
            order[previousIndex]
        );

    }


    /* ============================================================
       NEXT
       ============================================================ */

    function nextClient() {

        const nextIndex =
            (
                currentIndex +
                1
            ) % order.length;


        renderClient(
            order[nextIndex]
        );

    }


    /* ============================================================
       CONNECT CLIENT CARDS
       ============================================================ */

    clientCards.forEach(card => {

        const key =
            getClientKey(card);

        if (!key) return;


        /*
         * Prevent the original mailto link from firing when
         * the visitor wants to explore the client profile.
         */

        card.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openClient(key);

            }
        );


        /*
         * Accessibility.
         */

        card.setAttribute(
            "role",
            "button"
        );

        card.setAttribute(
            "tabindex",
            "0"
        );

        card.setAttribute(
            "aria-haspopup",
            "dialog"
        );


        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openClient(key);

                }

            }
        );

    });


    /* ============================================================
       CLOSE
       ============================================================ */

    closeButton.addEventListener(
        "click",
        closeClient
    );


    backdrop.addEventListener(
        "click",
        closeClient
    );


    /* ============================================================
       NAVIGATION
       ============================================================ */

    prevButton.addEventListener(
        "click",
        previousClient
    );


    nextButton.addEventListener(
        "click",
        nextClient
    );


    /* ============================================================
       KEYBOARD
       ============================================================ */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !clientsReader.classList.contains("open")
            ) {
                return;
            }


            if (
                event.key === "Escape"
            ) {

                closeClient();

                return;

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousClient();

                return;

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextClient();

            }

        }
    );


    /* ============================================================
       READING PROGRESS
       ============================================================ */

    content.addEventListener(
        "scroll",
        () => {

            const scrollHeight =
                content.scrollHeight -
                content.clientHeight;


            if (
                scrollHeight <= 0
            ) {

                progress.style.width =
                    "100%";

                return;

            }


            const percentage =
                (
                    content.scrollTop /
                    scrollHeight
                ) * 100;


            progress.style.width =
                `${Math.min(
                    100,
                    Math.max(
                        0,
                        percentage
                    )
                )}%`;

        },
        {
            passive: true
        }
    );


    /* ============================================================
       MOBILE SWIPE
       ============================================================ */

    let touchStartX = 0;

    let touchStartY = 0;


    content.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    content.addEventListener(
        "touchend",
        event => {

            const touch =
                event.changedTouches[0];

            const deltaX =
                touch.clientX -
                touchStartX;

            const deltaY =
                touch.clientY -
                touchStartY;


            if (
                Math.abs(deltaX) < 70 ||
                Math.abs(deltaX) <
                Math.abs(deltaY)
            ) {
                return;
            }


            if (deltaX < 0) {

                nextClient();

            } else {

                previousClient();

            }

        },
        {
            passive: true
        }
    );



});