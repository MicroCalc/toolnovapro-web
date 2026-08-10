const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;

        const increment = Math.max(1, Math.ceil(target / 60));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {

                counter.textContent = target;

                observer.unobserve(counter);

                return;

            }

            counter.textContent = current;

            requestAnimationFrame(updateCounter);

        };

        updateCounter();

    });

});

counters.forEach(counter => observer.observe(counter));