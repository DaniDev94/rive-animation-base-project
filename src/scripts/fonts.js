import ancient from "../../public/fonts/ancient-game.ttf";
import bromph from "../../public/fonts/bromph_town.otf";
import oldWest from "../../public/fonts/old-west.otf";
import roboto from "../../public/fonts/Roboto-Bold.ttf";
import starJedi from "../../public/fonts/starjedi.ttf";
import wildWest from "../../public/fonts/wild-west.otf";
import woodtrap from "../../public/fonts/woodtrap.ttf";
import deadpack from "../../public/fonts/deadpack.ttf";
import i18next from "./i18n";

const fonts = {
    ancient: ancient,
    bromph: bromph,
    oldWest: oldWest,
    roboto: roboto,
    starJedi: starJedi,
    wildWest: wildWest,
    woodtrap: woodtrap,
    deadpack: deadpack
}

const loadFontAsset = async (asset, fontName) => {
    // Haz una solicitud para obtener el archivo de fuente
    const response = await fetch(fonts[fontName]);
    // Convierte la respuesta en un ArrayBuffer
    const arrayBuffer = await response.arrayBuffer();
    // decodeFont crea un objeto de fuente específico de Rive que `setFont()` utiliza
    const font = await rive.decodeFont(new Uint8Array(arrayBuffer));
    // Establece la fuente en el objeto
    asset.setFont(font);
    // Asegúrate de llamar a unref para liberar cualquier referencia.
    // Esto permite que el motor lo limpie cuando no se utilice en más animaciones.
    font.unref();
};

const handleLanguageChange = (riveObject, textKey) => {
    // Configurar el idioma predeterminado en español (es)
    i18next.changeLanguage('es').then(() => {
        // Establecer el texto en español al cargar la página
        riveObject.setTextRunValue('MyText', i18next.t(textKey));
    });
    // Seleccionar el elemento select
    const $select = document.getElementById("languageSelect");
    // Evento para cambiar el idioma
    $select.addEventListener('change', (event) => {
        const selectedLanguage = event.target.value;
        i18next.changeLanguage(selectedLanguage).then(() => {
            // Asignar el texto traducido a la variable "referencedText" (lo obtiene directamente del json de traducción con i18next.t())
            const referencedText = i18next.t(textKey);
            // Seteamos el valor del texto en la animación
            return riveObject.setTextRunValue(
                'MyText',
                referencedText
            );
        });
    });
};

export {
    loadFontAsset,
    handleLanguageChange,
    fonts
}

