// =======================================
// 1. Lógica del Menú Hamburguesa
// =======================================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    // Función para alternar el menú
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        // Ajusta la altura del header si es necesario para el menú fijo en móvil
        if (navMenu.classList.contains('active')) {
             navMenu.style.top = `${header.offsetHeight}px`;
        }
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Cerrar menú al hacer clic en un enlace (solo en móvil)
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Pequeño timeout para permitir la navegación antes de cerrar
                setTimeout(() => {
                    if (navMenu.classList.contains('active')) {
                        toggleMenu();
                    }
                }, 100);
            }
        });
    });


    // =======================================
    // 2. Efecto de Aparición al Hacer Scroll (Scroll Reveal)
    // =======================================

    // Función que define qué hacer cuando la sección es visible
    const appearOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando el elemento entra en el viewport
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                // Dejar de observar una vez que ha aparecido
                observer.unobserve(entry.target);
            }
        });
    };

    // Opciones del observador: qué tan lejos debe estar el elemento para disparar
    const observerOptions = {
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.2 // El 20% del elemento debe ser visible
    };

    const observer = new IntersectionObserver(appearOnScroll, observerOptions);

    // Aplicar estilo inicial y animación a todas las secciones (excepto el header/footer)
    document.querySelectorAll('section').forEach(section => {
        // Estilos iniciales (oculto y ligeramente desplazado)
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)'; // Aumentado un poco el desplazamiento
        section.style.transition = 'all 0.8s ease-out'; // Aumentado la duración para suavidad
        
        // Empezar a observar
        observer.observe(section);
    });
});