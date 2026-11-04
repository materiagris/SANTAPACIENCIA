// SANTAPACIENCIA — interacción mínima, sin dependencias
(function () {
  var reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Cabecera con línea al hacer scroll
  var cabecera = document.getElementById("cabecera");
  if (cabecera) {
    var alScroll = function () { cabecera.classList.toggle("con-sombra", window.scrollY > 10); };
    window.addEventListener("scroll", alScroll, { passive: true });
    alScroll();
  }

  // Menú móvil
  var boton = document.getElementById("menu-boton");
  var nav = document.getElementById("nav");
  if (boton && nav) {
    var cerrar = function () {
      nav.classList.remove("abierto");
      boton.setAttribute("aria-expanded", "false");
      boton.setAttribute("aria-label", "Abrir menú");
    };
    boton.addEventListener("click", function () {
      var abierto = nav.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", String(abierto));
      boton.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", cerrar); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
  }

  // Aparición suave
  var elementos = document.querySelectorAll(".aparece");
  if ("IntersectionObserver" in window && !reducido) {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    elementos.forEach(function (el) { obs.observe(el); });
  } else {
    elementos.forEach(function (el) { el.classList.add("visible"); });
  }

  // Pase de fotos de la portada
  var pase = document.getElementById("pase");
  if (pase) {
    var fotos = pase.querySelectorAll("img");
    var puntos = pase.querySelector(".pase__puntos");
    var actual = 0, temporizador;
    var mostrar = function (i) {
      fotos[actual].classList.remove("activa");
      puntos.children[actual].setAttribute("aria-current", "false");
      actual = (i + fotos.length) % fotos.length;
      fotos[actual].classList.add("activa");
      puntos.children[actual].setAttribute("aria-current", "true");
    };
    fotos.forEach(function (_, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("aria-label", "Foto " + (i + 1));
      b.setAttribute("aria-current", i === 0 ? "true" : "false");
      b.addEventListener("click", function () { mostrar(i); reiniciar(); });
      puntos.appendChild(b);
    });
    var reiniciar = function () {
      clearInterval(temporizador);
      if (!reducido) temporizador = setInterval(function () { mostrar(actual + 1); }, 5500);
    };
    reiniciar();
  }

  // Formulario de contacto
  var form = document.getElementById("formulario");
  if (form) {
    var estado = document.getElementById("formulario-estado");
    var EMAIL = form.dataset.email;
    var asunto = new URLSearchParams(location.search).get("asunto");
    if (asunto) form.asunto.value = "Presupuesto: " + asunto;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var d = new FormData(form);

      // Sin Formspree configurado: abrir el programa de correo
      if (form.action.indexOf("FORM_ID") !== -1) {
        var cuerpo = "Nombre: " + d.get("nombre") + "\nCorreo: " + d.get("email") + "\n\n" + (d.get("mensaje") || "");
        location.href = "mailto:" + EMAIL +
          "?subject=" + encodeURIComponent(d.get("asunto") || "Consulta desde la web") +
          "&body=" + encodeURIComponent(cuerpo);
        return;
      }

      estado.textContent = "Enviando…";
      fetch(form.action, { method: "POST", body: d, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset();
          estado.textContent = "¡Gracias! Te escribimos muy pronto.";
        })
        .catch(function () { estado.textContent = "No se ha podido enviar. Escríbenos a " + EMAIL; });
    });
  }
})();
