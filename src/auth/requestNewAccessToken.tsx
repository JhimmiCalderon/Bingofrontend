// requestNewAccessToken.ts

/**
 * Función asíncrona para solicitar un nuevo token de acceso utilizando un token de actualización.
 * @param {string} refreshToken - Token de actualización utilizado para obtener un nuevo token de acceso.
 * @returns {Promise<string>} - Promesa que resuelve en el nuevo token de acceso.
 * @throws {Error} - En caso de una solicitud no exitosa o un error en la respuesta.
 */
import { AccessTokenResponse } from "../types/types";
import { API_URL } from "./authConstants";
// Realizar una solicitud al servidor para obtener un nuevo token de acceso
export default async function requestNewAccessToken(refreshToken: string) {
  const response = await fetch(`${API_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
// Verificar si la solicitud fue exitosa
  if (response.ok) {
    // Parsear la respuesta JSON como AccessTokenResponse
    const json = (await response.json()) as AccessTokenResponse;
      // Verificar si hay un error en la respuesta
    if (json.error) {
      throw new Error(json.error);
    }  // Devolver el nuevo token de acceso
    return json.body.accessToken;
  } else {
     // Capturar y lanzar cualquier error durante el proceso
    throw new
     Error("Unable to refresh access token.");
  }
}