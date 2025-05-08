function selecionar(link) {
    var opciones = document.querySelector("#links a");
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].classNae = "";
    opciones[3].classNamme = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    var x = document.getElementById("nav");
    x.className = "";
}


document.addEventListener("DOMContentLoaded", function () {
    const skills = [
        { id: "html", progress: 95 },
        { id: "css", progress: 95 },
        { id: "js", progress: 95 },
        { id: "mysql", progress: 84 },
        { id: "php", progress: 95 },
        { id: "react", progress: 90 },
        { id: "bootstrap", progress: 90 },
        { id: "cordova", progress: 90 },
    ];

    skills.forEach((skill) => {
        document
            .getElementById(skill.id)
            .setAttribute("data-progress", skill.progress);
    });

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                const bar = entry.target.children[0];
                if (entry.isIntersecting) {
                    bar.style.width = bar.getAttribute("data-progress") + "%";
                } else {
                    bar.style.width = "0%";
                }
            });
        },
        {
            threshold: 0.5,
        }
    );

    document.querySelectorAll(".barra").forEach((bar) => {
        observer.observe(bar);
    });
});

const roles = [
    "Desarrollador full-stack",
    "Desarrollador Mobile",
     "Desarrollador de Software",

];
let currentRole = 0;
const roleElement = document.getElementById("role");

function typeRole() {
    roleElement.textContent = roles[currentRole];
    roleElement.style.animation = "no ne";
    roleElement.offsetHeight;
    roleElement.style.animation =
        "typing 2s steps(30, end), blink-caret 0.75s step-end infinite";

    setTimeout(() => {
        roleElement.style.animation = "none";
        roleElement.offsetHeight;
        roleElement.style.animation = "deleting 2s steps(30, end)";

        setTimeout(() => {
            currentRole = (currentRole + 1) % roles.length;
            typeRole();
        }, 2000);
    }, 3000);
}

document.addEventListener("DOMContentLoaded", typeRole);

document.addEventListener("DOMContentLoaded", (event) => {
    const textElement = document.getElementById("rol");
    const text = textElement.innerHTML;
    textElement.innerHTML = "";
    textElement.style.width = text.length + "ch";

    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            textElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
});

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("html").style.width = "95%";
    document.getElementById("js").style.width = "80%";
    document.getElementById("bd").style.width = "84%";
    document.getElementById("php").style.width = "80%";
});

AOS.init();

function mostrarMasProyectos() {
    const filaExtra = document.querySelector(".fila-extra");
    filaExtra.style.display = "flex"; // o 'block' según tu diseño
    event.target.style.display = "none"; // Oculta el botón después de mostrar
}

function abrirModal(imagen, descripcion) {
    document.getElementById("modalImg").src = imagen;
    document.getElementById("modalInfo").textContent = descripcion;
    document.getElementById("miModal").style.display = "block";
}

function cerrarModal(event) {
    if (
        event.target.classList.contains("modal") ||
        event.target.classList.contains("close")
    ) {
        document.getElementById("miModal").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Elementos del slider
    const track = document.querySelector(".testimonios-track");
    const slides = Array.from(document.querySelectorAll(".testimonio-item"));
    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".prev-btn");
    const indicators = Array.from(document.querySelectorAll(".indicador"));
    const testimonioContents = document.querySelectorAll(".testimonio-contenido");

    let currentIndex = 0;
    const slideWidth = 100; // 100% del ancho del contenedor

    // Inicializar el slider
    function initSlider() {
        // Mostrar el primer testimonio como activo
        slides[currentIndex].classList.add("active");
        indicators[currentIndex].classList.add("active");

        // Añadir la animación a todos los contenidos de testimonios
        testimonioContents.forEach((content, index) => {
            // Escalonamiento del tiempo de inicio de la animación
            setTimeout(() => {
                content.classList.add("animate");
            }, index * 100);
        });

        // Observador de intersección para animaciones de entrada
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Agregar animación fadeInScale cuando aparezcan en el viewport
                        entry.target.style.animation = "fadeInScale 0.8s ease forwards";
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        // Observar cada testimonio
        slides.forEach((slide) => {
            observer.observe(slide);
        });
    }

    // Cambiar slide
    function goToSlide(index) {
        // Validar el índice
        if (index < 0) {
            index = slides.length - 1;
        } else if (index >= slides.length) {
            index = 0;
        }

        // Actualizar posición del track
        track.style.transform = `translateX(-${slideWidth * index}%)`;

        // Remover clase active de todos los elementos
        slides.forEach((slide) => slide.classList.remove("active"));
        indicators.forEach((dot) => dot.classList.remove("active"));

        // Agregar clase active al slide e indicador actual
        slides[index].classList.add("active");
        indicators[index].classList.add("active");

        // Actualizar índice actual
        currentIndex = index;
    }

    // Event listeners para botones
    nextButton.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
        // Efecto de pulsación
        nextButton.classList.add("pulse");
        setTimeout(() => {
            nextButton.classList.remove("pulse");
        }, 300);
    });

    prevButton.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
        // Efecto de pulsación
        prevButton.classList.add("pulse");
        setTimeout(() => {
            prevButton.classList.remove("pulse");
        }, 300);
    });

    // Event listeners para indicadores
    indicators.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToSlide(index);
        });
    });

    // Cambio automático de slides
    function autoSlide() {
        goToSlide(currentIndex + 1);
    }

    // Iniciar cambio automático
    let slideInterval = setInterval(autoSlide, 8000);

    // Pausar intervalo cuando el usuario interactúa con los controles
    const pauseInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(autoSlide, 8000);
    };

    nextButton.addEventListener("click", pauseInterval);
    prevButton.addEventListener("click", pauseInterval);
    indicators.forEach((dot) => {
        dot.addEventListener("click", pauseInterval);
    });

    // Touch events para swipe en dispositivos móviles
    let touchStartX = 0;
    let touchEndX = 0;

    const slider = document.querySelector(".testimonios-slider");

    slider.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        // Swipe izquierda (next)
        if (touchStartX - touchEndX > 50) {
            goToSlide(currentIndex + 1);
            pauseInterval();
        }
        // Swipe derecha (prev)
        if (touchEndX - touchStartX > 50) {
            goToSlide(currentIndex - 1);
            pauseInterval();
        }
    }

    // Añadir animación al hacer hover en cada testimonio
    testimonioContents.forEach((content) => {
        content.addEventListener("mouseenter", () => {
            content.style.animationPlayState = "paused";
        });

        content.addEventListener("mouseleave", () => {
            content.style.animationPlayState = "running";
        });
    });

    // Inicializar slider
    initSlider();
});

// Animación al hacer scroll
window.addEventListener("scroll", function () {
    const testimonios = document.getElementById("testimonios");
    const testimoniosPosition = testimonios.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (testimoniosPosition < screenPosition) {
        testimonios.classList.add("visible");

        // Animar título y subtítulo con un pequeño retraso
        const title = document.querySelector("#testimonios .section-title");
        const subtitle = document.querySelector("#testimonios .section-subtitle");

        setTimeout(() => {
            title.style.opacity = "1";
            title.style.transform = "translateX(-50%) translateY(0)";
        }, 300);

        setTimeout(() => {
            subtitle.style.opacity = "1";
            subtitle.style.transform = "translateY(0)";
        }, 500);
    }
});
