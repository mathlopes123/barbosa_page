// ===== SCRIPT PRINCIPAL INTEGRADO - COLÉGIO BARBOSA FERRAZ =====
document.addEventListener("DOMContentLoaded", () => {
  // ===== CONFIGURAÇÕES GLOBAIS =====
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebarToggle")
  const menuLinks = document.querySelectorAll(".menu-link")

  // ===== MENU LATERAL RESPONSIVO =====
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("active")
    })
  }

  // Fechar sidebar ao clicar fora (mobile)
  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 1024 &&
      sidebar &&
      !sidebar.contains(e.target) &&
      sidebarToggle &&
      !sidebarToggle.contains(e.target) &&
      sidebar.classList.contains("active")
    ) {
      sidebar.classList.remove("active")
    }
  })

  // Fechar sidebar ao clicar em um link (mobile)
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1024 && sidebar) {
        sidebar.classList.remove("active")
      }
    })
  })

  // ===== SMOOTH SCROLL APRIMORADO =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        const offsetTop = target.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
        
        // Fechar sidebar no mobile após clicar no link
        if (window.innerWidth <= 1024 && sidebar) {
          sidebar.classList.remove("active")
        }
      }
    })
  })

  // ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")

        // Animações específicas para elementos alternados
        if (entry.target.classList.contains("about-item")) {
          const textElement = entry.target.querySelector(".about-text")
          const imageElement = entry.target.querySelector(".about-image")

          if (entry.target.classList.contains("reverse")) {
            textElement?.classList.add("slide-right")
            imageElement?.classList.add("slide-left")
          } else {
            textElement?.classList.add("slide-left")
            imageElement?.classList.add("slide-right")
          }
        }

        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observar elementos para animação
  document
    .querySelectorAll(".course-card, .gallery-item, .about-item, .subject-card, .skill-category")
    .forEach((el) => {
      observer.observe(el)
    })

  // ===== DESTACAR LINK ATIVO NO MENU =====
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        menuLinks.forEach((link) => {
          link.classList.remove("active")
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active")
          }
        })
      }
    })
  }

  // Throttle para otimizar performance
  let ticking = false
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateActiveLink)
      ticking = true
      setTimeout(() => {
        ticking = false
      }, 100)
    }
  }

  window.addEventListener("scroll", requestTick)

  // ===== EFEITO PARALLAX SUTIL =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".hero")

    parallaxElements.forEach((element) => {
      const speed = 0.3
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // ===== TABS DA GRADE CURRICULAR APRIMORADO =====
  function initCurriculumTabs() {
    const tabs = document.querySelectorAll(".year-tab")
    const contents = document.querySelectorAll(".year-content")

    tabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const targetYear = this.getAttribute("data-year")

        // Remove active class from all tabs and contents
        tabs.forEach((t) => t.classList.remove("active"))
        contents.forEach((c) => c.classList.remove("active"))

        // Add active class to clicked tab and corresponding content
        this.classList.add("active")
        const targetContent = document.querySelector(`[data-year="${targetYear}"].year-content`)
        if (targetContent) {
          targetContent.classList.add("active")
          
          // Animar entrada do conteúdo
          targetContent.style.opacity = "0"
          targetContent.style.transform = "translateY(20px)"
          
          setTimeout(() => {
            targetContent.style.transition = "all 0.3s ease"
            targetContent.style.opacity = "1"
            targetContent.style.transform = "translateY(0)"
          }, 50)
        }
      })
    })
  }

  // ===== CONTADOR ANIMADO =====
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target
            const text = target.textContent
            const finalValue = Number.parseInt(text.replace(/[^\d]/g, "")) || 0
            const suffix = text.replace(/[\d]/g, "")
            let currentValue = 0
            const increment = finalValue / 60

            const counter = setInterval(() => {
              currentValue += increment
              if (currentValue >= finalValue) {
                target.textContent = finalValue + suffix
                clearInterval(counter)
              } else {
                target.textContent = Math.floor(currentValue) + suffix
              }
            }, 30)

            counterObserver.unobserve(target)
          }
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((counter) => counterObserver.observe(counter))
  }

  // ===== ANIMAÇÕES ESPECÍFICAS POR TEMA (REMOVIDAS AS EXCESSIVAS) =====
  function initThemeAnimations() {
    // Animações sutis apenas no hover para não sobrecarregar
    const interactiveElements = document.querySelectorAll(".tech-animation, .sports-animation, .health-animation, .beauty-animation")
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)"
        this.style.transition = "transform 0.3s ease"
      })
      
      el.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)"
      })
    })
  }

  // ===== CARDS INTERATIVOS =====
  function initInteractiveCards() {
    const cards = document.querySelectorAll(".course-card, .gallery-item, .subject-card")

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)"
        this.style.transition = "all 0.3s ease"
      })

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)"
      })

      // Adicionar efeito de clique
      card.addEventListener("click", function () {
        this.style.transform = "translateY(-5px) scale(0.98)"
        setTimeout(() => {
          this.style.transform = "translateY(-10px) scale(1.02)"
        }, 150)
      })
    })
  }

  // ===== FORMULÁRIOS =====
  function initForms() {
    const forms = document.querySelectorAll("form")

    forms.forEach((form) => {
      form.addEventListener("submit", function (e) {
        e.preventDefault()

        const inputs = this.querySelectorAll("input[required], textarea[required], select[required]")
        let isValid = true

        inputs.forEach((input) => {
          if (!input.value.trim()) {
            input.classList.add("error")
            isValid = false
          } else {
            input.classList.remove("error")
          }
        })

        if (isValid) {
          showNotification("Formulário enviado com sucesso!", "success")
          this.reset()
        } else {
          showNotification("Por favor, preencha todos os campos obrigatórios.", "error")
        }
      })
    })

    // Remover erro ao digitar
    document.querySelectorAll("input, textarea, select").forEach((input) => {
      input.addEventListener("input", function () {
        this.classList.remove("error")
      })
    })
  }

  // ===== SISTEMA DE NOTIFICAÇÕES =====
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">&times;</button>
    `

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      max-width: 400px;
      box-shadow: var(--shadow-lg);
      font-family: inherit;
    `

    switch (type) {
      case "success":
        notification.style.background = "var(--success)"
        break
      case "error":
        notification.style.background = "var(--danger)"
        break
      case "warning":
        notification.style.background = "var(--warning)"
        notification.style.color = "#333"
        break
      default:
        notification.style.background = "var(--primary-blue)"
    }

    document.body.appendChild(notification)

    // Botão de fechar
    const closeBtn = notification.querySelector(".notification-close")
    closeBtn.addEventListener("click", () => removeNotification(notification))

    // Auto remove após 5 segundos
    setTimeout(() => removeNotification(notification), 5000)
  }

  function getNotificationIcon(type) {
    switch (type) {
      case "success":
        return "check-circle"
      case "error":
        return "exclamation-circle"
      case "warning":
        return "exclamation-triangle"
      default:
        return "info-circle"
    }
  }

  function removeNotification(notification) {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }
  }

  // ===== LAZY LOADING DE IMAGENS =====
  function initLazyLoading() {
    const images = document.querySelectorAll("img[data-src]")
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      })
    })

    images.forEach((img) => imageObserver.observe(img))
  }

  // ===== PERFORMANCE OPTIMIZATION =====
  function initPerformanceOptimizations() {
    // Debounce para resize
    let resizeTimeout
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateActiveLink()
      }, 250)
    })

    // Preload de imagens importantes
    const importantImages = document.querySelectorAll("img[data-preload]")
    importantImages.forEach((img) => {
      const preloadImg = new Image()
      preloadImg.src = img.src
    })

    // Otimização de scroll
    let scrollTimeout
    window.addEventListener("scroll", () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      scrollTimeout = setTimeout(() => {
        // Código que deve executar após o scroll parar
      }, 100)
    }, { passive: true })
  }

  // ===== ACESSIBILIDADE =====
  function initAccessibility() {
    // Navegação por teclado
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && sidebar && sidebar.classList.contains("active")) {
        sidebar.classList.remove("active")
      }
    })

    // Focus trap no sidebar quando aberto
    if (sidebar) {
      const focusableElements = sidebar.querySelectorAll("a, button, input, select, textarea")
      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]

      sidebar.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
              lastFocusable.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastFocusable) {
              firstFocusable.focus()
              e.preventDefault()
            }
          }
        }
      })
    }

    // Melhorar contraste em foco
    document.querySelectorAll("a, button, input, select, textarea").forEach((element) => {
      element.addEventListener("focus", function () {
        this.style.outline = "3px solid var(--accent-blue)"
        this.style.outlineOffset = "2px"
      })
      
      element.addEventListener("blur", function () {
        this.style.outline = ""
        this.style.outlineOffset = ""
      })
    })
  }

  // ===== SISTEMA DE BUSCA (OPCIONAL) =====
  function initSearch() {
    const searchInput = document.querySelector("#search-input")
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase()
        const searchableElements = document.querySelectorAll(".course-card, .gallery-item")
        
        searchableElements.forEach((element) => {
          const text = element.textContent.toLowerCase()
          if (text.includes(query)) {
            element.style.display = "block"
            element.style.opacity = "1"
          } else {
            element.style.opacity = "0.3"
          }
        })
      })
    }
  }

  // ===== MODO ESCURO (OPCIONAL) =====
  function initDarkMode() {
    const darkModeToggle = document.querySelector("#dark-mode-toggle")
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"))
      })

      // Carregar preferência salva
      if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode")
      }
    }
  }

  // ===== INICIALIZAÇÃO DE TODOS OS MÓDULOS =====
  try {
    initCurriculumTabs()
    animateCounters()
    initThemeAnimations()
    initInteractiveCards()
    initForms()
    initLazyLoading()
    initPerformanceOptimizations()
    initAccessibility()
    initSearch()
    initDarkMode()
    
    console.log("✅ Todos os módulos inicializados com sucesso!")
  } catch (error) {
    console.error("❌ Erro na inicialização:", error)
  }

  // ===== CSS DINÂMICO PARA ANIMAÇÕES =====
  const dynamicCSS = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .notification-close {
      background: none;
      border: none;
      color: inherit;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }
    
    .notification-close:hover {
      opacity: 1;
    }
    
    .error {
      border: 2px solid var(--danger) !important;
      background-color: rgba(239, 68, 68, 0.1) !important;
    }
    
    .lazy {
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .lazy.loaded {
      opacity: 1;
    }
    
    /* Modo escuro */
    .dark-mode {
      --white: #1a1a1a;
      --light-gray: #2d2d2d;
      --gray: #a0a0a0;
      --dark-gray: #e0e0e0;
    }
    
    /* Melhorias de acessibilidade */
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    
    /* Melhor contraste para leitores de tela */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `

  const style = document.createElement("style")
  style.textContent = dynamicCSS
  document.head.appendChild(style)

  // ===== LOG DE INICIALIZAÇÃO =====
  console.log("🎓 Colégio Barbosa Ferraz - Sistema inicializado com sucesso!")
  console.log("📊 Funcionalidades ativas:", {
    sidebar: !!sidebar,
    smoothScroll: true,
    animations: true,
    forms: document.querySelectorAll("form").length,
    cards: document.querySelectorAll(".course-card, .gallery-item").length,
    tabs: document.querySelectorAll(".year-tab").length
  })
})

// ===== FUNÇÕES UTILITÁRIAS GLOBAIS =====
window.CollegeUtils = {
  showNotification: (message, type = "info") => {
    const event = new CustomEvent("showNotification", {
      detail: { message, type },
    })
    document.dispatchEvent(event)
  },

  scrollToSection: (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  },

  toggleSidebar: () => {
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.classList.toggle("active")
    }
  },

  // Novas funções utilitárias
  preloadImage: (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  },

  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },

  throttle: (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if (!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  // Função para analytics (se necessário)
  trackEvent: (eventName, properties = {}) => {
    console.log(`📈 Event: ${eventName}`, properties)
    // Aqui você pode integrar com Google Analytics, etc.
  }
}

// ===== EVENT LISTENERS GLOBAIS =====
document.addEventListener("showNotification", (e) => {
  const { message, type } = e.detail
  // Implementar lógica de notificação aqui se necessário
})

// ===== TRATAMENTO DE ERROS GLOBAL =====
window.addEventListener("error", (e) => {
  console.error("❌ Erro JavaScript:", e.error)
  // Aqui você pode enviar erros para um serviço de monitoramento
})

window.addEventListener("unhandledrejection", (e) => {
  console.error("❌ Promise rejeitada:", e.reason)
  e.preventDefault()
})