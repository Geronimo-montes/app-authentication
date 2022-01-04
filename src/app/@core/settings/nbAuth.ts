import { NbAuthJWTToken } from "@nebular/auth";
import { NbPasswordAuthStrategy } from '@nebular/auth';
import { environment } from "../../../environments/environment";

/**
 * Estrategias de autenticacion y sus configuraciones.
 */
export const STRATEGIES = {
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      baseEndpoint: environment.API_URL,
      login: {
        endpoint: 'sign-in/user-credentials',
        alwaysFail: false,
        method: 'post',
        requireValidToken: true,
        redirect: {
          success: '/pages/users',
          failure: null,
        },
        defaultErrors: ['Correo o contraseña incorrectos, intente nuevamente.'],
        defaultMessages: ['Has validado tus credenciasles exitosamente.'],
      },
      logout: false,
      token: {
        class: NbAuthJWTToken,
        key: 'token',
      },
    }),
  ],
  forms: {
    login: {
      redirectDelay: 1000,
      strategy: 'email',
      remember: false,
      showMessages: {
        success: true,
        error: true,
      },
    },
    logout: { redirecDelay: 0 },
  }
}