import type { I18nKey } from "./en";

/** Spanish — keys must match `en.ts` (I18nKey). */
export const es = {
  auth_login_title: "Iniciar sesión",
  auth_login_blurb:
    "Modo desarrollo: cualquier contraseña no vacía funciona con auth en modo mock. Usa EXPO_PUBLIC_AUTH_MODE=api e implementa las rutas en services/authBackend.ts para una API real.",
  auth_login_email: "Correo",
  auth_login_password: "Contraseña",
  auth_login_submit: "Entrar",
  auth_login_forgot: "¿Olvidaste la contraseña?",
  auth_login_no_account: "¿No tienes cuenta?",
  auth_login_register: "Registrarse",

  auth_register_title: "Crear cuenta",
  auth_register_blurb:
    "Crea una sesión local en modo mock. Con EXPO_PUBLIC_AUTH_MODE=api, conecta /auth/register en tu servidor.",
  auth_register_name: "Nombre",
  auth_register_email: "Correo",
  auth_register_password: "Contraseña",
  auth_register_submit: "Crear cuenta",
  auth_register_has_account: "¿Ya tienes cuenta? Inicia sesión",

  auth_forgot_title: "Recuperar contraseña",
  auth_forgot_blurb:
    "Introduce el correo de tu cuenta. En modo mock solo simulamos OTP; en modo api llamamos a POST /auth/forgot-password.",
  auth_forgot_email: "Correo",
  auth_forgot_submit: "Continuar",

  auth_verify_title: "Verificar código",
  auth_verify_blurb_mock:
    "Código enviado a {{email}}. En modo mock, cualquier código de 6+ dígitos vale.",
  auth_verify_blurb_api: "Código enviado a {{email}}.",
  auth_verify_code_label: "Código de un solo uso",
  auth_verify_submit: "Verificar y continuar",

  home_welcome: "Bienvenido",
  home_body:
    "Esta es tu pantalla inicial. Sustituye este contenido por la vista principal de tu app.",
  home_tabs_hint:
    "Usa la barra inferior (Inicio · Dos · Componentes · Store · Consultas) para explorar la plantilla.",
  home_name_placeholder: "Escribe tu nombre",
  home_open_components: "Abrir galería de componentes",
} as const satisfies Record<I18nKey, string>;
