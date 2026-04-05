// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') navLinks.classList.toggle('open');
    });
}

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== Product Data =====
const products = {
    'shelfie': {
        name: 'Shelfie',
        img: 'img/shelfie.jpg',
        tagline: 'Advanced approach for comprehensive dry eye management.',
        composition: 'Sodium Carboxymethylcellulose IP 0.5% w/v + Glycerine 0.5% w/v + SOC',
        price: '₹100'
    },
    'shelmoist': {
        name: 'Shelmoist',
        img: 'img/shelmoist.jpg',
        tagline: 'Unique combination for maximum lubrication, hydration, and long-lasting relief.',
        composition: 'Sodium Hyaluronate 0.1% + SOC 0.1 mg',
        price: '₹280'
    },
    'philgate': {
        name: 'Philgate-KT',
        img: 'img/philgate-kt.jpeg',
        tagline: 'Fast relief from post-operative eye pain, inflammation, and infections, specially formulated for sensitive eyes.',
        composition: 'Gatifloxacin 0.3% w/v + Ketorolac 0.4% w/v',
        price: '₹172'
    },
    'ekaflox': {
        name: 'Ekaflox',
        img: 'img/ekaflox.jpeg',
        tagline: 'Treats infections of the eye, including bacterial conjunctivitis.',
        composition: 'Moxifloxacin Hydrochloride 5.0 mg',
        price: '₹100'
    },
    'ekaflox-dm': {
        name: 'Ekaflox-DM',
        img: 'img/ekaflox-dm.jpeg',
        tagline: 'Dual-action formula for effective relief from eye infections and inflammation.',
        composition: 'Moxifloxacin 0.5% w/v + Dexamethasone Phosphate 0.1% w/v',
        price: '₹120'
    },
    'ekaflox-lp': {
        name: 'Ekaflox-LP',
        img: 'img/ekaflox-lp.jpeg',
        tagline: 'Combination of an antibiotic and a corticosteroid for chronic eye infections and inflammation.',
        composition: 'Moxifloxacin 0.5% w/v + Loteprednol Etabonate 0.5% w/v',
        price: '₹180'
    },
    'shelvital': {
        name: 'Shel-vital',
        img: 'img/shelvital.jpeg',
        tagline: 'Advanced nutritional support for eye health and vision protection.',
        composition: 'Lutein 10mg + Zeaxanthin 2mg + Lycopene 6% 10mg + Vitamin E 11 IU + Zinc 13.2mg + Manganese 4mg + Astaxanthin 2mg + Selenium 40mcg + Vitamin C 80mg + Vitamin B6 1.9mg + Vitamin B12 2.2mcg + Copper 1.7mg + Folic Acid 150mcg',
        price: '₹180'
    }
};

// ===== Modal =====
function openModal(id) {
    const p = products[id];
    if (!p) return;
    document.getElementById('modal-img').src = p.img;
    document.getElementById('modal-img').alt = p.name;
    document.getElementById('modal-name').textContent = p.name;
    document.getElementById('modal-tagline').textContent = p.tagline;
    document.getElementById('modal-composition').textContent = p.composition;
    document.getElementById('modal-price').textContent = 'MRP: ' + p.price;
    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
}

function closeModalOutside(e) {
    if (e.target === document.getElementById('modal-overlay')) closeModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ===== Product Filters (products page) =====
const filterBtns = document.querySelectorAll('.filter-btn');
if (filterBtns.length) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.product[data-category]').forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Contact Form =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn-submit');
        btn.textContent = 'Sending...';
        btn.disabled = true;
        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                contactForm.reset();
                document.getElementById('form-success').style.display = 'block';
                btn.textContent = 'Message Sent';
            } else {
                btn.textContent = 'Send Message';
                btn.disabled = false;
                alert('Something went wrong. Please email us directly.');
            }
        } catch {
            btn.textContent = 'Send Message';
            btn.disabled = false;
            alert('Something went wrong. Please email us directly.');
        }
    });
}
