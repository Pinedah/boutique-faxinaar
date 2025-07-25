// Funcionalidad para la galería de productos 

document.addEventListener('DOMContentLoaded', function() {
    
    // Funcionalidad de filtros mejorada
    const filtrosBtns = document.querySelectorAll('.filtro-btn');
    const productCards = document.querySelectorAll('.producto-card');
    const gridProductos = document.querySelector('.grid-productos');
    
    filtrosBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filtrosBtns.forEach(b => b.classList.remove('active'));
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            
            // Añadir clase de transición al grid
            gridProductos.style.transition = 'all 0.3s ease';
            
            productCards.forEach((card, index) => {
                if (categoria === 'todas' || card.getAttribute('data-categoria') === categoria) {
                    // Mostrar tarjeta con delay escalonado
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeInUp 0.4s ease forwards';
                    }, index * 50);
                } else {
                    // Ocultar tarjeta
                    card.classList.add('hidden');
                }
            });
        });
    });
    
    // Smooth scroll para navegación
    const navLinks = document.querySelectorAll('.nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación de entrada para las tarjetas de productos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });

    // Funcionalidad de los botones "Realizar Pedido"
    const botonesComprar = document.querySelectorAll('.btn-comprar');
    
    botonesComprar.forEach(boton => {
        boton.addEventListener('click', function() {
            const card = this.closest('.producto-card');
            const nombreProducto = card.querySelector('h4').textContent;
            const precio = card.querySelector('.precio').textContent;
            
            // Efecto visual en el botón
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Abrir WhatsApp Web con mensaje prellenado
            abrirWhatsApp(nombreProducto, precio);
        });
    });

    // Función para abrir WhatsApp Web
    function abrirWhatsApp(producto, precio) {
        const numeroWhatsApp = "525534266811"; // Número de WhatsApp sin signos + ni espacios
        const mensaje = `¡Hola! Me interesa el producto: *${producto}* con precio ${precio}. ¿Podrías darme más información?`;
        
        // Codificar el mensaje para URL
        const mensajeCodificado = encodeURIComponent(mensaje);
        
        // Construir la URL de WhatsApp Web
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
        
        // Abrir en nueva ventana/pestaña
        window.open(urlWhatsApp, '_blank');
        
        // Mostrar mensaje de confirmación
        mostrarMensaje(`Abriendo WhatsApp para ${producto}`, 'info');
    }

    // Función para mostrar mensajes temporales
    function mostrarMensaje(texto, tipo = 'info') {
        // Crear elemento de mensaje
        const mensaje = document.createElement('div');
        mensaje.className = `mensaje-temporal mensaje-${tipo}`;
        mensaje.textContent = texto;
        
        // Estilos inline para el mensaje
        mensaje.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: var(--color-morado-boutique);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(mensaje);
        
        // Animar entrada
        setTimeout(() => {
            mensaje.style.transform = 'translateX(0)';
        }, 10);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            mensaje.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (mensaje.parentNode) {
                    mensaje.parentNode.removeChild(mensaje);
                }
            }, 300);
        }, 3000);
    }

    // Efecto parallax suave en hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Lazy loading para imágenes (simulado)
    const imagenes = document.querySelectorAll('.producto-imagen img');
    
    imagenes.forEach(img => {
        // Placeholder mientras no hay imágenes reales
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDkwVjEzMEgxMjBWMTAwWiIgZmlsbD0iI0NDQ0NDQyIvPgo8cGF0aCBkPSJNMjEwIDEwMEgxODBWMTMwSDIxMFYxMDBaIiBmaWxsPSIjQ0NDQ0NDIi8+CjxwYXRoIGQ9Ik0xNjUgMTQwSDEzNVYxNzBIMTY1VjE0MFoiIGZpbGw9IiNDQ0NDQ0MiLz4KPHRleHQgeD0iMTUwIiB5PSIxOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2VuIGRlIFByb2R1Y3RvPC90ZXh0Pgo8L3N2Zz4K';
            this.alt = 'Imagen de producto no disponible';
        });
        
        // Trigger error event para mostrar placeholder
        if (!img.src || img.src.includes('producto')) {
            img.dispatchEvent(new Event('error'));
        }
    });
});

// Añadir animaciones CSS mediante JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .mensaje-temporal {
        font-family: var(--fuente-titulo);
    }
`;
document.head.appendChild(style);