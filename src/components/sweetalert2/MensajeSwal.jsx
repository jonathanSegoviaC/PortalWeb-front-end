import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

/**
 * Muestra un mensaje de error utilizando SweetAlert.
 * @param {string} titulo El título del mensaje.
 * @param {string} mensaje El cuerpo del mensaje.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se cierra el mensaje. No retorna ningún valor. 
 */
export const swalMensajeError = (titulo, error) => {
    return MySwal.fire({
        title: titulo,
        text: error,
        icon: "error",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
};

/**
 * Muestra un mensaje de exito utilizando SweetAlert.
 * @param {string} titulo El título del mensaje.
 * @param {string} mensaje El cuerpo del mensaje.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se cierra el mensaje. No retorna ningún valor. 
 */
export const swalMensajeExito = (titulo, mensaje) => {
    return MySwal.fire({
        title: titulo,
        text: mensaje,
        icon: "success",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
};

/**
 * Muestra un mensaje de advertencia utilizando SweetAlert.
 * @param {string} titulo El título del mensaje.
 * @param {string} mensaje El cuerpo del mensaje.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se cierra el mensaje. No retorna ningún valor. 
 */
export const swalMensajeAdvertencia = (titulo, mensaje) => {
    return MySwal.fire({
        title: titulo,
        text: mensaje,
        icon: "warning",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
};

/**
 * Muestra un mensaje de información utilizando SweetAlert.
 * @param {string} titulo El título del mensaje.
 * @param {string} mensaje El cuerpo del mensaje.
 * @returns {Promise<void>} Una promesa que se resuelve cuando se cierra el mensaje.
 */
export const swalMensajeInformacion = (titulo, mensaje) => {
    return MySwal.fire({
        title: titulo,
        text: mensaje,
        icon: "info",
        confirmButtonClass: "btn btn-sm btn-primary",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: 'btn btn-sm btn-icon btn-danger',
        },
    })
};

/**
 * Muestra un mensaje de advertencia con opción de confirmar o cancelar utilizando SweetAlert.
 * @param {string} titulo El título del mensaje.
 * @param {string} mensaje El cuerpo del mensaje.
 * @param {string} mensaje_confirmacion El mensaje de confirmación a mostrar si se confirma la acción.
 * @param {string} mensaje_cancelacion El mensaje de cancelación a mostrar si se cancela la acción.
 * @returns {Promise<{ confirmed: boolean }>} Una promesa que resuelve con un objeto que indica si se confirmó o canceló la acción.
 */
export const swalMensajeConfirmacion = (titulo, mensaje, mensaje_confirmacion, mensaje_cancelacion) => {
    return new Promise((resolve) => {
        MySwal.fire({
            title: titulo,
            text: mensaje,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            confirmButtonClass: "btn btn-sm btn-primary",
            cancelButtonClass: "btn btn-sm btn-danger",
            buttonsStyling: false,
            showCloseButton: true,
            closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
            customClass: {
                closeButton: 'btn btn-sm btn-icon btn-danger',
            },
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: "Acción ejecutada",
                    text: mensaje_confirmacion,
                    icon: "success",
                    confirmButtonClass: "btn btn-sm btn-primary",
                    buttonsStyling: false
                });
                resolve({ confirmed: true });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: "Acción cancelada",
                    text: mensaje_cancelacion,
                    icon: "error",
                    confirmButtonClass: "btn btn-sm btn-primary",
                    buttonsStyling: false
                });
                resolve({ confirmed: false });
            }
        });
    });
};