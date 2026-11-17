/* ==========================================================================
   Idiomas de la web · Janucá 5787 · Jabad Barcelona
   Textos fijos de la cabecera, el menú y el pie en cada idioma.
   El contenido de cada página está en src/paginas/ (español), src/paginas/ca/
   (catalán), src/paginas/en/ (inglés) y src/paginas/he/ (hebreo, de derecha a izquierda).
   ========================================================================== */
module.exports = {
  es: {
    carpeta: '', html: 'es', og: 'es_ES', nombre: 'Español', corto: 'ES',
    menu: {
      'index.html': 'Inicio', 'historia.html': 'Historia', 'como-encender.html': 'Cómo encender',
      'horarios.html': 'Horarios', 'bendiciones.html': 'Bendiciones', 'tradiciones.html': 'Tradiciones',
      'receta.html': 'Recetas', 'eventos.html': 'Eventos'
    },
    t: {
      SITIO: 'Janucá 5787 · Jabad Barcelona',
      IMAGEN_ALT: 'Janucá 5787 con Jabad Barcelona · Suma tu luz',
      SALTAR: 'Saltar al contenido',
      MARCA_ARIA: 'Janucá 5787 con Jabad Barcelona: inicio',
      MARCA_ORG: 'Jabad Barcelona',
      MARCA_TITULO: 'Janucá 5787',
      ABRIR_MENU: 'Abrir menú',
      MENU_ARIA: 'Principal',
      IDIOMA: 'Idioma',
      PIE_INICIO_ARIA: 'Jabad Barcelona: inicio',
      PIE_SC_ARIA: 'Jabad Sant Cugat: encendido en Sant Cugat',
      PIE_LEMA: 'Suma tu luz · Del viernes 4 al sábado 12 de diciembre de 2026 · Barcelona',
      PIE_KIT: 'Pide tu kit gratuito de Janucá →',
      PIE_JANUCA: 'Janucá',
      PIE_SECCIONES: 'Secciones',
      PIE_CONTACTO: 'Contacto',
      PIE_COPY: '© 5787 · 2026 Jabad Lubavitch Barcelona',
      PIE_FOTOS: 'Fotos de recetas: Wikimedia Commons'
    }
  },
  ca: {
    carpeta: 'ca', html: 'ca', og: 'ca_ES', nombre: 'Català', corto: 'CA',
    menu: {
      'index.html': 'Inici', 'historia.html': 'Història', 'como-encender.html': 'Com encendre',
      'horarios.html': 'Horaris', 'bendiciones.html': 'Benediccions', 'tradiciones.html': 'Tradicions',
      'receta.html': 'Receptes', 'eventos.html': 'Actes'
    },
    t: {
      SITIO: 'Hanukkà 5787 · Jabad Barcelona',
      IMAGEN_ALT: 'Hanukkà 5787 amb Jabad Barcelona · Suma la teva llum',
      SALTAR: 'Salta al contingut',
      MARCA_ARIA: 'Hanukkà 5787 amb Jabad Barcelona: inici',
      MARCA_ORG: 'Jabad Barcelona',
      MARCA_TITULO: 'Hanukkà 5787',
      ABRIR_MENU: 'Obre el menú',
      MENU_ARIA: 'Principal',
      IDIOMA: 'Idioma',
      PIE_INICIO_ARIA: 'Jabad Barcelona: inici',
      PIE_SC_ARIA: 'Jabad Sant Cugat: encesa a Sant Cugat',
      PIE_LEMA: 'Suma la teva llum · Del divendres 4 al dissabte 12 de desembre de 2026 · Barcelona',
      PIE_KIT: 'Demana el teu kit gratuït de Hanukkà →',
      PIE_JANUCA: 'Hanukkà',
      PIE_SECCIONES: 'Seccions',
      PIE_CONTACTO: 'Contacte',
      PIE_COPY: '© 5787 · 2026 Jabad Lubavitx Barcelona',
      PIE_FOTOS: 'Fotos de receptes: Wikimedia Commons'
    }
  },
  en: {
    carpeta: 'en', html: 'en', og: 'en_GB', nombre: 'English', corto: 'EN',
    menu: {
      'index.html': 'Home', 'historia.html': 'History', 'como-encender.html': 'How to light',
      'horarios.html': 'Times', 'bendiciones.html': 'Blessings', 'tradiciones.html': 'Traditions',
      'receta.html': 'Recipes', 'eventos.html': 'Events'
    },
    t: {
      SITIO: 'Chanukah 5787 · Chabad Barcelona',
      IMAGEN_ALT: 'Chanukah 5787 with Chabad Barcelona · Add your light',
      SALTAR: 'Skip to content',
      MARCA_ARIA: 'Chanukah 5787 with Chabad Barcelona: home',
      MARCA_ORG: 'Chabad Barcelona',
      MARCA_TITULO: 'Chanukah 5787',
      ABRIR_MENU: 'Open menu',
      MENU_ARIA: 'Main',
      IDIOMA: 'Language',
      PIE_INICIO_ARIA: 'Chabad Barcelona: home',
      PIE_SC_ARIA: 'Chabad Sant Cugat: menorah lighting in Sant Cugat',
      PIE_LEMA: 'Add your light · Friday 4 to Saturday 12 December 2026 · Barcelona',
      PIE_KIT: 'Order your free Chanukah kit →',
      PIE_JANUCA: 'Chanukah',
      PIE_SECCIONES: 'Sections',
      PIE_CONTACTO: 'Contact',
      PIE_COPY: '© 5787 · 2026 Chabad Lubavitch Barcelona',
      PIE_FOTOS: 'Recipe photos: Wikimedia Commons'
    }
  },
  he: {
    carpeta: 'he', html: 'he', dir: 'rtl', og: 'he_IL', nombre: 'עברית', corto: 'HE',
    menu: {
      'index.html': 'ראשי', 'historia.html': 'היסטוריה', 'como-encender.html': 'איך מדליקים',
      'horarios.html': 'זמני הדלקה', 'bendiciones.html': 'ברכות', 'tradiciones.html': 'מנהגים',
      'receta.html': 'מתכונים', 'eventos.html': 'אירועים'
    },
    t: {
      SITIO: 'חנוכה תשפ״ז · חב״ד ברצלונה',
      IMAGEN_ALT: 'חנוכה תשפ״ז עם חב״ד ברצלונה · הוסיפו אור',
      SALTAR: 'דילוג לתוכן',
      MARCA_ARIA: 'חנוכה תשפ״ז עם חב״ד ברצלונה: עמוד ראשי',
      MARCA_ORG: 'חב״ד ברצלונה',
      MARCA_TITULO: 'חנוכה תשפ״ז',
      ABRIR_MENU: 'פתיחת התפריט',
      MENU_ARIA: 'ראשי',
      IDIOMA: 'שפה',
      PIE_INICIO_ARIA: 'חב״ד ברצלונה: עמוד ראשי',
      PIE_SC_ARIA: 'חב״ד סנט קוגט: הדלקה בסנט קוגט',
      PIE_LEMA: 'הוסיפו אור · מיום שישי 4 עד שבת 12 בדצמבר 2026 · ברצלונה',
      PIE_KIT: 'הזמינו ערכת חנוכה בחינם ←',
      PIE_JANUCA: 'חנוכה',
      PIE_SECCIONES: 'מדורים',
      PIE_CONTACTO: 'יצירת קשר',
      PIE_COPY: '© תשפ״ז · 2026 חב״ד ליובאוויטש ברצלונה',
      PIE_FOTOS: 'צילומי המתכונים: Wikimedia Commons'
    }
  }
};
